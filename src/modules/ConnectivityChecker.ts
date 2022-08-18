import TaskDispatcher from './TaskDispatcher';
import { resolveAfter } from './utils';

interface DomainData {
  domain: string,
  isWiki: boolean,
  isSuccessful: boolean,
  ping?: number,
  isBlocked?: boolean,
}

interface MwQueryUserInfoApiResult {
  batchcomplete: boolean,
  query: {
    userinfo: {
      id: number,
      name: string,
      anon: boolean,
      blockid?: unknown,
    }
  }
}

interface MwQueryGlobalBlocksApiResult {
  batchcomplete: boolean,
  query: {
    globalblocks: Array<{
      address: string,
    }>
  }
}

type SiteList = Array<[string, boolean]>;

const CONCURRENCY = 15;
const TIMEOUT_MS = 30 * 1000;
const IP_ENDPOINT = 'https://login.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&origin=*';
const FETCH_OPT = { method: 'GET', headers: new Headers({ 'Api-User-Agent': `wscd/${APP_VERSION}` }) };

class ConnectivityChecker {
  private readonly siteList: SiteList;

  private readonly perDomainFinished: (data: DomainData) => void;

  private readonly taskDispatcher: TaskDispatcher;

  /**
   * Instantiate a {@link ConnectivityChecker} object.
   * @param siteList a list of sites to be checked
   * @param perDomainFinished a callback which is called when a single domain test is completed
   */
  public constructor(siteList: SiteList, perDomainFinished: (data: DomainData) => void) {
    this.siteList = siteList;
    this.perDomainFinished = perDomainFinished;
    this.taskDispatcher = new TaskDispatcher(CONCURRENCY);
  }

  public static async checkGlobalBlock(): Promise<boolean> {
    const ip: string = await fetch(IP_ENDPOINT, FETCH_OPT)
      .then((resp) => resp.json())
      .then((res: MwQueryUserInfoApiResult) => {
        if (res.batchcomplete && res.query.userinfo.anon) {
          return res.query.userinfo.name;
        }
        throw new Error('Invalid response when getting IP!');
      });

    const isGloballyBlocked: boolean = await fetch(
      `https://login.wikimedia.org/w/api.php?action=query&list=globalblocks&bgip=${ip}&bgprop=address&format=json&formatversion=2&origin=*`,
      FETCH_OPT,
    ).then((resp) => resp.json()).then((res: MwQueryGlobalBlocksApiResult) => {
      if (res.batchcomplete) {
        return res.query.globalblocks.length > 0;
      }
      throw new Error('Invalid response when getting global block data!');
    });

    return isGloballyBlocked;
  }

  public async check(): Promise<unknown> {
    this.siteList.forEach(([domain, isWiki]) => {
      this.taskDispatcher.enqueue(() => {
        const startTime = performance.now();
        const domainData: DomainData = {
          domain,
          isWiki,
          isSuccessful: false,
        };

        const fetchPromise = isWiki
          ? fetch(
            `https://${domain}/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*`,
            FETCH_OPT,
          )
            .then((resp) => resp.json())
            .then(async (respJson: MwQueryUserInfoApiResult) => {
              if (respJson.batchcomplete) {
                if ('blockid' in respJson.query.userinfo) {
                  domainData.isBlocked = true;
                } else {
                  domainData.isBlocked = false;

                  // Check global blocks as uiprop=blockinfo doesn't acknowledge global blocks
                  const ip = respJson.query.userinfo.name;
                  const gbRespJson: MwQueryGlobalBlocksApiResult = await fetch(
                    `https://${domain}/w/api.php?action=query&list=globalblocks&bgip=${ip}&bgprop=address&format=json&formatversion=2&origin=*`,
                    FETCH_OPT,
                  ).then((resp) => resp.json());
                  if (gbRespJson.batchcomplete) {
                    domainData.isBlocked = gbRespJson.query.globalblocks.length > 0;
                  }
                }
              }
            })
          : fetch(
            `https://${domain}/favicon.ico?wscd=${APP_VERSION}&nocache=${Date.now()}`,
            { method: 'HEAD', mode: 'no-cors' },
          );

        return Promise.race([
          resolveAfter(TIMEOUT_MS),
          fetchPromise
            .then(() => {
              domainData.isSuccessful = true;
              domainData.ping = Math.trunc(performance.now() - startTime);
            })
            .catch(() => { domainData.isSuccessful = false; })
            .then(() => { this.perDomainFinished(domainData); })]);
      });
    });

    return this.taskDispatcher.run();
  }
}

export default ConnectivityChecker;

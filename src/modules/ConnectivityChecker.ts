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
  query?: {
    userinfo: {
      id: number,
      name: string,
      anon: boolean,
      blockid?: unknown,
    }
  }
}

interface MwQueryGlobalBlocksApiResult {
  query?: {
    globalblocks: Array<{
      address: string,
    }>
  }
}

type SiteList = Array<[string, boolean]>;

const CONCURRENCY = 15;
const TIMEOUT_MS = 30 * 1000;
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
              if (respJson.query !== undefined) {
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

                  if (gbRespJson.query !== undefined) {
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

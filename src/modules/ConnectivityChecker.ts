import TaskDispatcher from './TaskDispatcher';
import { getSignalAbortedAfter } from './utils';

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

type DomainList = Array<[string, boolean]>;

const CONCURRENCY = 15;
const TIMEOUT_MS = 30 * 1000;
const FETCH_OPT: RequestInit = {
  method: 'GET',
  headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
  cache: 'no-store',
};

class ConnectivityChecker {
  private readonly domainList: DomainList;

  private readonly perDomainCheckStarted: (domain: string) => void;

  private readonly perDomainFinished: (data: DomainData) => void;

  private readonly taskDispatcher: TaskDispatcher;

  /**
   * Instantiate a {@link ConnectivityChecker} object.
   * @param domainList a list of sites to be checked
   * @param perDomainCheckStarted a callback which is called when a single domain test is started
   * @param perDomainFinished a callback which is called when a single domain test is completed
   * @param concurrency number of domain checks to run at a single time
   */
  public constructor(
    domainList: DomainList,
    perDomainCheckStarted: (domain: string) => void,
    perDomainFinished: (data: DomainData) => void,
    concurrency = CONCURRENCY,
  ) {
    this.domainList = domainList;
    this.perDomainCheckStarted = perDomainCheckStarted;
    this.perDomainFinished = perDomainFinished;
    this.taskDispatcher = new TaskDispatcher(concurrency);
  }

  public async check(): Promise<unknown> {
    this.domainList.forEach(([domain, isWiki]) => {
      this.taskDispatcher.enqueue(() => {
        this.perDomainCheckStarted(domain);

        const domainData: DomainData = {
          domain,
          isWiki,
          isSuccessful: false,
        };
        const startTime = performance.now();
        const fetchPromise = isWiki
          ? fetch(
            `https://${domain}/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*`,
            { ...FETCH_OPT, signal: getSignalAbortedAfter(TIMEOUT_MS) },
          )
            .then((resp) => resp.json())
            .then((respJson: MwQueryUserInfoApiResult) => {
              // Check if it is a private wiki
              if (respJson.query === undefined) {
                return null;
              }
              domainData.isBlocked = 'blockid' in respJson.query.userinfo;
              return respJson.query.userinfo.name;
            })
          : fetch(
            `https://${domain}/favicon.ico`,
            { ...FETCH_OPT, mode: 'no-cors', signal: getSignalAbortedAfter(TIMEOUT_MS) },
          );

        return fetchPromise
          .then(async (ip) => {
            domainData.ping = Math.trunc(performance.now() - startTime);
            domainData.isSuccessful = true;

            if (typeof ip === 'string' && !domainData.isBlocked) {
              // Check global blocks as uiprop=blockinfo doesn't acknowledge global blocks
              try {
                const gbRespJson: MwQueryGlobalBlocksApiResult = await fetch(
                  `https://${domain}/w/api.php?action=query&list=globalblocks&bgip=${ip}&bgprop=address&format=json&formatversion=2&origin=*`,
                  { ...FETCH_OPT, signal: getSignalAbortedAfter(TIMEOUT_MS) },
                ).then((resp) => resp.json());

                if (gbRespJson.query !== undefined) {
                  domainData.isBlocked = gbRespJson.query.globalblocks.length > 0;
                }
              } catch {
                // FIXME: Better error handling here, consider not catching exceptions?
              }
            }
          })
          .catch(() => { domainData.isSuccessful = false; })
          .then(() => { this.perDomainFinished(domainData); });
      });
    });

    return this.taskDispatcher.run();
  }
}

export default ConnectivityChecker;

import { DomainBlockingResult, DomainConnectivityResult, DomainDataView } from './store';

const JOIN_PATTERN = '\n - ';
const EMPTY_FALLBACK = 'none';
const PADDING = ' ';
const TABLE_HEADER_ROW = ['Domains', 'Status', 'Blocked?', 'RTT (ms)'];

const PADDING_DOMAINS = 30;
const PADDING_STATUS = 10;
const PADDING_BLOCKED = 15;
const PADDING_PING = 8;

/**
 * Helper class to export check data to a string.
 */
class DataExporter {
  private checkData: Map<string, DomainDataView>;

  /**
   * Instantiate a {@link DataExporter} instance.
   * @param checkData check data
   */
  constructor(checkData: Map<string, DomainDataView>) {
    this.checkData = checkData;
  }

  /**
   * Render a string representation of matched domains.
   * @param matcher function expression to match against all domains
   * @return the string
   */
  private renderSiteList(matcher: (view: DomainDataView) => boolean): string {
    return [...this.checkData]
      .filter(([, view]) => matcher(view))
      .map(([domain]) => JOIN_PATTERN + domain)
      .join('') || EMPTY_FALLBACK;
  }

  /**
   * Render a string representation of all verbose data, in table style.
   * @return the table
   */
  private renderTable(): string {
    const tableEntries: Array<[
      string,
      DomainConnectivityResult,
      DomainBlockingResult | undefined,
      number | undefined,
    ]> = [];

    this.checkData.forEach(({ connectivity, blocking, ping }, key) => {
      tableEntries.push([key, connectivity, blocking, ping]);
    });

    return [
      TABLE_HEADER_ROW,
      ...tableEntries.map((entry) => entry.map((item) => `${item || ''}`)),
    ]
      .map(
        ([domain, status, blocked, ping]) => [
          domain.padEnd(PADDING_DOMAINS, PADDING),
          status.padEnd(PADDING_STATUS, PADDING),
          blocked.padEnd(PADDING_BLOCKED, PADDING),
          ping.padStart(PADDING_PING, PADDING),
        ].join(''),
      )
      .join('\n');
  }

  /**
   * Export all check data to a string.
   * @return the string
   */
  public export(): string {
    let result = 'Check result';
    result += '\n------------';
    result += `\nGenerated at: ${new Date().toUTCString()}`;
    result += `\nUnavailable domains: ${this.renderSiteList(
      ({ connectivity }) => connectivity === DomainConnectivityResult.FAILURE,
    )}`;
    result += `\nBlocked domains: ${this.renderSiteList(
      ({ blocking }) => blocking === DomainBlockingResult.BLOCKED,
    )}`;
    result += '\n';
    result += `\n${this.renderTable()}`;
    return result;
  }
}

export default DataExporter;

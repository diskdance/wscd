import { DomainBlockingResult, DomainConnectivityResult, DomainDataView } from './store';

// No need to support i18n, English only

const JOIN_PATTERN = '\n - ';
const EMPTY_FALLBACK = 'none';
const PADDING_CHAR = ' ';
const TABLE_HEADER_ROW = ['Domains', 'Status', 'Blocked?', 'RTT (ms)'];

const PADDING_DOMAINS = 30;
const PADDING_STATUS = 10;
const PADDING_BLOCKED = 15;
const PADDING_PING = 8;

/**
 * Helper class to generate check reports.
 */
class ReportGenerator {
  private checkData: Map<string, DomainDataView>;

  /**
   * Instantiate a {@link ReportGenerator} instance.
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
          domain.padEnd(PADDING_DOMAINS, PADDING_CHAR),
          status.padEnd(PADDING_STATUS, PADDING_CHAR),
          blocked.padEnd(PADDING_BLOCKED, PADDING_CHAR),
          ping.padStart(PADDING_PING, PADDING_CHAR),
        ].join(''),
      )
      .join('\n');
  }

  /**
   * Export all check data to a string.
   * @param date date
   * @return the string
   */
  private generateReport(date: Date): string {
    let result = 'Check result';
    result += '\n------------';
    result += `\nGenerated at: ${date}`;
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

  /**
   * Download the report.
   */
  public download(): void {
    const date = new Date();
    const filename = `CheckReport_${date.getTime()}.txt`;
    const report = this.generateReport(date);

    const blob = new Blob([report], { type: 'text/plain' });

    const hiddenAnchor = document.createElement('a');
    hiddenAnchor.href = URL.createObjectURL(blob);
    hiddenAnchor.download = filename;
    document.body.appendChild(hiddenAnchor);

    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);
  }
}

export default ReportGenerator;

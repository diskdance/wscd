import { reactive } from 'vue';

// Give them string values for the convenience of logging

enum DomainConnectivityResult {
  PENDING = 'Pending',
  CHECKING = 'Checking',
  SUCCESS = 'Success',
  FAILURE = 'Failure',
}

enum DomainBlockingResult {
  NOT_BLOCKED = 'Not blocked',
  BLOCKED = 'Blocked',
  UNKNOWN = 'Unknown',
  NOT_A_WIKI = 'Not a wiki',
}

enum CheckStatus {
  NOT_RUN,
  PREPARING,
  RUNNING,
  ENDED,
  ENDED_ERROR,
}

interface DomainDataView {
  connectivity: DomainConnectivityResult,
  blocking?: DomainBlockingResult,
  ping?: number,
}

const store = reactive({
  checkStatus: CheckStatus.NOT_RUN,
  domainDataView: new Map<string, DomainDataView>(),
});

export default store;
export type { DomainDataView };
export { DomainConnectivityResult, DomainBlockingResult, CheckStatus };

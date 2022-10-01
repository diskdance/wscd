import { reactive } from 'vue';

enum DomainConnectivityResult {
  PENDING,
  CHECKING,
  SUCCESS,
  FAILURE,
}

enum DomainBlockingResult {
  NOT_BLOCKED,
  BLOCKED,
  UNKNOWN,
  NOT_A_WIKI,
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

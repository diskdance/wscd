enum DomainCheckStatus {
  PENDING,
  CHECKING,
  SUCCESS,
  FAILURE,
}

enum BlockStatus {
  NOT_BLOCKED,
  BLOCKED,
  UNKNOWN,
  NOT_A_WIKI,
}

enum CheckStatus {
  NOT_CHECKED,
  PREFETCHING,
  CHECKING,
  ENDED,
  ENDED_ERROR,
}

interface DomainDataView {
  status: DomainCheckStatus,
  blockStatus?: BlockStatus,
  ping?: number,
}

export type { DomainDataView };
export { DomainCheckStatus, BlockStatus, CheckStatus };

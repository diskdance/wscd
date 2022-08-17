enum DomainCheckStatus {
  PENDING,
  SUCCESS,
  FAILURE,
}

enum BlockStatus {
  NOT_BLOCKED,
  BLOCKED,
  UNKNOWN,
  NOT_A_WIKI,
}

interface DomainDataView {
  status: DomainCheckStatus,
  blockStatus?: BlockStatus,
  ping?: number,
}

export type { DomainDataView };
export { DomainCheckStatus, BlockStatus };

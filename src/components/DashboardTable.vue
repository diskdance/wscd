<script setup lang="ts">
import Banana from 'banana-i18n';
import { inject } from 'vue';
import { BlockStatus, DomainCheckStatus, DomainDataView } from '../types/view-model';

defineProps<{
  data: Map<string, DomainDataView>,
}>();

const banana = inject<Banana>('banana')!;

function getName(domain: string): string {
  const transformedDomain = domain.replace(/(www|m)\./g, '');
  const key = `name-${transformedDomain}`;
  const translation = banana.i18n(key);
  return translation === key ? banana.i18n('name-key-missing') : translation;
}

function getStatus(status: DomainCheckStatus): string {
  switch (status) {
    case DomainCheckStatus.FAILURE:
      return banana.i18n('avl-no');
    case DomainCheckStatus.SUCCESS:
      return banana.i18n('avl-yes');
    case DomainCheckStatus.CHECKING:
      return banana.i18n('checking');
    default:
      return banana.i18n('pending');
  }
}

function getBlockStatus(blockStatus: BlockStatus | undefined): string {
  if (blockStatus === undefined) {
    return '';
  }
  switch (blockStatus) {
    case BlockStatus.BLOCKED:
      return banana.i18n('blk-yes');
    case BlockStatus.NOT_BLOCKED:
      return banana.i18n('blk-no');
    case BlockStatus.NOT_A_WIKI:
      return banana.i18n('blk-non-wiki');
    default:
      return banana.i18n('blk-unknown');
  }
}

function getConnectivity(ping: number | undefined): string {
  if (ping === undefined) {
    return '';
  }
  if (ping <= 500) {
    return banana.i18n('rtt-excellent');
  }
  if (ping > 500 && ping <= 1000) {
    return banana.i18n('rtt-good');
  }
  return banana.i18n('rtt-bad');
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>{{ $i18n('tbl-h-name') }}</th>
          <th>{{ $i18n('tbl-h-domains') }}</th>
          <th>{{ $i18n('tbl-h-available') }}</th>
          <th>{{ $i18n('tbl-h-block') }}</th>
          <th>{{ $i18n('tbl-h-conn') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[domain, { status, ping, blockStatus }] in data" :key="domain">
          <td>
            <span aria-hidden="true" class="mobile-header">{{ $i18n('tbl-h-name') }}</span>
            <span class="content">{{ getName(domain) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="mobile-header">{{ $i18n('tbl-h-domains') }}</span>
            <span class="content">
              <a target="_blank" rel="noopener noreferrer" :href="`https://${domain}/`">
                {{ domain }}
              </a>
            </span>
          </td>
          <td>
            <span aria-hidden="true" class="mobile-header">{{ $i18n('tbl-h-available') }}</span>
            <span class="content">{{ getStatus(status) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="mobile-header">{{ $i18n('tbl-h-block') }}</span>
            <span class="content">{{ getBlockStatus(blockStatus) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="mobile-header">{{ $i18n('tbl-h-conn') }}</span>
            <span class="content">{{ getConnectivity(ping) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="less">
.table-container {
  overflow-x: auto;

  table {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    line-height: 1.25;

    &,
    & thead {
      border: 1px solid #cdcdcd;
      border-collapse: collapse;
    }

    thead {
      font-weight: bold;
    }

    th {
      text-align: left;
    }

    tr:nth-child(2n) {
      background-color: #f2f2f2;
    }

    td,
    th {
      padding: 10px;
    }

    .mobile-header {
      display: none;
    }

    @media screen and (max-width: 750px) {

      /* Hide table header but not display:none for a11y */
      thead {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      table,
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
      }

      td .content {
        float: right;
      }

      .mobile-header {
        display: inline-block;
        font-weight: 700;
      }
    }
  }
}
</style>

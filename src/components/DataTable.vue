<script lang="ts">
import { defineComponent } from 'vue';
import store, { DomainBlockingResult, DomainConnectivityResult } from '../modules/store';

export default defineComponent({
  data() {
    return {
      domainDataView: store.domainDataView,
    };
  },
  methods: {
    getName(domain: string): string {
      const transformedDomain = domain.replace(/^(www|m)\./g, '').replace(/\.(www|m)\./g, '.');
      const key = `name-${transformedDomain}`;
      const translation = this.$i18n(key);
      return translation === key ? this.$i18n('name-key-missing') : translation;
    },

    getStatus(status: DomainConnectivityResult): string {
      switch (status) {
        case DomainConnectivityResult.FAILURE:
          return this.$i18n('avl-no');
        case DomainConnectivityResult.SUCCESS:
          return this.$i18n('avl-yes');
        case DomainConnectivityResult.CHECKING:
          return this.$i18n('checking');
        default:
          return this.$i18n('pending');
      }
    },

    getDomainBlockingResult(blockStatus: DomainBlockingResult | undefined): string {
      if (blockStatus === undefined) {
        return '';
      }
      switch (blockStatus) {
        case DomainBlockingResult.BLOCKED:
          return this.$i18n('blk-yes');
        case DomainBlockingResult.NOT_BLOCKED:
          return this.$i18n('blk-no');
        case DomainBlockingResult.NOT_A_WIKI:
          return this.$i18n('blk-non-wiki');
        default:
          return this.$i18n('blk-unknown');
      }
    },

    getConnectivity(ping: number | undefined): string {
      if (ping === undefined) {
        return '';
      }
      if (ping <= 500) {
        return this.$i18n('rtt-excellent');
      }
      if (ping > 500 && ping <= 1000) {
        return this.$i18n('rtt-good');
      }
      return this.$i18n('rtt-bad');
    },
  },
});
</script>

<template>
  <div class="table-container">
    <table class="table">
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
        <tr v-for="[domain, { connectivity: status, ping, blocking: blockStatus }] in domainDataView" :key="domain">
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-name') }}</span>
            <span class="table__content">{{ getName(domain) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-domains')
            }}</span>
            <span class="table__content">
              <a target="_blank" rel="noopener noreferrer" :href="`https://${domain}/`">
                {{ domain }}
              </a>
            </span>
          </td>
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-available')
            }}</span>
            <span class="table__content">{{ getStatus(status) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-block') }}</span>
            <span class="table__content">{{ getDomainBlockingResult(blockStatus) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-conn') }}</span>
            <span class="table__content"
              :title="ping === undefined ? undefined : $i18n('rtt-title', ping)">
              {{ getConnectivity(ping) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.table-container {
  overflow-x: auto;

  .table {
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

    &__mobile-header {
      display: none;
    }

    @media screen and (max-width: @site-width-narrow) {

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

      &__content {
        float: right;
      }

      &__mobile-header {
        display: inline-block;
        font-weight: 700;
      }
    }
  }
}
</style>

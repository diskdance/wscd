<script lang="ts">
import { defineComponent } from 'vue';
import store, { DomainBlockingResult, DomainConnectivityResult } from '../modules/store';
import SiteButton from './SiteButton.vue';

const STEPPING = 20;

export default defineComponent({
  data() {
    return {
      domainDataView: store.domainDataView,
      start: 0,
      STEPPING,
    };
  },
  computed: {
    domainDataViewSlice() {
      return [...this.domainDataView.entries()].slice(this.start, this.start + STEPPING);
    },
    isAtStart() {
      return this.start - STEPPING < 0;
    },
    isAtEnd() {
      return this.start + STEPPING > this.domainDataView.size - 1;
    },
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
      if (ping <= 1000) {
        return this.$i18n('rtt-excellent');
      }
      if (ping > 1000 && ping <= 2000) {
        return this.$i18n('rtt-good');
      }
      return this.$i18n('rtt-bad');
    },
    nextPage() {
      if (!this.isAtEnd) {
        this.start += STEPPING;
      }
    },
    prevPage() {
      if (!this.isAtStart) {
        this.start -= STEPPING;
      }
    },
    toStart() {
      this.start = 0;
    },
    toEnd() {
      this.start = this.domainDataView.size - (this.domainDataView.size % STEPPING);
    },
  },
  components: { SiteButton },
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
        <tr v-for="[domain, { connectivity, ping, blocking }] in domainDataViewSlice" :key="domain">
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
            <span class="table__content">{{ getStatus(connectivity) }}</span>
          </td>
          <td>
            <span aria-hidden="true" class="table__mobile-header">{{ $i18n('tbl-h-block') }}</span>
            <span class="table__content">{{ getDomainBlockingResult(blocking) }}</span>
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
    <div class="table-container__pager">
      <SiteButton @click="toStart()"
        :class="['page__button', { 'pager__button--hidden': isAtStart }]"
        :title="$i18n('tbl-btn-jts')">&lt;&lt;
      </SiteButton>
      <SiteButton @click="prevPage()"
        :class="['page__button', { 'pager__button--hidden': isAtStart }]"
        :title="$i18n('tbl-btn-prev')">&lt;
      </SiteButton>
      <div>{{ $i18n('tbl-page-info', start + 1, isAtEnd ? domainDataView.size : start + STEPPING,
      domainDataView.size) }}</div>
      <SiteButton @click="nextPage()"
        :class="['page__button', { 'pager__button--hidden': isAtEnd }]"
        :title="$i18n('tbl-btn-next')">&gt;
      </SiteButton>
      <SiteButton @click="toEnd()" :class="['page__button', { 'pager__button--hidden': isAtEnd }]"
        :title="$i18n('tbl-btn-jte')">&gt;&gt;
      </SiteButton>
    </div>
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
    border: 1px solid @color-border;
    border-radius: @border-radius @border-radius 0 0;
    border-spacing: 0;
    border-collapse: separate;
    overflow: hidden;

    thead {
      font-weight: bold;
    }

    th {
      text-align: left;
    }

    tbody tr:nth-child(2n-1) {
      background-color: @color-table-alt;
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

  &__pager {
    border: 1px solid @color-border;
    border-top: 0;
    border-radius: 0 0 @border-radius @border-radius;
    padding: 14px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: @site-width-narrow) {
      flex-direction: column;

      >* {
        margin: 8px;
      }
    }

    .pager__button--hidden {
      visibility: hidden;
    }
  }
}
</style>

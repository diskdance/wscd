<script setup lang="ts">
import { defineComponent } from 'vue';
import { BlockStatus, DomainCheckStatus, DomainDataView } from '../types/view-model';

defineProps<{
  data: Map<string, DomainDataView>,
  isGloballyBlocked: boolean,
}>();
</script>

<script lang="ts">
export default defineComponent({
  methods: {
    getName(domain: string): string {
      const transformedDomain = domain.replace(/(www|m)\./g, '');
      const key = `name-${transformedDomain}`;
      const translation = this.$i18n(key);
      return translation === key ? this.$i18n('name-key-missing') : translation;
    },
    getStatus(status: DomainCheckStatus): string {
      switch (status) {
        case DomainCheckStatus.FAILURE:
          return this.$i18n('avl-no');
        case DomainCheckStatus.SUCCESS:
          return this.$i18n('avl-yes');
        default:
          return this.$i18n('checking');
      }
    },
    getBlockStatus(blockStatus: BlockStatus | undefined): string {
      if (blockStatus === undefined) {
        return '';
      }
      switch (blockStatus) {
        case BlockStatus.BLOCKED:
          return this.$i18n('blk-yes');
        case BlockStatus.NOT_BLOCKED:
          if (this.isGloballyBlocked) {
            return this.$i18n('blk-yes');
          }
          return this.$i18n('blk-no');
        case BlockStatus.NOT_A_WIKI:
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
          <td>{{ getName(domain) }}</td>
          <td>
            <a target="_blank" rel="noopener noreferrer" :href="`https://${domain}/`">
              {{ domain }}
            </a>
          </td>
          <td>{{ getStatus(status) }}</td>
          <td>{{ getBlockStatus(blockStatus) }}</td>
          <td>{{ getConnectivity(ping) }}</td>
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
  }
}
</style>

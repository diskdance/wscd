<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  DomainDataView, CheckStatus, DomainCheckStatus, BlockStatus,
} from '../types/view-model';
import SiteButton from './SiteButton.vue';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Map<string, DomainDataView>>,
      required: true,
    },
    status: {
      type: Number as PropType<CheckStatus>,
      required: true,
    },
  },
  data() {
    return {
      CheckStatus,
    };
  },
  computed: {
    hasProblem(): boolean {
      return [...this.data.values()].some(
        (dataView) => dataView.status === DomainCheckStatus.FAILURE
          || dataView.blockStatus === BlockStatus.BLOCKED,
      );
    },
    checkedSitesCount(): number {
      return [...this.data.values()]
        .filter((dataView) => dataView.status !== DomainCheckStatus.CHECKING
          && dataView.status !== DomainCheckStatus.PENDING).length;
    },
    headingText(): string {
      if (this.status === CheckStatus.CHECKING) {
        if (this.hasProblem) {
          return `Some issues detected (${this.checkedSitesCount}/${this.data.size})...`;
        }
        return `Checking (${this.checkedSitesCount}/${this.data.size})...`;
      }
      if (this.hasProblem) {
        return 'Some issues detected';
      }
      return 'No issues detected';
    },
  },
  components: { SiteButton },
});
</script>

<template>
  <div class="summary-card">
    <div class="summary-card__progress-bar" v-if="status === CheckStatus.CHECKING"></div>
    <h2 class="summary-card__heading">{{ headingText }}</h2>
    <div class="summary-card__content">
      <p>Your network might have some problems affecting your experience on Wikimedia sites.</p>
      <p>You cannot access: zh.wikipedia.org and 2 more</p>
      <p>You cannot edit: en.wikipedia.org and 8 more</p>
      <h3>Why did this happen?</h3>
      <p>First of all: It is not your fault!</p>
      <p>For connection disruption, this may due to faulty networks, company
        network policies or government censorship.</p>
      <p>For IP blocks, this may be because you are using a proxy or VPN service. Using such
        services would change your IP address to theirs, and Wikimedia projects
        blocked proxy IPs from editing to prevent vandalism.</p>
      <h3>What should I do?</h3>
      <p>You can try to use proxies or VPN services to connect. </p>
      <p>However, editing from these services are forbidden. You can request IP block exemption for
        your account to edit under proxies.</p>
    </div>
    <div class="summary-card__action">
      <SiteButton>Show data</SiteButton>
      <SiteButton>Download data</SiteButton>
      <SiteButton>Rerun check</SiteButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.summary-card {
  .card-normal();

  @media screen and (min-width: @site-width-narrow) {
    padding-left: 50px;
  }

  &__heading {
    margin-bottom: 0.375em;
  }

  &__content {

    ::v-deep(p),
    ::v-deep(h3) {
      margin-bottom: 0.375em;
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import store, {
  CheckStatus, DomainConnectivityResult, DomainBlockingResult,
} from '../modules/store';
import SiteButton from './SiteButton.vue';
import ProgressBar from './ProgressBar.vue';
import { useModelWrapper } from '../modules/utils';

const props = defineProps<{
  isTableExpanded: boolean
}>();

const emit = defineEmits(['update:isTableExpanded']);

const isTableExpanded = useModelWrapper(props, emit, 'isTableExpanded');

const hasProblem = computed(() => [...store.domainDataView.values()].some(
  (dataView) => dataView.connectivity === DomainConnectivityResult.FAILURE
    || dataView.blocking === DomainBlockingResult.BLOCKED,
));

const checkedSitesCount = computed(() => [...store.domainDataView.values()]
  .filter((dataView) => dataView.connectivity !== DomainConnectivityResult.CHECKING
    && dataView.connectivity !== DomainConnectivityResult.PENDING).length);

function reloadWindow() {
  window.location.reload();
}

</script>

<template>
  <div class="summary-card">
    <Transition name="slide" mode="out-in">

      <div class="summary-card__main summary-card__main--running"
        v-if="store.checkStatus === CheckStatus.RUNNING">
        <ProgressBar class="summary-card__progressbar"
          :value="checkedSitesCount / store.domainDataView.size * 100">
        </ProgressBar>
        <h2 class="summary-card__heading">{{ `${hasProblem ? 'Some issues detected' : 'Checking'}
        (${checkedSitesCount}/${store.domainDataView.size})...` }}</h2>
        <div class="summary-card__content">Depending on your network condition, this may take up to
          several minutes.</div>
        <div class="summary-card__action">
          <SiteButton @click="isTableExpanded = !isTableExpanded">{{isTableExpanded ? 'Hide data' :
          'Show data'}}</SiteButton>
        </div>
      </div>

      <div class="summary-card__main summary-card__main--ended" v-else>
        <h2 class="summary-card__heading">{{ hasProblem ? 'Some issues detected'
        : 'No issues detected' }}
        </h2>
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
          <p>However, editing from these services are forbidden. You can request IP block exemption
            for
            your account to edit under proxies.</p>
        </div>
        <div class="summary-card__action">
          <SiteButton @click="isTableExpanded = !isTableExpanded">{{isTableExpanded ? 'Hide data' :
          'Show data'}}</SiteButton>
          <SiteButton>Download data</SiteButton>
          <SiteButton @click="reloadWindow()">Rerun check</SiteButton>
        </div>
      </div>

    </Transition>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.summary-card {
  .card-normal();

  @media screen and (min-width: @site-width-narrow) {
    padding-left: 50px;
  }

  &__main {
    &--running {
      position: relative;

      .summary-card__progressbar {
        position: absolute;
        top: -20px;
      }
    }
  }

  &__heading {
    margin-bottom: 0.375em;

    @media screen and (max-width: @site-width-narrow) {
      margin-bottom: 0.5em;
    }
  }

  &__content {

    ::v-deep(p),
    ::v-deep(h3) {
      margin-bottom: 0.375em;

      @media screen and (max-width: @site-width-narrow) {
        margin-top: 0.5em;
        margin-bottom: 1em;
      }
    }
  }

  &__action {
    margin-top: 1em;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    >* {
      margin: 4px;
    }
  }

  .slide {

    &-enter-active,
    &-leave-active {
      .transition-ease-out-normal();
      transition-property: opacity, transform;
    }

    &-enter-from {
      opacity: 0;
      transform: translateX(30px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateX(-30px);
    }
  }
}
</style>

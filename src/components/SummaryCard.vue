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

function reloadWindow() {
  window.location.reload();
}

function getDomainsFriendlyDesc(domains: string[]): string {
  if (domains.length === 0) {
    return 'none';
  }
  return `${domains[0]}${domains.length >= 2 ? ` and ${domains.length - 1} more` : ''}`;
}

const inaccessibleDomains = computed(
  () => [...store.domainDataView.entries()]
    .filter(
      ([, dataView]) => dataView.connectivity === DomainConnectivityResult.FAILURE,
    )
    .map(([item]) => item),
);

const blockedDomains = computed(
  () => [...store.domainDataView.entries()]
    .filter(
      ([, dataView]) => dataView.blocking === DomainBlockingResult.BLOCKED,
    )
    .map(([item]) => item),
);

const inaccessibleDomainsDesc = computed(
  () => getDomainsFriendlyDesc(inaccessibleDomains.value),
);

const blockedDomainsDesc = computed(
  () => getDomainsFriendlyDesc(blockedDomains.value),
);

const hasProblem = computed(
  () => inaccessibleDomains.value.length + blockedDomains.value.length !== 0,
);

const checkedDomainsCount = computed(() => [...store.domainDataView.values()]
  .filter(
    (dataView) => dataView.connectivity !== DomainConnectivityResult.CHECKING
      && dataView.connectivity !== DomainConnectivityResult.PENDING,
  ).length);

const currentCheckingDomain = computed(() => (
  [...store.domainDataView.entries()]
    .reverse()
    .find(([, dataView]) => dataView.connectivity === DomainConnectivityResult.CHECKING)
  || ['']
)[0]);

</script>

<template>
  <div class="summary-card">
    <Transition name="slide" mode="out-in">

      <div class="summary-card__main summary-card__main--running"
        v-if="store.checkStatus === CheckStatus.RUNNING">
        <ProgressBar class="summary-card__progressbar"
          :value="checkedDomainsCount / store.domainDataView.size * 100">
        </ProgressBar>
        <h2 class="summary-card__heading">{{ `${hasProblem ? 'Some issues detected. ' :
        ''}Checking
        (${checkedDomainsCount}/${store.domainDataView.size})...` }}</h2>
        <div class="summary-card__content">
          <p>Depending on your network condition, this may take up to several minutes.</p>
          <p>Currently checking: {{ currentCheckingDomain }}</p>
          <p>Inaccessible domains: {{ inaccessibleDomainsDesc }}</p>
          <p>Uneditable domains: {{ blockedDomainsDesc }}</p>
        </div>
        <div class="summary-card__action">
          <SiteButton @click="isTableExpanded = !isTableExpanded">{{ isTableExpanded ? 'Hide data' :
          'Show data' }}</SiteButton>
        </div>
      </div>

      <div class="summary-card__main summary-card__main--ended" v-else>
        <h2 class="summary-card__heading">{{ hasProblem ? 'Some issues detected'
        : 'No issues detected' }}
        </h2>
        <div class="summary-card__content" v-if="hasProblem">
          <p>Your network might have some problems affecting your experience on Wikimedia sites.</p>
          <p>You cannot access: {{ inaccessibleDomainsDesc }}</p>
          <p>You cannot edit: {{ blockedDomainsDesc }}</p>
          <h3>Why did this happen?</h3>
          <p>First of all: It is not your fault!</p>
          <p>For connection disruption, this may be due to faulty networks, company network policies
            or government censorship.</p>
          <p>For IP blocks, this may be because you are using a proxy or VPN service. Using such
            services would change your IP address to theirs, which Wikimedia projects may block from
            editing to prevent vandalism.</p>
          <h3>What should I do?</h3>
          <p>Try to use proxies or VPN services to connect.</p>
          <p>To address IP blocks, please request IP block exemption for your account to get
            bypassed.</p>
        </div>
        <div class="summary-card__content summary-card__content--no-problem" v-else>
          <p>Congratulations, you are free as a bird!</p>
        </div>
        <div class="summary-card__action">
          <SiteButton @click="isTableExpanded = !isTableExpanded">{{ isTableExpanded ? 'Hide data' :
          'Show data' }}</SiteButton>
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

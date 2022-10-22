<script setup lang="ts">
import { computed, inject } from 'vue';
import Banana from 'banana-i18n';
import store, {
  CheckStatus, DomainConnectivityResult, DomainBlockingResult,
} from '../modules/store';
import SiteButton from './SiteButton.vue';
import ProgressBar from './ProgressBar.vue';
import { useModelWrapper, reloadWindow } from '../modules/utils';
import ReportGenerator from '../modules/ReportGenerator';

const props = defineProps<{
  isTableExpanded: boolean
}>();

const emit = defineEmits(['update:isTableExpanded']);

const banana = inject<Banana>('banana')!;

const isTableExpanded = useModelWrapper(props, emit, 'isTableExpanded');

function getDomainsFriendlyDesc(domains: string[]): string {
  if (domains.length === 0) {
    return banana.i18n('sc-domain-desc-none');
  }
  if (domains.length === 1) {
    return domains[0];
  }
  return banana.i18n('sc-domain-desc', domains[0], domains.length - 1);
}

function downloadData() {
  const reportGenerator = new ReportGenerator(store.domainDataView);
  reportGenerator.download();
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
        <h2 class="summary-card__heading">
          {{ $i18n(
          hasProblem ? 'sc-chk-h-err' : 'sc-chk-h',
          checkedDomainsCount,
          store.domainDataView.size
          ) }}
        </h2>
        <div class="summary-card__content">
          <p>{{ $i18n('sc-chk-desc') }}</p>
          <p>{{ $i18n('sc-chk-cur', currentCheckingDomain) }}</p>
          <p>{{ $i18n('sc-inaccessible', inaccessibleDomainsDesc) }}</p>
          <p>{{ $i18n('sc-blocked', blockedDomainsDesc) }}</p>
        </div>
        <div class="summary-card__action">
          <SiteButton :major="true" @click="isTableExpanded = !isTableExpanded">{{
          $i18n(isTableExpanded
          ? 'sc-btn-hide' : 'sc-btn-show') }}</SiteButton>
        </div>
      </div>

      <div class="summary-card__main summary-card__main--ended" v-else>
        <h2 class="summary-card__heading">{{ $i18n(hasProblem ? 'sc-end-h-err' : 'sc-end-h-np') }}
        </h2>
        <div class="summary-card__content" v-if="hasProblem">
          <p>{{ $i18n('sc-end-b-err') }}</p>
          <p>{{ $i18n('sc-total', store.domainDataView.size) }}</p>
          <p>{{ $i18n('sc-inaccessible', inaccessibleDomainsDesc) }}</p>
          <p>{{ $i18n('sc-blocked', blockedDomainsDesc) }}</p>
          <h3>{{ $i18n('sc-end-b-err-1t') }}</h3>
          <p>{{ $i18n('sc-end-b-err-1p1') }}</p>
          <p>{{ $i18n('sc-end-b-err-1p2') }}</p>
          <p>{{ $i18n('sc-end-b-err-1p3') }}</p>
          <h3>{{ $i18n('sc-end-b-err-2t') }}</h3>
          <p>{{ $i18n('sc-end-b-err-2p1') }}</p>
          <!-- Sanitization done by banana-i18n -->
          <p v-html="$i18n('sc-end-b-err-2p2')"></p>
        </div>
        <div class="summary-card__content summary-card__content--no-problem" v-else>
          <p>{{ $i18n('sc-end-b-np') }}</p>
        </div>
        <div class="summary-card__action">
          <SiteButton :major="true" @click="reloadWindow()">{{ $i18n('sc-btn-recheck') }}
          </SiteButton>
          <SiteButton @click="isTableExpanded = !isTableExpanded">{{
          $i18n(isTableExpanded ? 'sc-btn-hide' : 'sc-btn-show')
          }}</SiteButton>
          <SiteButton @click="downloadData()">{{ $i18n('sc-btn-dl') }}</SiteButton>
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
        /** FIXME: Magic value */
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

    p,
    h3 {
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
      margin: 8px;
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

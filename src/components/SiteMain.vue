<script setup lang="ts">
import { ref } from 'vue';
import store, {
  DomainConnectivityResult, DomainBlockingResult, CheckStatus,
} from '../modules/store';
import { reloadWindow } from '../modules/utils';

import SiteCard from './SiteCard.vue';
import ConnectivityChecker from '../modules/ConnectivityChecker';
import DataTable from './DataTable.vue';
import RoundButton from './RoundButton.vue';
import CheckTypeField from './CheckTypeField.vue';
import SummaryCard from './SummaryCard.vue';
import SiteButton from './SiteButton.vue';

type RawDomainList = Array<string | [string, boolean]>;

const isExtendedCheck = ref(false);
const isTableExpanded = ref(false);

function transformRawDomainList(rawDomainList: RawDomainList): Array<[string, boolean]> {
  return rawDomainList.map((item) => (typeof item === 'string' ? [item, true] : item));
}

function handleError() {
  store.checkStatus = CheckStatus.ENDED_ERROR;
}

async function check(domainList: Array<[string, boolean]>) {
  store.checkStatus = CheckStatus.RUNNING;

  domainList.forEach(([domain]) => {
    store.domainDataView.set(
      domain,
      { connectivity: DomainConnectivityResult.PENDING },
    );
  });

  const checker = new ConnectivityChecker(
    domainList,
    (domain) => {
      // dataView cannot be undefined in this case
      const dataView = store.domainDataView.get(domain)!;
      dataView.connectivity = DomainConnectivityResult.CHECKING;
    },
    (data) => {
      // dataView cannot be undefined in this case
      const dataView = store.domainDataView.get(data.domain)!;

      dataView.connectivity = data.isSuccessful
        ? DomainConnectivityResult.SUCCESS : DomainConnectivityResult.FAILURE;
      dataView.ping = data.ping;

      if (!data.isSuccessful) {
        dataView.blocking = DomainBlockingResult.UNKNOWN;
      } else if (data.isWiki) {
        if (data.isBlocked !== undefined) {
          dataView.blocking = data.isBlocked
            ? DomainBlockingResult.BLOCKED : DomainBlockingResult.NOT_BLOCKED;
        } else {
          dataView.blocking = DomainBlockingResult.UNKNOWN;
        }
      } else {
        dataView.blocking = DomainBlockingResult.NOT_A_WIKI;
      }
    },
  );

  await checker.check();
  store.checkStatus = CheckStatus.ENDED;
}

async function prepareAndCheck(prefetchAll: boolean) {
  try {
    store.checkStatus = CheckStatus.PREPARING;
    store.domainDataView.clear();
    const { default: rawList } = prefetchAll
      ? await import('../assets/sites-all.json')
      : await import('../assets/sites-std.json');
    // Must await to catch all errors
    await check(transformRawDomainList(rawList as RawDomainList));
  } catch {
    handleError();
  }
}
</script>

<template>
  <main class="site-main">

    <Transition name="site-main" mode="out-in">
      <div class="site-main__check-panel"
        v-if="[CheckStatus.NOT_RUN, CheckStatus.PREPARING].includes(store.checkStatus)">
        <RoundButton class="check-panel__button" @click="prepareAndCheck(isExtendedCheck)"
          :disabled="store.checkStatus === CheckStatus.PREPARING"
          :waiting="store.checkStatus === CheckStatus.PREPARING">{{ $i18n('btn-chk') }}
        </RoundButton>

        <CheckTypeField class="check-panel__ct-field" v-model="isExtendedCheck"></CheckTypeField>

        <SiteCard class="check-panel__info-card">
          <template #header>{{ $i18n('card-about-head') }}</template>
          <template #default>
            <p>{{ $i18n('card-about-desc-1') }}</p>
            <p>{{ $i18n('card-about-desc-2') }}</p>
            <!-- Sanitization done by banana-i18n -->
            <p v-html="$i18n('card-about-desc-3')"></p>
          </template>
        </SiteCard>
      </div>

      <SummaryCard class="site-main__summary-card" v-model:isTableExpanded="isTableExpanded"
        v-else-if="[CheckStatus.RUNNING, CheckStatus.ENDED].includes(store.checkStatus)">
      </SummaryCard>

      <SiteCard class="site-main__error-card"
        v-else-if="store.checkStatus === CheckStatus.ENDED_ERROR" type="error">
        <template #header>{{ $i18n('card-err-head') }}</template>
        <template #default>
          <div>
            {{ $i18n('card-err-desc') }}
          </div>
          <div class="error-card__buttons">
            <SiteButton :major="true" @click="reloadWindow()">{{ $i18n('sc-btn-recheck') }}
            </SiteButton>
          </div>
        </template>
      </SiteCard>
    </Transition>

    <Transition name="site-main__data-table">
      <DataTable class="site-main__data-table" v-if="isTableExpanded"></DataTable>
    </Transition>

  </main>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.site-main {
  display: flex;
  flex-direction: column;

  &__waiting-indicator {
    width: 80%;
    margin: 0 auto;
  }

  &__check-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .check-panel__button {
      margin-top: 2em;
    }

    .check-panel__ct-field {
      margin-top: 5em;
    }

    .check-panel__info-card {
      margin-top: 5em;

      @media screen and (max-width: @site-width-narrow) {
        display: none !important;
      }
    }
  }

  &__summary-card,
  &__error-card {
    margin: 5em auto;

    @media screen and (max-width: @site-width-narrow) {
      margin: 1em auto;
    }
  }

  .error-card__buttons {
    margin-top: 1em;
    text-align: center;
  }

  &__data-table {

    &-enter-active,
    &-leave-active {
      .transition-ease-out-normal();
      transition-property: opacity, transform;
    }

    &-enter-from {
      opacity: 0;
      transform: translateY(30px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
  }

  &-enter-active,
  &-leave-active {
    .transition-ease-out-normal();
    transition-property: opacity, transform;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(50%);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
}
</style>

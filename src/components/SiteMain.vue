<script setup lang="ts">
import { ref } from 'vue';
import SiteButton from './SiteButton.vue';
import SiteCard from './SiteCard.vue';
import ConnectivityChecker from '../modules/ConnectivityChecker';
import DataTable from './DataTable.vue';
import { DomainDataView, DomainCheckStatus, BlockStatus } from '../types/view-model';
import WscdProgressiveBar from './WscdProgressiveBar.vue';
import RoundButton from './RoundButton.vue';
import CheckTypeField from './CheckTypeField.vue';

type RawSiteList = Array<string | [string, boolean]>;

enum CheckStatus {
  NOT_CHECKED,
  PREFETCHING,
  CHECKING,
  ENDED,
  ENDED_ERROR,
}

const isExtendedCheck = ref(false);
const checkStatus = ref(CheckStatus.NOT_CHECKED);
const checkData = ref(new Map<string, DomainDataView>());

function transformRawSiteList(rawSiteList: RawSiteList): Array<[string, boolean]> {
  return rawSiteList.map((item) => (typeof item === 'string' ? [item, true] : item));
}

function handleError() {
  checkStatus.value = CheckStatus.ENDED_ERROR;
}

async function check(siteList: Array<[string, boolean]>) {
  checkStatus.value = CheckStatus.CHECKING;
  siteList.forEach(([domain]) => {
    checkData.value.set(
      domain,
      { status: DomainCheckStatus.PENDING },
    );
  });
  const checker = new ConnectivityChecker(
    siteList,
    (domain) => {
      // dataView cannot be undefined in this case
      const dataView = checkData.value.get(domain)!;
      dataView.status = DomainCheckStatus.CHECKING;
    },
    (data) => {
      // dataView cannot be undefined in this case
      const dataView = checkData.value.get(data.domain)!;
      dataView.status = data.isSuccessful ? DomainCheckStatus.SUCCESS : DomainCheckStatus.FAILURE;
      dataView.ping = data.ping;
      if (!data.isSuccessful) {
        dataView.blockStatus = BlockStatus.UNKNOWN;
      } else if (data.isWiki) {
        if (data.isBlocked !== undefined) {
          if (data.isBlocked) {
            dataView.blockStatus = BlockStatus.BLOCKED;
          } else {
            dataView.blockStatus = BlockStatus.NOT_BLOCKED;
          }
        } else {
          dataView.blockStatus = BlockStatus.UNKNOWN;
        }
      } else {
        dataView.blockStatus = BlockStatus.NOT_A_WIKI;
      }
    },
  );
  await checker.check();
  checkStatus.value = CheckStatus.ENDED;
}

async function prefetchAndCheck(prefetchAll: boolean) {
  try {
    checkStatus.value = CheckStatus.PREFETCHING;
    checkData.value.clear();
    const { default: rawList } = prefetchAll
      ? await import('../assets/sites-all.json')
      : await import('../assets/sites-std.json');
    // Must await to catch all errors
    await check(transformRawSiteList(rawList as RawSiteList));
  } catch {
    handleError();
  }
}
</script>

<template>
  <main class="site-main">
    <div class="site-main__check-panel">
      <RoundButton class="check-panel__button" @click="prefetchAndCheck(isExtendedCheck)">Check
      </RoundButton>
      <CheckTypeField v-model="isExtendedCheck" class="check-panel__ct-field">
      </CheckTypeField>
    </div>
    <WscdProgressiveBar class="site-main__waiting-indicator"
      v-if="checkStatus === CheckStatus.PREFETCHING">
    </WscdProgressiveBar>
    <SiteCard v-if="checkStatus === CheckStatus.ENDED_ERROR" type="error">
      <template #header>{{ $i18n('card-err-head') }}</template>
      <template #default>
        {{ $i18n('card-err-desc') }}
      </template>
    </SiteCard>
    <SiteCard class="site-main__info-card" v-if="checkStatus === CheckStatus.NOT_CHECKED">
      <template #header>{{ $i18n('card-about-head') }}</template>
      <template #default>
        <!-- HTML is sanitized by banana-i18n -->
        <span v-html="$i18n('card-about-desc')">
        </span>
      </template>
    </SiteCard>
    <DataTable :data="checkData"
      v-if="[CheckStatus.CHECKING, CheckStatus.ENDED].includes(checkStatus)">
    </DataTable>
  </main>
</template>

<style lang="less">
.site-main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__waiting-indicator {
    width: 80%;
    margin: 0 auto;
  }

  &__check-panel {
    padding: 2em 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .check-panel__ct-field {
      margin: 5em 0 0;
    }
  }

  @media screen and (max-width: 600px) {
    &__info-card {
      display: none !important;
    }
  }
}
</style>

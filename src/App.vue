<script setup lang="ts">
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import WscdButton from './components/WscdButton.vue';
import WscdCard from './components/WscdCard.vue';
import ConnectivityChecker from './modules/ConnectivityChecker';
import DataTable from './components/DataTable.vue';
import { DomainDataView, DomainCheckStatus, BlockStatus } from './types/view-model';
import WscdProgressiveBar from './components/WscdProgressiveBar.vue';

type RawSiteList = Array<string | [string, boolean]>;

enum CheckStatus {
  NOT_CHECKED,
  PREFETCHING,
  CHECKING,
  ENDED,
  ENDED_ERROR,
}

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

async function prefetchAndCheck(fetcher: () => Promise<{ default: unknown }>) {
  try {
    checkStatus.value = CheckStatus.PREFETCHING;
    checkData.value.clear();
    const { default: rawList } = await fetcher();
    // Must await to catch all errors
    await check(transformRawSiteList(rawList as RawSiteList));
  } catch {
    handleError();
  }
}
</script>

<template>
  <div class="container">
    <SiteHeader></SiteHeader>
    <main>
      <div class="button-container">
        <WscdButton @click="prefetchAndCheck(() => import('./assets/sites-std.json'))"
          :disabled="[CheckStatus.CHECKING, CheckStatus.PREFETCHING].includes(checkStatus)">
          {{ $i18n('btn-std-chk') }}</WscdButton>
        <WscdButton @click="prefetchAndCheck(() => import('./assets/sites-all.json'))"
          :disabled="[CheckStatus.CHECKING, CheckStatus.PREFETCHING].includes(checkStatus)">
          {{ $i18n('btn-ext-chk') }}</WscdButton>
      </div>
      <WscdProgressiveBar class="bar-waiting" v-if="checkStatus === CheckStatus.PREFETCHING">
      </WscdProgressiveBar>
      <WscdCard v-if="checkStatus === CheckStatus.ENDED_ERROR" type="error">
        <template #header>{{ $i18n('card-err-head') }}</template>
        <template #default>
          {{ $i18n('card-err-desc') }}
        </template>
      </WscdCard>
      <WscdCard v-if="checkStatus === CheckStatus.NOT_CHECKED">
        <template #header>{{ $i18n('card-about-head') }}</template>
        <template #default>
          <!-- HTML is sanitized by banana-i18n -->
          <span v-html="$i18n('card-about-desc')">
          </span>
        </template>
      </WscdCard>
      <DataTable :data="checkData"
        v-if="checkStatus === CheckStatus.CHECKING || checkStatus == CheckStatus.ENDED">
      </DataTable>
    </main>
    <SiteFooter></SiteFooter>
  </div>
</template>
<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

.bar-waiting {
  width: 80%;
  margin: 0 auto;
}

.button-container {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>

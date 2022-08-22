<script setup lang="ts">
const VUE_APP_VERSION = APP_VERSION;
const VUE_GIT_HASH = GIT_HASH;
</script>

<template>
  <footer>
    <img class="badge" src="../assets/toolforge.svg" alt="Powered by Toolforge">
    <a target="_blank" href="https://github.com/diskdance/wscd">{{ $i18n('footer-code') }}</a>
    <a target="_blank" href="https://github.com/diskdance/wscd/blob/master/LICENSE">{{
        $i18n('footer-license')
    }}</a>
    <span class="version">wscd {{ VUE_APP_VERSION }} ({{ VUE_GIT_HASH }})</span>
  </footer>
</template>

<style scoped lang="less">
footer {
  display: flex;
  align-items: center;
  margin: 30px 0 10px;
  padding-top: 8px;
  border-top: 1px solid #cdcdcd;
  font-size: 0.8em;
}

.version {
  color: #4e4e4e;
}

@media screen and (min-width: 401px) {

  a,
  .badge {
    margin-right: 10px;
  }

  .version {
    margin-left: auto;
  }
}

@media screen and (max-width: 400px) {
  footer {
    flex-direction: column;
  }

  a,
  span {
    margin-top: 0.214286em;
  }
}

.badge {
  display: inline-block;
  height: 30px;
  width: 90px;
}
</style>

<script setup lang="ts">
const VUE_APP_VERSION = APP_VERSION;
const VUE_GIT_HASH = GIT_HASH;
</script>

<template>
  <footer class="site-footer">
    <img class="site-footer__badge" src="../assets/toolforge.svg" alt="Powered by Toolforge">
    <a target="_blank" href="https://github.com/diskdance/wscd">{{ $i18n('footer-code') }}</a>
    <a target="_blank" href="https://github.com/diskdance/wscd/blob/master/LICENSE">{{
    $i18n('footer-license')
    }}</a>
    <span class="site-footer__version">wscd {{ VUE_APP_VERSION }} ({{ VUE_GIT_HASH }})</span>
  </footer>
</template>

<style scoped lang="less">
.site-footer {
  display: flex;
  align-items: center;
  margin: 30px 0 10px;
  padding-top: 8px;
  border-top: 1px solid #cdcdcd;
  font-size: 0.8em;

  @media screen and (max-width: 400px) {
    & {
      flex-direction: column;
    }

    a,
    span {
      margin-top: 0.214286em;
    }
  }

  @media screen and (min-width: 401px) {

    a,
    &__badge {
      margin-right: 10px;
    }

    &__version {
      margin-left: auto;
    }
  }

  &__version {
    color: #4e4e4e;
  }

  &__badge {
    display: inline-block;
    height: 30px;
    width: 90px;
  }
}
</style>

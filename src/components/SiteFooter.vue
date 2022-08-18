<script setup lang="ts">
/* global APP_VERSION */
const VUE_APP_VERSION = APP_VERSION;
</script>

<template>
  <footer>
    <a target="_blank" href="https://github.com/diskdance/wscd">{{ $i18n('footer-code') }}</a>
    <a target="_blank" href="https://github.com/diskdance/wscd/blob/master/LICENSE">{{
        $i18n('footer-license')
    }}</a>
    <span class="version">wscd {{ VUE_APP_VERSION }}</span>
  </footer>
</template>

<style scoped lang="less">
footer {
  margin: 30px 0 10px;
  padding-top: 8px;
  border-top: 1px solid #cdcdcd;
  font-size: 0.9em;
}

a {
  margin-right: 10px;
}

.version {
  float: right;
}
</style>

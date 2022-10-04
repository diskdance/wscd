<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteMain from './components/SiteMain.vue';
</script>

<template>
  <div class="site-view">
    <SiteHeader class="site-view__header"></SiteHeader>
    <SiteMain class="site-view__main"></SiteMain>
    <SiteFooter></SiteFooter>
  </div>
</template>

<style lang="less">
.site-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    margin: 0 10px;
  }

  &__main {
    flex-grow: 1;
  }
}
</style>

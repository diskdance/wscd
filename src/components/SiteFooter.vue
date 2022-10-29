<script setup lang="ts">
// Assign them to local variables to avoid TS errors
// FIXME: use a better approach
const VUE_APP_VERSION = APP_VERSION;
const VUE_GIT_HASH = GIT_HASH;
</script>

<template>
  <footer class="site-footer">
    <picture class="site-footer__badge">
      <source srcset="../assets/toolforge-dark.svg" media="(prefers-color-scheme: dark)">
      <img class="badge__image" src="../assets/toolforge.svg" :alt="$i18n('footer-badge-alt')">
    </picture>
    <div class="site-footer__text">
      <a class="site-footer__src" target="_blank" href="https://github.com/diskdance/wscd">{{
          $i18n('footer-code')
      }}</a>
      <a class="site-footer__license" target="_blank"
        href="https://github.com/diskdance/wscd/blob/master/LICENSE">{{
            $i18n('footer-license')
        }}</a>
      <span class="site-footer__version">wscd {{ VUE_APP_VERSION }} ({{ VUE_GIT_HASH }})</span>
    </div>
  </footer>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

@image-height: 30px;

.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  margin: 30px 0 10px;
  font-size: 0.8em;

  &__text {
    margin-top: 10px;
    flex: 3;
    display: flex;
    justify-content: space-around;
    white-space: nowrap;
    flex-wrap: wrap;
  }

  &__src,
  &__license,
  &__version {
    margin: 0 10px;
  }

  &__version {
    color: @color-text-secondary;
  }

  &__badge {
    margin-top: 10px;
    flex: 1;
    text-align: center;
    height: @image-height;

    .badge__image {
      display: inline-block;
      height: @image-height;
    }
  }
}
</style>

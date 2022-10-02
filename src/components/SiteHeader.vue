<template>
  <header class="site-header">
    <div class="site-header__title">wscd</div>
    <div class="site-header__desc">{{ $i18n('header-slogan') }}</div>
  </header>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.site-header {
  margin: 1em 5%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__title {
    font-weight: 700;
    flex: 1;
    min-width: 50%
  }

  &__desc {
    font-size: 80%;
    color: @color-text-secondary;
  }
}
</style>

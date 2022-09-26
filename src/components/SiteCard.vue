<script setup lang="ts">
defineProps<{
  type?: 'notice' | 'error' | 'warning',
}>();
</script>

<template>
  <div :class="['site-card', type ? `site-card--${type}` : '']">
    <div class="site-card__icon"></div>
    <div class="site-card__text">
      <div class="site-card__header">
        <slot name="header" />
      </div>
      <div class="site-card__main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.site-card {
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  margin: 0 auto;

  &__icon {
    background: url(../assets/notice.svg) no-repeat center;
    width: 1.42857143em;
    height: 1.42857143em;
  }

  &__text {
    flex: 1 1;
    margin-left: 10px;
  }

  &__header {
    font-weight: 700;
    margin-bottom: 0.75em;
  }

  &__main {
    :deep(p) {
      margin-bottom: 0.375em;
    }
  }
}

.site-card--error {
  border: 1px solid @color-error;

  .site-card__icon {
    background-image: url(../assets/error.svg);
  }
}
</style>

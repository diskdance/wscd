<script setup lang="ts">
defineProps<{
  major?: boolean,
}>();
</script>

<template>
  <button :class="[ 'site-button', { 'site-button--major': major } ]">
    <slot />
  </button>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

@normal-fg: @color-text;
@normal-bg: @color-button-normal;
@normal-bg-hover: @color-button-normal-hover;
@normal-bg-active: @color-button-normal-active;

@major-fg: #fff;
@major-bg: @color-major;
@major-bg-hover: #3677de;
@major-bg-active: #2a4b8d;

.shadow() {
  box-shadow: 0px 1px 3px fade(#000, 30%);
}

.site-button {
  .transition-ease-out-fast();
  transition-property: background-color, box-shadow;
  font-weight: 700;
  color: @normal-fg;
  background-color: @normal-bg;
  border: 0;
  border-radius: 9999px;
  padding: 0 16px;
  min-height: 40px;
  outline: 0;
  user-select: none;

  &:hover {
    .shadow();
    background-color: @normal-bg-hover;
  }

  &:active {
    .shadow();
    background-color: @normal-bg-active;
  }

  &:focus:not(:active) {
    background-color: @normal-bg-hover;
  }

  &--major {
    color: @major-fg;
    background-color: @major-bg;

    &:hover {
      background-color: @major-bg-hover;

    }

    &:active {
      background-color: @major-bg-active;
    }

    &:focus:not(:active) {
      background-color: @major-bg-hover;
    }
  }
}
</style>

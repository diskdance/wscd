<script setup lang="ts">
import ProgressIndicator from './ProgressIndicator.vue';

defineProps<{
  waiting?: boolean,
}>();
</script>

<template>
  <button :class="['round-button', { 'round-button--waiting': waiting }]" :disabled="waiting">
    <slot />
    <div class="round-button__indicator-container" v-if="waiting">
      <ProgressIndicator></ProgressIndicator>
    </div>
  </button>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.button-shadow(@offset-y, @color) {
  box-shadow: 0 @offset-y 40px @color;
}

.absolutely-fill-parent() {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.round-button {
  .transition-ease-out-fast();
  .android-chrome-no-tap-highlight();
  .button-shadow(20px, @color-shadow-normal);
  transition-property: background-color, box-shadow;
  border: 0;
  background-color: @color-major;
  border-radius: 100%;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2em;
  user-select: none;
  touch-action: manipulation;
  color: #fff;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  padding: max(7.5%, 1em);

  @supports not (padding: $padding) {
    padding: 1em;

    @media screen and (min-width: @site-width-narrow) {
      padding: 7.5%;
    }
  }

  &__indicator-container {
    .absolutely-fill-parent();

    /** Prevent Chrome showing weird focus indicators */
    overflow: hidden;
  }

  /** Make it circular */
  &::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
  }

  &:hover {
    .button-shadow(30px, @color-shadow-normal);
    background-color: #1976D2;
  }

  &:focus {
    outline: 0;

    &:not(:active) {
      .button-shadow(30px, @color-shadow-normal);
      background-color: #447ff5;
    }
  }

  &:active {
    .button-shadow(40px, @color-shadow-heavy);
    background-color: #2a4b8d;
  }

  &:not(&--waiting)::after {
    .absolutely-fill-parent();
    content: '';
    pointer-events: none;
    border-radius: 100%;
    border: 3px solid @color-major;
    animation: glow 5s ease-out infinite;
  }

  @keyframes glow {

    20% {
      transform: scale(1.75);
    }

    21%,
    to {
      transform: none;
      opacity: 0;
    }
  }
}
</style>

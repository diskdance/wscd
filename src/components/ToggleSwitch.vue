<script setup lang="ts">
import { wrapModel } from '../modules/utils';

const props = defineProps<{
  modelValue: boolean
  ariaLabel: string,
}>();

const emit = defineEmits(['update:modelValue']);

const modelValue = wrapModel(props, emit);
</script>

<template>
  <div class="toggle-switch">
    <input class="toggle-switch__input" type="checkbox" v-model="modelValue" role="switch"
      :aria-checked="modelValue" :aria-label="ariaLabel">
    <div class="toggle-switch__switch">
      <div class="toggle-switch__thumb"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';
@height: 32px;
@width: 52px;
@border-width: 2px;
@thumb-unselected-width: 16px;
@thumb-selected-width: 24px;
@thumb-active-width: 28px;

@color-inactive: #72777d;

@indicator-radius: 20px;
@indicator-focus-color: #1C1B1F;
@indicator-focus-opacity: 8%;
@indicator-active-opacity: 16%;

.indicator-shadow(@radius, @opacity) {
  box-shadow: 0px 0px 0px @radius fade(@indicator-focus-color, @opacity);
}

@selector-thumb: .toggle-switch__switch .toggle-switch__thumb;

.toggle-switch {
  /* Enable 3D acceleration */
  transform: translateZ(0);
  position: relative;

  &__switch {
    .transition-ease-out-normal();
    transition-property: background-color, border;
    position: relative;
    border: @border-width solid @color-inactive;
    border-radius: 9999px;
    width: @width;
    height: @height;

    .toggle-switch__thumb {
      .transition-ease-out-normal();
      transition-property: background-color, left, width, height, top, box-shadow;
      position: absolute;
      background-color: @color-inactive;
      border-radius: 100%;
      width: @thumb-unselected-width;
      height: $width;
      top: (@height / 2 - @border-width - $height / 2);
      left: $top;
    }
  }

  &__input {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    opacity: 0;
    width: @width;
    height: @height;

    &:hover,
    &:focus {
      +@{selector-thumb} {
        .indicator-shadow((@indicator-radius - @thumb-unselected-width / 2),
          @indicator-focus-opacity);
        background-color: #49454E;
      }
    }

    &:checked {
      &+.toggle-switch__switch {
        background-color: @color-major;
        border-color: @color-major;

        .toggle-switch__thumb {
          background-color: #fff;
          width: @thumb-selected-width;
          height: $width;
          top: (@height / 2 - @border-width - $height / 2);
          left: @width - @border-width * 2 - $top - $width;
        }
      }

      &:hover,
      &:focus {
        +@{selector-thumb} {
          .indicator-shadow((@indicator-radius - @thumb-selected-width / 2),
            @indicator-focus-opacity);
          background-color: #eaf3ff;
        }
      }

      &:active+@{selector-thumb} {
        .indicator-shadow((@indicator-radius - @thumb-active-width / 2),
          @indicator-active-opacity);
        @active-top: (@height / 2 - @border-width - @thumb-active-width / 2);
        left: @width - @border-width * 2 - @active-top - @thumb-active-width;
      }
    }

    &:active+@{selector-thumb} {
      .indicator-shadow((@indicator-radius - @thumb-active-width / 2),
        @indicator-active-opacity);
      width: @thumb-active-width;
      height: $width;
      top: (@height / 2 - @border-width - $height / 2);
      left: $top;
    }
  }
}
</style>
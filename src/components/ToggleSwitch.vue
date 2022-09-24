<script setup lang="ts">import { wrapModel } from '../modules/utils';

const props = defineProps<{
  modelValue: boolean
  ariaLabel: string,
}>();

const emit = defineEmits(['update:modelValue']);

const modelValue = wrapModel('modelValue', props, emit);
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

<style lang="less">
.toggle-switch {
  &__input {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    opacity: 0;
    width: 52px;
    height: 32px;
  }

  &__switch {
    transition-property: background-color, border;
    transition-duration: .15s;
    transition-timing-function: ease-out;
    border: 2px solid #72777d;
    border-radius: 9999px;
    overflow: hidden;
    width: 52px;
    height: 32px;
  }

  &__thumb {
    transition-property: left, width, height, top, bottom;
    transition-duration: .15s;
    transition-timing-function: ease-out;
    position: relative;
    background-color: #72777d;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    left: 6px;
    top: 6px;
    bottom: 6px;
  }

  &__input:checked+&__switch {
    background-color: #36c;
    border-color: #36c;

    .toggle-switch__thumb {
      background-color: #fff;
      left: 22px;
      width: 24px;
      height: 24px;
      top: 2px;
      bottom: 2px;
    }
  }

}
</style>

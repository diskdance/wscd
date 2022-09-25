<script setup lang="ts">
import { wrapModel } from '../modules/utils';
import ToggleSwitch from './ToggleSwitch.vue';

const props = defineProps<{
  modelValue: boolean,
}>();

const emit = defineEmits(['update:modelValue']);

const modelValue = wrapModel(props, emit);
</script>

<template>
  <div class="ct-field">
    <div class="ct-field__type">{{ $i18n('ct-field-type') }}</div>
    <div class="ct-field__value">
      <span :class="['type-label', 'type-label--left', { 'type-label--active': !modelValue }]">{{
      $i18n('ct-field-std') }}</span>
      <ToggleSwitch class="ct-field__toggle" v-model="modelValue"
        :aria-label="$i18n('ct-field-ext-check')"></ToggleSwitch>
      <span :class="['type-label', 'type-label--right', { 'type-label--active': modelValue }]">{{
      $i18n('ct-field-ext') }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.ct-field {
  font-size: 0.9em;

  &__type {
    text-align: center;
    margin-bottom: 0.5em;
    color: #4e4e4e;
  }

  &__value {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__toggle {
    transform: scale(.9);
    margin: auto 12px;
  }

  .type-label {
    opacity: 0.5;

    /* Make toggle centered */
    min-width: 20vw;

    &--active {
      opacity: 1;
    }

    &--left {
      text-align: right;
    }
  }
}
</style>

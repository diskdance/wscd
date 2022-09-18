<script setup lang="ts">
defineProps<{
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (event: 'change'): void,
  (event: 'update', id: number): void,
}>();

</script>

<template>
  <div class="ct-field">
    <div class="ct-field__type">Check type</div>
    <div class="ct-field__value">
      <span class="ct-field__std-check" @click="isExtendedCheck=true">Standard check</span>
      <span class="ct-field__ext-check">Extended check</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.ct-field {
  font-size: 0.9em;

  &__type {
    text-align: center;
    color: #4e4e4e;
    margin-bottom: 0.5em;
  }
}
</style>

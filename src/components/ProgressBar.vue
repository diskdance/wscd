<script setup lang="ts">
defineProps<{
  value: number
}>();
</script>

<template>
  <div class="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="100"
    :aria-valuenow="value">
    <div class="progressbar__active" :style="{ width: `${value}%` }"></div>
  </div>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.progressbar {
  width: 100%;

  &__active {
    .transition-ease-out-normal();
    transition-property: width;
    background-color: @color-major;
    height: 4px;
  }
}
</style>

<script setup lang="ts">
defineProps<{
  type?: 'notice' | 'error' | 'warning',
}>();
</script>

<template>
  <div :class="['card', type]">
    <div class="icon"></div>
    <div class="text">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card {
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  margin: 0 auto;

  &.error {
    border: 1px solid #D33;
  }
}

.icon {
  background: url(../assets/notice.svg) no-repeat center;
  width: 1.42857143em;
  height: 1.42857143em;

  .error & {
    background-image: url(../assets/error.svg);
  }
}

.text {
  flex: 1 1;
  margin-left: 10px;
}

.header {
  font-weight: 700;
  margin-bottom: 0.75em;
}

.main {
  :deep(p) {
    margin-bottom: 0.375em;
  }
}
</style>

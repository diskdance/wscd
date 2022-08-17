<template>
  <div class="block">
    <div class="bar"></div>
  </div>
</template>

<style scoped lang="less">
.block {
  background-color: #fff;
  border: 1px solid #a2a9b1;
  border-radius: 9999px;
  box-shadow: 0 2px 2px #0003;
  height: 16px;
  overflow-x: hidden;
  z-index: 1;
}

.bar {
  width: 33%;
  height: 100%;
  background-color: #36c;
  animation-name: animation-ltr;
  animation-duration: 1.6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes animation-ltr {
  0% {
    transform: translate(-100%);
  }

  100% {
    transform: translate(300%);
  }
}
</style>

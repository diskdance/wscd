<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="less">
button {
  color: #202122;
  border-radius: 2px;
  font-weight: 700;
  border: 1px solid #A2A9B1;
  background: #f8f9fa;
  padding: 0 0.75em;
  min-height: 32px;
  transition-property: background-color, color, border-color, box-shadow;
  transition-duration: .1s;
  outline: 1px solid transparent;

  &:enabled {
    &:hover {
      background-color: #fff;
    }

    &:active {
      background-color: #c8ccd1;
    }

    &:focus:not(:active) {
      border-color: #36c;
      box-shadow: inset 0 0 0 1px #36c;
    }
  }

  &:disabled {
    border-color: transparent;
    background-color: #c8ccd1;
    color: #fff;
  }
}
</style>

<template>
  <button class="round-button">
    <slot />
  </button>
</template>

<style scoped lang="less">
@import '../styles/mixins.less';

.round-button {
  border: 0;
  background-color: @color-major;
  border-radius: 100%;
  transition-property: background-color, box-shadow;
  transition-duration: .1s;
  transition-timing-function: ease-out;
  font-weight: 700;
  font-size: 2em;
  user-select: none;
  color: #fff;
  padding: max(7.5%, 1em);
  box-shadow: 0 20px 40px #a2a9b1;

  /** Make it circular */
  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
  }

  &:hover {
    background-color: #1976D2;
    box-shadow: 0 30px 40px #a2a9b1;
  }

  &:focus:not(:active) {
    outline: 0;
    background-color: #447ff5;
    box-shadow: 0 30px 40px #a2a9b1;
  }

  &:active {
    background-color: #2a4b8d;
    box-shadow: 0 40px 40px #72777d;
  }
}
</style>

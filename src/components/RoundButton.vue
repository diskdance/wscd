<template>
  <button class="round-button">
    <slot />
  </button>
</template>

<style lang="less">
.round-button {
  border: 0;
  background-color: #36c;
  border-radius: 100%;
  transition-property: background-color, box-shadow;
  transition-duration: .1s;
  outline: 0;
  font-weight: 700;
  font-size: 2em;
  user-select: none;
  color: #fff;
  padding: max(7.5%, 1em);
  box-shadow: 0 30px 40px #a2a9b1;

  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
  }

  &:hover {
    background-color: #1976D2;
  }

  &:focus:not(:active) {
    background-color: #2979FF;
  }

  &:active {
    background-color: #2a4b8d;
    box-shadow: 0 30px 40px 2px #72777d;
  }
}
</style>

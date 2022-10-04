<template>
  <!--
    From https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/components/VProgressCircular/VProgressCircular.tsx
    Licensed under the MIT License.
  -->
  <svg tabindex="-1" class="progress-indicator" style="transform: rotate(calc(-90deg));"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.01075268817205 43.01075268817205">
    <circle tabindex="-1" class="progress-indicator__overlay" fill="transparent" cx="50%" cy="50%"
      r="20" stroke-width="3.0107526881720434" stroke-dasharray="125.66370614359172"
      stroke-dashoffset="125.66370614359172px"></circle>
  </svg>
</template>

<style scoped lang="less">
.progress-indicator {
  pointer-events: none;
  animation: progress-indicator-rotate 1.4s linear infinite;
  transform-origin: center center;
  transition: all .2s ease-in-out;
  color: #fff;

  &__overlay {
    animation: progress-indicator-dash 1.4s ease-in-out infinite;
    stroke-dasharray: 25, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke: currentColor;
    transition: all .2s ease-in-out, stroke-width 0s;
    z-index: 2;
  }

  @keyframes progress-indicator-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }

    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15px;
    }

    to {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes progress-indicator-rotate {
    to {
      transform: rotate(270deg);
    }
  }
}
</style>

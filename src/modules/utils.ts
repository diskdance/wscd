/* eslint-disable import/prefer-default-export */
function resolveAfter(ms: number) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

export { resolveAfter };

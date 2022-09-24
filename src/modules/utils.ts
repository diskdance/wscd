import { computed, WritableComputedRef } from 'vue';

function resolveAfter(ms: number) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

/**
 * Return a computed property that returns the corresponding prop value when is accessed
 * and fires an event when is set. Used with v-model.
 * @param name name of the prop
 * @param props props field of a component
 * @param emit emit function of a component
 * @return wrapped computer property
 */
function wrapModel<T extends string, U>(
  name: T,
  props: Record<T, U> & Record<string, unknown>,
  emit: (event: `update:${T}`, value: U, ...otherArgs: unknown[]) => void,
)
  : WritableComputedRef<U> {
  return computed({
    get() {
      return props[name];
    },
    set(value) {
      emit(`update:${name}`, value);
    },
  });
}

export { resolveAfter, wrapModel };

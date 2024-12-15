import { ref, computed } from 'vue';
const index = ref(0);
export function useZIndex(initIndex = 2000) {
  const initZIndex = ref(initIndex);
  const currentZIndex = computed(() => initZIndex.value + index.value);
  function getNextZIndex() {
    return initZIndex.value + (index.value++);
  }

  return {
    getNextZIndex,
    currentZIndex,
    initZIndex,
  };
}

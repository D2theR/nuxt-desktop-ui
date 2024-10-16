// composables/useZIndex.js
import { ref } from "vue";

const highestZIndex = ref(1);

export function useZIndex() {
  const zIndex = ref(highestZIndex.value);

  function bringToFront() {
    highestZIndex.value += 1;
    zIndex.value = highestZIndex.value;
  }

  return { zIndex, bringToFront };
}

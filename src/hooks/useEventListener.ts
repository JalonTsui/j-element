import { onMounted, onUnmounted, isRef, watch, unref } from 'vue';
import type { Ref, WatchHandle } from 'vue';

export function useEventListener(
  target: EventTarget | Ref<EventTarget | null | undefined>,
  event: string,
  handler: (e: Event) => any) {
  let watchHandler: WatchHandle | null;
  if (isRef(target)) {
    watchHandler = watch(target, (newValue, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      newValue?.addEventListener(event, handler);
    });
  }
  else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler);
    if (watchHandler) watchHandler.stop();
  });
}

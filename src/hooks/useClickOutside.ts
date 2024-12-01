import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

/**
 * 指定一个dom区域，当点击此dom区域以外的dom时，触发对应回调
 * @param containerNode 对应的dom，只适配了vue，没有做原生适配
 * @param cb 触发回调
 * @returns 处理回调的函数
 */
export function useClickOutside(containerNode: Ref<HTMLElement | null>,
  cb: () => void) {
  function handler(targetNode: HTMLElement) {
    if (containerNode.value && targetNode) {
      if (!containerNode.value.contains(targetNode)) {
        cb();
      }
    }
  }
  const fn = (e: MouseEvent) => handler(e.target as HTMLElement);
  onMounted(() => {
    window.addEventListener('click', fn);
  });
  onUnmounted(() => {
    window.removeEventListener('click', fn);
  });
  return handler;
}

<script lang="ts" setup>
import type { ToolTipEmits, ToolTipProps, ToolTipInstance } from './types';
import { computePosition, flip, shift, arrow, offset } from '@floating-ui/vue';
import { ref, onMounted, watchEffect } from 'vue';

defineOptions({
  name: 'JtToopTip',
});

const triggerRef = ref<null | HTMLElement>(null);
const popperRef = ref<null | HTMLElement>(null);
const arrowRef = ref<null | HTMLElement>(null);
const placement = ref<'top' | 'right'>('top');
setTimeout(() => {
  placement.value = 'right';
  console.log(placement.value);
}, 2000);

onMounted(() => {
  if (triggerRef.value && popperRef.value && arrowRef.value) {
    const triggerDom = triggerRef.value as HTMLDivElement;
    const popperDom = popperRef.value as HTMLDivElement;
    const arrowDom = arrowRef.value as HTMLDivElement;
    watchEffect(() => {
      computePosition(triggerDom, popperDom, {
        placement: placement.value,
        middleware: [flip(), offset(10), shift({ padding: 2 }), arrow({ element: arrowDom })],
      })
        .then(({ x, y, placement, middlewareData }) => {
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]] || '';

          const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

          Object.assign(popperDom.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          Object.assign(arrowDom.style, {
            left: arrowX ? `${arrowX}px` : '',
            top: arrowY ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
        });
    });
  }
});

const props = defineProps<ToolTipProps>();
defineEmits<ToolTipEmits>();
defineExpose<ToolTipInstance>({
  show() {},
  hide() {},
});
</script>
<template>
  <div class="jt-tooltip">
    <div
      ref="triggerRef"
      class="jt-tooltip__trigger"
    >
      <slot />
    </div>
    <div
      ref="popperRef"
      class="jt-tooltip__popper"
    >
      <slot name="content">
        {{ props.content }}
      </slot>
      <div
        ref="arrowRef"
        class="jt-tooltip__arrow"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>

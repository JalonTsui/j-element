<script lang="ts" setup>
/**
 * 1. 怎么实现点击非popper位置的时候自动弹出
 * 2. 点击按钮的时候不会收回去
 * 3. 使用debounce函数，延时触发，解决hover因为快速切换，导致无法悬浮到popper提示位置的问题
 */
import type { ToolTipEmits, ToolTipProps, ToolTipInstance } from './types';
import { flip, shift, offset } from '@floating-ui/vue';
import { computed, ref } from 'vue';
import { useOutting } from '@/hooks/useOutting';
import { useFloating } from '@/hooks/useFloating';
import { debounce } from 'lodash-es';
defineOptions({
  name: 'JtToopTip',
});

const props = withDefaults(defineProps<ToolTipProps>(), {
  trigger: 'click',
});
const emits = defineEmits<ToolTipEmits>();

const triggerRef = ref<null | HTMLElement>(null);
const popperRef = ref<null | HTMLElement>(null);
const arrowRef = ref<null | HTMLElement>(null);
const tooltipContainerRef = ref<null | HTMLElement>(null);

const { options, isShow } = useFloating(triggerRef, popperRef, {
  arrowNode: arrowRef,
  placement: 'right',
  middleware: [flip(), shift({ padding: 0 }), offset(8)],
});

useOutting(tooltipContainerRef, () => debounceTogglePopper(false));

const triggerZoneEvents = computed(() => {
  if (props.trigger === 'click') {
    return {
      click: () => {
        debounceTogglePopper(!isShow.value);
      },
    };
  }
  else {
    return {};
  }
});

const containerZoneEvents = computed(() => {
  if (props.trigger === 'click') {
    return {};
  }
  else {
    return {
      mouseenter: () => debounceTogglePopper(true),
      mouseleave: () => {
        debounceTogglePopper(false);
      },
    };
  }
});

const debounceTogglePopper = debounce(togglePopper, 60);

function togglePopper(value: boolean) {
  isShow.value = value;
  emits('visible-change', value);
}

defineExpose<ToolTipInstance>({
  show() {},
  hide() {},
});
</script>
<template>
  <div
    ref="tooltipContainerRef"
    class="jt-tooltip"
    v-on="containerZoneEvents"
  >
    <div
      ref="triggerRef"
      class="jt-tooltip__trigger"
      v-on="triggerZoneEvents"
    >
      <slot />
    </div>
    <div
      v-show="isShow"
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

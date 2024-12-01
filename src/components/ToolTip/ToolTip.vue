<script lang="ts" setup>
/**
 * 1. 怎么实现点击非popper位置的时候自动弹出
 * 2. 点击按钮的时候不会收回去
 * 3. 使用debounce函数，延时触发，解决hover因为快速切换，导致无法悬浮到popper提示位置的问题
 */
import type { ToolTipEmits, ToolTipProps, ToolTipInstance } from './types';
import { flip, shift, offset } from '@floating-ui/vue';
import { computed, ref, watch } from 'vue';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useFloating } from '@/hooks/useFloating';
import { debounce } from 'lodash-es';
defineOptions({
  name: 'JtToopTip',
});

const props = withDefaults(defineProps<ToolTipProps>(), {
  trigger: 'click',
  placement: 'bottom',
  delay: 60,
  transition: 'fade',
  color: 'dark',
});
const emits = defineEmits<ToolTipEmits>();

const triggerRef = ref<null | HTMLElement>(null);
const popperRef = ref<null | HTMLElement>(null);
const arrowRef = ref<null | HTMLElement>(null);
const tooltipContainerRef = ref<null | HTMLElement>(null);

const { options, isShow } = useFloating(triggerRef, popperRef, {
  arrowNode: arrowRef,
  placement: props.placement,
  middleware: [flip(), shift({ padding: 0 }), offset(8)],
});

watch(() => props.placement, (v) => {
  options.placement = v;
});

const debounceTogglePopper = debounce(togglePopper, props.delay);

useClickOutside(tooltipContainerRef, () => {
  if (props.manual) {
    return;
  }
  debounceTogglePopper(false);
});

const triggerZoneEvents = computed(() => {
  if (props.manual) {
    return {};
  }
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
  if (props.manual) {
    return {};
  }
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

function togglePopper(value: boolean) {
  isShow.value = value;
  emits('visible-change', value);
}

defineExpose<ToolTipInstance>({
  show: () => debounceTogglePopper(true),
  hide: () => debounceTogglePopper(false),
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
    <Transition :name="props.transition">
      <div
        v-show="isShow"
        ref="popperRef"
        :data-popper-placement="props.placement"
        class="jt-tooltip__popper"
        :class="{
          [`jt-tooltip__popper__dark`]: props.color === 'dark'
        }"
      >
        <slot name="content">
          {{ props.content }}
        </slot>
        <div
          ref="arrowRef"
          class="jt-tooltip__arrow"
        />
      </div>
    </Transition>
  </div>
</template>
<style lang="scss"></style>

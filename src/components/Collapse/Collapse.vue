<script lang="ts" setup>
import type { CollapseEmits, CollapseType } from './types';
import { collapseInjectKey } from './types';
import { computed, provide, watch } from 'vue';
defineOptions({ name: 'JtCollapse' });
const emits = defineEmits<CollapseEmits>();
const props = withDefaults(defineProps<CollapseType>(), {
  accordion: false,
});
const activeList = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
watch(() => props.modelValue, () => {
  if (props.accordion && props.modelValue.length > 1) {
    console.warn('accordion model: activeList length must be 1');
    activeList.value = props.modelValue.slice(0, 1);
  }
}, { immediate: true });
provide(collapseInjectKey, {
  activeList,
  changeActiveList(activeName) {
    if (!props.accordion) {
      if (!activeList.value.includes(activeName)) {
        activeList.value = [...activeList.value, activeName];
      }
      else {
        activeList.value = activeList.value.filter(item => item !== activeName);
      }
      return;
    }
    if (activeList.value.includes(activeName)) {
      activeList.value = [];
      return;
    }
    activeList.value = [activeName];
  },
});
</script>
<template>
  <div class="jt-collapse">
    <slot />
  </div>
</template>
<style lang="scss">
</style>

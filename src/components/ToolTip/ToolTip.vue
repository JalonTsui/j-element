<script lang="ts" setup>
import type { ToolTipEmits, ToolTipProps, ToolTipInstance } from './types';
defineOptions({
  name: 'JtToopTip',
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
    <div class="jt-tooltip__trigger">
      <slot />
    </div>
    <div class="jt-tooltip__popper">
      <slot name="content">
        {{ props.content }}
      </slot>
    </div>
  </div>
</template>
<style lang="scss"></style>

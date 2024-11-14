<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
const _ref = ref<HTMLButtonElement | null>(null);
defineOptions({ name: 'JtButton' });
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
});
defineExpose({
  ref: _ref
});
</script>
<template>
  <button
    ref="_ref"
    class="jt-button"
    :class="{
      [`jt-button--${type}`]: type,
      [`jt-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-disabled': disabled,
      'is-circle': circle,
    }"
    :type="props.nativeType"
    :disabled="disabled"
    :autofocus="autofocus"
  >
    <span>
      <slot />
    </span>
  </button>
</template>
<style lang="scss"></style>
<script setup lang="tsx">
import { ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from "../Icon/Icon.vue";
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
      'is-loading': loading
    }"
    :type="props.nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
  >
    <Icon
      v-if="loading"
      icon="spinner"
      spin
    />
    <Icon
      v-if="icon"
      :icon="icon"
    />
    <span>
      <slot />
    </span>
  </button>
</template>
<style lang="scss"></style>
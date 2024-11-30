<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconProps } from './types';
import { computed } from 'vue';
defineOptions({
  name: 'JtIcon',
  inheritAttrs: false, // 阻止属性直接透传到跟标签
});

const props = defineProps<IconProps>();
const customStyle = computed(() => props.color ? { color: props.color } : {});
</script>
<template>
  <i
    class="jt-icon"
    :class="{
      [`jt-icon--${props.type}`]: props.type
    }"
    :style="customStyle"
    v-bind="$attrs"
  >
    <!-- $attrs当禁用透传的时候，又需要把一些非props的属性传下来 -->
    <FontAwesomeIcon
      v-bind="$props"
    />
  </i>
</template>
<style lang="scss"></style>

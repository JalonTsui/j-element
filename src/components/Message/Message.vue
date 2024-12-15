<template>
  <div
    v-show="visable"
    class="jt-message"
    :class="{
      [`jt-message--${props.type}`]: props.type,
      'is-close':props.showClose
    }"
    role="alert"
  >
    <div class="jt-message__content">
      <slot>
        <RenderVnode
          v-if="props.message"
          :v-node="props.message"
        />
      </slot>
    </div>
    <div
      v-if="props.showClose"
      class="jt-message__close"
    >
      <Icon
        icon="xmark"
        @click.stop="visable = false"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MessageProps } from './types';
import { RenderVnode } from '@/utils/renderVnode';
import Icon from '@/components/Icon/Icon.vue';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'JtMessage',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
});

const visable = ref(false);

onMounted(() => {
  visable.value = true;
  startTime();
});

function startTime() {
  if (props.duration === 0) {
    return;
  }
  setTimeout(() => {
    visable.value = false;
  }, props.duration);
}
</script>
<style lang="scss">
.jt-message {
    width: max-content;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border: 1px solid blue;
    z-index: 2000;
    display: inline-flex;

    .jt-message__content {
        margin-right: 10px;
    }
}
</style>

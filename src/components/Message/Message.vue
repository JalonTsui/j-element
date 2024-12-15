<template>
  <Transition
    :name="transitionName"
    @after-leave="handleLeave"
    @enter="handleEnter"
  >
    <div
      v-show="visable"
      ref="messageRef"
      class="jt-message"
      :class="{
        [`jt-message--${props.type}`]: props.type,
        'is-close':props.showClose,
      }"
      :style="cssStyle"
      role="alert"
      @mouseenter="stopTime"
      @mouseleave="startTime"
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
          @click.stop="close()"
        />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import type { MessageProps, MessageExpose } from './types';
import { RenderVnode } from '@/utils/renderVnode';
import Icon from '@/components/Icon/Icon.vue';
import { computed, onMounted, ref } from 'vue';
import { getLastBottomOffset } from './method';
import { useEventListener } from '@/hooks/useEventListener';

defineOptions({
  name: 'JtMessage',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
});

const visable = ref(false);
const messageRef = ref<HTMLDivElement | null>();
useEventListener(document, 'keydown', (e) => {
  if ((e as KeyboardEvent).code === 'Escape') {
    close();
  }
});
// 当前message的高度
const height = ref(0);
// 上一个message底边的top值
const lastBottomOffset = computed(() => getLastBottomOffset(props.id));
// 当前message的Top值
const messageTop = computed(() => lastBottomOffset.value + props.offset);
// 当前message底边的top值
const bottomOffset = computed(() => messageTop.value + height.value);
const cssStyle = computed(() => ({
  top: messageTop.value + 'px',
  zIndex: props.zIndex,
}));
let timeout: any;

onMounted(() => {
  visable.value = true;
  startTime();
});

function startTime() {
  if (props.duration === 0) {
    return;
  }
  timeout = setTimeout(() => {
    close();
  }, props.duration);
}

function stopTime() {
  clearTimeout(timeout);
}

function close() {
  visable.value = false;
}

function handleLeave() {
  props.onDestory();
}

function handleEnter() {
  updateHeight();
}

function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}

defineExpose<MessageExpose>({
  bottomOffset: bottomOffset,
  close,
});
</script>

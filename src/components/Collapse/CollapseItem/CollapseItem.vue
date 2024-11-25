<script lang="ts" setup>
import type {ItemType} from "./types";
import {collapseInjectKey} from "../types";
import {computed,inject} from "vue";
import Icon from "../../Icon/Icon.vue";
defineOptions({name:'JtCollapseItem'});
const props = withDefaults(defineProps<ItemType>(),{
  title:'default',
  disable:false
});
const collapseInject = inject(collapseInjectKey);
const isActive = computed(()=>collapseInject?.activeList.value.includes(props.name));
function handleClick(){
  if(props.disable)return;
  collapseInject?.changeActiveList(props.name);
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.transition = 'height 0.3s';
  },
  afterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
  beforeLeave(el) { 
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(el) {
    el.style.height = '0px';
    el.style.transition = 'height 0.3s';
  },
  afterLeave(el) {
    el.style.height = '';
    el.style.overflow = '';
  }

};
</script>
<template>
  <div class="jt-collapse-item">
    <div
      :id="`jt-collapse-item__header-${name}`"
      class="jt-collapse-item__header"
      :class="{
        'is-disabled':disable,
        'is-active':isActive
      }"
      @click="handleClick"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <Icon
        icon="angle-up"
        class="header-angle"
      />
    </div>
    <Transition
      name="slice"
      v-on="transitionEvents"
    >
      <div
        v-show="isActive"
        class="jt-collapse-item__wrapper"
      >
        <div
          :id="`jt-collapse-item__content-${name}`"
          class="jt-collapse-item__content"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss">
</style>
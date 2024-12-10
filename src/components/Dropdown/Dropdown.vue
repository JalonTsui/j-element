<template>
  <div class="jt-dropdown">
    <ToopTip
      v-bind="$attrs"
      ref="tooptipRef"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="jt-dropdown__menu">
          <template
            v-for="item in props.menuOptions"
            :key="item.key"
          >
            <li
              :id="`dropdown-item-${item.key}`"
              :class="{'is-disabled':item.disabled}"
              class="jt-dropdown__item"
              @click="itemClick(item)"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </ToopTip>
  </div>
</template>
<script lang="ts" setup>
import type { DropdownProps, DropdownEmits, DropdownExpose, MenuOption } from './types';
import type { ToolTipInstance } from '@/components/ToolTip/types';
import ToopTip from '@/components/ToolTip/ToolTip.vue';
import { RenderVnode } from '@/utils/renderVnode';
import { ref } from 'vue';

defineOptions({
  name: 'JtDropdown',
  inheritAttrs: false,
});
const props = defineProps<DropdownProps>();
const emits = defineEmits<DropdownEmits>();

const tooltipRef = ref<null | ToolTipInstance>(null);

function visibleChange(e: boolean) {
  emits('visible-change', e);
}

function itemClick(option: MenuOption) {
  if (option.disabled) {
    return;
  }
  emits('select', option);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
}

defineExpose<DropdownExpose>({
  hide: () => tooltipRef.value?.hide(),
  show: () => tooltipRef.value?.show(),
});
</script>
<style lang="scss"></style>

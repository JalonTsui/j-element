<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import type { ButtonInstance } from '@/components/Button/types';
import { onMounted, ref } from 'vue';
import Collapse from "@/components/Collapse/Collapse.vue";
import CollapseItem from "@/components/Collapse/CollapseItem/CollapseItem.vue";
import Icon from "@/components/Icon/Icon.vue";
const _ref = ref<ButtonInstance | null>(null);
onMounted(() => {
  if (_ref.value) {
    console.log(_ref.value.ref);
  }
});
const activeList = ref(['1','2','3']);
</script>
<template>
  <div>
    <Icon
      icon="user-secret"
      size="10x"
      :type="'warning'"
    />
    <div>
      <Button
        type="primary"
        disabled
        circle
      >
        Button
      </Button>
      <Button
        type="danger"
        round
      >
        Button
      </Button>
      <Button
        type="info"
        disabled
      >
        Button
      </Button>
      <Button
        type="success"
        disabled
      >
        Button
      </Button>
      <Button
        type="warning"
      >
        Button
      </Button>
    </div>
    <div>
      <Collapse
        v-model:model-value="activeList"
        :accordion="true"
      >
        <CollapseItem
          :name="'1'"
          :is-active="true"
        >
          <template #title>
            test1-title
          </template>
          <div>test1-content</div>
          <div>test1-content</div>
          <div>test1-content</div>
          <div>test1-content</div>
        </CollapseItem>
        <CollapseItem
          :name="'2'"
          :disable="true"
        >
          <template #title>
            test2
          </template>
          <div>test2</div>
        </CollapseItem>
        <CollapseItem :name="'3'">
          <template #title>
            test3
          </template>
          <div>test23</div>
        </CollapseItem>
      </Collapse>
    </div>
  </div>
</template>
<style lang="scss">
.j-element {
  color: red;
}
</style>
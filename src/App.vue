<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import type { ButtonInstance } from '@/components/Button/types';
import { onMounted, ref } from 'vue';
const _ref = ref<ButtonInstance | null>(null);
onMounted(() => {
  if (_ref.value) {
    console.log(_ref.value.ref);
  }
});
</script>
<template>
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
</template>
<style lang="scss">
.j-element {
  color: red;
}
</style>
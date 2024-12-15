<template>
  <Button @click="handleClick">
    show message
  </Button>
</template>
<script lang="ts" setup>
import { message } from '@/components/Message';
import Button from '@/components/Button';

let a = 1;

function handleClick() {
  message({
    message: `${a++}`,
    duration: 0,
    type: 'success',
    showClose: true,
  });
}
</script>

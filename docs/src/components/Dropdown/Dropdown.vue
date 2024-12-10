<template>
  <div>
    <Dropdown
      :menu-options="menuOptions"
      trigger="hover"
    >
      <div>click me</div>
    </Dropdown>
  </div>
</template>
<script lang="tsx" setup>
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import type { MenuOption } from '@/components/Dropdown/types';
const menuOptions: MenuOption[] = [{
  label: <div>123</div>,
  key: 1,
}, {
  label: 'niaho',
  key: 2,
}];
</script>

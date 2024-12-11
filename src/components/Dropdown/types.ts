import type { VNode } from 'vue';
import type { ToolTipProps } from '@/components/ToolTip/types';

export interface DropdownProps extends ToolTipProps {
  menuOptions: MenuOption[];
  hideAfterClick?: boolean;
}

export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
}

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'select', value: MenuOption): void;
}

export interface DropdownExpose {
  show: () => void;
  hide: () => void;
}

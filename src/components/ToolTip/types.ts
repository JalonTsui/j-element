import type { Placement } from '@floating-ui/vue';
// 属性
export interface ToolTipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  manual?: boolean;
  placement?: Placement;
  delay?: number;
  transition?: string;
  color?: 'dark' | 'light';
}

// 事件
export interface ToolTipEmits {
  (e: 'visible-change', value: boolean): void;
}

// 实例(暴露出去什么方法)
export interface ToolTipInstance {
  show: () => void;
  hide: () => void;
}

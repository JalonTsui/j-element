import type { VNode } from 'vue';

export type MessageType = 'success' | 'info' | 'warning' | 'danger';

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  zIndex?: number;
  type?: MessageType;
}

export interface MessageEmits {}

export interface MessageExpose {
  close: () => void;
}

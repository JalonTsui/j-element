import type { Ref, VNode } from 'vue';

export type MessageType = 'success' | 'info' | 'warning' | 'danger';

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  zIndex: number;
  type?: MessageType;
  onDestory: () => void;
  offset?: number; // message之间的间距
  id: string;
  transitionName?: string;
}

export interface MessageEmits {}

export interface MessageExpose {
  close: () => void;
  bottomOffset: Ref<number>;
}

export type CreateMessageType = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>;

export interface MessageInstance {
  id: string;
  props: MessageProps;
  node: VNode;
  close: () => void;
}

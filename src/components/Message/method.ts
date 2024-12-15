import type { CreateMessageType, MessageInstance } from './types';
import MessageConstructor from './Message.vue';
import { h, render, shallowReactive } from 'vue';
import { useZIndex } from '@/hooks/useZIndex';

let seed = 1;
const instances: MessageInstance[] = shallowReactive([]);
const { getNextZIndex } = useZIndex();

export function message(props: CreateMessageType) {
  const container = document.createElement('div');

  const messageInstance = createMessageInstance(props, container);

  render(messageInstance.node, container);

  document.body.appendChild(container.firstChild!);

  return messageInstance;
}

function createMessageInstance(props: CreateMessageType, container: HTMLElement) {
  const id = `messageInstance_${seed++}`;

  const onDestory = () => {
    const index = instances.findIndex(item => item.id === id);
    if (index > -1) {
      instances.splice(index, 1);
    }
    render(null, container);
  };

  const manualDestory = () => {
    const index = instances.findIndex(item => item.id === id);
    if (index > -1) {
      instances[index].node.component?.exposed?.close();
    }
  };

  const newProps = {
    ...props,
    onDestory,
    id,
    zIndex: getNextZIndex(),
  };

  const _messageInstance = h(MessageConstructor, newProps);

  const messageInstance: MessageInstance = {
    id,
    node: _messageInstance,
    props: newProps,
    close: manualDestory,
  };

  instances.push(messageInstance);

  return messageInstance;
}

// 返回当前instance的上一个instance
export function getLastMessageInstance() {
  return instances[instances.length - 2];
}

// 获取上一个instance的top值
export function getLastBottomOffset(id: string) {
  const index = instances.findIndex(item => item.id === id);
  if (index <= 0) {
    return 0;
  }
  return instances[index - 1].node.component?.exposed?.bottomOffset.value;
}

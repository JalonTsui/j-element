import type { App } from 'vue';
import Message from './Message.vue';
import { message } from './method';

Message.install = (app: App) => {
  app.component(Message.name!, Message);
};

export default Message;

export { message };

export * from './types';

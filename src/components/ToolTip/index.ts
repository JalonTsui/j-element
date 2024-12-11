import type { App } from 'vue';
import ToolTip from './ToolTip.vue';

ToolTip.install = (app: App) => {
  app.component(ToolTip.name, ToolTip);
};

export default ToolTip;

export * from './types';

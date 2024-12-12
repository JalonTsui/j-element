import type { App } from 'vue';
import _Collapse from './Collapse.vue';
import _CollapseItem from './CollapseItem/CollapseItem.vue';

_Collapse.install = (app: App) => {
  app.component(Collapse.name!, Collapse);
};

_CollapseItem.install = (app: App) => {
  app.component(Collapse.name!, Collapse);
};

export const Collapse = _Collapse;
export const CollapseItem = _CollapseItem;

export * from './types';
export * from './CollapseItem/types';

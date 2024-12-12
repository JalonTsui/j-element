import type { App } from 'vue';
import Button from '@/components/Button';
import { Collapse, CollapseItem } from '@/components/Collapse';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';
import ToolTip from '@/components/ToolTip';
import '@/styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const components = [
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Icon,
  ToolTip,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export {
  install,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Icon,
  ToolTip,
};

export default {
  install,
};

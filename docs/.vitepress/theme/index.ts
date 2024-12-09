import type { App } from 'vue';
import DefaultTheme from 'vitepress/theme';

// vitepress-demo-preview
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';

// 项目的全部自定义样式
import '@/styles/index.scss';

// fortawesome样式
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './reset.css';

library.add(fas);

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('DemoPreview', ElementPlusContainer);
  },
};

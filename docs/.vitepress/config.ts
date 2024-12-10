import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';

const rootPath = resolve(__dirname, '../', 'src'); // vitepress根目录
const projectRootPath = resolve(__dirname, '../', '../', 'src'); // 项目根目录

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: rootPath,
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': projectRootPath,
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 上方导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    // 侧边栏
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Basic',
        items: [
          { text: 'Button', link: '/components/Button/Button' },
          { text: 'Dropdown', link: '/components/Dropdown/Dropdown' },
        ],
      },
    ],

    // nav右上角链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});

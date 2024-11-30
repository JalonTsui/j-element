import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
// eslint插件 https://eslint.style/rules/default/semi
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "eslint.config.js"],
  },

  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  ...compat.config({
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }),
  stylistic.configs.customize({
    semi: true,
  }),
  {
    rules: {
      "vue/multi-word-component-names": 0, // 取消vue组件命名要求单词之间必须使用驼峰命名法
      indent: ["error", 2], // 2 表示使用 2 个空格
      "@typescript-eslint/no-explicit-any": 1,
      "vue/block-lang": 0,
      "@typescript-eslint/no-empty-object-type": 1, // 自定义接口不能为空
    }
  },
];

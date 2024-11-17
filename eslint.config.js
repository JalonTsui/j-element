import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  {
    rules: {
      semi: 2, // 要求使用分号结尾
      "vue/multi-word-component-names": 0, // 取消vue组件命名要求单词之间必须使用驼峰命名法
      indent: ["error", 2], // 2 表示使用 2 个空格
      "@typescript-eslint/no-explicit-any": 1
    },
  },
];

import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { resolve } from 'path';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals:true,
    // alias:{
    //   "$test":resolve(__dirname,"./mocks/$test.ts")
    // }
  },
}));
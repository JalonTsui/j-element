import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    // alias:{
    //   "$test":resolve(__dirname,"./mocks/$test.ts")
    // }
    environment: 'jsdom',
  },
}));

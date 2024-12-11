import '@/styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import JT from './index';

library.add(fas);

const app = createApp(App);

app.use(JT);
app.mount('#app');

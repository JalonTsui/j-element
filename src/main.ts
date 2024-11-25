import '@/styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import {library} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);

const app = createApp(App);

app
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');
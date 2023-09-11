import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIcons } from './assets/font-awesome';

library.add(...faIcons);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');

 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'  
import FlashMessage from '@smartweb/vue-flash-message'; 
Vue.use(FlashMessage);
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios' 
Vue.prototype.$http = axios 
Vue.prototype.$token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaGFtbGV0LnBheWZpbGwuY29cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDAyNzk2NjIsImV4cCI6MTYwMTQ4OTI2MiwibmJmIjoxNjAwMjc5NjYyLCJqdGkiOiJ5a2JtZE9WVjdqemtHMkdWIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.xPepE9px4JUzCgFIUknij5Qs0zyt-tr85lORHiVC2BI" 
Vue.config.productionTip = false
Vue.prototype.$baseApi = 'https://hamlet.payfill.co/api/admin';
Vue.prototype.$rootApi = 'https://hamlet.payfill.co/api';
Vue.prototype.$rootDomain = 'https://hamlet.payfill.co';
Vue.use(ArgonDashboard) 
new Vue({ 
  router,
  store,
  render: h => h(App)
}).$mount('#app')

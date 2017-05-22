import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Watch from './Watch.vue'
import Home from './Home.vue'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
   { path: '/:lesson/:type/:num', component: Watch },
   { path: '/', component: Home }
]

const router = new VueRouter({
   routes: routes,
   mode: 'history'
})
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

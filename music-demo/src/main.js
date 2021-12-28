import Vue from 'vue'
import App from './App.vue'
import "./mobile/flexible" //适配
import "./styles/reset.css"//初始化样式
import router from './router/index.js'


import { Tabbar, TabbarItem, NavBar, Col, Row,Image as VanImage, Cell, Icon, Search, List} from 'vant';

// import {recommendMusicAPI} from '@/api'
// async function fn(){
//   const res = await recommendMusicAPI()
//   console.log(res);
// }
// fn()

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

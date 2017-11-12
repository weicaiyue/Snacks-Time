import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$ajax = axios;
Vue.filter('formatMoney',function(value){
	return '￥' +value.toFixed(2);
});
Vue.filter('formatQuantity',function(num){
	return 'X'+num;
});
new Vue({
  el: '#app',
  render: h => h(App)
})
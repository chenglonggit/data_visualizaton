/**
 * @createDate: 2019/11/15
 * @author: wen_dell
 * @email: wendell.chen@chinaentropy.com
 * **/
import Vue from 'vue';
import App from './App';
import router from '@/router/index';
import store from '@/store/index';
// echarts
import Echarts from 'echarts'
import 'echarts/map/js/china.js'
Vue.prototype.$echarts=Echarts;
// 颜色选择器
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker);
// element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$store=store;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

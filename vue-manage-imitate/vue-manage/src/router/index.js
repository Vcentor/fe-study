import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children: [{
    	path: '',
    	component: home,
    	meta: [],
  	},{
  		path: '/addShop',
  		component: addShop,
  		meta: ['添加数据', '添加商铺'],
  	},{
  		path: '/addGoods',
  		component: addGoods,
  		meta: ['添加数据', '添加商品'],
  	},{
  		path: '/userList',
  		component: userList,
  		meta: ['数据管理', '用户列表'],
  	},{
  		path: '/shopList',
  		component: shopList,
  		meta: ['数据管理', '商家列表'],
  	},{
  		path: '/foodList',
  		component: foodList,
  		meta: ['数据管理', '食品列表'],
  	},{
  		path: '/orderList',
  		component: orderList,
  		meta: ['数据管理', '订单列表'],
  	},{
  		path: '/adminList',
  		component: adminList,
  		meta: ['数据管理', '管理员列表'],
  	},{
  		path: '/visitor',
  		component: visitor,
  		meta: ['图表', '用户分布'],
  	},{
  		path: '/newMember',
  		component: newMember,
  		meta: ['图表', '用户数据'],
  	},{
  		path: '/uploadImg',
  		component: uploadImg,
  		meta: ['文本编辑', 'MarkDown'],
  	},{
  		path: '/vueEdit',
  		component: vueEdit,
  		meta: ['编辑', '文本编辑'],
  	},{
  		path: '/adminSet',
  		component: adminSet,
  		meta: ['设置', '管理员设置'],
  	},{
  		path: '/sendMessage',
  		component: sendMessage,
  		meta: ['设置', '发送通知'],
  	},{
  		path: '/explain',
  		component: explain,
  		meta: ['说明', '说明'],
  	}]
  }
]
export default new Router({
	// mode: 'history', history时 会需要后台配置，否则可能会出现404  默认mode是hash  明显地址栏不一样	
	routes,
	strict: process.env.NODE_ENV !== 'production'// 系统读取环境变量  production/development
})

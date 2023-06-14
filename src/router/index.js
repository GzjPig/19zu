// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 商品管理
import Goods from '@/views/goods/Goods';
//管理
import Manage from '@/views/goods/Manage'
//日志
import Log from '@/views/goods/Log'
//周期
import Cycle from '@/views/goods/Cycle'

// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/goods/Manage',
            name: '闪购管理',
            component: Manage,
            meta: {
                requireAuth: true
            }
        },{
            path: '/goods/Goods',
            name: '闪购商品',
            component: Goods,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/goods/Log',
            name: '闪购日志',
            component: Log,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/goods/Cycle',
            name: '闪购周期',
            component: Cycle,
            meta: {
                requireAuth: true
            }
        }]
    }]
})
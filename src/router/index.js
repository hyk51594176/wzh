import Vue from 'vue'
import Router from 'vue-router'
import layzLoading from './layzLoading'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: layzLoading('home/index'),
      name: 'index',
      children: [{
        path: '/home',
        name: 'home',
        component: layzLoading('home/home'),
        meta: { exit: true }

      }, {
        path: '/mine',
        name: 'mine',
        component: layzLoading('home/mine'),
        meta: { exit: true }

      }, {
        path: '/couponsCenter',
        name: 'couponsCenter',
        component: layzLoading('home/couponsCenter'),
        meta: { exit: true }

      }, {
        path: '/leadingCurrency',
        name: 'leadingCurrency',
        component: layzLoading('home/leadingCurrency'),
        meta: { exit: true }

      }]
    }, {
      path: '/login',
      name: 'login',
      component: layzLoading('login')
    },
    {
      path: '/consumptionRecords',
      name: 'consumptionRecords',
      component: layzLoading('needAuth/consumptionRecords'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/payIframe/:payType',
      name: 'payIframe',
      component: layzLoading('needAuth/payIframe'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      component: layzLoading('needAuth/rechargeRecord'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/securityCenter',
      name: 'securityCenter',
      component: layzLoading('needAuth/securityCenter'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/personInfo',
      name: 'personInfo',
      component: layzLoading('needAuth/personInfo'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/myCollection',
      name: 'myCollection',
      component: layzLoading('needAuth/myCollection'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/myOrder',
      name: 'myOrder',
      component: layzLoading('needAuth/myOrder'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/cspRecordDetail/:title',
      name: 'cspRecordDetail',
      component: layzLoading('needAuth/cspRecordDetail'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/regRecordDetail/:title',
      name: 'regRecordDetail',
      component: layzLoading('needAuth/regRecordDetail'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/changePass/:title',
      name: 'changePass',
      component: layzLoading('needAuth/changePass'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/binding',
      name: 'binding',
      component: layzLoading('needAuth/binding'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/recharge',
      name: 'recharge',
      component: layzLoading('needAuth/recharge'),
      meta: {
        isNeedLogin: true
      }
    }, {
      path: '/template',
      name: 'template',
      component: layzLoading('noAuth/template')
    },

    {
      path: '/telService',
      name: 'telService',
      component: layzLoading('noAuth/telService')
    }, {
      path: '/shop',
      name: 'shop',
      component: layzLoading('noAuth/shop')
    }, {
      path: '/feedback',
      name: 'feedback',
      component: layzLoading('noAuth/feedback')
    }, {
      path: '/helpCenter',
      name: 'helpCenter',
      component: layzLoading('noAuth/helpCenter')
    }, {
      path: '/about',
      name: 'about',
      component: layzLoading('noAuth/about')
    },
    {
      path: '/findPass',
      name: 'findPass',
      component: layzLoading('findPass')
    }, {
      path: '/introduce',
      name: 'introduce',
      component: layzLoading('noAuth/introduce')
    }, {
      path: '/welcome',
      name: 'welcome',
      component: layzLoading('noAuth/welcome')
    },

    {
      path: '/', redirect: '/home'
    },
    {
      path: '/index', redirect: '/home'
    },
    {
      path: '*', redirect: '/home'
    }
  ]
})

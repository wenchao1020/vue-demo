import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/', redirect: 'demo1/page1' },
    { path: '', redirect: 'demo1/page1' },
    {
      path: '/demo1',
      component: resolve => require(['./views/index'], resolve),
      children: [
        {
          path: 'page1',
          name: 'demoPage1',
          component: resolve => require(['./views/demo'], resolve)
        },
        {
          path: 'page2',
          name: 'demoPage2',
          component: resolve => require(['./views/demo-page-b'], resolve)
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['./views/index'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/components/building/404'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach(function (to, from, next) {
  next()
})

router.afterEach(function (route) {
})
if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { // detect it's IE11
  window.addEventListener('hashchange', function (event) {
    var currentPath = window.location.hash.slice(1)
    router.push(currentPath)
  }, false)
}

export default router

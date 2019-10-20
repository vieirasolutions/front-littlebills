import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'cleaner' },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      meta: { layout: 'cleaner' },
      component: () => import(/* webpackChunkName: "cadastro" */ './views/Cadastro.vue')
    },
    {
      path: '',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/auth/Dashboard.vue')
    },
    {
      path: '/despesas',
      name: 'despesas',
      component: () => import(/* webpackChunkName: "despesas" */ './views/auth/Despesas.vue')
    },
    {
      path: '/receitas',
      name: 'receitas',
      component: () => import(/* webpackChunkName: "receitas" */ './views/auth/Receitas.vue')
    }
  ]
})

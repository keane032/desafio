import Vue from 'vue'
import Router from 'vue-router'
import Ordenacao from '@/components/ordena'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ordenacao',
      component: Ordenacao
    }
  ]
})

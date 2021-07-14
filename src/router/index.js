import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import PlantDetails from '../views/PlantDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plant/new',
    name: 'AddPlant',
    component: PlantDetails
  },
  {
    path: '/plant/:id',
    name: 'PlantDetails',
    component: PlantDetails
  },
  {
    path: '/plant/edit/:id',
    name: 'EditPlantDetails',
    component: PlantDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('exitEditMode')
  next()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlantDetails from '../views/PlantDetails.vue'
import AddPlant from '../views/AddPlant.vue'

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
    component: AddPlant
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
  window.scrollTo(0, 0)
  next()
})

export default router

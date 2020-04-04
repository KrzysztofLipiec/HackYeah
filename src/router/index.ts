import Vue from 'vue';
import VueRouter from 'vue-router';

import Shops from '../views/frontstage/Shops.vue';
import Home from '../views/LandingPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shops',
    name: 'Shops',
    component: () => import('../views/frontstage/Shops.vue')
  },
  {
    path: '/collectingItems',
    name: 'CollectingItems',
    component: () => import('../views/frontstage/CollectingItems.vue')
  },
  {
    path: '/backstageDashboard',
    name: 'BackstageDashboard',
    component: () => import('../views/backstage/Dashboard.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/backstage/RegistrationPanel.vue')
  },
  {
    path: '/orders-list',
    name: 'OrdersList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/frontstage/OrdersList.vue')
  },
  {
    path: '/orders-list',
    name: 'OrdersList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/frontstage/OrdersList.vue')
  },
  {
    path: '/shop-assortment',
    name: 'ShopAssortment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/backstage/ShopAssortment.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

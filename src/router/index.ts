import Vue from 'vue';
import VueRouter from 'vue-router';

import Shops from '../views/frontstage/Shops.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingPage.vue')
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
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/frontstage/Checkout.vue')
  },
  {
    path: '/backstageDashboard',
    name: 'BackstageDashboard',
    component: () => import('../views/backstage/Dashboard.vue')
  },
  {
    path: '/order/shop/:orderId',
    name: 'ShopOrder',
    component: () => import('../views/backstage/Order.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/backstage/LoginPanel.vue')
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

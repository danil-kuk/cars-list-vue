import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import CarsListRoute from '@/features/cars-list/router';
import LoginRoute from '@/features/login/router';
import UsersListRoute from '@/features/users-list/router';
import ForbiddenRoutePage from '@/pages/ForbiddenRoutePage.vue';
import Home from '@/pages/HomePage.vue';

Vue.use(VueRouter);

/**
 * App routes.
 */
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    component: Home,
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenRoutePage,
  },
  ...CarsListRoute,
  ...LoginRoute,
  ...UsersListRoute,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { RouteConfig } from 'vue-router';

import { checkUserLogin } from '@/utils/route-helpers';

const LoginPage = () => import(/* webpackChunkName: "LoginPage" */ './pages/LoginPage.vue');

/**
 * Login feature routes.
 */
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: checkUserLogin,
  },
];

export default routes;

import { RouteConfig } from 'vue-router';

import { checkUserPermission } from '@/utils/route-helpers';

const UsersListPage = () => import(/* webpackChunkName: "UsersListPage" */ './pages/UsersListPage.vue');

/**
 * Users list feature routes.
 */
const routes: Array<RouteConfig> = [
  {
    path: '/users',
    name: 'users',
    component: UsersListPage,
    beforeEnter: checkUserPermission,
  },
];

export default routes;

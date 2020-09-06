import { RouteConfig } from 'vue-router';

const CarsListPage = () =>
  import(/* webpackChunkName: "CarsListPage" */ './pages/CarsListPage.vue');

/**
 * Cars list feature routes.
 */
const routes: Array<RouteConfig> = [
  {
    path: '/cars',
    name: 'cars',
    component: CarsListPage,
  },
];

export default routes;

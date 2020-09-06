import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { vuexfireMutations } from 'vuexfire';

import { carsList } from './cars-list';
import { users } from './users';

Vue.use(Vuex);

/**
 * Application root state.
 */
export interface RootState {
  /**
   * Stores application loading status.
   */
  loading: boolean;
}

/**
 * Root state.
 */
const state: RootState = {
  loading: false,
};

/**
 * App store.
 */
const store: StoreOptions<RootState> = {
  state,
  mutations: { ...vuexfireMutations },
  modules: {
    carsList,
    users,
  },
};

export default new Vuex.Store<RootState>(store);

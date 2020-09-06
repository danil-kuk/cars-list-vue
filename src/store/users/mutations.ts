import { MutationTree } from 'vuex';

import { User } from '@/models';

import { UsersState } from '.';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

/**
 * Users store mutations.
 */
const mutations: MutationTree<UsersState> = {
  /**
   * Set current user in state.
   *
   * @param state Users state.
   * @param user User to set as current.
   */
  [SET_CURRENT_USER](state, user: User) {
    state.currentUser = user;
  },
};

export default mutations;

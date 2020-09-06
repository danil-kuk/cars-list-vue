import { createNamespacedHelpers,Module } from 'vuex';

import { LocalStorageKeys } from '@/constants';
import { User } from '@/models';
import { UserDto } from '@/services/dtos';
import { RootState } from '@/store';
import { getItemFromLocalStorage } from '@/utils';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

/**
 * Users state.
 */
export interface UsersState {
  /**
   * Raw users data.
   */
  rawUsersData?: UserDto[];

  /**
   * Current user.
   */
  currentUser?: User | null;
}

/**
 * Users state.
 */
const state: UsersState = {
  rawUsersData: [],
  currentUser: getUserFromLocalStorage(),
};

/**
 * Try to get current user from local storage.
 */
function getUserFromLocalStorage(): User | null {
  return getItemFromLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY) as User | null;
}

/**
 * Users module.
 */
export const users: Module<UsersState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export const usersStoreHelper = createNamespacedHelpers('users');

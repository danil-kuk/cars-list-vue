import { GetterTree } from 'vuex';

import { UserRole } from '@/models';
import userMapper from '@/services/mappers/user-mapper';
import { RootState } from '@/store';

import { UsersState } from './index';

export const USERS_DATA = 'USERS_DATA';
export const IS_ADMIN = 'IS_ADMIN';

/**
 * Cars list store getters.
 */
const getters: GetterTree<UsersState, RootState> = {
  /**
   * Map users data from UserDto to User.
   */
  [USERS_DATA]: (state: UsersState) => {
    return state.rawUsersData?.map((dto) => userMapper.fromDto(dto));
  },

  /**
   * Check if current user is Admin.
   */
  [IS_ADMIN]: (state: UsersState) => {
    return state.currentUser?.role === UserRole.Admin;
  },
};

export default getters;

import { ActionTree } from 'vuex';
import { firestoreAction } from 'vuexfire';

import { DatabaseKeys, LocalStorageKeys } from '@/constants';
import { User } from '@/models';
import databaseService from '@/services/api/database-service';
import { UserDto } from '@/services/dtos';
import userMapper from '@/services/mappers/user-mapper';
import { RootState } from '@/store';
import { deleteItemInLocalStorage, saveItemInLocalStorage } from '@/utils';

import { UsersState } from './index';
import { SET_CURRENT_USER } from './mutations';

export const GET_USERS = 'GET_USERS';
export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOGIN = 'LOGIN';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGOUT = 'LOGOUT';

/**
 * Users store actions.
 */
const actions: ActionTree<UsersState, RootState> = {
  /**
   * Get all users action.
   */
  [GET_USERS]: firestoreAction((context) => {
    return context.bindFirestoreRef('rawUsersData', databaseService.getAllItems(DatabaseKeys.USERS_COLLECTION_ID));
  }),

  /**
   * Create new user action.
   * @param user New user to add in database.
   */
  async [CREATE_NEW_USER](_, user: User): Promise<void> {
    const dto = userMapper.toDto(user);
    await databaseService.postItem(DatabaseKeys.USERS_COLLECTION_ID, dto);
  },

  /**
   * Update user action.
   * @param user User to update in database.
   */
  async [UPDATE_USER]({ state, dispatch }, user: User): Promise<void> {
    const dto = userMapper.toDto(user);
    await databaseService.updateItem(DatabaseKeys.USERS_COLLECTION_ID, dto);
    if (state.currentUser?.id === user.id) {
      dispatch(UPDATE_CURRENT_USER, dto);
    }
  },

  /**
   * Delete user action.
   * @param id Id of user to delete from database
   */
  async [DELETE_USER](_, id: string): Promise<void> {
    await databaseService.deleteItem(DatabaseKeys.USERS_COLLECTION_ID, id);
  },

  /**
   * User login action.
   * @param payload User email and password
   */
  async [LOGIN]({ dispatch }, payload: { email: string; password: string }): Promise<void> {
    const items = await databaseService.getItemsByField(DatabaseKeys.USERS_COLLECTION_ID, 'email', payload.email);
    const userDto = items[0] as UserDto;
    if (userDto && userDto.password === payload.password) {
      dispatch(UPDATE_CURRENT_USER, userDto);
    }
  },

  /**
   * Update current user in state and local storage.
   * @param userDto User (passed as dto) to set as current.
   */
  [UPDATE_CURRENT_USER]({ commit }, userDto: UserDto): void {
    const user = userMapper.fromDto(userDto);
    commit(SET_CURRENT_USER, user);
    saveItemInLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  },

  /**
   * Delete current user from state and local storage
   */
  [LOGOUT]({ commit }): void {
    deleteItemInLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY);
    commit(SET_CURRENT_USER, null);
  },
};

export default actions;

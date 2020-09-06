import { ActionTree } from 'vuex';
import { firestoreAction } from 'vuexfire';

import { DatabaseKeys } from '@/constants';
import { Car } from '@/models';
import databaseService from '@/services/api/database-service';
import carMapper from '@/services/mappers';
import { RootState } from '@/store';

import { CarsListState } from './index';

export const GET_CARS = 'GET_CARS';
export const CREATE_NEW_CAR = 'CREATE_NEW_CAR';
export const UPDATE_CAR = 'UPDATE_CAR';
export const DELETE_CAR = 'DELETE_CAR';

/**
 * Cars list store actions.
 */
const actions: ActionTree<CarsListState, RootState> = {
  /**
   * Get all cars action.
   */
  [GET_CARS]: firestoreAction((context) => {
    return context.bindFirestoreRef('rawCarsData', databaseService.getAllItems(DatabaseKeys.CARS_COLLECTION_ID));
  }),

  /**
   * Create new car action.
   * @param car New car to add in database.
   */
  async [CREATE_NEW_CAR](_, car: Car): Promise<void> {
    const dto = carMapper.toDto(car);
    await databaseService.postItem(DatabaseKeys.CARS_COLLECTION_ID, dto);
  },

  /**
   * Update car action.
   * @param car Car to update in database.
   */
  async [UPDATE_CAR](_, car: Car): Promise<void> {
    const dto = carMapper.toDto(car);
    await databaseService.updateItem(DatabaseKeys.CARS_COLLECTION_ID, dto);
  },

  /**
   * Delete car action.
   * @param id Id of car to delete from database
   */
  async [DELETE_CAR](_, id: string): Promise<void> {
    await databaseService.deleteItem(DatabaseKeys.CARS_COLLECTION_ID, id);
  },
};

export default actions;

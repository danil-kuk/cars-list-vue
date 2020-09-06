import { createNamespacedHelpers,Module } from 'vuex';

import { CarDto } from '@/services/dtos';
import { RootState } from '@/store';

import actions from './actions';
import getters from './getters';

/**
 * Cars list state.
 */
export interface CarsListState {
  /**
   * Raw cars list data.
   */
  rawCarsData?: CarDto[];
}

/**
 * Cars list state.
 */
const state: CarsListState = {
  rawCarsData: [],
};

/**
 * Cars list module.
 */
export const carsList: Module<CarsListState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
};

export const carsListStoreHelper = createNamespacedHelpers('carsList');

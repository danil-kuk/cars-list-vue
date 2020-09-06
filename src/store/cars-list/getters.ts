import { GetterTree } from 'vuex';

import carMapper from '@/services/mappers';
import { RootState } from '@/store';

import { CarsListState } from './index';

export const CARS_DATA = 'CARS_DATA';

/**
 * Cars list store getters.
 */
const getters: GetterTree<CarsListState, RootState> = {
  /**
   * Map cars data from CarDto to Car.
   */
  [CARS_DATA]: (state: CarsListState) => {
    return state.rawCarsData?.map((dto) => carMapper.fromDto(dto));
  },
};

export default getters;

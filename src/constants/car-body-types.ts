import { CarBodyType } from '@/models';
import { enumToArray } from '@/utils';

/**
 * Array of car body types items. This array is created from CarBodyType enum.
 * Each item in array is an object with value and label properties.
 * @constant
 */
export const CAR_BODY_TYPES = enumToArray(CarBodyType);

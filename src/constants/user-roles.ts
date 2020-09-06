import { UserRole } from '@/models';
import { enumToArray } from '@/utils';

/**
 * Array of user role items. This array is created from UserRole enum.
 * Each item in array is an object with value and label properties.
 * @constant
 */
export const USER_ROLES = enumToArray(UserRole);

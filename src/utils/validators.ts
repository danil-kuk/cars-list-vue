import { CarDefaults, EMAIL_PATTERN } from '@/constants';

/** Check if input isn't empty.
 * @param value Value to check
 */
export function required(value: string | undefined): true | string {
  return (value !== undefined && value !== '') || 'Field is required';
}

/** Check if value is match email regex pattern.
 * @param value Value to check.
 */
export function email(value: string): true | string {
  return EMAIL_PATTERN.test(value) || 'Invalid email';
}

/** Check if value is non negative (i.e. equal or grater 0).
 * @param value Value to check.
 */
export function nonNegative(value: number): true | string {
  return value >= 0 || 'Value must be non negative';
}

/** Check if input value is in passed interval (i.e. [start, end] must include value).
 * @param start Start of interval.
 * @param end End of interval.
 */
export function between(start: number, end: number): (value: number) => true | string {
  return (value: number) =>
    (value >= start && value <= end) || `Field must be between ${CarDefaults.MIN_YEAR} and ${CarDefaults.MAX_YEAR}`;
}

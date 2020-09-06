/**
 * Type that can be used as Enum
 */
export interface EnumLikeObject {
  [key: number]: string;
}

/**
 * Type to use instead of Enum
 */
export interface EnumItem {
  /** Enum value */
  value: number;

  /** Enum label */
  label: string;
}

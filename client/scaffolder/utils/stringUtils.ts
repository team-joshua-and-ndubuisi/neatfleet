import pluralize from 'pluralize';

/**
 * Convert a camelCase string to PascalCase.
 * @param camelCaseString - The camelCase string to convert.
 * @returns The converted PascalCase string.
 */
export const camelToPascal = (camelCaseString: string): string => {
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
};

/**
 * Singularize a word if it is plural.
 * @param word - The word to singularize.
 * @returns The singular form of the word.
 */
export const singularize = (word: string): string => {
  return pluralize.singular(word);
};

/**
 * Pluralize a word if it is singular.
 * @param word - The word to pluralize.
 * @returns The plural form of the word.
 */
export const pluralizeWord = (word: string): string => {
  return pluralize(word);
};

/**
 * Capitalize the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

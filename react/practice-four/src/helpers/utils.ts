// Constants
import { MantineTheme } from '@mantine/core';

/**
 * @description function return color dark when in dark theme and color light
 * in light theme
 *
 * @param {string} colorScheme dark mode or light mode
 * @param {string} InDarkTheme this will show in dark theme
 * @param {string} InLightTheme this will show in light theme
 *
 * @returns {string}
 */
export const getColorScheme = (
  colorScheme: string,
  InDarkTheme: string,
  InLightTheme: string,
): string => (colorScheme === 'dark' ? InDarkTheme : InLightTheme);

export const isLightTheme = (theme = 'light') => theme === 'light';

/**
 * @description remove duplicates from two arrays and return a combined array.
 *
 * @param {T[]} array1 - The first array.
 * @param {T[]} array2 - The second array.
 * @returns {T[]} - Combined array with duplicates removed.
 */
export const removeDuplicateObjects = <T extends { id: string }>(array1: T[], array2: T[]): T[] => {
  const combinedArray: T[] = [...array1];

  array2.forEach((item) => {
    if (!combinedArray.some((existingItem) => existingItem.id === item.id)) {
      combinedArray.push(item);
    }
  });

  return combinedArray;
};

/**
 * @description Calculates the step level for the process bar in 4 levels based on given parameters.
 *
 * @param {number} surplus - The surplus value used for calculation.
 * @param {number} stepLevel - The step level to which surplus is applied.
 * @param {0.75 | 0.25 | 0.5} defaultSurplus - The default surplus value thresholds.
 *
 * @returns {number} - The calculated step level with potential surplus addition.
 */
export const calculateEachStep = (
  surplus: number,
  stepLevel: number,
  defaultSurplus: 0.75 | 0.25 | 0.5,
): number => {
  return surplus >= defaultSurplus ? stepLevel + 1 : stepLevel;
};

/**
 * Calculate the step level for the process bar in 4 levels based on given parameters.
 *
 * @param {number} step - The current step within the total steps.
 * @param {number} totalStep - The total number of steps.
 *
 * @returns {string} - The color matches the current level
 */
export const calculateStepLevel = (
  theme: MantineTheme,
  step: number,
  totalStep: number,
): string => {
  // divide the sum of the steps and take the integer part
  const eachStep = totalStep / 4;
  const surplus = eachStep - Math.floor(eachStep);

  // If the remainder of the above division has remainders of 0.25, 0.75, and 0.5 then it will be + 1
  const veryLow = Math.floor(eachStep);
  const low = calculateEachStep(surplus, veryLow, 0.75);
  const medium = calculateEachStep(surplus, veryLow, 0.5);
  const high = calculateEachStep(surplus, veryLow, 0.25);

  switch (true) {
    // Very low
    case step <= veryLow:
      return theme.colors.red[2];
    // Low
    case step <= low + veryLow:
      return theme.colors.orange[1];
    // Medium
    case step <= medium + low + veryLow:
      return theme.colors.cyan[1];
    // High
    case step <= high + medium + low + veryLow:
      return theme.colors.green[1];
    default:
      return theme.colors.green[1];
  }
};

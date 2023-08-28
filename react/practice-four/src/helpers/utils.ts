// Constants
import { STATUS_PROCESS } from '@constants';

// Interfaces
import { StatusProcess } from '@interfaces';

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
 * @returns {string} - The status level: very-low | low | medium | high
 */
export const calculateStepLevel = (step: number, totalStep: number): StatusProcess => {
  // divide the sum of the steps and take the integer part
  const eachStep = totalStep / 4;
  const surplus = eachStep - Math.floor(eachStep);

  // If the remainder of the above division has remainders of 0.25, 0.75, and 0.5 then it will be + 1
  const veryLow = Math.floor(eachStep);
  const low = calculateEachStep(surplus, veryLow, 0.75);
  const medium = calculateEachStep(surplus, veryLow, 0.5);
  const high = calculateEachStep(surplus, veryLow, 0.25);

  switch (true) {
    case step <= veryLow:
      return STATUS_PROCESS.VERY_LOW;
    case step <= low + veryLow:
      return STATUS_PROCESS.LOW;
    case step <= medium + low + veryLow:
      return STATUS_PROCESS.MEDIUM;
    case step <= high + medium + low + veryLow:
      return STATUS_PROCESS.HIGH;
    default:
      return STATUS_PROCESS.HIGH;
  }
};

// Helpers
import { MantineTheme } from '@mantine/core';

// Helpers
import {
  calculateEachStep,
  calculateStepLevel,
  getColorScheme,
  isLightTheme,
  orderItemNestedArray,
  removeDuplicateObjects,
} from '@helpers';

describe('Test orderItemNestedArray', () => {
  it('should return the correct order when index is 0', () => {
    const index = 0;
    const indexNested = 2;
    const result = orderItemNestedArray(index, indexNested);

    expect(result).toBe(indexNested + 1);
  });

  it('should return the correct order when index is greater than 0', () => {
    const index = 1;
    const indexNested = 3;
    const result = orderItemNestedArray(index, indexNested);
    // Calculate the expected result manually based on the function's logic
    const expected = (index + 1) * 10 + indexNested + 1;

    expect(result).toBe(expected);
  });

  it('should return positive numbers order when index less than 0', () => {
    const index = -1;
    const indexNested = 3;
    const result = orderItemNestedArray(index, indexNested);
    // Calculate the expected result manually based on the function's logic
    const expected = (index + 1) * 10 + indexNested + 1;

    expect(result).toBe(expected);
  });

  it('should return negative order when index and indexNested less than 0', () => {
    const index = -1;
    const indexNested = -3;
    const result = orderItemNestedArray(index, indexNested);
    // Calculate the expected result manually based on the function's logic
    const expected = (index + 1) * 10 + indexNested + 1;

    expect(result).toBe(expected);
  });
});

describe('Test isLightTheme', () => {
  it('Should return true when theme in light mode', () => {
    const inLightMode = isLightTheme('light');

    expect(inLightMode).toBe(true);
  });

  it('Should return false when theme in dark mode', () => {
    const inLightMode = isLightTheme('dark');

    expect(inLightMode).toBe(false);
  });

  it('Should return true when theme in light mode with default value', () => {
    const inLightMode = isLightTheme();

    expect(inLightMode).toBe(true);
  });
});

describe('Test getColorScheme', () => {
  const colorInDark = 'red';
  const colorInLight = 'blue';

  it('Should return color red when color scheme is dark theme', () => {
    const colorWhenColorSchemeDark = getColorScheme('dark', colorInDark, colorInLight);

    expect(colorWhenColorSchemeDark).toBe(colorInDark);
  });

  it('Should return color blue when color scheme is light theme', () => {
    const colorWhenColorSchemeDark = getColorScheme('light', colorInDark, colorInLight);

    expect(colorWhenColorSchemeDark).toBe(colorInLight);
  });
});

describe('Test calculateEachStep', () => {
  it('Should return next step level when surplus is greater than default surplus', () => {
    const surplus = 0.8;
    const stepLevel = 2;
    const calculatedStep = calculateEachStep(surplus, stepLevel, 0.75);

    expect(calculatedStep).toEqual(stepLevel + 1);
  });

  it('Should return same step level when surplus is less than default surplus', () => {
    const surplus = 0.6;
    const stepLevel = 2;
    const calculatedStep = calculateEachStep(surplus, stepLevel, 0.75);

    expect(calculatedStep).toEqual(stepLevel);
  });

  it('Should return next step level when surplus is equal to default surplus', () => {
    const surplus = 0.75;
    const stepLevel = 2;
    const calculatedStep = calculateEachStep(surplus, stepLevel, 0.75);

    expect(calculatedStep).toEqual(stepLevel + 1);
  });

  it('Should return next step level for different default surplus', () => {
    const surplus = 0.6;
    const stepLevel = 2;
    const calculatedStep = calculateEachStep(surplus, stepLevel, 0.5);

    expect(calculatedStep).toEqual(stepLevel + 1);
  });

  it('Should return same step level for different default surplus', () => {
    const surplus = 0.4;
    const stepLevel = 2;
    const calculatedStep = calculateEachStep(surplus, stepLevel, 0.5);

    expect(calculatedStep).toEqual(stepLevel);
  });
});

describe('Test calculateStepLevel', () => {
  const mockThemeColors = {
    colors: {
      green: ['green-0', 'green-1'],
      cyan: ['cyan-0', 'cyan-1'],
      orange: ['orange-0', 'orange-1'],
      red: ['red-0', 'red-1', 'red-2'],
    },
  } as unknown as MantineTheme;

  it('Should return red color when step in level very low (in the first process)', () => {
    const step = 1;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.red[2]);
  });

  it('Should return orange color when step in level low (in the second process)', () => {
    const step = 2;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.orange[1]);
  });

  it('Should return cyan color when step in level medium (in the middle process)', () => {
    const step = 3;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.cyan[1]);
  });

  it('Should return green color when step in level high (almost done or done)', () => {
    const step = 4;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.green[1]);
  });

  it('Should return green color when step over than total steps', () => {
    const step = 8;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.green[1]);
  });

  it('Should return red color when step is negative number', () => {
    const step = -2;
    const totalStep = 5;
    const level = calculateStepLevel(mockThemeColors, step, totalStep);

    expect(level).toBe(mockThemeColors.colors.red[2]);
  });
});

describe('Test removeDuplicateObjects', () => {
  it('should remove the item that has a duplicate ID from two arrays', () => {
    const sourceArray = [
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
    ];
    const duplicateArray = [
      { id: '1', name: 'lorem' },
      { id: '5', name: 'lorem' },
      { id: '6', name: 'lorem' },
    ];

    const result = removeDuplicateObjects(sourceArray, duplicateArray);

    expect(result).toHaveLength(5);
    expect(result).toEqual([
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
      { id: '5', name: 'lorem' },
      { id: '6', name: 'lorem' },
    ]);
  });

  it('should merge two arrays, preferring values from the first array when there are duplicate ID properties', () => {
    const sourceArray = [
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
    ];
    const arrayWithDuplicate = [
      { id: '1', name: 'lorem2' },
      { id: '5', name: 'lorem' },
      { id: '6', name: 'lorem' },
    ];

    const result = removeDuplicateObjects(sourceArray, arrayWithDuplicate);

    expect(result).toHaveLength(5);
    expect(result).toEqual([
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
      { id: '5', name: 'lorem' },
      { id: '6', name: 'lorem' },
    ]);
  });

  it('should merge two arrays, preferring values from the first array when there more than 1 item have duplicate ID properties', () => {
    const sourceArray = [
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
    ];
    const arrayWithDuplicate = [
      { id: '1', name: 'lorem2' },
      { id: '1', name: 'lorem3' },
      { id: '4', name: 'lorem' },
    ];

    const result = removeDuplicateObjects(sourceArray, arrayWithDuplicate);

    expect(result).toHaveLength(4);
    expect(result).toEqual([
      { id: '1', name: 'lorem' },
      { id: '2', name: 'lorem' },
      { id: '3', name: 'lorem' },
      { id: '4', name: 'lorem' },
    ]);
  });

  it('should not remove any items when arrays have no duplicate ID properties', () => {
    const sourceArray = [{ id: '1', name: 'a' }];
    const arrayWithoutDuplicate = [{ id: '2', name: 'b' }];

    const result = removeDuplicateObjects(sourceArray, arrayWithoutDuplicate);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', name: 'a' },
      { id: '2', name: 'b' },
    ]);
  });
});

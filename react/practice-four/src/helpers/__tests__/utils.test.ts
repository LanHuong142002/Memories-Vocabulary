// Constants
import { STATUS_PROCESS } from '@constants';

// Helpers
import { calculateEachStep, calculateStepLevel, removeDuplicateObjects } from '@helpers';

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
  it('Should return low step when step in very low', () => {
    const step = 1;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.VERY_LOW);
  });

  it('Should return very low step when step in level very low', () => {
    const step = 1;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.VERY_LOW);
  });

  it('Should return low step when step in level very low', () => {
    const step = 2;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.LOW);
  });

  it('Should return medium step when step in level medium', () => {
    const step = 3;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.MEDIUM);
  });

  it('Should return high step when step in level high', () => {
    const step = 4;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.HIGH);
  });

  it('Should return high step when step over than total steps', () => {
    const step = 8;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.HIGH);
  });

  it('Should return low step when step is negative number', () => {
    const step = -2;
    const totalStep = 5;
    const level = calculateStepLevel(step, totalStep);

    expect(level).toBe(STATUS_PROCESS.VERY_LOW);
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

import { useSelector } from 'react-redux';
import { RootState } from '..';

export const getRotationSchedulesSelector = (state: RootState) =>
  state.getRotationSchedules;

export const useGetRotationSchedulesSelector = () =>
  useSelector(getRotationSchedulesSelector);

export const getTodaysRotationScheduleSelector = (state: RootState) =>
  state.getRotationSchedules?.data && state.getRotationSchedules.data[0];

export const useGetTodaysRotationScheduleSelector = () =>
  useSelector(getTodaysRotationScheduleSelector);

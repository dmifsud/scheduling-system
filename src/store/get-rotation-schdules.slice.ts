import { StateSlice } from '../shared/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RotationScheduleResponse } from '@/shared/models/rotation-schedule.model';

export type GetRotationSchedulesState = StateSlice<RotationScheduleResponse[]>;

const initialState: GetRotationSchedulesState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const rotationScheduleSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getRotationSchedules(state) {
      state.loading = true;
    },
    getRotationSchedulesSuccess(
      state,
      action: PayloadAction<RotationScheduleResponse[]>,
    ) {
      state.loading = false;
      state.data = action.payload;
      state.loaded = true;
    },
    getRotationSchedulesFail(state) {
      state.loading = false;
      state.loaded = false;
      state.hasError = true;
      state.errorMessage = 'Failed to load rotation schedules';
    },
  },
});

export const {
  getRotationSchedules,
  getRotationSchedulesSuccess,
  getRotationSchedulesFail,
} = rotationScheduleSlice.actions;
export default rotationScheduleSlice.reducer;

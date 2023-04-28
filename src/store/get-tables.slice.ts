import { TableModel } from '@/shared/models/table.model';
import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type GetTablesState = StateSlice<TableModel[]>;

const initialState: GetTablesState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const gamePresentersSlice = createSlice({
  name: 'getTables',
  initialState,
  reducers: {
    getTables(state) {
      state.loading = true;
    },
    getTablesSuccess(state, action: PayloadAction<{ data: TableModel[] }>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload.data;
    },
    getTablesFail(state) {
      state.loading = false;
      state.loaded = false;
      state.hasError = true;
      state.errorMessage = 'Failed to load Tables';
    },
  },
});

export const { getTables, getTablesSuccess, getTablesFail } =
  gamePresentersSlice.actions;
export default gamePresentersSlice.reducer;

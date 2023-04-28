import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TableCommand, TableModel } from '@/shared/models/table.model';

export type AddTableState = StateSlice<TableModel>;

const initialState: AddTableState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const addTableSlice = createSlice({
  name: 'addTable',
  initialState,
  reducers: {
    addTable(state, _action: PayloadAction<TableCommand>) {
      state.loading = true;
      state.loaded = false;
    },
    addTableSuccess(state, action: PayloadAction<TableModel>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    addTableFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to add Table';
    },
  },
});

export const { addTable, addTableSuccess, addTableFail } =
  addTableSlice.actions;
export default addTableSlice.reducer;

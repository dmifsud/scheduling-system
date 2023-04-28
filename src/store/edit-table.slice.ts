import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TableModel } from '@/shared/models/table.model';

export type EditTableState = StateSlice<TableModel>;

const initialState: EditTableState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const editTableSlice = createSlice({
  name: 'editTable',
  initialState,
  reducers: {
    editTable(state, _action: PayloadAction<TableModel>) {
      state.loading = true;
      state.loaded = false;
    },
    editTableSuccess(state, action: PayloadAction<TableModel>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    editTableFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to edit Table';
    },
  },
});

export const { editTable, editTableSuccess, editTableFail } =
  editTableSlice.actions;
export default editTableSlice.reducer;

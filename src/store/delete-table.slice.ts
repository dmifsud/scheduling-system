import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiGenericResponse } from '@/shared/models/response.model';

export type DeleteTableState = StateSlice<ApiGenericResponse>;

const initialState: DeleteTableState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const deleteTableSlice = createSlice({
  name: 'deleteTable',
  initialState,
  reducers: {
    deleteTable(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.loaded = false;
    },
    deleteTableSuccess(state, action: PayloadAction<ApiGenericResponse>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    deleteTableFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to delete table';
    },
  },
});

export const { deleteTable, deleteTableSuccess, deleteTableFail } =
  deleteTableSlice.actions;
export default deleteTableSlice.reducer;

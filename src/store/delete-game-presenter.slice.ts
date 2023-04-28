import {
  GamePresenterCommand,
  GamePresenterModel,
} from '@/shared/models/game-presenter.model';
import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiGenericResponse } from '@/shared/models/response.model';

export type EditGamePresenterState = StateSlice<ApiGenericResponse>;

const initialState: EditGamePresenterState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const deleteGamePresenterSlice = createSlice({
  name: 'deleteGamePresenter',
  initialState,
  reducers: {
    deleteGamePresenter(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.loaded = false;
    },
    deleteGamePresenterSuccess(
      state,
      action: PayloadAction<ApiGenericResponse>,
    ) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    deleteGamePresenterFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to delete Game Presenter';
    },
  },
});

export const {
  deleteGamePresenter,
  deleteGamePresenterSuccess,
  deleteGamePresenterFail,
} = deleteGamePresenterSlice.actions;
export default deleteGamePresenterSlice.reducer;

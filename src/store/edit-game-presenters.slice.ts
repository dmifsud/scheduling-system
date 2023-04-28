import {
  GamePresenterCommand,
  GamePresenterModel,
} from '@/shared/models/game-presenter.model';
import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type EditGamePresenterState = StateSlice<GamePresenterModel>;

const initialState: EditGamePresenterState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const editGamePresenterSlice = createSlice({
  name: 'editGamePresenter',
  initialState,
  reducers: {
    editGamePresenter(state, _action: PayloadAction<GamePresenterModel>) {
      state.loading = true;
      state.loaded = false;
    },
    editGamePresenterSuccess(state, action: PayloadAction<GamePresenterModel>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    editGamePresenterFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to edit Game Presenter';
    },
  },
});

export const {
  editGamePresenter,
  editGamePresenterSuccess,
  editGamePresenterFail,
} = editGamePresenterSlice.actions;
export default editGamePresenterSlice.reducer;

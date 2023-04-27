import {
  GamePresenterCommand,
  GamePresenterModel,
} from '@/shared/models/game-presenter.model';
import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type AddGamePresenterState = StateSlice<GamePresenterModel>;

const initialState: AddGamePresenterState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const addGamePresenterSlice = createSlice({
  name: 'addGamePresenter',
  initialState,
  reducers: {
    addGamePresenter(state, _action: PayloadAction<GamePresenterCommand>) {
      state.loading = true;
      state.loaded = false;
    },
    addGamePresenterSuccess(state, action: PayloadAction<GamePresenterModel>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    addGamePresenterFail(state) {
      state.loading = false;
      state.loaded = false;
      state.data = null;
      state.errorMessage = 'Failed to add Game Presenter';
    },
  },
});

export const {
  addGamePresenter,
  addGamePresenterSuccess,
  addGamePresenterFail,
} = addGamePresenterSlice.actions;
export default addGamePresenterSlice.reducer;

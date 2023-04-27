import { GamePresenterModel } from '@/shared/models/game-presenter.model';
import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type GamePresentersState = StateSlice<GamePresenterModel[]>;

const initialState: GamePresentersState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const gamePresentersSlice = createSlice({
  name: 'gamePresenters',
  initialState,
  reducers: {
    getGamePresenters(state) {
      state.loading = true;
    },
    getGamePresentersSuccess(
      state,
      action: PayloadAction<{ data: GamePresenterModel[] }>,
    ) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload.data;
    },
    getGamePresentersFail(state) {
      state = {
        // NOTE: this doesn't seem to work
        ...initialState,
        loading: false,
        hasError: true,
        errorMessage: 'Failed to load Game Presenters',
      };
    },
  },
});

export const {
  getGamePresenters,
  getGamePresentersSuccess,
  getGamePresentersFail,
} = gamePresentersSlice.actions;
export default gamePresentersSlice.reducer;

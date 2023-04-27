import { StateSlice } from '../shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '@/shared/models/auth-user.model';
import { ApiResponse } from '@/shared/models/response.model';
import { LoginPayload } from '@/sagas/auth.sagas';

export type AuthState = StateSlice<AuthUser>;

const initialState: AuthState = Object.freeze({
  data: null,
  errorMessage: null,
  hasError: false,
  loaded: false,
  loading: false,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, _action: PayloadAction<LoginPayload>) {
      // state.data = null;
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    loginFail(state) {
      state.loading = false;
      state.loaded = false;
      state.errorMessage = 'Failed to login'; // TODO: to include actual api response error message
    },
    logout(state) {
      // TODO: ideally this is a separate slice
      // state.loading = true;
    },
    logoutSuccess(state) {
      state.data = null;
      state.loading = false;
      state.loaded = false;
    },
    logoutFail(state) {
      state.data = null;
      state.loading = false;
      state.loaded = false;
    },
    // hydrateAuth()
  },
});

export const {
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutFail,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;

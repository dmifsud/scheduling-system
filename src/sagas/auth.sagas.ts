import { call, put, takeEvery, all } from 'typed-redux-saga';
import {
  login as loginBackend,
  logout as logoutBackend,
} from '@/backend/get-auth-user.backend';
import {
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutSuccess,
  logoutFail,
} from '@/store/auth.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  clearLocalStorageItem,
  setLocalStorageValue,
} from '@/lib/general.helpers';

export type LoginPayload = { email: string; password: string };

function* loginSaga({ payload }: PayloadAction<LoginPayload>) {
  try {
    const { email, password } = payload;
    const authUser = yield* call(loginBackend, email, password);

    setLocalStorageValue('auth', authUser);
    yield* put(loginSuccess(authUser));
  } catch (error) {
    console.log('error', error);
    yield* put(loginFail()); // TODO: can pass error to action
  }
}

function* logoutSaga() {
  try {
    clearLocalStorageItem('auth');
    yield* call(logoutBackend);
    yield* put(logoutSuccess());
  } catch (Error) {
    yield* put(logoutFail());
  }
}

// function* finalizeLogoutSaga() {
//   debugger;
//   setLocalStorageValue('auth', undefined);
// }

export function* authSagas() {
  yield all([
    takeEvery(logout, logoutSaga),
    takeEvery(login, loginSaga),
    // takeEvery([logoutSuccess, logoutFail], finalizeLogoutSaga),
  ]);
}

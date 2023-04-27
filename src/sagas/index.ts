import { spawn } from 'redux-saga/effects';
import { gamePresentersSagas } from './game-presenters.sagas';
import { authSagas } from './auth.sagas';

export function* rootSaga() {
  yield spawn(gamePresentersSagas);
  yield spawn(authSagas);
}

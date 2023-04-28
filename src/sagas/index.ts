import { spawn } from 'redux-saga/effects';
import { gamePresentersSagas } from './game-presenters.sagas';
import { authSagas } from './auth.sagas';
import { tablesSagas } from './tables.sagas';

export function* rootSaga() {
  yield spawn(gamePresentersSagas);
  yield spawn(tablesSagas);
  yield spawn(authSagas);
}

import { spawn } from 'redux-saga/effects';
import { gamePresentersSagas } from './game-presenters.sagas';
import { authSagas } from './auth.sagas';
import { tablesSagas } from './tables.sagas';
import { rotationScheduleSagas } from './rotation-schedule.sagas';

export function* rootSaga() {
  yield spawn(gamePresentersSagas);
  yield spawn(tablesSagas);
  yield spawn(authSagas);
  yield spawn(rotationScheduleSagas);
}

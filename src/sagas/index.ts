import { spawn } from 'redux-saga/effects';
import { gamePresentersSagas } from './game-presenters.sagas';

export function* rootSaga() {
  yield spawn(gamePresentersSagas);
}

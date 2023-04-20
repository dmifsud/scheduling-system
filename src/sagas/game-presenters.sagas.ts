import { call, put, takeEvery, all } from 'typed-redux-saga';
import { getGamePresenters as getGamePresentersBackend } from '@/backend/game-presenters.backend';
import {
  getGamePresenters,
  getGamePresentersSuccess,
  getGamePresentersFail,
} from '@/store/game-presenters.slice';

function* getGamePresentersSaga() {
  try {
    const gamePresenters = yield* call(getGamePresentersBackend);
    yield* put(getGamePresentersSuccess(gamePresenters));
  } catch (error) {
    console.log('error', error);
    yield* put(getGamePresentersFail()); // TODO: can pass error to action
  }
}

export function* gamePresentersSagas() {
  yield all([takeEvery(getGamePresenters, getGamePresentersSaga)]);
}

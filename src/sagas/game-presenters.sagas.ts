import { call, put, takeEvery, all } from 'typed-redux-saga';
import {
  createGamePresenter,
  getGamePresenters as getGamePresentersBackend,
} from '@/backend/game-presenters.backend';
import {
  getGamePresenters,
  getGamePresentersSuccess,
  getGamePresentersFail,
} from '@/store/game-presenters.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { GamePresenterCommand } from '@/shared/models/game-presenter.model';
import {
  addGamePresenter,
  addGamePresenterFail,
  addGamePresenterSuccess,
} from '@/store/add-game-presenters.slice';

function* getGamePresentersSaga() {
  try {
    const gamePresenters = yield* call(getGamePresentersBackend);
    yield* put(getGamePresentersSuccess(gamePresenters));
  } catch (error) {
    console.log('error', error);
    yield* put(getGamePresentersFail()); // TODO: can pass error to action
  }
}

function* addGamePresenterSaga({
  payload,
}: PayloadAction<GamePresenterCommand>) {
  try {
    const gamePresenter = yield* call(createGamePresenter, payload);
    yield* put(addGamePresenterSuccess(gamePresenter));
  } catch (error) {
    console.log('error', error);
    yield* put(addGamePresenterFail()); // TODO: can pass error to action
  }
}

export function* gamePresentersSagas() {
  yield all([
    takeEvery(getGamePresenters, getGamePresentersSaga),
    takeEvery(addGamePresenter, addGamePresenterSaga),
  ]);
}

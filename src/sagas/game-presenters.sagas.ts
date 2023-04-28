import { call, put, takeEvery, all, select } from 'typed-redux-saga';
import {
  createGamePresenter,
  deleteGamePresenter as deleteGamePresenterBackend,
  updateGamePresenter as updateGamePresenterBackend,
  getGamePresenters as getGamePresentersBackend,
} from '@/backend/game-presenters.backend';
import {
  getGamePresenters,
  getGamePresentersSuccess,
  getGamePresentersFail,
  GamePresentersState,
} from '@/store/game-presenters.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  GamePresenterCommand,
  GamePresenterModel,
} from '@/shared/models/game-presenter.model';
import {
  addGamePresenter,
  addGamePresenterFail,
  addGamePresenterSuccess,
} from '@/store/add-game-presenters.slice';
import {
  editGamePresenter,
  editGamePresenterSuccess,
} from '@/store/edit-game-presenters.slice';
import { gamePresentersStateSelector } from '@/store/selectors/game-presenters.selectors';
import {
  deleteGamePresenter,
  deleteGamePresenterFail,
  deleteGamePresenterSuccess,
} from '@/store/delete-game-presenter.slice';
import { ApiGenericResponse } from '@/shared/models/response.model';

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

function* editGamePresenterSaga({
  payload,
}: PayloadAction<GamePresenterModel>) {
  try {
    const { id, ...restOfGamePresenter } = payload;
    const gamePresenter = yield* call(
      updateGamePresenterBackend,
      id,
      restOfGamePresenter as GamePresenterCommand,
    );
    yield* put(editGamePresenterSuccess(gamePresenter));
  } catch (error) {
    console.log('error', error);
    yield* put(addGamePresenterFail()); // TODO: can pass error to action
  }
}

function* editGamePresenterSuccessSaga({
  payload,
}: PayloadAction<GamePresenterModel>) {
  const gamePresenterList: GamePresentersState = yield select(
    gamePresentersStateSelector,
  ) as GamePresentersState;

  if (gamePresenterList.data) {
    yield* put(
      getGamePresentersSuccess({
        // NOTE: not really advisable for large scale app but adds a nice touch to this one
        data: gamePresenterList.data.map((gp) => {
          if (gp.id === payload.id) {
            return payload;
          } else {
            return gp;
          }
        }),
      }),
    );
  }
}

function* deleteGamePresenterSaga({ payload }: PayloadAction<string>) {
  try {
    const genericResponse = yield* call(deleteGamePresenterBackend, payload);
    yield* put(deleteGamePresenterSuccess(genericResponse));
  } catch (error) {
    console.log('error', error);
    yield* put(deleteGamePresenterFail()); // TODO: can pass error to action
  }
}

export function* gamePresentersSagas() {
  yield all([
    takeEvery(getGamePresenters, getGamePresentersSaga),
    takeEvery(addGamePresenter, addGamePresenterSaga),
    takeEvery(editGamePresenter, editGamePresenterSaga),
    takeEvery(editGamePresenterSuccess, editGamePresenterSuccessSaga),
    takeEvery(deleteGamePresenterSuccess, getGamePresentersSaga),
    takeEvery(deleteGamePresenter, deleteGamePresenterSaga),
  ]);
}

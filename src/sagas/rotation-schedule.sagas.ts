import { call, put, takeEvery, all } from 'typed-redux-saga';
import { getRotationSchedules as getRotationSchedulesBackend } from '@/backend/rotation-schedule.backend';
import {
  getRotationSchedules,
  getRotationSchedulesFail,
  getRotationSchedulesSuccess,
} from '@/store/get-rotation-schdules.slice';

function* getRotationScheduleSaga() {
  try {
    const rotationScheduleResponse = yield* call(getRotationSchedulesBackend);

    yield* put(getRotationSchedulesSuccess(rotationScheduleResponse.data));
  } catch (error) {
    console.log('error', error);
    yield* put(getRotationSchedulesFail());
  }
}

export function* rotationScheduleSagas() {
  yield all([takeEvery(getRotationSchedules, getRotationScheduleSaga)]);
}

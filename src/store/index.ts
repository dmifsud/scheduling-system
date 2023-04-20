import { combineReducers } from 'redux';
import gamePresentersReducer from './game-presenters.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@/sagas';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];
const rootReducer = combineReducers({
  gamePresenters: gamePresentersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  // enhancers: [composeWithDevTools()],
});

sagaMiddleware.run(rootSaga);

export default store;

import { useSelector } from 'react-redux';
import { RootState } from '..';

export const addGamePresentersStateSelector = (state: RootState) =>
  state.addGamePresenter;

export const useAddGamePresenterStateSelector = () =>
  useSelector(addGamePresentersStateSelector);

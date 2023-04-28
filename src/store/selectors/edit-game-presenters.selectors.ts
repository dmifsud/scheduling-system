import { useSelector } from 'react-redux';
import { RootState } from '..';

export const editGamePresentersStateSelector = (state: RootState) =>
  state.editGamePresenter;

export const useEditGamePresenterStateSelector = () =>
  useSelector(editGamePresentersStateSelector);

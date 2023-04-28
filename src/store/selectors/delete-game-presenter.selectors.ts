import { useSelector } from 'react-redux';
import { RootState } from '..';

export const deleteGamePresentersStateSelector = (state: RootState) =>
  state.deleteGamePresenter;

export const useDeleteGamePresenterStateSelector = () =>
  useSelector(deleteGamePresentersStateSelector);

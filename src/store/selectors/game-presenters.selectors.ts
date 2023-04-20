import { useSelector } from 'react-redux';
import { RootState } from '..';

export const gamePresentersStateSelector = (state: RootState) =>
  state.gamePresenters;

export const useGamePresentersStateSelector = () =>
  useSelector(gamePresentersStateSelector);

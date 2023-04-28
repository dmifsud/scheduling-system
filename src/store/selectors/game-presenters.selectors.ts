import { useSelector } from 'react-redux';
import { RootState } from '..';
import { GamePresentersState } from '../game-presenters.slice';

export const gamePresentersStateSelector = (
  state: RootState,
): GamePresentersState => state.gamePresenters;

export const useGamePresentersStateSelector = () =>
  useSelector(gamePresentersStateSelector);

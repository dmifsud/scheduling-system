import { API_URL } from '@/shared/config';
import { GamePresenter } from '@/shared/models/game-presenter.model';
import axios from 'axios';

export const getGamePresenters = async () => {
  const response = await axios.get(`${API_URL}/game-presenters`);
  return response.data;
};

export const createGamePresenter = async (gamePresenter: GamePresenter) => {
  const response = await axios.post(
    `${API_URL}/game-presenters`,
    gamePresenter,
  );
  return response.data;
};

export const updateGamePresenter = async (
  id: number,
  gamePresenter: GamePresenter,
) => {
  const response = await axios.put(
    `${API_URL}/game-presenters/${id}`,
    gamePresenter,
  );
  return response.data;
};

export const deleteGamePresenter = async (id: number) => {
  const response = await axios.delete(`${API_URL}/game-presenters/${id}`);
  return response.data;
};

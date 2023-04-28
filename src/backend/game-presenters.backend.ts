import { API_URL } from '@/shared/config';
import {
  GamePresenterModel,
  GamePresenterCommand,
} from '@/shared/models/game-presenter.model';
import { ApiResponse } from '@/shared/models/response.model';
import axios from 'axios';

export const getGamePresenters = async () => {
  const response = await axios.get(`${API_URL}/game-presenters`);
  return response.data as ApiResponse<GamePresenterModel>;
};

export const createGamePresenter = async (
  gamePresenter: GamePresenterCommand,
) => {
  const response = await axios.post(
    `${API_URL}/game-presenters`,
    gamePresenter,
  );
  return response.data as GamePresenterModel;
};

export const updateGamePresenter = async (
  id: number,
  gamePresenter: GamePresenterCommand,
) => {
  const response = await axios.put(
    `${API_URL}/game-presenters/${id}`,
    gamePresenter,
  );
  return response.data as GamePresenterModel;
};

export const deleteGamePresenter = async (id: number) => {
  const response = await axios.delete(`${API_URL}/game-presenters/${id}`);
  return response.data;
};

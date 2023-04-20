import { getGamePresenters } from '@/store/game-presenters/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchGamePresenters } from '../store/game-presenters/actions';
// import { GamePresenter } from '../store/game-presenters/types';

interface GamePresentersProps {}

const GamePresenters: React.FC<GamePresentersProps> = () => {

const dispatch = useDispatch();

  useEffect(() => {
    console.log('calling');
    dispatch(getGamePresenters());
  }, []);

  return (
    <div>
      <h1>Game Presenters</h1>
      {/* <ul>
        {gamePresenters.map((gamePresenter) => (
          <li key={gamePresenter.id}>
            {gamePresenter.firstName} {gamePresenter.lastName}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default GamePresenters;

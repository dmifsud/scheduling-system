import { getGamePresenters } from '@/store/game-presenters.slice';
import { useGamePresentersStateSelector } from '@/store/selectors/game-presenters.selectors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchGamePresenters } from '../store/game-presenters/actions';
// import { GamePresenter } from '../store/game-presenters/types';

interface GamePresentersProps {}

const GamePresenters: React.FC<GamePresentersProps> = () => {

const dispatch = useDispatch();
const { data } = useGamePresentersStateSelector();


  useEffect(() => {
    console.log('calling');
    dispatch(getGamePresenters());
  }, []);

  return (
    <div>
      <h1>Game Presenters</h1>
      <ul>
        {data && data.map((gamePresenter) => (
          <li key={gamePresenter.id}>
            {gamePresenter.name}, shift: {gamePresenter.shift}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamePresenters;

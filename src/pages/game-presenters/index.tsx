import TransitionModal from '@/components/transition-modal';
import withAuth from '@/core/hoc/Auth';
import { getGamePresenters } from '@/store/game-presenters.slice';
import { useGamePresentersStateSelector } from '@/store/selectors/game-presenters.selectors';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchGamePresenters } from '../store/game-presenters/actions';
// import { GamePresenter } from '../store/game-presenters/types';

interface GamePresentersProps { }

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
      <TransitionModal title="Add Game Presenter">
        test
      </TransitionModal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Shift</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((gamePresenter) => (
              <TableRow
                key={gamePresenter.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {gamePresenter.name}
                </TableCell>
                <TableCell align="right">{gamePresenter.shift}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withAuth(GamePresenters);

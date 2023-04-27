


import AddGamePresenterModal from '@/components/add-game-presenter-modal';
import GamePresentersTable from '@/components/game-presenters-table';

import withAuth from '@/core/hoc/Auth';

interface GamePresentersProps { }

const GamePresenters: React.FC<GamePresentersProps> = () => {




  return (
    <div>
      <h1>Game Presenters</h1>
      <AddGamePresenterModal />
      <GamePresentersTable />

    </div>
  );
};

export default withAuth(GamePresenters);




import AddGamePresenterModal from '@/components/add-game-presenter-modal';
import GamePresentersTable from '@/components/game-presenters-table';


import withAuth from '@/core/hoc/Auth';
import CrudLayout from '../../components/basic/crud-layout';

interface GamePresentersProps { }

const GamePresenters: React.FC<GamePresentersProps> = () => {

  return (
    <div>
      <CrudLayout pageTitle="Game Presenters" addAction={<AddGamePresenterModal />}>
        <GamePresentersTable />
      </CrudLayout>
    </div>
  );
};

export default withAuth(GamePresenters);

export interface GamePresenterModel {
  id: string;
  name: string;
  shift: string;
  table: string;
  breakSlot: string;
}

export interface GamePresenterCommand extends Omit<GamePresenterModel, 'id'> {}

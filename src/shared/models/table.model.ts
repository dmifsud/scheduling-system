export interface TableModel {
  id: string;
  name: string;
}

export interface TableCommand extends Omit<TableModel, 'id'> {}

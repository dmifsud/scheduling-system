import { useSelector } from 'react-redux';
import { RootState } from '..';
import { GetTablesState } from '../get-tables.slice';

export const getTablesStateSelector = (state: RootState): GetTablesState =>
  state.getTables;

export const useGetTablesStateSelector = () =>
  useSelector(getTablesStateSelector);

import { useSelector } from 'react-redux';
import { RootState } from '..';

export const addTableStateSelector = (state: RootState) => state.addTable;

export const useAddTableStateSelector = () =>
  useSelector(addTableStateSelector);

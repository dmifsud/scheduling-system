import { useSelector } from 'react-redux';
import { RootState } from '..';

export const deleteTableStateSelector = (state: RootState) => state.deleteTable;

export const useDeleteTableStateSelector = () =>
  useSelector(deleteTableStateSelector);

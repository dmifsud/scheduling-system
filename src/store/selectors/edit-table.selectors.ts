import { useSelector } from 'react-redux';
import { RootState } from '..';

export const editTableStateSelector = (state: RootState) => state.editTable;

export const useEditTableStateSelector = () =>
  useSelector(editTableStateSelector);

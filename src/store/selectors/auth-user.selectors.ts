import { useSelector } from 'react-redux';
import { RootState } from '..';

export const authStateSelector = (state: RootState) => state.auth;

export const useAuthStateSelector = () => useSelector(authStateSelector);

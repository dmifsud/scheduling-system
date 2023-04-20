export type Nullable<T> = T | null;

export type StateSlice<T> = {
  errorMessage: Nullable<string>;
  hasError: boolean;
  loaded: boolean;
  loading: boolean;
  data: Nullable<T>;
};

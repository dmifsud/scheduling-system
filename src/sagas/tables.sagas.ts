import { call, put, takeEvery, all, select } from 'typed-redux-saga';

import { PayloadAction } from '@reduxjs/toolkit';
import {
  createTableBackend,
  deleteTableBackend,
  getTablesBackend,
  updateTableBackend,
} from '@/backend/tables.backend';
import {
  GetTablesState,
  getTables,
  getTablesFail,
  getTablesSuccess,
} from '@/store/get-tables.slice';
import { TableCommand, TableModel } from '@/shared/models/table.model';
import {
  addTable,
  addTableFail,
  addTableSuccess,
} from '@/store/add-table.slice';
import {
  editTable,
  editTableFail,
  editTableSuccess,
} from '@/store/edit-table.slice';
import {
  deleteTable,
  deleteTableFail,
  deleteTableSuccess,
} from '@/store/delete-table.slice';
import { getTablesStateSelector } from '@/store/selectors/get-tables.selectors';

function* getTablesSaga() {
  try {
    const tables = yield* call(getTablesBackend);
    yield* put(getTablesSuccess(tables));
  } catch (error) {
    console.log('error', error);
    yield* put(getTablesFail()); // TODO: can pass error to action
  }
}

function* addTableSaga({ payload }: PayloadAction<TableCommand>) {
  try {
    const table = yield* call(createTableBackend, payload);
    yield* put(addTableSuccess(table));
  } catch (error) {
    console.log('error', error);
    yield* put(addTableFail()); // TODO: can pass error to action
  }
}

function* editTableSaga({ payload }: PayloadAction<TableModel>) {
  try {
    const { id, ...restOfTable } = payload;
    const table = yield* call(
      updateTableBackend,
      id,
      restOfTable as TableCommand,
    );
    yield* put(editTableSuccess(table));
  } catch (error) {
    console.log('error', error);
    yield* put(editTableFail()); // TODO: can pass error to action
  }
}

function* editTableSuccessSaga({ payload }: PayloadAction<TableModel>) {
  const tableList: GetTablesState = yield select(
    getTablesStateSelector,
  ) as GetTablesState;

  if (tableList.data) {
    yield* put(
      getTablesSuccess({
        data: tableList.data.map((table) => {
          if (table.id === payload.id) {
            return payload;
          } else {
            return table;
          }
        }),
      }),
    );
  }
}

function* deleteTableSaga({ payload }: PayloadAction<string>) {
  try {
    const genericResponse = yield* call(deleteTableBackend, payload);
    yield* put(deleteTableSuccess(genericResponse));
  } catch (error) {
    console.log('error', error);
    yield* put(deleteTableFail()); // TODO: can pass error to action
  }
}

export function* tablesSagas() {
  yield all([
    takeEvery(getTables, getTablesSaga),
    takeEvery(addTable, addTableSaga),
    takeEvery(editTable, editTableSaga),
    takeEvery(editTableSuccess, editTableSuccessSaga),
    takeEvery(deleteTable, deleteTableSaga),
    takeEvery(deleteTableSuccess, getTablesSaga),
  ]);
}

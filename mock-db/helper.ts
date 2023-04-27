import fs from 'fs';
import { randomBytes } from 'crypto';
import { AuthUser } from '@/shared/models/auth-user.model';
import { ApiResponse } from '@/shared/models/response.model';
import { TableModel } from '@/shared/models/table.model';
import { GamePresenterModel } from '@/shared/models/game-presenter.model';

const DATA_FILE = './mock-db/data.json';
const LOCAL_FILE = './mock-db/data.local.json';

const checkLocalFile = (): void => {
  // Check if local data file exists
  if (!fs.existsSync(LOCAL_FILE)) {
    fs.copyFileSync(DATA_FILE, LOCAL_FILE);
  }
};

export interface FakeDB {
  authUsers: ApiResponse<AuthUser>;
  tables: ApiResponse<TableModel>;
  gamePresenters: ApiResponse<GamePresenterModel>;
}

export const generateGUID = () => {
  const buffer = randomBytes(16);
  buffer[6] = (buffer[6] & 0x0f) | 0x40; // set version to 4
  buffer[8] = (buffer[8] & 0x3f) | 0x80; // set variant to RFC 4122
  return buffer.toString('hex').toUpperCase();
};

// MOCK API

const fakeDB = {
  read: (
    cb: (d: FakeDB) => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    checkLocalFile();
    fs.readFile(LOCAL_FILE, 'utf8', (err, data) => {
      if (err) {
        if (errCb) {
          errCb(err);
        }
        return;
      }

      if (cb && typeof cb === 'function') {
        const jsonData = JSON.parse(data);
        cb(jsonData);
      }
    });
  },
  getTable: (
    tableName: keyof FakeDB,
    cb: (d: FakeDB[keyof FakeDB]) => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    fakeDB.read((db) => {
      const table = db[tableName];
      cb(table);
    }, errCb);
  },
  add: (
    tableName: keyof FakeDB,
    addData: FakeDB[typeof tableName]['data'][number],
    cb: (addedData: FakeDB[typeof tableName]['data'][number]) => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    fakeDB.read(
      (db) => {
        const table = db[tableName];
        fs.writeFile(
          LOCAL_FILE,
          JSON.stringify(
            {
              ...db,
              [tableName]: {
                ...table,
                data: [...table.data, addData],
              },
            },
            null,
            2,
          ),
          (err) => {
            if (err) {
              errCb(err);
              return;
            }

            if (cb && typeof cb === 'function') {
              cb(addData);
            }
          },
        );
      },
      (err) => {
        if (err) {
          errCb(err);
          return;
        }
      },
    );
  },
  update: (
    tableName: keyof FakeDB,
    putId: string,
    updateData: FakeDB[typeof tableName]['data'][number],
    cb: (updatedData: FakeDB[typeof tableName]['data'][number]) => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    fakeDB.read(
      (db) => {
        const table = db[tableName];
        fs.writeFile(
          LOCAL_FILE,
          JSON.stringify(
            {
              ...db,
              [tableName]: {
                ...table,
                data: table.data.map((row) => {
                  if (row.id === putId) {
                    const { id, ...restOfUpdate } = updateData;
                    return {
                      id: putId,
                      ...restOfUpdate,
                    };
                  }
                  return row;
                }),
              },
            },
            null,
            2,
          ),
          (err) => {
            if (err) {
              errCb(err);
              return;
            }

            if (cb && typeof cb === 'function') {
              cb(updateData);
            }
          },
        );
      },
      (err) => {
        if (err) {
          errCb(err);
          return;
        }
      },
    );
  },
  delete: (
    tableName: keyof FakeDB,
    deleteId: string,
    cb: () => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    fakeDB.read(
      (db) => {
        const table = db[tableName];
        fs.writeFile(
          LOCAL_FILE,
          JSON.stringify(
            {
              ...db,
              [tableName]: {
                ...table,
                data: table.data.filter((row) => row.id !== deleteId),
              },
            },
            null,
            2,
          ),
          (err) => {
            if (err) {
              errCb(err);
              return;
            }

            if (cb && typeof cb === 'function') {
              cb();
            }
          },
        );
      },
      (err) => {
        if (err) {
          errCb(err);
          return;
        }
      },
    );
  },
};

export default fakeDB;

import fs from 'fs';

const DATA_FILE = './mock-db/data.json';
// MOCK API

const fakeDB = {
  read: <T>(
    tableName: string,
    cb: (d: T) => void,
    errCb: (e: NodeJS.ErrnoException) => void,
  ) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) {
        if (errCb) {
          errCb(err);
        }
        return;
      }

      if (cb && typeof cb === 'function') {
        const jsonData = JSON.parse(data);
        cb(jsonData[tableName] as T);
      }
    });
  },
};

export default fakeDB;

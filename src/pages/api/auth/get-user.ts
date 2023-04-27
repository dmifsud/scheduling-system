// import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from '../../../../mock-db/helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      fakeDB.getTable(
        'authUsers',
        (response) => {
          res.status(200).json(response.data[0]); // TODO: get and check token
        },
        (err) => {
          console.log(err);
        },
      );
  }
}

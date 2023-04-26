// import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from '../../../../mock-db/helper';
import { AuthUser } from '@/shared/models/auth-user.model';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      fakeDB.read<AuthUser[]>(
        'auth-users',
        (data) => {
          res.status(200).json(data[0]); // TODO: get and check token
        },
        (err) => {
          console.log(err);
        },
      );
  }
}

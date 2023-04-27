// import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB, { generateGUID } from '../../../../mock-db/helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      fakeDB.getTable(
        'authUsers',
        (response) => {
          const fakeToken = req.cookies['auth'];
          if (fakeToken) {
            const userFound = response.data.find(
              (user) => (user as any).fakeAuthToken === fakeToken,
            );
            if (userFound) {
              const { fakeAuthToken, hashedPassword, ...restOfUser } =
                userFound as any;
              res.status(200).json(restOfUser);
            } else {
              res.status(401).json({ message: 'Unauthorized' });
            }
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from '../../../../mock-db/helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      fakeDB.getTable(
        'authUsers',
        (response) => {
          const fakeToken = req.cookies['auth'];
          if (fakeToken) {
            const userFound = response.data.find(
              (user) => (user as any).fakeAuthToken === fakeToken,
            );
            if (userFound) {
              const { fakeAuthToken, ...restOfUser } = userFound as any;
              fakeDB.update(
                'authUsers',
                userFound.id,
                {
                  ...restOfUser,
                  fakeAuthToken: '',
                },
                () => {
                  res.status(200).json({ message: 'Successfully logged out' });
                },
                (err) => {
                  res
                    .status(err.errno ?? 500)
                    .json({ message: 'Error signing out ' });
                },
              );
            } else {
              res.status(401).json({ message: 'Unauthorized' });
            }
          } else {
            res.status(401).json({ message: 'Unauthorized' });
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }
}

// import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB, { generateGUID } from '../../../../mock-db/helper';
import { AuthUser } from '@/shared/models/auth-user.model';
import crypto from 'crypto';

type DBAuthUser = AuthUser & { fakeAuthToken: string; hashedPassword: string };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const loginBody = req.body as { email: string; password: string };
      fakeDB.getTable(
        'authUsers',
        (response) => {
          const userFound = response.data.find(
            (user) => (user as DBAuthUser).email === loginBody.email,
          ) as DBAuthUser | undefined;

          if (userFound) {
            const hash = crypto
              .pbkdf2Sync(
                userFound.username + loginBody.password,
                'salt',
                1000,
                64,
                'sha512',
              )
              .toString('hex');

            if (userFound.hashedPassword === hash) {
              const fakeToken = generateGUID();

              fakeDB.update(
                'authUsers',
                userFound.id,
                {
                  ...userFound,
                  lastLoggedIn: new Date().toISOString(),
                  fakeAuthToken: fakeToken,
                } as DBAuthUser,
                (updatedData) => {
                  const { fakeAuthToken, hashedPassword, ...restOfUser } =
                    updatedData as DBAuthUser;
                  res.setHeader(
                    'Set-Cookie',
                    `auth=${fakeAuthToken}; SameSite=None; Secure; Path=/; httpOnly=false`,
                  );
                  res.status(200).json({
                    ...restOfUser,
                    lastLoggedIn: userFound.lastLoggedIn,
                  });
                },
                (_err) => {
                  res.status(401).json({ message: 'Invalid credentials ' });
                },
              );
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }
}

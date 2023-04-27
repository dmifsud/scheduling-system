import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB, { FakeDB } from '../../../../mock-db/helper';

const TABLE_NAME: keyof FakeDB = 'gamePresenters';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // res.end(`Post: ${slug.join(', ')}`)

  const idRef = `${id?.toString()}`;

  switch (req.method) {
    case 'GET':
      fakeDB.getTable(
        TABLE_NAME,
        (response) => {
          res.status(200).json(response.data.find((item) => item.id === id));
        },
        (err) => {
          console.log(err);
        },
      );
      break;
    case 'PUT':
      fakeDB.update(
        TABLE_NAME,
        idRef,
        req.body,
        (response) => {
          res.status(200).json({
            ...response,
            id: idRef,
          });
        },
        (err) => {
          console.log(err);
        },
      );
      break;
    case 'DELETE':
      fakeDB.delete(
        TABLE_NAME,
        idRef,
        () => {
          res.status(200).json({ message: `'${idRef}' deleted successfully` });
        },
        (err) => {
          console.log(err); // TODO: update these with proper response error
        },
      );
      break;
  }
}

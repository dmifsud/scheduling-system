import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB, { FakeDB, generateGUID } from '../../../../mock-db/helper';

const TABLE_NAME: keyof FakeDB = 'gamePresenters';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Handle GET request for game-presenters
      // TODO: create response type
      fakeDB.getTable(
        TABLE_NAME,
        (data) => {
          setTimeout(() => {
            res.status(200).json(data); // TO Test delay
          }, 500);
        },
        (err) => {
          console.log(err);
        },
      );
      break;
    case 'POST':
      // Handle POST request to create a new game presenter
      fakeDB.add(
        TABLE_NAME,
        {
          ...req.body,
          id: generateGUID(),
        },
        (responseData) => {
          res.status(201).json(responseData);
        },
        (err) => {
          console.log(err);
        },
      );
      break;
    case 'PUT':
      // Handle PUT request to update a table

      break;
    case 'DELETE':
      // Handle DELETE request to delete a game presenter
      res.status(200).json({ message: 'DELETE game-presenters' });
      break;
    default:
      // Handle unsupported request method
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

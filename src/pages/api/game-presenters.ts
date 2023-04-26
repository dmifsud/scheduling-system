import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from '../../../mock-db/helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Handle GET request for game-presenters
      // TODO: create response type
      fakeDB.read(
        'game-presenters',
        (data) => {
          res.status(200).json(data);
        },
        (err) => {
          console.log(err);
        },
      );
      break;
    case 'POST':
      // Handle POST request to create a new game presenter
      res.status(201).json({ message: 'POST game-presenters' });
      break;
    case 'PUT':
      // Handle PUT request to update a game presenter
      res.status(200).json({ message: 'PUT game-presenters' });
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

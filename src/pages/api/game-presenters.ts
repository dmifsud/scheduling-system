import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Handle GET request for game-presenters
      res.status(200).json({
        // TODO: create response type
        data: [
          {
            id: 1,
            name: 'John Doe',
            shift: 'Morning',
            table: 'Table 1',
            breakSlot: '10:00 AM - 10:30 AM',
          },
          {
            id: 2,
            name: 'Jane Smith',
            shift: 'Afternoon',
            table: 'Table 2',
            breakSlot: '2:00 PM - 2:30 PM',
          },
          {
            id: 3,
            name: 'Bob Johnson',
            shift: 'Evening',
            table: 'Table 3',
            breakSlot: '6:00 PM - 6:30 PM',
          },
          {
            id: 4,
            name: 'Alice Lee',
            shift: 'Morning',
            table: 'Table 4',
            breakSlot: '10:30 AM - 11:00 AM',
          },
          {
            id: 5,
            name: 'Tom Brown',
            shift: 'Afternoon',
            table: 'Table 5',
            breakSlot: '3:00 PM - 3:30 PM',
          },
        ],
      });
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

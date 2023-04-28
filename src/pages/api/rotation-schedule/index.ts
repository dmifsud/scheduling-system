import { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from '../../../../mock-db/helper';
import { RotationScheduleResponse } from '@/shared/models/rotation-schedule.model';
import { ApiResponse } from '@/shared/models/response.model';
import { GamePresenterModel } from '@/shared/models/game-presenter.model';

function findGPFullName(gpList: GamePresenterModel[], id: string): string {
  const gp = gpList.find((gp) => gp.id === id);

  if (gp) {
    return `${gp.name} ${gp.surname}`;
  }
  return '';
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      fakeDB.getTable(
        'rotationSchedule',
        (response) => {
          res.status(200).json(response);
        },
        (err) => {
          console.log(err);
        },
      );
      break;
  }
}

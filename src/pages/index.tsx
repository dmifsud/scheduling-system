import Image from 'next/image'
import { Inter } from 'next/font/google'
import withAuth from '@/core/hoc/Auth'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { RotationScheduleResponse } from '@/shared/models/rotation-schedule.model';

// const inter = Inter({ subsets: ['latin'] })

function generateTimeSlots(startTime: string, endTime: string): string[] {
  const timeSlots: string[] = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    timeSlots.push(`${currentTime} - ${addMinutes(currentTime, 20)}`);
    currentTime = addMinutes(currentTime, 20);
  }

  return timeSlots;
}

function addMinutes(time: string, minutes: number): string {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setMinutes(date.getMinutes() + minutes);
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

// Example usage:
const timeSlots = generateTimeSlots('07:00', '23:40');
const nightSlots = generateTimeSlots('00:00', '06:40');
console.log(timeSlots); // ['07:00 - 07:20', '07:20 - 07:40', '07:40 - 08:00', ..., '23:20 - 23:40']
console.log(nightSlots);
const rows = [
  {
    gpName: 'Dave',
    tables: ['Table 1', 'Table 2', 'Table 3', 'Break']
  },
  {
    gpName: 'John',
    tables: ['Table 2', 'Table 3', 'Break', 'Table 1']
  }
];

const dummyResponse: RotationScheduleResponse[] = [
  {
    "id": "1",
    "gamePresenterTables": [
      {
        "gamePresenterId": "1",
        "gamePresenterName": "John Doe",
        "gamePresenterTables": [
          {
            "tableId": "3AFC8023514C407E882F77D05ED27C15",
            "isBreak": false,
            "tableName": "Table 1"
          },
          {
            "tableId": null,
            "isBreak": true,
            "tableName": ""
          }
        ]
      }
    ]
  }
];

const allTimeSlots = [...timeSlots, ...nightSlots];
console.log('time slots amount', allTimeSlots.length);
function Home() {
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {allTimeSlots.map((slot, i) => <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: (i % 2) ? 'aliceblue' : 'none' }} key={i}>{slot}</TableCell>)}

              </TableRow>
            </TableHead>
            <TableBody>
              {dummyResponse[0].gamePresenterTables.map((row, rowNum) => (
                <TableRow
                  key={row.gamePresenterId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (rowNum % 2) ? 'aliceblue' : 'none' }}
                >
                  <TableCell component="th" scope="row">
                    {row.gamePresenterName}
                  </TableCell>
                  {row.gamePresenterTables.map((table, i) => <TableCell key={i} sx={{ backgroundColor: ((i) % 2) ? 'aliceblue' : 'none' }}>{table.isBreak ? 'Break' : table.tableName}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper >
    </>
  )
}


export default withAuth(Home);
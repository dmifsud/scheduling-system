import withAuth from '@/core/hoc/Auth'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useGetTodaysRotationScheduleSelector } from '@/store/selectors/get-rotation-schedules.selectors';
import { getRotationSchedules } from '@/store/get-rotation-schdules.slice';

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
const allTimeSlots = [...timeSlots, ...nightSlots];
console.log('time slots amount', allTimeSlots.length);


function Home() {

  const dispatch = useDispatch();
  const todaysRotationSchedule = useGetTodaysRotationScheduleSelector();


  useEffect(() => {
    dispatch(getRotationSchedules());
  }, [dispatch])

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
              {todaysRotationSchedule && todaysRotationSchedule.gamePresenterTables.map((row) => (
                <TableRow
                  key={row.gamePresenterName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f1f1f1' }, '&:hover td': { backgroundColor: '#f1f1f1' } }}
                >
                  <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap ' }}>
                    {row.gamePresenterName}
                  </TableCell>
                  {row.tableTimeSlots.map((table, i) => <TableCell key={i} sx={{ backgroundColor: ((i) % 2) ? 'aliceblue' : 'none' }}>{table.tableNameOrBreak}</TableCell>)}
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
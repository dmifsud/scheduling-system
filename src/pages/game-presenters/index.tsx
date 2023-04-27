import TransitionModal from '@/components/transition-modal';
import withAuth from '@/core/hoc/Auth';
import { getGamePresenters } from '@/store/game-presenters.slice';
import { useGamePresentersStateSelector } from '@/store/selectors/game-presenters.selectors';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button, TextField } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchGamePresenters } from '../store/game-presenters/actions';
// import { GamePresenter } from '../store/game-presenters/types';

interface Values {
  name: string;
  surname: string;
}


interface GamePresentersProps { }

const GamePresenters: React.FC<GamePresentersProps> = () => {

  const dispatch = useDispatch();
  const { data } = useGamePresentersStateSelector();


  useEffect(() => {
    console.log('calling');
    dispatch(getGamePresenters());
  }, []);

  return (
    <div>
      <h1>Game Presenters</h1>
      <TransitionModal title="Add Game Presenter">
        <Formik
          initialValues={{
            name: '',
            surname: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
          ) => {
            console.log(values);
            setSubmitting(false);
          }}
          validationSchema={object({
            name: string().required('Name required'),
            surname: string().required('Surname required')
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) && errors.name}
              />
              <Box height={14} />
              <Field
                name="surname"
                as={TextField}
                label="Surname"
                fullWidth
                error={Boolean(errors.surname) && Boolean(touched.surname)}
                helperText={Boolean(touched.surname) && errors.surname}
              />
              <Box height={14} />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disableElevation
                disabled={!dirty || !isValid}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </TransitionModal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Shift</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((gamePresenter) => (
              <TableRow
                key={gamePresenter.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {gamePresenter.name}
                </TableCell>
                <TableCell align="right">{gamePresenter.shift}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withAuth(GamePresenters);

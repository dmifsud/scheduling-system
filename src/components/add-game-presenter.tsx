import { addGamePresenter } from '@/store/add-game-presenters.slice';
import { TextField, Box, Button } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useAddGamePresenterStateSelector } from '../store/selectors/add-game-presenters.selectors';

interface Values {
    name: string;
    surname: string;
}

const AddGamePresenter: React.FC = () => {

    const dispatch = useDispatch();

    const { loading } = useAddGamePresenterStateSelector();

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
            }}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>,
            ) => {
                const { name, surname } = values;
                dispatch(addGamePresenter({
                    name,
                    surname,
                    shift: 'Afternoon', // TODO: remove this
                    table: 'Table 3',
                    breakSlot: '10:00 AM - 10:30 AM'
                }))
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
                        disabled={loading}
                    />
                    <Box height={14} />
                    <Field
                        name="surname"
                        as={TextField}
                        label="Surname"
                        fullWidth
                        error={Boolean(errors.surname) && Boolean(touched.surname)}
                        helperText={Boolean(touched.surname) && errors.surname}
                        disabled={loading}
                    />
                    <Box height={14} />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disableElevation
                        disabled={!dirty || !isValid || loading}
                    >
                        {loading ? <>Adding&hellip;</> : <>Add</>}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default AddGamePresenter;
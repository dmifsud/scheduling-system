import { TextField, Box, Button, Paper, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth.slice';
import { LoginPayload } from '@/sagas/auth.sagas';

interface Values {
    email: string;
    password: string;
}


const Login: React.FC = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <Paper sx={{ maxWidth: 400, p: 2, margin: '20px auto' }}>
                <Typography
                    variant="h6"
                    noWrap
                >
                    Login
                </Typography>
                <Box height={14} />
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>,
                    ) => {
                        console.log(values);

                        const { email, password } = values;

                        dispatch(login({
                            email,
                            password
                        }));

                        setSubmitting(false);
                    }}
                    validationSchema={object({
                        email: string().required('Name required').email('Invalid email'),
                        password: string().required('Surname required')
                    })}
                >
                    {({ errors, isValid, touched, dirty }) => (
                        <Form>
                            <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                fullWidth
                                type="email"
                                error={Boolean(errors.email) && Boolean(touched.email)}
                                helperText={Boolean(touched.email) && errors.email}
                            />
                            <Box height={14} />
                            <Field
                                name="password"
                                as={TextField}
                                label="Password"
                                fullWidth
                                type="password"
                                error={Boolean(errors.password) && Boolean(touched.password)}
                                helperText={Boolean(touched.password) && errors.password}
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
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>

            </Paper>
        </div>
    );
};

export default Login;
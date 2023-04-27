import { TextField, Box, Button } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { object, string } from 'yup';

interface Values {
    email: string;
    password: string;
}


const Login: React.FC = () => {

    return (

        <div>
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
        </div>
    );
};

export default Login;
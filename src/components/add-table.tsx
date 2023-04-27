import { TextField, Box, Button } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { object, string } from 'yup';

interface Values {
    name: string;
}

const AddTable: React.FC = () => {

    // const dispatch = useDispatch();


    return (
        <Formik
            initialValues={{
                name: '',
            }}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>,
            ) => {
                console.log(values);
                setSubmitting(false);
            }}
            validationSchema={object({
                name: string().required('Table name required'),
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
    )
}

export default AddTable;
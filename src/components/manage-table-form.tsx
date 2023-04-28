import { TableModel } from '@/shared/models/table.model';
import { addTable } from '@/store/add-table.slice';
import { editTable } from '@/store/edit-table.slice';
import { useAddTableStateSelector } from '@/store/selectors/add-table.selectors';
import { useEditTableStateSelector } from '@/store/selectors/edit-table.selectors';
import { TextField, Box, Button } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

interface Values {
    name: string;
}

type ManageTableFormProps = {
    table?: TableModel
}

const ManageTableForm: React.FC<ManageTableFormProps> = ({
    table
}: ManageTableFormProps) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { loading: addLoading } = useAddTableStateSelector();
    const { loading: editLoading } = useEditTableStateSelector();

    const generateSubmitButtonText = () => {
        if (Boolean(table)) {
            return editLoading ? <>Updating&hellip;</> : <>Update</>;
        }
        return addLoading ? <>Adding&hellip;</> : <>Add</>;
    }

    useEffect(() => {
        setLoading(addLoading || editLoading);
    }, [addLoading, editLoading]);

    return (
        <Formik
            initialValues={{
                name: table?.name ?? '',
            }}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>,
            ) => {
                const { name } = values;
                if (table) {
                    dispatch(editTable({
                        ...table,
                        name
                    }));
                } else {
                    dispatch(addTable({
                        name
                    }));
                }
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
                        {generateSubmitButtonText()}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default ManageTableForm;
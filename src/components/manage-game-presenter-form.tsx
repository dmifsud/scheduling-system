import { addGamePresenter } from '@/store/add-game-presenters.slice';
import { TextField, Box, Button } from '@mui/material';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useAddGamePresenterStateSelector } from '../store/selectors/add-game-presenters.selectors';
import { GamePresenterModel } from '@/shared/models/game-presenter.model';
import { editGamePresenter } from '@/store/edit-game-presenters.slice';
import { useEditGamePresenterStateSelector } from '@/store/selectors/edit-game-presenters.selectors';

interface Values {
    name: string;
    surname: string;
}

type ManageGamePresenterFormProps = {
    gamePresenter?: GamePresenterModel
};

const ManageGamePresenterForm: React.FC<ManageGamePresenterFormProps> = ({
    gamePresenter,
}: ManageGamePresenterFormProps) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { loading: addLoading } = useAddGamePresenterStateSelector();
    const { loading: editLoading } = useEditGamePresenterStateSelector();

    const generateSubmitButtonText = () => {
        if (Boolean(gamePresenter)) {
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
                name: gamePresenter?.name ?? '',
                surname: gamePresenter?.surname ?? '',
            }}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>,
            ) => {
                const { name, surname } = values;
                if (gamePresenter) { // Edit
                    dispatch(editGamePresenter({
                        ...gamePresenter,
                        name,
                        surname
                    }));
                } else {
                    dispatch(addGamePresenter({
                        name,
                        surname,
                        shift: 'Afternoon', // TODO: remove this
                        table: 'Table 3',
                        breakSlot: '10:00 AM - 10:30 AM'
                    }))
                }
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
                        {generateSubmitButtonText()}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default ManageGamePresenterForm;
import ManageGamePresenterForm from '@/components/manage-game-presenter-form';
import TransitionModal from '@/components/transition-modal';
import { useAddGamePresenterStateSelector } from '@/store/selectors/add-game-presenters.selectors';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';


const AddGamePresenterModal: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loaded } = useAddGamePresenterStateSelector();

    useEffect(() => {
        console.log('loaded', loaded);
        if (loaded) {
            setOpen(false);
        }
    }, [loaded]);

    return (
        <>

            <Button onClick={handleOpen}>Add Game Presenter</Button>

            <TransitionModal title="Add Game Presenter" open={open} onClose={handleClose}>
                <ManageGamePresenterForm />
            </TransitionModal>
        </>
    )
}

export default AddGamePresenterModal;
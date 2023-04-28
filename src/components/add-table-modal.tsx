import TransitionModal from '@/components/transition-modal';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ManageTableForm from './manage-table-form';
import { useAddTableStateSelector } from '@/store/selectors/add-table.selectors';


const AddTableModal: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loaded } = useAddTableStateSelector();

    useEffect(() => {
        if (loaded) {
            setOpen(false);
        }
    }, [loaded]);

    return (
        <>
            <Button onClick={handleOpen}>Add Table</Button>
            <TransitionModal title="Add Table" open={open} onClose={handleClose}>
                <ManageTableForm />
            </TransitionModal>
        </>
    )
}

export default AddTableModal;
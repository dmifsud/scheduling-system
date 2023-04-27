import TransitionModal from '@/components/transition-modal';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import AddTable from './add-table';


const AddTableModal: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const { loaded } = useAddGamePresenterStateSelector();

    // useEffect(() => {
    //     console.log('loaded', loaded);
    //     if (loaded) {
    //         setOpen(false);
    //     }
    // }, [loaded]);

    return (
        <>

            <Button onClick={handleOpen}>Add Table</Button>

            <TransitionModal title="Add Table" open={open} onClose={handleClose}>
                <AddTable />
            </TransitionModal>
        </>
    )
}

export default AddTableModal;
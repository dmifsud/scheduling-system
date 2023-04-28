import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropsWithChildren, useEffect, useState } from 'react';

type ConfirmDialogProps = {
    title: string;
    description: string;
    open: boolean;
    onClose?: (confirm?: boolean) => void;
} & PropsWithChildren

const ConfirmDialog = ({
    title,
    description,
    open,
    onClose,
    children
}: ConfirmDialogProps) => {
    const [isOpen, setOpen] = useState(open || false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = (confirm?: boolean) => {
        if (onClose) {
            onClose(confirm);
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        setOpen(open);
    }, [open]);

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
             */}
            {children}
            <Dialog
                open={isOpen}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>No</Button>
                    <Button onClick={() => handleClose(true)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default ConfirmDialog;
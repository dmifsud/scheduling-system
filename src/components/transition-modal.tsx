import { Backdrop, Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 1,
};


interface ModalProps {
    title: string;
    children?: React.ReactNode;
}

const TransitionModal: React.FC<ModalProps> = ({
    title,
    children
}) => {



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Card sx={style}>
                        <CardHeader title={title}>

                        </CardHeader>
                        <CardContent>

                            <Typography variant="h5" component="div">

                            </Typography>

                            <div>
                                {children}
                            </div>
                        </CardContent>
                        {/* <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                    </Card>
                </Fade>
            </Modal>
        </div>










    );
};

export default TransitionModal;
import TransitionModal from '@/components/transition-modal';
import withAuth from '@/core/hoc/Auth';
import { Box, TextField } from '@mui/material';
import { useEffect } from 'react';


const Tables: React.FC = () => {

    //   const dispatch = useDispatch();


    useEffect(() => {
        console.log('loaded tables page');
    }, []);

    return (
        <div>
            <h1>Tables</h1>
            <TransitionModal title="Add Table">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            error
                            id="outlined-error"
                            label="Error"
                            defaultValue="Hello World"
                        />
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="Error"
                            defaultValue="Hello World"
                            helperText="Incorrect entry."
                        />
                    </div>
                </Box>
            </TransitionModal>
        </div>
    );
};

export default withAuth(Tables);

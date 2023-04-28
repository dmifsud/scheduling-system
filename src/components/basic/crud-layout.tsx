import { PropsWithChildren } from 'react';
import { Box, Typography, Grid } from '@mui/material';
type CrudLayoutProps = {
    pageTitle: string;
    addAction: any;
} & PropsWithChildren;

const CrudLayout: React.FC<CrudLayoutProps> = ({
    pageTitle,
    addAction,
    children
}: CrudLayoutProps) => {
    return (
        <div>
            <Box sx={{ p: 4, margin: '20px auto' }}>

                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Typography
                            variant="h4"
                            noWrap
                        >
                            {pageTitle}
                        </Typography>
                    </Grid>
                    <Grid xs={4} sx={{ textAlign: 'right' }}>
                        {addAction}
                    </Grid>
                    <Grid xs={12}>
                        <Box height={20} />
                        {children}
                    </Grid>
                </Grid>

            </Box>
        </div>
    )
}

export default CrudLayout;
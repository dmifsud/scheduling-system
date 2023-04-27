import { useAddGamePresenterStateSelector } from '@/store/selectors/add-game-presenters.selectors';
import { useEffect } from 'react';
import { getGamePresenters } from '@/store/game-presenters.slice';
import { useGamePresentersStateSelector } from '@/store/selectors/game-presenters.selectors';
import { useDispatch } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Skeleton,
} from '@mui/material';

const SkeletonRow: React.FC = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant="text" width="100%" height={45} />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" width="100%" height={45} />
            </TableCell>
            <TableCell align="right">
                <Skeleton variant="text" width="100%" height={45} />
            </TableCell>
            <TableCell align="right">
                <Skeleton variant="text" width="100%" height={45} />
            </TableCell>
            <TableCell align="right">
                <Skeleton variant="text" width="100%" height={45} />
            </TableCell>
        </TableRow>
    )
}


const GamePresentersTable: React.FC = () => {

    const dispatch = useDispatch();
    const { data, loading } = useGamePresentersStateSelector();
    const { loaded } = useAddGamePresenterStateSelector();

    useEffect(() => {
        dispatch(getGamePresenters());
    }, []); // run once on init

    useEffect(() => {
        if (loaded) {
            dispatch(getGamePresenters());
        }
    }, [loaded]); // re-run when loaded changes

    const handleEdit = (id: string) => {
        console.log('edit', id);
    };

    const handleDelete = (id: string) => {
        console.log('delete', id);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell align="right">Shift</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {(loading && !data) ?
                        new Array(4).fill(null).map((_, i) => <SkeletonRow key={i} />)

                        : data && data.map((gamePresenter) => (
                            <TableRow
                                key={gamePresenter.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {gamePresenter.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {gamePresenter.surname}
                                </TableCell>
                                <TableCell align="right">{gamePresenter.shift}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="large"
                                        onClick={() => handleEdit(gamePresenter.id)}
                                        color="inherit"
                                    >
                                        <ModeEditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="large"
                                        onClick={() => handleDelete(gamePresenter.id)}
                                        color="inherit"
                                    >
                                        <DeleteOutlineIcon />
                                        {/* <LoopIcon sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }} /> */}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}



                    {loaded && loading && (
                        <SkeletonRow />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GamePresentersTable;
import { useAddGamePresenterStateSelector } from '@/store/selectors/add-game-presenters.selectors';
import React, { useEffect, useState } from 'react';
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
import ConfirmDialog from './basic/confirm-dialog';
import TransitionModal from '@/components/transition-modal';
import AddGamePresenter from '@/components/add-game-presenter';
import { useEditGamePresenterStateSelector } from '@/store/selectors/edit-game-presenters.selectors';
import { deleteGamePresenter } from '@/store/delete-game-presenter.slice';

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
    );
};

const GamePresentersTable: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading } = useGamePresentersStateSelector();
    const { loaded: addLoaded } = useAddGamePresenterStateSelector();
    const { loaded: editLoaded, loading: editLoading, data: updatedRow } = useEditGamePresenterStateSelector();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState('');

    useEffect(() => {
        dispatch(getGamePresenters());
    }, [dispatch]); // run once on init

    useEffect(() => {
        if (addLoaded) {
            dispatch(getGamePresenters());
        }
    }, [dispatch, addLoaded]); // re-run when loaded changes

    useEffect(() => {
        setEditDialogOpen('');
    }, [editLoaded])

    const handleEdit = (id: string) => {
        setEditDialogOpen(id);
    };

    const handleDelete = (id: string, confirmDelete?: boolean) => {
        if (confirmDelete) {
            dispatch(deleteGamePresenter(id));
        }
        setDeleteDialogOpen('');
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
                    {loading && !data
                        ? new Array(4).fill(null).map((_, i) => <SkeletonRow key={i} />)
                        : data &&
                        data.map((gamePresenter, i) => (
                            <React.Fragment key={gamePresenter.id}>
                                {editLoading && updatedRow?.id === gamePresenter.id ?
                                    <SkeletonRow />
                                    :
                                    <TableRow
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
                                            <TransitionModal
                                                title={`Edit ${gamePresenter.name} ${gamePresenter.surname}`}
                                                open={editDialogOpen === gamePresenter.id}
                                                onClose={() => setEditDialogOpen('')}
                                            >
                                                <AddGamePresenter gamePresenter={gamePresenter} />
                                            </TransitionModal>
                                            <IconButton
                                                size="large"
                                                onClick={() => handleEdit(gamePresenter.id)}
                                                color="inherit"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <ConfirmDialog
                                                title="Delete Game Presenter"
                                                open={deleteDialogOpen === gamePresenter.id}
                                                description={`Are you sure you want to delete Game Presenter ${gamePresenter.name} ${gamePresenter.surname}?`}
                                                onClose={(confirm) =>
                                                    handleDelete(gamePresenter.id, confirm)
                                                }
                                            >
                                                <IconButton
                                                    size="large"
                                                    onClick={() => {
                                                        setDeleteDialogOpen(gamePresenter.id);
                                                    }}
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
                                            </ConfirmDialog>
                                        </TableCell>
                                    </TableRow>
                                }
                            </React.Fragment>
                        ))}

                    {addLoaded && loading && <SkeletonRow />}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GamePresentersTable;
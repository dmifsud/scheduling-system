import React, { useEffect, useState } from 'react';
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
import { getTables } from '@/store/get-tables.slice';
import { useGetTablesStateSelector } from '@/store/selectors/get-tables.selectors';
import { useEditTableStateSelector } from '@/store/selectors/edit-table.selectors';
import { useAddTableStateSelector } from '@/store/selectors/add-table.selectors';
import { deleteTable } from '@/store/delete-table.slice';
import ManageTableForm from './manage-table-form';

const SkeletonRow: React.FC = () => {
    return (
        <TableRow>
            <TableCell>
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

const TableListTable: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading } = useGetTablesStateSelector();
    const { loaded: addLoaded } = useAddTableStateSelector();
    const { loaded: editLoaded, loading: editLoading, data: updatedRow } = useEditTableStateSelector();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState('');

    useEffect(() => {
        dispatch(getTables());
    }, [dispatch]); // run once on init

    useEffect(() => {
        if (addLoaded) {
            dispatch(getTables());
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
            dispatch(deleteTable(id));
        }
        setDeleteDialogOpen('');
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loading && !data
                        ? new Array(4).fill(null).map((_, i) => <SkeletonRow key={i} />)
                        : data &&
                        data.map((table, i) => (
                            <React.Fragment key={table.id}>
                                {editLoading && updatedRow?.id === table.id ?
                                    <SkeletonRow />
                                    :
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {table.name}
                                        </TableCell>

                                        <TableCell align="right">
                                            <TransitionModal
                                                title={`Edit ${table.name}`}
                                                open={editDialogOpen === table.id}
                                                onClose={() => setEditDialogOpen('')}
                                            >
                                                <ManageTableForm table={table} />
                                            </TransitionModal>
                                            <IconButton
                                                size="large"
                                                onClick={() => handleEdit(table.id)}
                                                color="inherit"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <ConfirmDialog
                                                title="Delete Table"
                                                open={deleteDialogOpen === table.id}
                                                description={`Are you sure you want to delete ${table.name}?`}
                                                onClose={(confirm) =>
                                                    handleDelete(table.id, confirm)
                                                }
                                            >
                                                <IconButton
                                                    size="large"
                                                    onClick={() => {
                                                        setDeleteDialogOpen(table.id);
                                                    }}
                                                    color="inherit"
                                                >
                                                    <DeleteOutlineIcon />
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

export default TableListTable;
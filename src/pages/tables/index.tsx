import AddTableModal from '@/components/add-table-modal';
import TableListTable from '@/components/table-list-table';
import withAuth from '@/core/hoc/Auth';
import { useEffect } from 'react';
import CrudLayout from '../../components/basic/crud-layout';


const Tables: React.FC = () => {

    return (
        <div>
            <CrudLayout pageTitle="Tables" addAction={<AddTableModal />}>
                <TableListTable />
            </CrudLayout>
        </div>
    );
};

export default withAuth(Tables);

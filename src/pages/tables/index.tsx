import AddTableModal from '@/components/add-table-modal';
import TableListTable from '@/components/table-list-table';
import withAuth from '@/core/hoc/Auth';
import { useEffect } from 'react';


const Tables: React.FC = () => {
    //   const dispatch = useDispatch();

    useEffect(() => {
        console.log('loaded tables page');
    }, []);

    return (
        <div>
            <h1>Tables</h1>
            <AddTableModal />
            <TableListTable />
        </div>
    );
};

export default withAuth(Tables);

import AddTableModal from '@/components/add-table-modal';
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
        </div>
    );
};

export default withAuth(Tables);

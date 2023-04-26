import TransitionModal from '@/components/transition-modal';
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
            <TransitionModal title="Add Table">
                table form here
            </TransitionModal>
        </div>
    );
};

export default withAuth(Tables);

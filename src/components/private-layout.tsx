import React from 'react';
import DAppBar from './app-bar';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <DAppBar />
            {children}
        </>
    );
};

export default PrivateLayout;
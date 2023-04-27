import React, { Component, PropsWithChildren, useEffect } from 'react';





import { NextComponentType } from "next";
import DAppBar from '@/components/app-bar';
import { useUser } from '@/lib/customHooks';
import Login from '@/components/login';


function withAuth(Component: NextComponentType) {
    const Auth = () => {

        const { authenticated, loading } = useUser();
        // Login data added to props via redux-store (or use react context for example)
        // const { isLoggedIn } = props;
        if (loading) {
            return <div>Loading...</div>
        }

        return <>
            {
                authenticated ? <>
                    <DAppBar></DAppBar>
                    <Component />
                </> : <Login />
            }
        </>



    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
}

export default withAuth;
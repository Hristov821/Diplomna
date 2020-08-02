import React from 'react';

import useRedirect      from  '../Utils/RedirectHook'

const HomeComponent = ({global_state, update_global_state}) => {
    const [_, redirect] = useRedirect()

    if (global_state.logged_in === false){
        redirect("/login")
    }
    return (
        <>
            <div>Current state is "{global_state.logged_in}"</div>
            <div>Current state is {global_state.username}</div>
            <div>Current state is {global_state.password}</div>
            <div>Current state is {global_state.access_token}</div>
        </>
    );
};

export default HomeComponent;
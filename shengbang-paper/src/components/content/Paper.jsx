import React from 'react';
import {Outlet} from "react-router-dom";
function Paper() {

    return (
        <div className={`h-screen w-full`}>
            <div className={`h-full w-full `}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Paper;
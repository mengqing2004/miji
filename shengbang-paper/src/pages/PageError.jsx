import {useRouteError} from "react-router-dom";
import React from "react";

function PageError(props) {
    const error=useRouteError()
    console.log(error)
    return (
        <div>
            <h1>页面出错了</h1>
            <p>
                <i>{error.statusText||error.message}</i>
            </p>
        </div>
    );
}

export default PageError;
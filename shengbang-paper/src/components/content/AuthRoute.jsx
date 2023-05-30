import React,{useEffect,useState} from 'react';
import {useStore} from "../../store/index.js";
import {getToken} from "../../utils/index.js";
import Layout from "../../pages/Layout.jsx";
import {Navigate} from "react-router-dom";

function AuthRoute() {
    const {userStore}=useStore()
    const [template,setTemplate]=useState(null)
    useEffect(()=>{
        if (getToken().length>0){
            userStore.getUserInfoFromApi().then(() => {
                setTemplate(<Layout/>)
            })
            // .catch(()=>{
            //     setTemplate(<Navigate to={"/login"}/>)
            // })
        }else {
            setTemplate(<Navigate to="/login" />);

        }
    },[])
    return (
        <>{template}</>
    );
}

export default AuthRoute;
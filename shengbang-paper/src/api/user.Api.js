import {http} from "../utils"

export const login=(params)=>{
    return http({
        url:'/private/login',
        method:"GET",
        params,
    })
}


export const getUserInfo=()=>{
    return http({
        url:"/private/user",
        method:"GET",
    })
}
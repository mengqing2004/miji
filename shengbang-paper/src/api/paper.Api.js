import {http} from '../utils'

export const getPaper=(params={})=>{
    return http({
        url:"/private/paper",
        method:"GET",
        params,
    })
}
export const getPaperDetail=(params)=>{
    return http({
        url:`/private/paper/${params}`,
        method:"GET",
    })
}

export const removePaper=(params)=>{
    return http({
        url:`/private/paper/${params}`,
        method:"DELETE",
    })
}

export const addPaper=(params)=>{
    return http({
        url:`/private/paper`,
        method:"POST",
        params,
    })
}

export const putPaper=(params)=>{
    return http({
        url:`/private/paper`,
        method:"PUT",
        params,
    })
}

export const randomPaper=(params)=>{
    return http({
        url:`/private/paper/random`,
        method:"GET",
        params,
    })
}
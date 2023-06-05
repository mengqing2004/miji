import {http} from "../utils";

export const getSubjects=(params)=>{
    return http({
        url:"/private/subject",
        method:"GET",
        params,
    });
};

// export const postSubject=(params)=>{
//     return http({
//         url:'/private/subject',
//         method:"POST",
//         params,
//     })
// }

export const addSubject = (data) => {
    return http.post(`/private/subject`, data);
};

export const renameSubject = (data) => {
    return http.put(`/private/subject`, data);
};
export const putSubject=(params)=>{
    return http({
        url:'/private/subject',
        method:"PUT",
        params,
    })
}
export const removeSubject=(params)=>{
    return http({
        url:`/private/subject/${params}`,
        method:"DELETE",
    })
}

export const sortSubject=(data)=>{
    return http({
        url:`/private/subject/sort`,
        method:"PUT",
        data,
    })
}

export const getChapters=(params)=>{
    return http({
        url:`/private/chapter/${params}`,
        method:"GET",
    });
};
export const postChapters=(params)=>{
    return http({
        url:'/private/chapter',
        method:"POST",
        params,
    })
}

export const putChapters=(params)=>{
    return http({
        url:'/private/chapter',
        method:"PUT",
        params,
    })
}

export const removeChapters=(params)=>{
    return http({
        url:`/private/chapter/${params}`,
        method:"DELETE",
    })
}


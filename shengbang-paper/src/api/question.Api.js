import {http} from "../utils";

export const getQuestion=(params)=>{
    return http({
        url:"/private/question",
        method:"GET",
        params,
    });
};
export const getQuestionList=(params)=>{
    return http({
        url:`/private/question/${params}`,
        method:"GET",
    });
};
export const removeQuestion=(params)=>{
    return http({
        url:`/private/question/${params}`,
        method:"DELETE",
    });
};
export const addQuestion = (params) => {
    return http({
        url: "/private/question",
        method: "POST",
        params,
    });
};
export const putQuestion = (params) => {
    return http({
        url: `/private/question`,
        method: "PUT",
        params,
    });
};


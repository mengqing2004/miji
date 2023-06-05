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
export const addQuestion = (data) => {
    return http({
        url: "/private/question",
        method: "post",
        data,
    });
};
export const putQuestion = (data) => {
    return http({
        url: `/private/question`,
        method: "PUT",
        data,
    });
};


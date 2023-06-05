import {http} from "@/utils"


/**
 * 获取章节
 * @param params
 * @returns {*}
 */
export const getChapterList = (subjectId) => {
    return http({
        url: `/private/chapter/${subjectId}`,
        method: "GET",
    });
};
/**
 * 删除章节
 */
export const deleteChapter = (chapterId) => {
    return http({
        url: `/private/chapter/${chapterId}`,
        method: "DELETE",
    });
};
/**
 * 添加章节
 */
export const addChapter = (data) => {
    return http({
        url: `/private/chapter`,
        method: "post",
        data,
    });
};

/**
 * 添加章节
 */
export const renameChapter = (data) => {
    return http({
        url: `/private/chapter`,
        method: "put",
        data,
    });
};
/**
 * 章节排序
 */
export const sortChapter = (data) => {
    console.log(data, 223467);
    return http({
        url: `/private/chapter/sort`,
        method: "put",
        data,
    });
};

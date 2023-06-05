import md5 from "md5";
// wechat.qhdboyi.com:9021
export const DevBaseURL = "http://wechat.qhdboyi.com:9021";
// export const DevBaseURL = "http://192.168.95.158:8155";
// export const DevBaseURL = "http://192.168.0.129:8155";
// export const DevBaseURL = "http://127.0.0.1:4523/m1/2576757-0-default";
export const ProdBaseURL = "https://online.xxx";
export const TokenKey = md5("userToken").slice(0, 5);
export const EncryptSalt = "shengbang";

export const QuestionDictionary = {
    type: { 1: "单选题", 2: "多选题", 3: "判断题", 4: "填空题", 5: "简答题" },
    typeOptions: [
        {
            value: 1,
            label: "单选题",
        },
        {
            value: 2,
            label: "多选题",
        },
        {
            value: 3,
            label: "判断题",
        },
        {
            value: 4,
            label: "填空题",
        },
        {
            value: 5,
            label: "简答题",
        },
    ],
    difficult: { 1: "简单", 2: "普通", 3: "困难" },
    difficultOptions: [
        {
            value: 1,
            label: "简单",
        },
        {
            value: 2,
            label: "普通",
        },
        {
            value: 3,
            label: "困难",
        },
    ],
};

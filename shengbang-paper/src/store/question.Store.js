import {makeAutoObservable,runInAction} from "mobx";
import {questionApi} from "@/api"
import { run } from "@/utils";
import {QuestionDictionary} from "@/config/index.js";
const defaultQuestionType=Object.keys(QuestionDictionary.type)[0];
const defaultDrawerConfig = {
    open: false,
    title: "题目管理",
    currentQuestionId: -1,
    currentQuestionType: defaultQuestionType,
};
class QuestionStore{
    isLoading=false;
    chapterId=-1;
    questionList=[]
    questionDetail={}
    //管理抽屉的变量
    drawerConfig = defaultDrawerConfig;
    questionRanDomList=[]

    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
    /**
     * 获取题目列表
     * @param chapterId
     * @returns {Promise<unknown>}
     */

    getQuestionList(chapterId){
        return run(this,questionApi.getQuestion({chapterId}))
            .then((res)=>{
            runInAction(()=>{
                this.chapterId=chapterId;
                this.questionList=res.data.list;
            })
        })
    }
    /**
     * 获取题目详情
     * @param questionId
     * @returns {*}
     */

    getQuestionDetail=({questionId})=>{
        console.log(questionId,'1111111111')
        return run(this,questionApi.getQuestionList(questionId))
            .then((res)=>{
                runInAction(()=>{
                    console.log(res,'resssss')
                    this.questionDetail=res.data;
                })
                return res;
            })
    }

    /**
     * 删除指定 questionId 的数据
     * @param questionId
     */

    deleteQuestion=(questionId)=>{
        return run(this,questionApi.removeQuestion(questionId))
            .then(()=>{
                console.log(questionId,'delete')
                runInAction(()=>{
                    console.log(this.questionList,'list')
                    this.questionList=this.questionList.filter((question)=>{
                        return question.questionId !== questionId;
                    })
                })
            })
    }


    // 添加
    addQuestion(params){
        return run(this,questionApi.addQuestion(params)).then(()=>{
            this.getQuestionList(this.chapterId).then(()=>{
                runInAction(()=>{
                    console.log(this.questionList, 'newData234234');
                    //TODO 测试新增题目后列表渲染状态，后台接口写完删除
                    // this.questionList.push({params})
                    this.questionList.push({
                        questionDifficulty: 1,
                        questionId: "642234",
                        questionName: "newnew",
                        questionType: 2,
                        updateTime: "2010-10-20 01:35:52",
                        userNickName: "强强强强",
                    });
                })
            })
        })
    }

    putQuestion=(params)=>{
        return run(this,questionApi.putQuestion(params)).then(()=>{
            this.setDrawerConfig(defaultDrawerConfig);
            return this.getQuestionList(this.chapterId)
        })
    }

    siftQuestion=(chapterId,questionType,questionDifficulty)=>{
        return run(this,questionApi.getQuestion({chapterId, questionType, questionDifficulty}))
            .then((res)=> {
                runInAction(() => {
                    console.log(res,'qqqqq')
                    this.chapterId = chapterId;
                    this.questionList = res.data.list;
                })
            })
    }

    //获取试卷下的题目列表
    getQuestionListForPage(params){
        console.log(params)
        return run(this,questionApi.getQuestion(params))
            .then((res)=>{
                runInAction(()=>{
                    this.questionList=res.data.list;
                })
            })
    }

    //随机
    getQuestionListRanDom(params){
            if (!questionApi.getQuestion(params)||!questionApi.getQuestion(params).then){
                throw new Error("run 必须传入Promise")
            }
            return questionApi.getQuestion(params)
                .then((res)=>{
                    if (res.code===200){
                        runInAction(()=>{
                            this.questionRanDomList=res.data.list
                        })
                        return res;
                    }else {
                        return questionApi.getQuestion(params).reject(res.message)
                    }
                })

        // return run(this,questionApi.getQuestion(params))
        //     .then((res)=>{
        //         runInAction(()=>{
        //             this.questionRanDomList=res.data.list;
        //         })
        //     })
    }

    clearQuestionRanDomList(){
        this.questionRanDomList=[]
    }

    //销毁组件时清空questionList
    clearQuestionList(){
        this.questionList=[]
    }



    setDrawerConfig(config) {
        this.drawerConfig = config;
    }

}

export default QuestionStore;
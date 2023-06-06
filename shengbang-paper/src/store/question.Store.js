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
    subjectId=-1;
    questionType=undefined
    questionDifficulty=undefined
    questionList=[]
    questionDetail={}

    questionDetailList={}
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

    getQuestionList(params){
        this.subjectId=params.subjectId
        return run(this,questionApi.getQuestion(params))
            .then((res)=>{
            runInAction(()=>{
                this.chapterId=params.chapterId;
                this.questionType=params.questionType
                this.questionDifficulty=params.questionDifficulty
                this.questionList=res.data.list;
            })
        })
    }
    /**
     * 获取题目详情
     * @param questionId
     * @returns {*}
     */

    getQuestionDetail=(questionId)=>{
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

    //详情列表 更新后刷新内容
    getQuestionDetailList(questionId){
        console.log(questionId,'1111111111')
        return run(this,this.getQuestionDetail(questionId))
            .then((res)=>{
                runInAction(()=>{
                    console.log(res,'resssss')
                    this.questionDetailList[questionId]=res.data;
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
    addQuestion(data){
        console.log(data,11112222)
        return run(this, questionApi.addQuestion(data)).then(()=>{
            const param={
                subjectId:this.subjectId,
                chapterId:this.chapterId,
                questionType:this.questionType,
                questionDifficulty:this.questionDifficulty,
            }
            this.getQuestionList(param);
        })
    }

    putQuestion=(data)=>{
        console.log(data)
        return run(this,questionApi.putQuestion(data)).then(()=>{
            this.setDrawerConfig(defaultDrawerConfig);
            const searchParam = {
                subjectId: this.subjectId,
                chapterId: this.chapterId,
                questionType: this.questionType,
                questionDifficulty: this.questionDifficulty,
            };

            this.getQuestionList(searchParam)
            console.log(data.questionId)
            this.getQuestionDetailList(data.questionId)
        })
    }

    siftQuestion=(params)=>{
        return run(this,questionApi.getQuestion(params))
            .then((res)=> {
                runInAction(() => {
                    console.log(res,'qqqqq')
                    this.chapterId = params.chapterId;
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
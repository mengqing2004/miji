import {makeAutoObservable, runInAction} from "mobx";
import {paperApi} from "@/api"
import {run} from "@/utils";
import {QuestionDictionary} from "@/config/index.js";


class PaperStore {
    isLoading = false;
    paperList = [];
    paperDetail = {};
    paperId = -1;
    newPaperData = {
        questionList: [],
        paperName: "",
        subjectId: "",
    };
    paperPrintData = []

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    getPaperList = (subjectId) => {
        return run(this, paperApi.getPaper({...subjectId})).then((res) => {
            runInAction(() => {
                this.paperList = res.data.list;
            })
        })
    }

    getPaperDetail = (paperId) => {
        return run(this, paperApi.getPaperDetail(paperId)).then((res) => {
            runInAction(() => {
                this.paperDetail = res.data
            })
        })
    }

    getPaperPrintData(paperId) {
        return this.getPaperDetail(paperId).then(() => {
            const data = {
                paperId: paperId,
                paperName: this.paperDetail.paperName,
                score: 0,
                questionList: {}
            }
            Object.keys(QuestionDictionary.type).map((type) => {
                const questionTypeText = QuestionDictionary.type[type]
                // console.log(questionTypeText)
                data.questionList[questionTypeText] = []
            })

            this.paperDetail.questionList.map((item) => {
                data.score += item.score
                Object.keys(QuestionDictionary.type).map((type) => {
                    const questionTypeText = QuestionDictionary.type[type]
                    if (parseInt(type) === parseInt(item.questionType)) {
                        data.questionList[questionTypeText].push(item)
                    }
                })
            })
           Object.keys(data.questionList).map(type=>{
                if (data.questionList[type].length===0){
                    delete data.questionList[type]
                }
            })

            console.log(data,'paperPrintData')
            runInAction(() => {
                this.paperPrintData = data;
            })
        })
    }

    removePaperList = (paperId) => {
        return run(this, paperApi.removePaper(paperId)).then((res) => {
            runInAction(() => {
                this.paperList = this.paperList.filter((item) => {
                    return item.paperId !== paperId
                });
            })
        })
    }

    // 获取编辑试卷的内容
    getEditPaperData(paperId) {
        this.getPaperDetail(paperId).then(() => {
            runInAction(() => {
                this.newPaperData = Object.assign({}, {...this.paperDetail})
            })
        })
    }

    // 添加试卷
    addPaper() {
        return run(this, paperApi.addPaper(this.newPaperData))
    }

    putPaper() {
        this.newPaperData.nickName = undefined;
        this.newPaperData.updateTime = undefined;
        return run(this, paperApi.putPaper(this.newPaperData))
    }

    // 初始化 添加试卷、编辑试卷 数据
    initNewPaperData() {
        this.newPaperData = {
            questionList: [],
            paperName: "",
            subjectId: "",
        }
    }

    //修改newPaperData

    setNewPaperData(data) {
        this.newPaperData = data;
        console.log(this.newPaperData)
    }

    //添加随机试题
    getRanDomPaperList = (params) => {
        return run(this, paperApi.randomPaper(params)).then((res) => {
            // console.log(res,'res111')
            runInAction(() => {
                // console.log([...this.newPaperData.questionList],'old')
                // console.log(res.data.questionList,'new')
                // console.log([...this.newPaperData.questionList,...res.data.questionList],'www')
                this.newPaperData.questionList = [
                    ...this.newPaperData.questionList,
                    ...res.data.questionList
                ]
            })
        })
    }

}

export default PaperStore;
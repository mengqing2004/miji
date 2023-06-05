import {makeAutoObservable,runInAction} from "mobx";
import {subjectApi} from "@/api";
import {run} from "@/utils/index.js";


class SubjectStore{
    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
    }

    subjectsList =[];
    isLoading=false;

    //获取科目列表
    getSubjectsList(){
        return run(this,subjectApi.getSubjects()).then((res)=>{
            runInAction(()=>{
                this.subjectsList=res.data.list
            })
        })
    }
    //添加科目
    addSubject(subjectName){
        const lastOrderId=this.subjectsList[this.subjectsList.length-1]?.orderId||0;
        return run(
            this,subjectApi.addSubject({
                subjectName:subjectName,
                orderId:lastOrderId+1
            })
        ).then((res)=>{
                // console.log(subjectName,lastOrderId+1,res)
                runInAction(()=>{
                    const newData={
                        allowDelete: 1,
                        orderId: lastOrderId+1,
                        subjectId: res.data.subjectId,
                        subjectName,
                        updateTime: ""
                    }
                    console.log(newData,111)

                    this.subjectsList=[...this.subjectsList,newData]

                    console.log(this.subjectsList,2222)
                })
            })
    }

    //科目重命名
    renameSubject(data){
        return run(this,subjectApi.renameSubject(data))
    }

    deleteSubject(subjectId){
        return run(this,subjectApi.removeSubject(subjectId)).then(()=>{
            this.subjectsList=this.subjectsList.filter((item)=>{
                return item.subjectId!==subjectId
            })
        })
    }

    sortSubjeft(data){
        let subjectList=[]

        data.map((item,index)=>{
            subjectList.push(
                {
                    subjectId: item.subjectId,
                    orderId:index+1,
                }
            )
        })
        console.log(subjectList)

        return run(this,subjectApi.sortSubject({subjectList}))
    }

}

export  default SubjectStore;
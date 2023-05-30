import {makeAutoObservable,runInAction} from "mobx";
import {subjectApi} from "@/api";
import {run} from "@/utils/index.js";


class SubjectStore{
    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
    }

    subjectsList =[];
    isLoading=false;

    getSubjectsList(){
        return run(this,subjectApi.getSubjects()).then((res)=>{
            runInAction(()=>{
                this.subjectsList=res.data.list
            })
        })
    }

}

export  default SubjectStore;
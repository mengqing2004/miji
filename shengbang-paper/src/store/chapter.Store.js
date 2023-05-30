import {makeAutoObservable,runInAction} from "mobx";
import {subjectApi} from "@/api"
import { run } from "@/utils";

class ChapterStore{
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
     chapterList=[]
     isLoading=false;

    getChapterList(subjectId){
        return run(this,subjectApi.getChapters(subjectId)).then((res)=>{
                runInAction(()=>{
                    this.chapterList=res.data.list
                })
        })
    }
}
export default ChapterStore;
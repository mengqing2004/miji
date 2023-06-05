import {makeAutoObservable,runInAction} from "mobx";
import {chapterApi, subjectApi} from "@/api"
import { run } from "@/utils";
import chapterList from "@/components/content/subject/ChapterList.jsx";

class ChapterStore{
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
     chapterList=[]
     isLoading=false;
    subjectId = null;

    getChapterList(subjectId){
        this.chapterList=[];
        return run(this,subjectApi.getChapters(subjectId)).then((res)=>{
                runInAction(()=>{
                    this.subjectId=subjectId
                    this.chapterList=res.data.list
                })
        })
    }

    // 重命名章节
    renameChapter(data){
        return run(this,chapterApi.renameChapter(data))
    }

    //删除
    deleteChapter(chapterId){
        return run(this,chapterApi.deleteChapter(chapterId)).then(()=>{
            runInAction(()=>{
                this.chapterList=this.chapterList.filter(item=>{
                    return item.chapterId!=chapterId;
                })
            })
        })
    }

    //添加
    addChapter(chapterName){
        const lastOrderId=
            this.chapterList[this.chapterList.length-1]?.orderId||0;
        return run(
            this,
            chapterApi.addChapter({
                subjectId:this.subjectId,
                chapterName,
                orderId:lastOrderId+1,
            })
        ).then((res)=>{
            runInAction(()=>{
                const newChapter={
                    allowDelete:1,
                    chapterName,
                    chapterId:res.data.chapterId,
                    subjectId:this.subjectId,
                    orderId:lastOrderId+1,
                    updateTime: "",
                }
                console.log(this.chapterList,'111',newChapter)
                this.chapterList=[...this.chapterList,newChapter]
            })
        })
    }


    //排序
    sortChapter(data){
        let chapterList=[];
        data.map((chapter,index)=>{
            chapterList.push({
                chapterId: chapter.chapterId,
                orderId: index+1,
            })
        })
        return run(this, chapterApi.sortChapter({ chapterList }));
    }
}
export default ChapterStore;
import useAsync from "@/hooks/useAsync.js";
import {useEffect} from "react";
import {subjectApi} from "@/api/index.js";
import { useSearchParams } from "react-router-dom";
function useChapterData(subjectId,subjectName){
    const {run,isLoading, data}=useAsync()
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        if (subjectId!==-1){
            run(subjectApi.getChapters(subjectId)).then(()=>{
                if (subjectName){
                    searchParams.set("subjectId", subjectId);
                    searchParams.set("subjectName",subjectName);
                    setSearchParams(searchParams);
                }
                // subjectName? setSearchParams(`subjectId=${subjectId}&subjectName=${subjectName}`):''
            })
        }
    },[subjectId])

    return{
        chapter:data?.list||[],
        isLoading
    }
}

export default useChapterData;
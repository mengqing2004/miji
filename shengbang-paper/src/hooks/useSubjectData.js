import useAsync from "@/hooks/useAsync.js";
import {useEffect} from "react";
import {subjectApi} from "@/api/index.js";

function useSubjectData(){
    const {run,isLoading, data}=useAsync()
    useEffect(()=>{
        run(subjectApi.getSubjects())
    },[])

    return{
        subject:data?.list||[],
        isLoading
    }
}

export default useSubjectData;
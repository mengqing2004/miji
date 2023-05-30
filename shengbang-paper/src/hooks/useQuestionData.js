import useAsync from "@/hooks/useAsync.js";
import {useEffect} from "react";
import {questionApi} from "@/api/index.js";




function UseQuestionData(chapterId) {
    const {run, isLoading, data,setData} = useAsync()
    useEffect(() => {
        run(questionApi.getQuestion({
            chapterId
        }))
    }, [chapterId])

    return {
        question:data?.list || [],
        isLoading,
        setData
    }
}

export default UseQuestionData;
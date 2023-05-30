import useAsync from "@/hooks/useAsync.js";
import {useEffect} from "react";
import {questionApi} from "@/api/index.js";


function UseQuestionListData(questionId) {
    const {run, isLoading, data,setData} = useAsync()
    useEffect(() => {
        run(questionApi.getQuestionList(questionId))
    }, [questionId])

    // useEffect(()=>{
    //     console.log(data,'getQuestionList')
    // },[data])

    return {
        questionList:data?data : {},
        isLoading
    }
}

export default UseQuestionListData;
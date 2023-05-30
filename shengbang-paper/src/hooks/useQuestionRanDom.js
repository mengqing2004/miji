import useAsync from "@/hooks/useAsync.js";
import {useEffect} from "react";
import {questionApi} from "@/api/index.js";




function UseQuestionRanDom(random) {
    const {run, isLoading, data,setData} = useAsync()
    useEffect(() => {
        run(questionApi.getQuestion({
            random
        }))
    }, [random])

    return {
        question:data?.list || [],
        isLoading,
        setData
    }
}

export default UseQuestionRanDom;


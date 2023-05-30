import React,{useState} from "react";

const defaultState = {
    status:'idle',
    data:null,
    error:null
}
const useAsync =(initState)=>{
    const [state,setState] = useState({
        ...defaultState,
        ...initState
    })

    const setError=(error)=>{
        setState({
            status: 'error',
            data: null,
            error: error
        })
    }
    const setData=(data)=>{
        setState({
            status: 'success',
            data,
            error: null
        })
    }
    const run = async (Promise)=>{
        if (!Promise || !Promise.then){
            throw new Error('Not a promise object')
        }
        setState({
            ...state,
            status: 'loading'
        })
        return await Promise.then((res)=>{
            console.log(res,'1000000')
            if (res.code === 200){
                setData(res.data)
                return res.data
            }else {
                setError(res.message)
                return res.message
            }
        })
    }
    return{
        isIdle:state.status === 'idle',
        isLoading:state.status === 'loading',
        isError:state.status === 'error',
        run,
        ...state,
        setData,
        setError,
    }
}

export default useAsync
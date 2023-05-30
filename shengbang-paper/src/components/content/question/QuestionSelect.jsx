import React, {useEffect} from 'react';
import {Select, Space} from "antd";
import {QuestionDictionary} from "@/config";
import {useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/index.js";

function QuestionSelect() {
    const {questionStore} = useStore();
    const {isLoading} = questionStore;
    let [searchParams, setSearchParams] = useSearchParams();
    const questionType = searchParams.get('questionType')
    const questionDifficulty = searchParams.get('questionDifficulty')

    const selectType = (value) => {
        console.log(searchParams)
        if (value) {
            searchParams.set('questionType', value)
        } else {
            searchParams.delete('questionType')
        }
        setSearchParams(searchParams);
    }
    const selectDifficulty = (value) => {
        console.log(searchParams)
        if (value) {
            searchParams.set("questionDifficulty", value)
        } else {
            searchParams.delete("questionDifficulty")
        }
        setSearchParams(searchParams);
    }
    // const handleChange=()={
    //     print(1234)
    // }
    return (
        <div className={`flex items-center px-2 space-x-4 mx-auto mb-4`}>
            {/*<Button type="primary">全部题目</Button>*/}
            <Space>
                <label>筛选按钮:</label>

                <Select
                    allowClear
                    defaultValue={
                        questionDifficulty
                            ? parseInt(searchParams.get("questionDifficulty"))
                            : undefined
                    }
                    style={{width: 120}}
                    placeholder={`请选择难度`}
                    onChange={selectDifficulty}
                    options={QuestionDictionary.difficultOptions}
                    loading={isLoading}
                    disabled={isLoading}
                />
                <Select
                    allowClear={true}
                    defaultValue={
                        questionType
                            ? parseInt(searchParams.get("questionType"))
                            : undefined
                    }
                    style={{width: 120}}
                    placeholder={`请选择类型`}
                    onChange={selectType}
                    options={QuestionDictionary.typeOptions}
                    loading={isLoading}
                    disabled={isLoading}
                />
                {/*<Button onChange={handleChange}>12123312213</Button>*/}
            </Space>
        </div>
    );
}

export default observer(QuestionSelect);
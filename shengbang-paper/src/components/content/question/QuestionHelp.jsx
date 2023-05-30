import React from 'react';
import {Steps} from "antd";
import {useSearchParams} from "react-router-dom";

function QuestionHelp(props) {
    let [searchParams, setSearchParams] = useSearchParams();
    const subjectid=searchParams.get('subjectId')
    return (
        <div className={`p-10 mt-10`}>
            <div className={`mb-10`}>
                <p className={`text-gray-400`}>使用教程</p>
            </div>
            <Steps
                current={subjectid?1:0}
                direction="vertical"
                size="small"
                items={[
                    {
                        title: "选择科目",
                        description: `点击左侧下拉菜单选择科目，显示对应科目下的章节`,
                    },
                    {
                        title: "选择章节",
                        description: `点击左侧"章节列表"中的标题，右侧显示对应章节下的试题`,
                    },
                    {
                        title: "添加题目",
                        description: `点击添加后显示表单提交`,
                    },
                ]}
            />
        </div>
    );
}

export default QuestionHelp;
import React from 'react';
import {Steps} from "antd";

function SubjctHelp() {
    return (
        <div className={`p-10 mt-10`}>
            {/*<p className={`text-center pt-10 text-gray-400`}>*/}
            {/*    点击左侧列表即可浏览数据*/}
            {/*   <p className={`mt-4`}>点击新建即可添加新内容</p>*/}
            {/*</p>*/}
            <div className={`mb-10`}>
                <p className={`text-gray-400`}>使用教程</p>
            </div>
            <Steps
                direction="vertical"
                size="small"
                items={[
                    {
                        title: "添加科目",
                        description: `例如：中职HTML、中职JavaScript。章节隶属于科目`,
                    },
                    {
                        title: "选择科目",
                        description: `点击左侧"科目列表"中的标题，右侧显示对应科目下的章节`,
                    },
                    {
                        title: "管理章节",
                        description: `在右侧"章节列表"中增删改查对应科目下的章节`,
                    },
                ]}
            />

        </div>
    );
}

export default SubjctHelp;
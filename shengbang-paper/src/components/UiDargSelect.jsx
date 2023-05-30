import React from 'react';
import {Button, Select} from "antd";

function UiDargSelect({data,selectType, selectDifficulty,question}) {
    // const handleChange = (value,item) => {
    //     console.log(`selected ${value}`,item,'00000');
    //
    // };
    // const onclear=()=>{
    //     console.log('清')
    // }
    return (
        <>
            <Select
                allowClear
                defaultValue={question?question:null}
                style={{ width: 120 }}
                placeholder={`请选择${selectType?'类型':'难度'}`}
                onChange={selectType?selectType:selectDifficulty}
                options={data}
            />
            {/*<Button onChange={onclear}>清除</Button>*/}
        </>

    );
}

export default UiDargSelect;
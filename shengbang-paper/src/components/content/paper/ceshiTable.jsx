import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const PriceInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            ...value,
            ...changedValue,
        });
    };
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({
            number: newNumber,
        });
    };
    return (
        <span>
      <Input
          type="text"
          value={value.number || number}
          onChange={onNumberChange}
          style={{
              width: 100,
          }}
      />
    </span>
    );
};
const CeshiTable = () => {
    const onFinish = (values) => {
        console.log('Received values from form: ', values);
    };
    const checkPrice = (_, value) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('题目数量必须大于0!'));
    };
    return (
        <Form
            // name="customized_form_controls"
            // layout="inline"
            // onFinish={onFinish}
            initialValues={{
                questionNumber: {
                    number: 0,
                },
            }}
        >
            <Form.Item
                name="questionNumber"
                label="题目数量"
                rules={[
                    {
                        validator: checkPrice,
                    },
                ]}
            >
                <PriceInput />
            </Form.Item>
            <Form.Item>
                {/*<Button type="primary" htmlType="submit">*/}
                {/*    提交*/}
                {/*</Button>*/}
            </Form.Item>
        </Form>
    );
};
export default CeshiTable;

import React from 'react';


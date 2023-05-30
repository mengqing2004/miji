import React, {useState} from 'react';
import {Drawer, Modal, Tabs} from "antd";
import FormSelectTypeRadio from "@/components/content/question/questionForm/FormSelectTypeRadio.jsx";
import FormSelectTypeCheckbox from "@/components/content/question/questionForm/FormSelectTypeCheckbox.jsx";
import FormSelectTypeDetermine from "@/components/content/question/questionForm/FormSelectTypeDetermine.jsx";
import FormSelectTypePack from "@/components/content/question/questionForm/FormSelectTypePack.jsx";
import FormSelectTypeQuestion from "@/components/content/question/questionForm/FormSelectTypeQuestion.jsx";
import {useStore} from "@/store/index.js";
import {observer} from "mobx-react-lite";
import {QuestionDictionary} from "@/config";

const typeKeys = Object.keys(QuestionDictionary.type);
const defaultType = typeKeys[0];
const DrawerForm = (type) => {
    const formTemplates = [
        "这是修改和添加题目的表单组件",
        <FormSelectTypeRadio key={1}/>,
        <FormSelectTypeCheckbox key={2}/>,
        <FormSelectTypeDetermine key={3}/>,
        <FormSelectTypePack key={4}/>,
        <FormSelectTypeQuestion key={5}/>,
    ];
    return <>{formTemplates[type]}</>
}

function QuestionDrawer() {
    const {questionStore} = useStore();
    const {currentQuestionId, currentQuestionType, open, title} =
        questionStore.drawerConfig;
    const [activeKey, setActiveKey] = useState(defaultType);
    const onClose = () => {
        console.log({...questionStore.drawerConfig},'211241325342')
        // 关闭抽屉，重置
        setActiveKey(defaultType);
        questionStore.setDrawerConfig({
            ...questionStore.drawerConfig,
            open: false,
            currentQuestionId: -1,
            currentQuestionType: defaultType,
        });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        onClose()
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title="你确定要取消更改吗?"
                okText='退出'
                cancelText='继续编辑'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                zIndex={10000}
            >
                <p>如果点击退出,该表单就会被重置</p>
            </Modal>
            <Drawer
                size={`large`}
                open={open}
                title={title}
                // onClose={onClose}
                onClose={showModal}
                destroyOnClose={true}

            >
                {/*编辑与添加，显示不同的组件*/}
                {currentQuestionId === -1 ? (
                    // 添加
                    <Tabs
                        activeKey={activeKey}
                        items={typeKeys.map((key) => {
                            return {
                                key,
                                label: QuestionDictionary.type[key],
                                forceRender: false,
                                children: DrawerForm(key),
                            };
                        })}
                        tabBarGutter={45}
                        onChange={(activeType) => {
                            setActiveKey(activeType);
                        }}
                    />
                ) : (
                    // 编辑
                    <>
                        {DrawerForm(currentQuestionType)}
                    </>
                )}
            </Drawer>
        </>
    );
}

export default observer(QuestionDrawer);
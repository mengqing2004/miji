import React, { useEffect, useState, useContext, useRef } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table, Form, Input } from "antd";
import useAsync from "@/hooks/useAsync.js";
import {subjectApi} from "@/api/index.js";
import {putSubject} from "@/api/subject.Api.js";
const EditableContext = React.createContext(null);

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    // const {run:chapterRun,isLoading:chapterLoading, data:chapterList}=useAsync()
    // const {run:subjectRun,isLoading:subjectLoading, data:subjectList}=useAsync()
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {

        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
            //修改命名 请求后台数据
            // record.subjectId?
            //     subjectRun(
            //         subjectApi.putSubject({
            //             subjectId:record.subjectId,subjectName:record.subjectName
            //         }))
            //     :chapterRun(
            //         subjectApi.putChapters({
            //             chapterId:record.chapterId,chapterName:record.chapterName
            //         }))

        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `不能为空`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}  />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onDoubleClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

// -------------
const Row = ({ children, index, ...props }) => {
    const [form] = Form.useForm();
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props["data-row-key"],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            }
        )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
        transition,
        ...(isDragging
            ? {
                position: "relative",
                zIndex: 9999,
            }
            : {}),
    };
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} ref={setNodeRef} style={style} {...attributes}>
                    {React.Children.map(children, (child) => {
                        if (child.key === "sort") {
                            return React.cloneElement(child, {
                                children: (
                                    <p
                                        className={`flex items-center justify-center text-gray-500`}
                                    >
                                        <MenuOutlined
                                            ref={setActivatorNodeRef}
                                            style={{
                                                touchAction: "none",
                                                cursor: "move",
                                            }}
                                            {...listeners}
                                        />
                                    </p>
                                ),
                            });
                        }
                        return child;
                    })}
                </tr>
            </EditableContext.Provider>
        </Form>
    );
};
const UiDragTable = ({ loading, data, columns, handleDragEnd }) => {
    const [dataSource, setDataSource] = useState(data);

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.orderId === item.orderId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const columns2 = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.orderId === active.id);
                const overIndex = previous.findIndex((i) => i.orderId === over?.id);
                const res = arrayMove(previous, activeIndex, overIndex);
                handleDragEnd(res);
                return res;
            });
        }
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <SortableContext
                items={dataSource.map((i) => i.orderId)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row,
                            cell: EditableCell,
                        },
                    }}
                    rowKey="orderId"
                    columns={columns2}
                    dataSource={dataSource}
                    showHeader={false}
                    loading={loading}
                    pagination={{
                        position: ["none", "none"],
                    }}
                />
            </SortableContext>
        </DndContext>
    );
};
export default UiDragTable;

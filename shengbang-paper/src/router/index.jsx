
import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "@/pages/Layout.jsx";
import Login from "@/pages/Login.jsx";
import Subject from "@/components/content/Subject.jsx";
import Question from "@/components/content/Question.jsx";
import Paper from "@/components/content/Paper.jsx";
import PageError from "@/pages/PageError.jsx";
import Page404 from "@/pages/Page404.jsx";
import AuthRoute from "@/components/content/AuthRoute.jsx";
import ChapterList from "@/components/content/subject/ChapterList.jsx";
import {AuditOutlined, BookOutlined, ContainerOutlined} from "@ant-design/icons";
import React from "react";
import QuestionContent from "@/components/content/question/QuestionContent.jsx";
import PaperDetail from "@/components/content/paper/PaperDetail.jsx";
import PaperList from "@/components/content/paper/PaperList.jsx";
import PaperAddList from "@/components/content/paper/PaperAddList.jsx";
import RanDom from "@/components/content/paper/RanDom.jsx";
import DownloadPaper from "@/components/content/paper/DownloadPaper.jsx";

const routerConfig = [
    {
        path: "/",
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children:[
            {
                index:true,
                loader:()=>{
                    throw redirect('/subject')
                },
                errorElement:<PageError/>,
                text:'根',
            },
            {
                path:'subject',
                element:<Subject/>,
                content:'章节管理',
                icon:<BookOutlined />,
                children:[
                    {
                        path:":subjectId",
                        element:<ChapterList />,
                    }
                ]
            },
            {
                path:'question',
                element:<Question/>,
                content:'题库管理',
                icon:<AuditOutlined />,
                children: [
                    {
                        path: ":chapterId",
                        element: <QuestionContent/>
                    }
                ]
            },
            {
                path:'paper',
                element:<Paper/>,
                content:'试卷管理',
                icon:<ContainerOutlined />,
                children: [
                    {
                        index:true,
                        element: <PaperList/>
                    },
                    {
                        path: ":paperId",
                        element: <PaperDetail/>
                    },
                    {
                        path:"add",
                        element: <PaperAddList/>
                    },
                    {
                        path:"edit",
                        element: <PaperAddList/>
                    },
                    {
                        path:"download",
                        element: <DownloadPaper/>
                    },
                ]
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'*',
        element:<Page404/>
    }
]

const Router=createBrowserRouter(routerConfig)

export const navList=routerConfig[0].children.splice(1)

export default Router



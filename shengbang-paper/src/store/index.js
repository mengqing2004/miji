import React from "react";
import UserStore from "./user.Store.js";
import SubjectStore from "./subject.Store.js";
import QuestionStore from "./question.Store.js"
import PaperStore from "./paper.Store.js"
import ChapterStore from "@/store/chapter.Store.js";
class RootStore{
    constructor() {
        this.userStore=new UserStore();
        this.subjectStore = new SubjectStore();
        this.questionStore=new QuestionStore();
        this.paperStore=new PaperStore();
        this.chapterStore=new ChapterStore();
    }
}
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);

export { useStore };
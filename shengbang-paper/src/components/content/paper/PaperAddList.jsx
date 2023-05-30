import React from 'react';
import SearchBar from "@/components/content/paper/SearchBar.jsx";
import UiScrollContent from "@/components/UiScrollContent.jsx";
import AddQuestionList from "@/components/content/paper/AddQuestionList.jsx";
import UiPaperBack from "@/components/UiPaperBack.jsx";
import AddPaperList from "@/components/content/paper/AddPaperList.jsx";

function PaperAddList() {
    return (
            <div className={`h-screen w-full min-w-max`}>
                <UiPaperBack>
                <div className={`h-full w-full flex divide-x`}>
                    <div className={`w-1/4 h-full w-[300px] flex flex-col flex-shrink-0`}>
                        <div className={`flex-shrink-0`}>
                            <SearchBar/>
                        </div>
                        <div className={`flex-grow`}>
                            <UiScrollContent>
                                <AddQuestionList/>
                            </UiScrollContent>
                        </div>
                    </div>
                    <div className={`flex-grow h-full`}>
                            <AddPaperList/>
                    </div>
                </div>
                </UiPaperBack>
            </div>
    );
}

export default PaperAddList;
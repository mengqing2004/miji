import React from 'react';

function Logo() {
    return (
        <div className={`w-full flex-shrink-0`}>
            {/*logo*/}
            <p className={`flex items-center justify-center py-4 px-4 italic `}><span className={`text-blue-600`}>盛邦</span>升华试卷管理系统</p>
        </div>
    );
}

export default Logo;
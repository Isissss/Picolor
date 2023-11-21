import React from "react";

function Loading() {
    return<div className="flex justify-items-center flex-col" >

    <p className="text-gray-500 text-sm"> Loading...  </p> 
     <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"> 
        {[...Array(10)].map((_, i) => (
          <div key={i} className="group flex flex-col justify-items-center bg-slate-100 dark:bg-slate-800 rounded-lg ring-2 ring-slate-400/5 dark:ring-slate-900/5 shadow-md p-1">
                <div className="h-[555px] animate-pulse bg-slate-200 dark:bg-slate-600 rounded-md" />
            </div>))}
    </div>
    </div>
}

export default Loading;
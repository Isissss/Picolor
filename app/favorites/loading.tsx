import React from "react";

function Loading() {
    return <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" >
        <p className="text-gray-500 animate-pulse">Checking favorites...</p>
    </div >
}

export default Loading;
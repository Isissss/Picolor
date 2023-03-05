'use client'
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {

    }, [error]);

    return (
        <div>
            <h1>Oops!</h1>
            <button onClick={reset}>As this is a demo app we likely got Rate-limited. Apologies for the issue! </button>
        </div>
    );
}


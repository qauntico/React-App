import React from "react";
import { useRouteError } from "react-router-dom";
export function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    return <>
        <h1>Error page</h1>
    </>
}
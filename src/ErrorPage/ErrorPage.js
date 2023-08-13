import React from "react";
import { useRouteError } from "react-router-dom";
import './ErrorPage.css';
import Menu from "../core/Menu";

export function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    return <>
        <Menu />
        <div className="container-lg error-background">
        </div>
    </>
}
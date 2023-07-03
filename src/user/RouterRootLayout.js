import React from "react";
import {Outlet} from 'react-router-dom'
import Menu from "../core/Menu";

export default function RouterRootLayout() {
    return <>
        <Menu />
        <Outlet />
    </>
}
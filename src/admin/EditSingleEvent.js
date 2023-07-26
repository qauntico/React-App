import React from "react";
import EventForm from "./EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditSingleEvent(){
    const data = useRouteLoaderData('singleEvent');
    return (
        <>
            <EventForm eventFormData={data} method={'PUT'}/>
        </>
    )
}
import React from "react";
import EventForm from "./EventForm";

export default function CreateNewEvent(){

    return (
        <>
            <EventForm method={'POST'}/>
        </>
    )
}
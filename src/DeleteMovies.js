import React, { useRef,useEffect } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { delMov } from "./store/slices/MovieSlice";



export function loader(data) {
    console.log(data.params.id);

    return data.params.id;
}



export default function DeleteMovie() {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        dispatch(delMov(data));
        navigate("/")
    }, 0);
    return (
        <>
            <h2>deleted</h2>
        </>
    );
}
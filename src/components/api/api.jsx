import React from "react";
import axios from "axios";
import $ from "jquery";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/api",
    withCredentials : false,
    headers : {
        'Content-Type' : "application/json",
        "Accept" : "application/json",
    }
})


export default api;
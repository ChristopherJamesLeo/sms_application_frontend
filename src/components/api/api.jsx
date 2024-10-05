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

    api.interceptors.response.use(
        response => response,
        error => {
            console.error('API request error:', error);
            return Promise.reject(error);
        }
    );

export default api




import React from 'react';

import api, { getCSRFToken } from './../api/api';

export async function login(value){
    try {
        const response = await api.post("/login", value);
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function register(value){
    try {
        let response = await api.post("/register", value)
        return response;
        

    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

export async function logout(){
    try {
        const response = await api.post("/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}
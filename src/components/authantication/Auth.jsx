import api from './../api/api';

export const login = async (value) => {
    try {
        const response = await api.post("/login", value);
        return response || false;
    } catch (error) {
        return false;
    }
};

export const register = async (value) => {
    try {
        return await api.post("/register", value);
        
    } catch (error) {
        return false;
    }
};

export const logout = async () => {
    try {
        const response = await api.post("/logout", {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('api_token')}` }
        });
        return response.data;
    } catch (error) {
        return false;
    }
};

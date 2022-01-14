import axios from "axios";

export const signUpApi = async (user) => {
    try {
        const url = "https://mvn-task-manager.work/auth/register";
        const response = await axios.post(url, user, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const signInApi = async (user) => {
    try {
        const url = "https://mvn-task-manager.work/auth/login";
        const response = await axios.post(url, user, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const saveToken = (data) => {
    if (data) {
        localStorage.setItem("token", JSON.stringify(data));
    }
};

export const removeToken = () => {
    if (localStorage && localStorage.getItem("token")) {
        localStorage.removeItem("token");
    }
};

export const getToken = () => {
    if (localStorage && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        return JSON.parse(token);
    }
};

export const isAuthenticated = () => {
    const token = getToken();
    if (token) {
        return true;
    }
    return false;
};
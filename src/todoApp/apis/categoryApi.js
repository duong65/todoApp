import axios from "axios";

export const getCategories = async (token = "") => {
    try {
        const response = await axios({
            url: "https://mvn-task-manager.work/api/categories?limit=10&page=1",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const getCategoryById = async (id, token = "") => {
    try {
        const response = await axios({
            url: `https://mvn-task-manager.work/api/categories/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};
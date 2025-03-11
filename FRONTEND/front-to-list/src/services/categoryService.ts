import axios from "axios";
import { Category } from "@/types/Category";

const API_URL = "http://localhost:3000";

export const getCategories = async(): Promise<Category[]> => {
    try{
        const response = await axios.get(`${API_URL}/categories`);
        return response.data.map((item: Category) => Category.fromJson(item));
    } catch (error: any){
        console.error('Error al obtener las categorias:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createCategory = async (category: Category): Promise<Category> => {
    try {
        const response = await axios.post(`${API_URL}/categories`, {
            name: category.name,
            description: category.description
        });

        return Category.fromJson(response.data);
    } catch (error: any) {
        console.error('Error al crear la categoria:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteCategory = async(id: number): Promise<void> => {
    try{
        await axios.delete(`${API_URL}/categories/${id}`);
    }catch (error: any) {
        console.error('Error al eliminar la categoria:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
}
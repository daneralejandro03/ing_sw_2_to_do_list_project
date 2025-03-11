import axios from "axios";
import { Task } from "@/types/Task";

const API_URL = "http://localhost:3000";

export const getTasks = async(): Promise<Task[]> => {
    try{
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data.map((item: Task) => Task.fromJson(item));
    } catch (error: any){
        console.error('Error al obtener las tareas:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createTask = async (task: Task): Promise<Task> => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, {
            title: task.title,
            description: task.description,
            completed: task.completed,
            category: task.category 
        });

        return Task.fromJson(response.data);
    } catch (error: any) {
        console.error('Error al crear la tarea:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteTask = async(id: number): Promise<void> => {
    try{
        await axios.delete(`${API_URL}/tasks/${id}`);
    }catch (error: any) {
        console.error('Error al eliminar la tarea:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
}
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from '@/types/Task';
import { getTasks, createTask, deleteTask } from '@/services/taskService';

export const useTaskStore = defineStore('task', () => {
    
    const tasks = ref<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            console.log('Tareas obtenidas:', response);
            tasks.value = response;
        } catch (error) {
            console.error('Error al cargar las tareas:', error);
        }
    };

    const addTask = async (task: Task) => {
        try {
            const response = await createTask(task);
            tasks.value.push(response);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const removeTask = async (id: number) => {
        try {
            await deleteTask(id);
            tasks.value = tasks.value.filter(task => task.id !== id);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    return {
        tasks,
        fetchTasks,
        addTask,
        removeTask
    };
});

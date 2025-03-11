    import { defineStore } from 'pinia';
    import { ref } from 'vue';
    import { Category } from '@/types/Category';
    import { getCategories, createCategory, deleteCategory,  } from '@/services/categoryService';

    export const useCategoryStore = defineStore('category', () => {
        
        const categories = ref<Category[]>([]);

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                console.log('categorias obtenidas:', response);
                categories.value = response;
                return response;
            } catch (error) {
                console.error('Error al cargar las categorias:', error);
            }
        };

        const addCategory = async (category: Category) => {
            try {
                const response = await createCategory(category);
                categories.value.push(response);
            } catch (error) {
                console.error('Error al crear la categoria:', error);
            }
        };

        const removeCategory = async (id: number) => {
            try {
                await deleteCategory(id);
                categories.value = categories.value.filter(category => category.id !== id);
            } catch (error) {
                console.error('Error al crear la categoria:', error);
            }
        };

        return {
            categories,
            fetchCategories,
            addCategory,
            removeCategory
        };
    });

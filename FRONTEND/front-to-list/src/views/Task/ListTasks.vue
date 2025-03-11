<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useTaskStore } from '@/stores/taskStore';
    import TaskTable from '@/components/Task/TaskTable.vue';
    import { Task } from '@/types/Task';
    import { Category } from '@/types/Category';
    import { useCategoryStore } from '@/stores/categoryStore';

    const title = ref('');
    const description = ref('');
    const completed = ref(false);
    const categoryId = ref(undefined);

    const categories = ref<Category[]>([]);

    const showCreateModal = ref(false);

    const taskStore = useTaskStore();
    const categoryStore = useCategoryStore();

    const formatTasks = computed(() => {
        return taskStore.tasks.map((task) => ({
            ...task
        }));
    });

    async function createTask(){
        try{
            const category = categoryStore.categories.find(cat => cat.id === categoryId.value) || undefined;
            const newTask = new Task(title.value, description.value, completed.value, category);
            console.log('Task: '+ JSON.stringify(newTask));
            
            await taskStore.addTask(newTask);
            showCreateModal.value = false;
            clean()
        }catch(error: any){
            throw error;
        }
    }

    function clean(){
        title.value = '';
        description.value = '';
    }

    const formatCategories = computed(() => {
        return categoryStore.categories.map((category) => ({
            title: category.name,
            value: category.id
        }));
    });

    onMounted(async() =>{
        await taskStore.fetchTasks();
        await categoryStore.fetchCategories();
    })
</script>

<template>
    <v-container>
      <v-row justify="start" class="mb-4">
        <v-col cols="12" md="4">
          <v-btn color="primary" @click="showCreateModal = true" block>
            Crear nueva tarea
          </v-btn>
        </v-col>
      </v-row>
  
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="headline blue--text text--darken-3 text-center">
            Lista de Tareas
          </h1>
  
          <div class="table-container">
            <TaskTable :tasks="formatTasks" class="expanded-table" />
          </div>

  
          <v-alert
            v-if="taskStore.tasks.length === 0"
            type="info"
            colored-border
            class="mt-2"
          >
            No hay tareas registradas.
          </v-alert>
        </v-col>
      </v-row>
  
      <v-dialog max-width="700" v-model="showCreateModal">
        <v-card>
          <v-card-title>Crear nueva tarea</v-card-title>
          <v-card-text>
            <v-text-field label="Titulo" v-model="title"></v-text-field>
            <v-text-field label="Descripción" v-model="description"></v-text-field>
            <v-select 
              label="Categoria" 
              :items="formatCategories"
              item-title="title"
              item-value="value"
              v-model="categoryId"
              @update:modelValue="(value) => console.log('Valor seleccionado:', value)"
              class="rounded-lg"
              density="comfortable"
              variant="outlined"
              placeholder="Selecciona una categoría"
              >
              
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="createTask()" color="success">Añadir tarea</v-btn>
            <v-btn @click="showCreateModal = false" color="error">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>


<style scoped>

.table-container {
  display: flex;
  justify-content: center;
  width: 85vw;
}

.expanded-table {
  width: 100%;
  max-width: 100%;
  min-height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
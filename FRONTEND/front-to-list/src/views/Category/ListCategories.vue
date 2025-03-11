<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useCategoryStore } from '@/stores/categoryStore';
    import CategoryTable from '@/components/Category/CategoryTable.vue';
    import { Category } from '@/types/Category';

    const name = ref('');
    const description = ref('');

    const showCreateModal = ref(false);

    const categoryStore = useCategoryStore();

    const formatCategories = computed(() => {
        return categoryStore.categories.map((category) => ({
            ...category
        }));
    });

    async function createCategory(){
        try{
            const newCategory = new Category(name.value, description.value);
            await categoryStore.addCategory(newCategory);
            showCreateModal.value = false;
            clean()
        }catch(error: any){
            throw error;
        }
    }

    function clean(){
        name.value = '';
        description.value = '';
    }

    onMounted(async() =>{
        await categoryStore.fetchCategories();
    })
</script>

<template>
    <v-container>
      <v-row justify="start" class="mb-4">
        <v-col cols="12" md="4">
          <v-btn color="primary" @click="showCreateModal = true" block>
            Crear nueva categoria
          </v-btn>
        </v-col>
      </v-row>
  
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="headline blue--text text--darken-3 text-center">
            Lista de categorias
          </h1>
  
          <div class="table-container">
            <CategoryTable :categories="formatCategories" class="expanded-table" />
          </div>

  
          <v-alert
            v-if="categoryStore.categories.length === 0"
            type="info"
            colored-border
            class="mt-2"
          >
            No hay categorias registradas.
          </v-alert>
        </v-col>
      </v-row>
  
      <v-dialog max-width="700" v-model="showCreateModal">
        <v-card>
          <v-card-title>Crear nueva categoria</v-card-title>
          <v-card-text>
            <v-text-field label="Nombre" v-model="name"></v-text-field>
            <v-text-field label="Descripción" v-model="description"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="createCategory()" color="success">Añadir categoria</v-btn>
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
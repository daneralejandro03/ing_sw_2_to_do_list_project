

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Task } from '@/types/Task';
import { useTaskStore } from '@/stores/taskStore';

defineProps<{
    tasks: Task[];
}>();

const taskStore = useTaskStore();

const search = ref('');

const headers = ref([
    { title: 'Titulo', key: 'title' },
    { title: 'Descripción', key: 'description' },
    { title: 'Estado', key: 'completed' },
    { title: 'Acciones', key: 'acciones', sortable: false }
]);

async function handleDelete(id: number | undefined){
    if (id === undefined) {
        console.error('ID no definido, no se puede eliminar la tarea');
        return;
    }

    try{
        await taskStore.removeTask(id);
    } catch(error){
        console.error('Error al eliminar la tarea:', error);
    }


}

</script>

<template>
    <v-container fluid>
        <v-row>
            <v-text-field v-model="search" label="Buscar..." prepend-inner-icon="mdi-magnify" clearable class="mb-4" dense outlined />
        </v-row>
        <v-row>
            <v-col cols="12" md="10">
                <v-card class="milton">
                    <v-data-table
                        :headers="headers"
                        :items="tasks"
                        :search="search"
                        items-per-page-text="Elementos por página"
                        no-data-text="No hay atenciones registradas."
                        class="elevation-1"
                    >

                    <template v-slot:item.completed="{ item }">
                        {{ item.completed ? 'Completa' : 'En proceso' }}
                    </template>

                        <template v-slot:item.acciones="{ item }">
                            <div class="d-flex flex-row align-center">
                                <v-btn color="primary" small class="mr-2">Ver</v-btn>
                                <v-btn color="warning" small class="mr-2">Editar</v-btn>
                                <v-btn color="error" small class="mr-2" @click="handleDelete(item.id)">Eliminar</v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>


<style scoped lang="scss">
.v-data-table {
    border-radius: 8px;
}

.v-alert {
    font-size: 1.1rem;
}

.v-card {
    overflow-x: auto;
}

.d-flex {
    display: flex;
}

.flex-row {
    flex-direction: row;
}

.align-center {
    align-items: center;
}

.mr-2 {
    margin-right: 0.5rem;
}
.milton{
    width: 80vw;
}
</style>

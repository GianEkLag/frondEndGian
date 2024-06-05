<template>
  <div class="contenedor">
    <h2>Cuestionarios</h2>
    <!-- Botón para crear nuevo cuestionario -->
    <!-- <button @click="navigateToAgregarCuestionario" class="btn">Crear Nuevo Cuestionario</button> -->
    <button @click="navigateToAgregarCuestionario" class="btn btn-primary">Nuevo Cuestionario</button>

    
    <!-- Por si no hay cuestionarios -->
    <div v-if="cuestionarios.length === 0">No hay cuestionarios disponibles.</div>
    <!-- Iteración de la lista de cuestionarios -->
    <div v-for="cuestionario in cuestionarios" :key="cuestionario.ID_Cuestionario" class="card" @click="navigateToPreguntas(cuestionario.ID_Cuestionario)">
      <!-- Contenido del cuestionario -->
      <p class="cuestionario-titulo">{{ cuestionario.Titulo }}</p>
      <p class="cuestionario-desc">{{ cuestionario.Descripcion }}</p>
      <p class="cuestionario-año">{{ cuestionario.Anio }}</p>
      
      <!-- Enlace para actualizar el cuestionario -->
      <button @click.stop="navigateToEditarCuestionario(cuestionario.ID_Cuestionario)" class="btn">Editar</button>

      <!-- Botón para eliminar el cuestionario -->
      <!-- <button @click.stop="eliminarCuestionario(cuestionario.ID_Cuestionario)" class="btn btn-danger">Eliminar</button> -->
      <!-- Botón para eliminar el cuestionario -->
      <!-- <button @click.stop="eliminarCuestionario(String(cuestionario.ID_Cuestionario))" class="btn btn-danger">Eliminar</button> -->
      <button @click.stop="eliminarCuestionario(cuestionario.id)" class="btn btn-danger">Eliminar</button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';


// Interfaz para el objeto Cuestionario
interface Cuestionario {
  id: string; // ID_Cuestionario a 'id'
  ID_Cuestionario: number;
  Titulo: string;
  Descripcion: string;
  Anio: string;
  ID_carrera: number;
}

// Arreglo reactiva para almacenar los cuestionarios
const cuestionarios = ref<Cuestionario[]>([]);

//confirm para que TypeScript lo reconozca correctamente
declare const confirm: (message: string) => boolean;

// Rutas y navegación
const route = useRoute();
const router = useRouter();

// Función para obtener la lista de cuestionarios
const fetchCuestionarios = async () => {
  const idCarrera = route.params.idCarrera;
  try {
    const response = await axios.get<Cuestionario[]>(`http://localhost:3000/cuestionario?ID_carrera=${idCarrera}`);
    cuestionarios.value = response.data;
  } catch (error) {
    console.error('Error en la obtención de cuestionarios:', error);
  }
};

// Navegación a la vista de preguntas dependiendo del ID del cuestionario
const navigateToPreguntas = (idCuestionario: number) => {
  router.push({ name: 'Preguntas', params: { idCuestionario } });
};

// Navegación a la vista de editar cuestionario
const navigateToEditarCuestionario = (idCuestionario: number) => {
  router.push({ name: 'EditarCuestionario', params: { idCuestionario } });
};

// Función para redirigir a AgregarCuestionario.vue
const navigateToAgregarCuestionario = () => {
  //router.push({ name: 'AgregarCuestionario' });
  router.push({ name: 'AgregarCuestionario', query: { idCarrera: route.params.idCarrera } });

};

// Función para eliminar un cuestionario basado en su ID único
const eliminarCuestionario = async (id: string) => { // Cambio del parámetro a 'id'
  if (confirm('¿Estás seguro de que quieres eliminar este cuestionario?')) {
    try {
      await axios.delete(`http://localhost:3000/cuestionario/${id}`); // Eliminando el cuestionario con el ID único
      // Actualizar la lista de cuestionarios después de eliminar
      cuestionarios.value = cuestionarios.value.filter(cuestionario => cuestionario.id !== id);
    } catch (error) {
      console.error('Error al eliminar el cuestionario:', error);
    }
  }
};

// Ejecutar la función para obtener los cuestionarios al cargar la página
onMounted(fetchCuestionarios);
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 80%;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.cuestionario-titulo {
  font-size: 18px;
  font-weight: bold;
}

.cuestionario-desc {
  font-size: 14px;
  color: #666;
}

.cuestionario-año {
  font-size: 12px;
  color: #999;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #0056b3;
}
</style>

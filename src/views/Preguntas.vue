<template>
  <div class="container">
    <!-- <h2>Preguntas del cuestionario: {{ cuestionarioTitulo }}</h2> -->
    <h2>Preguntas Encontradas del cuestionario</h2>
    <div v-if="preguntas.length === 0">No hay preguntas disponibles.</div>
        <!-- Iteracion de la cadena -->                                                 
    <div v-for="pregunta in preguntas" :key="pregunta.ID_Pregunta" class="pregunta">
      <p class="pregunta-number">{{ pregunta.Numero }}. {{ pregunta.Contenido }}</p>
    </div>
    <button @click="navigateToAgregarPregunta" class="agregar-button">
      <span>Agregar Pregunta</span>
      <!-- <i class="fas fa-plus"></i> -->
    </button>
  </div>
</template>

<!-- Componenets  -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

//Interfaz pregunta
interface Pregunta {
  ID_Pregunta: string;
  Numero: number;
  Contenido: string;
  ID_Cuestionario: string;
}

const preguntas = ref<Pregunta[]>([]);
const cuestionarioTitulo = ref<string>('');
//Rutas y navegcion 
const route = useRoute();
const router = useRouter();

//Funcion para obtener lista preguntas
const fetchPreguntas = async () => {
  const idCuestionario = route.params.idCuestionario;
  try {
   //Solicitud get a preguntas dependiendode su id del custionario
    const response = await axios.get<Pregunta[]>(`http://localhost:3000/preguntas?ID_Cuestionario=${idCuestionario}`);
    preguntas.value = response.data;
    //
    // const cuestionarioResponse = await axios.get(`http://localhost:3000/cuestionario/${idCuestionario}`);
    // cuestionarioTitulo.value = cuestionarioResponse.data.Titulo;
  } catch (error) {
    console.error('Error preguntas:', error);
  }
};
//Navegacion a la pantalla AGREGAR PREGUNTAS dependiendo del idCuestionario

const navigateToAgregarPregunta = () => {
  router.push({ name: 'AgregarPregunta', params: { idCuestionario: route.params.idCuestionario } });
};

//Fin del ciclo
onMounted(fetchPreguntas);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pregunta {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pregunta-number {
  font-size: 16px;
  color: #333;
}

.agregar-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.agregar-button i {
  margin-left: 10px;
}

.agregar-button:hover {
  background-color: #0056b3;
}
</style>

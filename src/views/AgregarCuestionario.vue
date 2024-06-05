<template>
  <div class="container">
    <h2 class="titulo">Agregar Nuevo Cuestionario</h2>
    <form @submit.prevent="agregarCuestionario" class="formulario">
      <div class="campo">
        <label for="idCuestionario">ID Cuestionario:</label>
        <input type="number" v-model="idCuestionario" id="idCuestionario" required class="input-text" />
      </div>
      <div class="campo">
        <label for="titulo">Título:</label>
        <input type="text" v-model="titulo" id="titulo" required class="input-text" />
      </div>
      <div class="campo">
        <label for="descripcion">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" required class="textarea"></textarea>
      </div>
      <div class="campo">
        <label for="anio">Año:</label>
        <input type="text" v-model="anio" id="anio" required class="input-text" />
      </div>
      <!-- Campo oculto para el ID de la carrera -->
      <input type="hidden" v-model="idCarrera" />
      <button type="submit" class="btn">Agregar Cuestionario</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const idCuestionario = ref('');
const titulo = ref('');
const descripcion = ref('');
const anio = ref('');
//const idCarrera = ref(route.params.idCarrera); // Obtenemos la ID_carrera de la URL
const idCarrera = ref(route.params.idCarrera || ''); // Obtenemos el idCarrera de los parámetros de la URL



const agregarCuestionario = async () => {
  const nuevoCuestionario = {
    ID_Cuestionario: idCuestionario.value,
    Titulo: titulo.value,
    Descripcion: descripcion.value,
    Anio: anio.value,
    ID_carrera: idCarrera.value
  };

  try {
    // Guardar el nuevo cuestionario
    await axios.post('http://localhost:3000/cuestionario', nuevoCuestionario);
    
    // Redirigir a la lista de cuestionarios de la misma carrera
    router.push({ name: 'Cuestionarios', params: { idCarrera: idCarrera.value } });
  } catch (error) {
    console.error('Error agregando cuestionario:', error);
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.titulo {
  font-size: 24px;
  margin-bottom: 20px;
}

.formulario {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.campo {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

.input-text,
.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>

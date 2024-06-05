<template>
  <div class="container">
    <h1>Agregar Pregunta</h1>
    <form @submit.prevent="agregarPregunta">
      <div class="formulario">
        <label for="numero">Número:</label>
        <input type="number" id="numero" v-model="numero" required />
      </div>
      <div class="formulario">
        <label for="contenido">Contenido:</label>
        <input type="text" id="contenido" v-model="contenido" required />
      </div>
      <button type="submit" class="btn">Agregar Pregunta</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const numero = ref<number>(1); 
const contenido = ref<string>(''); 

const agregarPregunta = async () => {
  const idCuestionario = route.params.idCuestionario;
  const nuevaPregunta = {
    Numero: numero.value,
    Contenido: contenido.value,
    ID_Cuestionario: idCuestionario
  };

  try {
    await axios.post('http://localhost:3000/preguntas', nuevaPregunta);
    router.push({ name: 'Preguntas', params: { idCuestionario } });
  } catch (error) {
    console.error('Error agregando pregunta:', error);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.formulario {
  margin-bottom: 15px;
}

.formulario label {
  display: block;
  margin-bottom: 5px;
}

.formulario input,
.formulario textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn {
  display: inline-block;
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

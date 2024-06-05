<template>
  <div class="editar-cuestionario" v-if="cuestionario">
    <h2>Editar Cuestionario</h2>
    <form @submit.prevent="updateCuestionario" class="form">
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="cuestionario.Titulo" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="cuestionario.Descripcion" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="anio">Año:</label>
        <input type="text" id="anio" v-model="cuestionario.Anio" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="carrera">Carrera:</label>
        <input type="text" id="carrera" v-model="cuestionario.ID_carrera" class="form-control" disabled />
      </div>
      <div class="form-group">
        <label for="idCuestionario">ID Cuestionario:</label>
        <input type="text" id="idCuestionario" v-model="cuestionario.ID_Cuestionario" class="form-control" disabled />
      </div>
      <!-- id -->
      <div class="form-group">
        <label for="id">id:</label>
        <input type="text" id="id" v-model="cuestionario.id" class="form-control" disabled />
      </div>

      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
  <div v-else>
    <p>Error al cargars</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

interface Cuestionario {
  id:String;
  ID_Cuestionario: String ;
  Titulo: string;
  Descripcion: string;
  Anio: string;
  ID_carrera: number;
}

const cuestionario = ref<Cuestionario | null>(null);
const route = useRoute();
const router = useRouter();

//Traigo los datos de cuestionario
const fetchCuestionario = async (idCuestionario: String) => {
  try {
    const response = await axios.get<Cuestionario>(`http://localhost:3000/cuestionario/${idCuestionario}`);
    cuestionario.value = response.data;
  } catch (error) {
    console.error('Error al obtener el cuestionario:', error);
  }
};

const updateCuestionario = async () => {
  if (cuestionario.value) {
    try {
      await axios.put(`http://localhost:3000/cuestionario/${cuestionario.value.ID_Cuestionario}`, cuestionario.value);
      // Redirigir a la vista de Cuestionarios después de guardar los cambios
      router.push({ name: 'Cuestionarios', params: { idCarrera: cuestionario.value.ID_carrera } });
    } catch (error) {
      console.error('Error al actualizar el cuestionario:', error);
    }
  }
};

onMounted(() => {
  const idCuestionario = String(route.params.idCuestionario);
  fetchCuestionario(idCuestionario);
});
</script>



<!-- estilo -->
<style scoped>
.editar-cuestionario {
  max-width: 600px;
  margin: auto;
}

.form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
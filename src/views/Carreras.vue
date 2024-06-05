<template>
  <div class="contenedor">
    <!-- Iteracion de la cadena -->
    <div v-for="carrera in carreras" :key="carrera.ID_carrera" class="card">
      <!-- Un destino de para mandarlo a Cuestionario, dependidendo del idCarrera -->
      <router-link :to="{ name: 'Cuestionarios', params: { idCarrera: carrera.ID_carrera }}"> 
        <!-- datos del .json -->
        <p class="carrera-nombre">{{ carrera.Nombre }}</p>
        <p class="carrera-abrev">{{ carrera.Abreviacion }}</p>
      </router-link>
    </div>
  </div>
</template>

<!-- Componenets  -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'; //Montamos en Doom
import axios from 'axios'; 

//Interfaz para objeto Carrea
interface Carrera {
  ID_carrera: number;
  Nombre: string;
  Abreviacion: string;
}
// Arreglo vacio, para almacenar una lista CArera
const carreras = ref<Carrera[]>([]);
//Funcion Asincrona para obtener lista carrera
const fetchCarreras = async () => {
  try {
    const response = await axios.get<Carrera[]>('http://localhost:3000/carrera');
    carreras.value = response.data;
  } catch (error) {
    //Error imprime en consola
    console.error('Error en el fetching carreras:', error);
  }
};
//hook --> el componente a sido montadp DOOM
onMounted(fetchCarreras);
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  width: 200px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.carrera-nombre {
  font-size: 18px;
  font-weight: bold;
  color: #4c33eb;
  text-decoration: none;
}

.carrera-abrev {
  font-size: 14px;
  color: #050b17;
}

a {
  text-decoration: none;
}

a:hover .carrera-nombre {
  text-decoration: underline;
}
</style>
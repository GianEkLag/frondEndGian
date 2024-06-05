// IMPORTACIONES
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Carreras from '../views/Carreras.vue';
import Cuestionarios from '../views/Cuestionarios.vue';
import Preguntas from '../views/Preguntas.vue';
import AgregarPregunta from '../views/AgregarPregunta.vue';
import AgregarCuestionario from '../views/AgregarCuestionario.vue';
import EditarCuestionario from '../views/EditarCuestionario.vue';

//Rutas 
const routes: RouteRecordRaw[] = [
  {
    path: '/carreras', //URL
    name: 'Carreras', //Nombre
    component: Carreras // Componente --> Carreras.vue
  },
  {
    path: '/cuestionarios/:idCarrera',
    name: 'Cuestionarios',
    component: Cuestionarios
  },
  {
    path: '/preguntas/:idCuestionario',
    name: 'Preguntas',
    component: Preguntas
  },
  {
    path: '/agregar-pregunta/:idCuestionario',
    name: 'AgregarPregunta',
    component: AgregarPregunta
  },
  {
    path: '/Agregar-cuestionario/:idCarrera',
    name: 'AgregarCuestionario',
    component: AgregarCuestionario
  },
  {
    path: '/editar-cuestionario/:idCuestionario',
    name: 'EditarCuestionario',
    component: EditarCuestionario
  },
];

const router = createRouter({
  history: createWebHistory(''), //Sin parametros
  routes
});

export default router;

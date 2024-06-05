<template>
  <header>
    <div class="header-content">
      <div class="logo-container">
        <img alt="Vue logo" class="logo" src="@/assets/logoChetumals.svg" />
      </div>
      <div class="text-container">
      </div>
    </div>
  </header> 
  <nav class="navbar">
    <ul>
      <li><RouterLink to="/" class="nav-link menu servicios" data-title="Home"><span><span>Home</span></span></RouterLink></li>
      <li><RouterLink to="/carreras" class="nav-link menu recursos" data-title="Carreras"><span><span>Carreras</span></span></RouterLink></li>    
      <li><RouterLink to="/proyectos" class="nav-link menu proyectos" data-title="Preguntas"><span><span>Proyectos</span></span></RouterLink></li>
      <li><RouterLink to="/contacto" class="nav-link menu contacto" data-title="Contacto"><span><span>Contacto</span></span></RouterLink></li>
    </ul>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* Estilos globales para todo el proyecto */
body {
  font-family: Georgia;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 100%;
  padding: 20px 0;
  background-color: #f5f5f9;
  box-shadow: 0 2px 4px rgba(243, 236, 236, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: 80%;
  margin: 0 auto;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.logo {
  width: 1000px;
  height: 100px;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  margin: 0;
  font-size: 24px;
  color: #fff;
}

p {
  margin: 10px 0 0;
  font-size: 18px;
  color: #fff;
}

.navbar {
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: center;
  padding: 0px 0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin: 0 15px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  display: block;
  position: relative;
  height: 56px;
  width: 120px;
  margin: 0;
  overflow: hidden;
  text-align: center;
}

.nav-link > span {
  display: block;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 0%;
  transition: 0.5s ease-in-out;
  -webkit-transition: 0.5s ease-in-out;
}

.nav-link:after, .nav-link > span > span {
  display: block;
  text-align: center;
  border-radius: 0em;
  padding: 2em 0 1.5em;
}

.nav-link:after {
  content: attr(data-title);
  width: 100%;
  background: #000;
  color: #fff;
}

.nav-link > span > span {
  width: 120px;
  color: #fff;
}

.menu.servicios > span > span {
  background: #ffc000;
}

.menu.proyectos > span > span {
  background: #00a53c;
}

.menu.recursos > span > span {
  background: #b81800;
}

.menu.contacto > span > span {
  background: #9600b4;
}

.menu:hover > span {
  height: 100%; 
}
</style>

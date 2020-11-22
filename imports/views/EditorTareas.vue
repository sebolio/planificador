<template>
  <div className="container">
    <header>
      <h1>
        Tareas 
        <button class="crear" @click="crear">Crear</button>
        <button class="salir" @click="salir">Cerrar sesión</button>
        </h1>
    </header>
    <h3>Pendientes</h3>
    <ul class="pendientes">
      <Tarea v-for="tarea in tareasPendientes" :key="''+tarea._id" @update="editar(tarea._id, $event)"
      :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar"
      :crear="crear"/>
    </ul>
    <br>
    <h3>Terminadas</h3>
    <ul class="terminadas">
      <Tarea v-for="tarea in tareasTerminadas" :key="''+tarea._id" @update="editar(tarea._id, $event)"
      :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar" 
      :crear="crear"/>
    </ul>
  </div>
</template>
 
<script>
import Vue from 'vue';
import Tarea from '../components/Tarea.vue';
import { Tareas } from '../api/tareas.js';

export default {
  components: { Tarea },
  data() {
    return {
    }
  },
  computed: {
    user() { return this.$store.state.user }
  },
  methods: {
    marcar(id, terminada) {
      Tareas.update(id, {$set:{terminada, ultimoCambio: new Date()}})
    },
    editar(id, texto) {
      Tareas.update(id, {$set:{texto, ultimoCambio: new Date()}})
    },
    crear() {
      Tareas.insert({terminada:false, texto:'', ultimoCambio: new Date(), usuario:this.user._id})
      setTimeout(_=> {
        const pendientes = document.querySelectorAll('.pendientes li input[type="text"]');
        console.log('son', pendientes, pendientes[pendientes.length-1]);
        pendientes[pendientes.length-1].focus()
      }, 100)
    },
    quitar(id) {
      Tareas.remove(id)
    },
    salir() {
      this.$router.replace('/logout');
    }
  },
  meteor: {
    tareasPendientes() {
      return Tareas.find({usuario:this.user._id, terminada:{$ne:true}}).fetch();
    },
    tareasTerminadas() {
      return Tareas.find({usuario:this.user._id, terminada:true}).fetch();
    },
  }

};
</script>

<style>
  /* .pendientes li { background: red;} */
  .terminadas li input[type="text"] { background: gray; pointer-events: none;}
</style>
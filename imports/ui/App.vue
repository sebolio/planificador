<template>
  <div className="container">
    <header>
      <h1>Tareas <button class="crear" @click="crear">Crear</button></h1>
    </header>
    <h3>Pendientes</h3>
    <ul class="pendientes">
      <Tarea v-for="tarea in tareasPendientes" :key="''+tarea._id" @update="editar(tarea._id, $event)"
      :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar"/>
    </ul>
    <br>
    <h3>Terminadas</h3>
    <ul class="terminadas">
      <Tarea v-for="tarea in tareasTerminadas" :key="''+tarea._id" @update="editar(tarea._id, $event)"
      :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar"/>
    </ul>
  </div>
</template>
 
<script>
import Vue from "vue";
import Tarea from "./Tarea.vue";
import { Tareas } from "../api/tareas.js";

export default {
  components: { Tarea },
  data() {
    return {
    }
  },
  methods: {
    marcar(id, terminada) {
      Tareas.update(id, {$set:{terminada, ultimoCambio: new Date()}})
    },
    editar(id, texto) {
      Tareas.update(id, {$set:{texto, ultimoCambio: new Date()}})
    },
    crear() {
      Tareas.insert({terminada:false, texto:'', ultimoCambio: new Date()})
    },
    quitar(id) {
      Tareas.remove(id)
    }
  },
  meteor: {
    tareasPendientes() {
      return Tareas.find({terminada:{$ne:true}}).fetch();
    },
    tareasTerminadas() {
      return Tareas.find({terminada:true}).fetch();
    },
  }

};
</script>

<template>
  <div className="container">
    <header>
      <h1>Tareas de {{user.profile.nombre}}</h1>
      <button class="crear" @click="crear"><i class="far fa-calendar-plus"></i></button>
      <button class="salir" @click="salir"><i class="fas fa-sign-out-alt"></i></button>
    </header>

    <div class="lista pendientes">
      <h3>Pendientes</h3>
      <p>Presiona <kbd>Enter</kbd> mientras editas para crear otra</p>
      <ul>
        <Tarea v-for="tarea in tareasPendientes" :key="''+tarea._id" @update="editar(tarea._id, $event)"
        :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar"
        :crear="crear"/>
      </ul>
    </div>

    <div class="lista terminadas">
      <h3>Terminadas</h3>
      <ul>
        <Tarea v-for="tarea in tareasTerminadas" :key="''+tarea._id" @update="editar(tarea._id, $event)"
        :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar" 
        :crear="crear"/>
      </ul>
    </div>

  </div>
</template>
 
 
<style scoped>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css';
  header {
    display: flex;
    align-items: center;
    vertical-align: center;
  }
  header h1 {
    margin-right: 20px;
  }
  header button {
    font-size: 30px;
    border-radius: 20px;
    padding: 3px 10px;
    border: none;
    background: none;
    color:rgb(74, 122, 253);
    cursor: pointer;
    margin-left: 10px;
  }
  header button:hover {
    color:rgb(255, 104, 17);
  }

  header button.cxrear {
    padding: 3px 12px;
    border-radius: 100%;
    /* background: rgb(81, 231, 81); */
    margin-left:10px;
    margin-right:10px;
  }
  header button.salir {
    /* background: rgb(199, 199, 199); */
  }

  ul,li { list-style: none; margin:0; padding:0;}
  kbd { border:1px solid black; border-radius: 4px; padding: 0 3px; }
  .terminadas li input[type="text"] { background: gray; pointer-events: none;}
</style>

<script>
import Vue from 'vue';
import Tarea from '../components/Tarea.vue';
import { Tareas } from '../api/tareas.js';

export default {
  components: { Tarea },
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

<template>
  <div>

		<vs-row justify="center">
			<vs-col w="6">
				<vs-card type="3">
					<template #title>
						<h3>Tareas de {{user.profile.nombre}}</h3><br>
            <button class="salir" @click="salir">X</button>
					</template>
					<template #img>
						<img src="https://seb.cl/wp-content/uploads/2020/11/planner.jpg" alt="">
					</template>
					<template #text class="center">
            <ul class="pendientes">
              <Tarea v-for="tarea in tareasPendientes" :key="''+tarea._id" @update="editar(tarea._id, $event)"
              :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar"
              :crear="crear"/>
            </ul>
						<vs-button gradient @click="crear" class="mt-10">Crear nueva tarea</vs-button>

            <h3 v-if="tareasTerminadas.length>0" class="mt-30">Terminadas</h3>
            <ul>
              <Tarea v-for="tarea in tareasTerminadas" :key="''+tarea._id" @update="editar(tarea._id, $event)"
              :tarea="tarea" :texto.sync="tarea.texto" :marcar="marcar" :editar="editar" :quitar="quitar" 
              :crear="crear"/>
            </ul>

					</template>
				</vs-card>
			</vs-col>
		</vs-row>
  </div>
</template>
 
 
<style scoped>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css';
  button { display: table-caption; }
  ul,li { list-style: none; margin:0; padding:0;}
  kbd { border:1px solid black; border-radius: 4px; padding: 0 3px; }
  .terminadas li input[type="text"] { background: gray; pointer-events: none;}
  .salir {
    position: absolute;
    right:0;
    background: red;
    color:white;
    border:none;
    top: 0;
    border-top-right-radius: 21px;
    padding: 6px 16px 5px 10px;
  }
  .salir:hover {
    background: rgb(243, 153, 153);
  }
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

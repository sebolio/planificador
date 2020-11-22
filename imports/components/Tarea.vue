<template>
  <li>
    <input type="checkbox" :checked="tarea.terminada" @input="marcar(tarea._id, !tarea.terminada)">
    <input type="text" v-model="this.texto" @input="$emit('update', this.texto)">
    <button @click="quitar(tarea._id)">x</button>
  </li>
</template>
 
<script>
export default {
  props: ["tarea", "marcar", "editar", "texto", "quitar"],
  data() {
    return {};
  }
};
</script>

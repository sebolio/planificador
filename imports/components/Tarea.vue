<template>
  <li>
    <vs-checkbox success v-model="tarea.terminada" @click="marcar(tarea._id, !tarea.terminada)"/>
    <vs-input type="text" v-model="this.texto" @input="$emit('update', this.texto)" @keydown.enter="crear"/>
    <button @click="quitar(tarea._id)" class="quitar">x</button>
  </li>
</template>
 
 <style scoped>
  .quitar {
    color:white;
    border: none;
    border-radius: 100%;
    transform: translate(-17px, -10px);
    padding: 0px 5px 1px 4px;
    background: #e41212;
    font-size: 12px;
  }
  .quitar:hover {
    background: #ff9494;
  }
  .vs-input-parent { margin-bottom: 12px;}
 </style>

<script>
export default {
  props: ["tarea", "marcar", "editar", "texto", "quitar", "crear"],
  data() {
    return {};
  }
};
</script>

<template>
  <div>
    <input type="text" v-model="usuario" @keydown.enter="login"><br>
    <input type="password" v-model="pass" @keydown.enter="login"><br>
    <button @click="login">Iniciar sesión</button>
    <button @click="crear">Crear cuenta</button>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
export default {
    data() {
        return {
            usuario: '',
            pass: ''
        }
    },
    methods: {
      async crear() {
        this.$router.replace('/registro');
      },
      async login() {
        Meteor.loginWithPassword(this.usuario, this.pass, res=> {
          console.log('msg', res);
          if (res.error) {
            const crear = confirm('Login incorrecto, ¿quieres crear una cuenta?')
            this.crear();
          }
        });
      }
    }
}
</script>

<style>

</style>
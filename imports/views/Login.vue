<template>
  <div>
    <header>
      <h1>Bienvenido a Seb-SA</h1>
    </header>
    <input type="text" v-model="usuario" @keydown.enter="login" placeholder="Nombre de usuario"><br>
    <input type="password" v-model="pass" @keydown.enter="login" placeholder="Contraseña"><br>
    <button @click="login">Iniciar sesión</button>
    <button @click="crear">Crear cuenta</button>
  </div>
</template>

<style>

</style>

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
        //intentar iniciar sesión con el usuario y pass ingresados
        Meteor.loginWithPassword(this.usuario, this.pass, res=> {
          console.log('msg', res);
          if (res.error) {
            //si la cuenta no existe, ofrecer crearla
            if (confirm('Login incorrecto, ¿quieres crear una cuenta?')) {
              this.crear();
            }
          }
        });
      }
    }
}
</script>


<template>
  <div>
    <input type="text" v-model="nombre" placeholder="Nombre"><br>
    <input type="text" v-model="usuario" placeholder="Usuario"><br>
    <input type="password" v-model="pass" placeholder="Password"><br>
    <button @click="crear">Crear cuenta</button>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
export default {
    data() {
        return {
            nombre: '',
            usuario: '',
            pass: ''
        }
    },
    methods: {
      //funcion para registrar al usuario, lo logea de inmediato
      async crear() {
        await Accounts.createUser({username:this.usuario, password:this.pass, profile:{nombre:this.nombre}}, res=> {
          console.log('sale', res);
          if (res && res.error) alert('Error al crear: ' + res.reason)
          else this.login();
        });
      },

      //funcion para crear cuenta, invita a crear si los datos son inválidos
      async login() {
        Meteor.loginWithPassword(this.usuario, this.pass, res=> {
        if (res && res.error) {
          //login inválido, preguntar si quiere registrarse
          if (confirm('Login incorrecto, ¿quieres crear una cuenta?')) {
            this.$router.replace('/registro');
          }
        }
      });
    }
  }
}
</script>

<style>

</style>
<template>
  <div>
    
		<vs-row justify="center">
			<vs-col w="6">
				<vs-card type="3">
					<template #title>
						<h3>Nueva cuenta de Planificador</h3><br>
					</template>
					<template #img>
						<img src="https://seb.cl/wp-content/uploads/2020/11/planner.jpg" alt="">
					</template>
					<template #text>
						<vs-input v-model="nombre" placeholder="Tu nombre" class="mt-20"/><br>
						<vs-input v-model="usuario" placeholder="Nombre de usuario" class="mt-10"/><br>
						<vs-input type="password" v-model="pass" placeholder="Contraseña" class="mt-10"/><br>
						<vs-button gradient @click="crear" class="mt-10">Crear cuenta</vs-button>
					</template>
				</vs-card>
			</vs-col>
		</vs-row>

  
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
        Accounts.createUser({username:this.usuario, password:this.pass, profile:{nombre:this.nombre}}, res=> {
          if (res && res.error) alert('Error al crear: ' + res.reason)
          else this.login();
        });
      },

      //funcion para crear cuenta, invita a crear si los datos son inválidos
      async login() {
        Meteor.loginWithPassword(this.usuario, this.pass, res=> {
          if (res && !res.error) {
              this.$router.replace('/');
          }
        });
      },

      async volver() {
        this.$router.replace('/login')
      }
  }
}
</script>

<style>

</style>
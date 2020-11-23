<template>
	<div>

		<vs-row justify="center">
			<vs-col w="6">
				<vs-card type="3">
					<template #title>
						<h3>¡Bienvenido al Planificador!</h3><br>
					</template>
					<template #img>
						<img src="https://seb.cl/wp-content/uploads/2020/11/planner.jpg" alt="">
					</template>
					<template #text class="center">
						<vs-input v-model="usuario" @keydown.enter="login" placeholder="Nombre de usuario"/><br>
						<vs-input type="password" v-model="pass" @keydown.enter="login" class="mt-20" placeholder="Contraseña"/><br>
						<vs-button gradient @click="login" class="mt-20">Iniciar sesión</vs-button>
						<vs-button gradient warn @click="crear" class="mt-20">Crear cuenta</vs-button>
					</template>
				</vs-card>
			</vs-col>
		</vs-row>
	</div>
</template>

<style scoped>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css';
	.crear { color:red; }
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


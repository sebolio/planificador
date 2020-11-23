/**
 * Store
 * 
 * Esta librería implementa el manejo de estados de Vuex para mantener la sesión de usuario
 * desde los distintos rincones del programa. Es una versión simplificada del ejemplo de la documentación.
 * 
 * @author sebolio
 * @package planificador
 * 
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        user: {}
    }),
    mutations: {
        setUser (state, user) {
            state.user = user;
        }
    }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
        user: {}
    }),

    actions: {
        getUser (state) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return state.user;
        }
    },

    mutations: {
        setUser (state, user) {
            state.user = user;
        }
    }
    })
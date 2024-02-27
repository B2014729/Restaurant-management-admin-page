import Vuex from 'vuex';

const state = {
    user: null,
};

const store = new Vuex.Store({
    state,

    getters: {
        user: (state) => {
            return state.user;
        }
    },

    actions: {
        user(context, user) {
            context.commit('setUser', user);
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    }
});

export default store;
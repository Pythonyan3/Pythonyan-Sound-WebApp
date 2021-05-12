export default {
    namespaced: true,
    state: {
        profile: null
    },
    getters: {
        getProfile(state) {
            if (!state.profile) {
                state.profile = JSON.parse(localStorage.getItem("profile"));
            }
            return state.profile;
        },
    },
    mutations: {
        SET_PROFILE(state, payload) {
            localStorage.setItem("profile", JSON.stringify(payload))
            state.profile = payload;
        },
        CLEAR_PROFILE(state) {
            localStorage.removeItem("profile")
            state.profile = null;
        }
    },
    actions: {
        async login_action({ commit }, { api, error_parser, ...payload }) {
            try {
                const response = (await api.profile.login(payload));
                commit("SET_PROFILE", response.data);
                return true;
            } catch (error) {
                error_parser(commit, error);
                return false;
            }
        },

        async signup_action({ commit }, { api, error_parser, ...payload }) {
            try {
                await api.profile.signup(payload);
                return true;
            } catch (error) {
                error_parser(commit, error);
                return false
            }
        },

        async logout_action({ commit, state}, { api, error_parser }) {
            try {
                await api.profile.logout(
                    { 
                        refresh: state.profile.refresh 
                    },
                    state.profile.access
                );

                commit("CLEAR_PROFILE");
                return true;
            } catch (error) {
                console.log(error.response.data);
                error_parser(commit, error);
                return false;
            }
        },

        async email_verify_action({ state }, { api, verify_token }){
            try {
                await api.profile.email_verify(
                    { 
                        token: verify_token
                    }
                );
                if (state.profile){
                    state.profile.is_verified = true;
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}
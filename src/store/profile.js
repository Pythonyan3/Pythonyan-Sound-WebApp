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
            state.profile = {
                id: payload.id,
                username: payload.username,
                photo: payload.photo,
                isArtist: payload.is_artist,
                isVerified: payload.is_verified,
                accessToken: payload.access,
                refreshToken: payload.refresh
            };
            localStorage.setItem("profile", JSON.stringify(state.profile))
            
        },
        CLEAR_PROFILE(state) {
            localStorage.removeItem("profile")
            state.profile = null;
        }
    },
    actions: {
        async loginAction({ commit }, { api, ...payload }) {
            try {
                const response = (await api.profile.login(payload));
                commit("SET_PROFILE", response.data);
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true })
                return false;
            }
        },

        async signupAction({ commit }, { api, ...payload }) {
            try {
                await api.profile.signup(payload);
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true })
                return false
            }
        },

        async logoutAction({ commit }, { api, accessToken, refreshToken }) {
            try {
                await api.profile.logout(
                    { 
                        refresh: refreshToken
                    },
                    accessToken
                );

                commit("CLEAR_PROFILE");
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true });
                return false;
            }
        },

        async emailVerifyAction({ state }, { api, verify_token }){
            try {
                await api.profile.emailVerify(
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
        },

        async getProfileInfoAction({ commit }, { api, profileId, accessToken }) {
            try {
                return await api.profile.getProfileInfo(profileId, accessToken);
            } catch (error) {
                commit("SET_ERROR", error, { root: true });
                return false;
            }
        },

        async followProfileAction({ commit }, { api, profileId, accessToken }) {
            try {
                await api.profile.followProfile(profileId, accessToken);
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true });
                return false;
            }
        },

        async unfollowProfileAction({ commit }, { api, profileId, accessToken }) {
            try {
                await api.profile.unfollowProfile(profileId, accessToken);
                return true;
            } catch (error) {
                commit("SET_ERROR", error, { root: true });
                return false;
            }
        },
    }
}
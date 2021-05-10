export default {
    install: (app) => {
        app.config.globalProperties.$response_error_parser = async (commit, error) => {
            if (error.response && error.response.data) {
                Object.values(error.response.data).forEach(val => {
                    if (Array.isArray(val)) {
                        val.forEach(element => commit("ADD_ERROR", element, { root: true }));
                    } else {
                        commit("ADD_ERROR", val, { root: true });
                    }
                });
            } else {
                console.log(error);
            }
        }
    }
}
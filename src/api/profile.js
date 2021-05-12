export default function (axios_instance) {
    return {
        /**
         * Sends HTTP request to Backend for user registration
         * Uses POST method
         * @param {*} payload - request body data
         * @returns axios promise response
         */
        signup(payload) {
            return axios_instance.post("profile/registration/", payload)
        },
        /**
         * Sends HTTP request to Backend for user login
         * Uses POST method
         * @param {*} payload - request body data
         * @returns axios promise response
         */
        login(payload) {
            return axios_instance.post("profile/login/", payload)
        },
        /**
         * Sends HTTP request to Backend for user logout
         * Uses POST method
         * @param {*} payload - request body data
         * @returns axios promise response
         */
        logout(payload, access_token) {
            return axios_instance.delete("profile/logout/", {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                data: payload
            })
        },
        email_verify(payload){
            return axios_instance.post("profile/registration/email-verify/", payload);
        }
    }
}
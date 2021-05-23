export default function (axios_instance) {
    return {
        likeSong(payload, accessToken) {
            return axios_instance.post(`music/likes/${payload}/`, {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },

        unlikeSong(payload, accessToken) {
            return axios_instance.delete(`music/likes/${payload}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },
    }
}
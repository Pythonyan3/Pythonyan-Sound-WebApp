export default function (axios_instance) {
    return {
        getProfilePlaylists(accessToken) {
            return axios_instance.get("playlist/", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },

        createPlaylist(payload, accessToken) {
            return axios_instance.post("playlist/", payload, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        }
    }
}
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
        },

        getPlaylistInfo(payload, accessToken) {
            return axios_instance.get(`playlist/${payload}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },

        likePlaylist(payload, accessToken) {
            return axios_instance.post(`playlist/likes/${payload}/`, {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },

        unlikePlaylist(payload, accessToken) {
            return axios_instance.delete(`playlist/likes/${payload}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        },
    }
}
export default function (axios_instance) {
    return {
        search(searchString) {
            return axios_instance.get(`search/${searchString}/`, {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxNTE0ODg2LCJqdGkiOiIyODc4NWI1NTg2NDU0ODM4YWZhOTZmNmM1OTNhMWZlOCIsInVzZXJfaWQiOjF9.HePvwFtHf3UCwj-u-bQ5_xauXBaSBQg4B94GDZKJmoA'
                }
            })
        },

        searchProfile(searchString) {
            return axios_instance.get(`search/profile/${searchString}/`)
        },

        searchArtist(searchString) {
            return axios_instance.get(`search/artist/${searchString}/`)
        },

        searchPlaylist(searchString) {
            return axios_instance.get(`search/playlist/${searchString}/`)
        },

        searchSong(searchString) {
            return axios_instance.get(`search/song/${searchString}/`)
        }
    }
}
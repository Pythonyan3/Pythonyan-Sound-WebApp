import axios_instance from "./axios_instance"

import playlistsModule from "./playlists"
import profileModule from "./profile"
import searchModule from "./search"
import songsModule from "./songs"

export default {
    playlists: playlistsModule(axios_instance),
    profile: profileModule(axios_instance),
    search: searchModule(axios_instance),
    songs: songsModule(axios_instance)
}
import axios_instance from "./axios_instance"

import profileModule from "./profile"
import searchModule from "./search"

export default {
    profile: profileModule(axios_instance),
    search: searchModule(axios_instance)
}
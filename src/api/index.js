import axios_instance from "./axios_instance"

import profileModule from "./profile"

export default {
    profile: profileModule(axios_instance)
}
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ApiPlugin from "./plugins/api"
import ResponseErrorParserPlugin from "./plugins/reponse_error_parser"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ApiPlugin)
app.use(ResponseErrorParserPlugin)
app.mount("#app")

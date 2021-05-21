import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ApiPlugin from "./plugins/api"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ApiPlugin)
app.mount("#app")

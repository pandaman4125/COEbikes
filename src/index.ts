import "@/styles/index.scss";
import router from "@/lib/router";
import App from "@/App.vue";
import { createApp } from "vue";

createApp(App)
	.use(router)
	.mount("#app");

window.addEventListener("load", () => {
	document.body.classList.add("loaded");
})

import "~/styles/index.scss";
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import router from "~lib/router";
import App from "~/App.vue";

Vue.use(VueCompositionApi);
declare module "@vue/composition-api/dist/component/component" {
	interface SetupContext {
		readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
	}
}

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");


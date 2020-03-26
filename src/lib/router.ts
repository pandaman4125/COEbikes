import Vue from "vue";
import VueRouter from "vue-router";
import Home from "~components/views/Home.vue";
import About from "~components/views/About.vue";
import Contact from "~components/views/Contact.vue";
import FAQs from "~components/views/FAQs.vue";
import Inventory from "~components/views/Inventory.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/about",
			component: About
		},
		{
			path: "/contact",
			component: Contact
		},
		{
			path: "/faqs",
			component: FAQs
		},
		{
			path: "/inventory",
			component: Inventory
		}
	]
});

export default router;

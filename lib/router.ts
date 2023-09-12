import Home from "@/components/views/Home.vue";
import About from "@/components/views/About.vue";
import Contact from "@/components/views/Contact.vue";
import FAQs from "@/components/views/FAQs.vue";
import Inventory from "@/components/views/Inventory.vue";
import {createRouter, createWebHistory, Router} from "vue-router";

const routes = [
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
];
const router: Router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;

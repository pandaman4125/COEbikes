<template>
	<div>
		<Header></Header>
		<RouterView></RouterView>
		<Footer></Footer>
	</div>
</template>

<script lang="ts">
	import {defineComponent} from "@vue/composition-api";
	import Header from "~/components/global/Header.vue";
	import Footer from "~/components/global/Footer.vue";

	export default defineComponent({
		components: {
			Header,
			Footer
		},
		props: {},
		setup(props) {

		}
	});

</script>

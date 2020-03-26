<template>
	<footer class="footer"
	        v-if="companyInfo.fields">
		<div>
			© {{ year }} Colorado E-Bike | {{ companyInfo.fields.address }} | {{ companyInfo.fields.phoneNumber }} |
			<router-link to="/contact">Contact Us</router-link>
		</div>
	</footer>
</template>

<script lang="ts">
	import {defineComponent, ref} from "@vue/composition-api";
	import ContentfulClient from "~/lib/ContentfulClient";

	export default defineComponent({
		props: {},
		setup(props) {
			// Contentful client
			const client = new ContentfulClient();

			// Declare reactive properties
			const year = new Date().getFullYear();
			const companyInfo = ref({});

			// Populate reactive properties with Contentful data
			client.getCompanyInfo().then((i) => {
				companyInfo.value = i;
			});

			return {
				year,
				companyInfo
			};
		}
	});
</script>

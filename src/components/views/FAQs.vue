<template>
	<main>
		<div class="content"
		     v-if="!page.fields">
			Loading...
		</div>

		<template v-if="page.fields">
			<Hero :img="page.fields.heroImage.fields.file.url"
			      :imgTitle="page.fields.heroImage.fields.title"
			      :text="page.fields.heroText"></Hero>

			<div class="content faq-page-faqs">
				<FAQPageFAQs :section="section"
				             v-for="section in faqs"></FAQPageFAQs>
			</div>
		</template>
	</main>
</template>

<script lang="ts">
	import {defineComponent, ref} from "@vue/composition-api";
	import Hero from "~/components/global/Hero.vue";
	import FAQPageFAQs from "~/components/views/FAQPageFAQs.vue";
	import ContentfulClient from "~/lib/ContentfulClient";

	export default defineComponent({
		components: {
			FAQPageFAQs,
			Hero
		},
		props: {},
		setup(props) {
			// Contentful client
			const client = new ContentfulClient();

			// Declare reactive properties
			const page = ref({});
			const faqs = ref([]);

			// Populate reactive properties with Contentful data
			client.getPage("FAQs").then((p) => {
				page.value = p;
			});
			client.getFaqs().then((f) => {
				faqs.value = f;
			});

			return {
				page,
				faqs
			};
		}
	});
</script>

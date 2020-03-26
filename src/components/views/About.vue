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

			<div class="content about-page-bike-brands">
				<AboutPageBikeBrand :section="brand"
				                    v-for="brand in aboutPageBikeBrands"></AboutPageBikeBrand>
			</div>

			<div class="content"
			     v-html="getHTML(page.fields.content)"></div>
		</template>
	</main>
</template>

<script lang="ts">
	import {defineComponent, ref} from "@vue/composition-api";
	import ContentfulClient from "~/lib/ContentfulClient";
	import {documentToHtmlString} from "@contentful/rich-text-html-renderer";
	import Hero from "~/components/global/Hero.vue";
	import AboutPageBikeBrand from "~/components/views/AboutPageBikeBrand.vue";

	export default defineComponent({
		components: {
			Hero,
			AboutPageBikeBrand
		},
		props: {},
		setup(props) {
			// Contentful client
			const client = new ContentfulClient();

			// Declare reactive properties
			const page = ref({});
			const aboutPageBikeBrands = ref([]);

			// Methods
			const getHTML = (field: any): string => {
				return documentToHtmlString(field);
			};

			// Populate reactive properties with Contentful data
			client.getPage("About").then((p) => {
				page.value = p;
			});
			client.getAboutPageBikeBrands().then((b) => {
				aboutPageBikeBrands.value = b;
			});

			return {
				page,
				aboutPageBikeBrands,
				getHTML
			};
		}
	});
</script>

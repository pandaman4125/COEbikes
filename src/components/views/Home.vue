<template>
	<main class="home">
		<div class="content"
		     v-if="!page.fields">
			Loading...
		</div>

		<template v-if="page.fields">
			<Hero :img="page.fields.heroImage.fields.file.url"
			      :imgTitle="page.fields.heroImage.fields.title"
			      :text="page.fields.heroText"></Hero>

			<div class="content">
				<HomePageContentSection :section="section"
				                        v-for="section in homePageContentSections"></HomePageContentSection>
			</div>
		</template>
	</main>
</template>

<script lang="ts">
	import {defineComponent, ref} from "@vue/composition-api";
	import ContentfulClient from "~/lib/ContentfulClient";
	import Hero from "~/components/global/Hero.vue";
	import HomePageContentSection from "~/components/views/HomePageContentSection.vue";

	export default defineComponent({
		components: {
			Hero,
			HomePageContentSection
		},
		props: {},
		setup(props) {
			// Contentful client
			const client = new ContentfulClient();

			// Declare reactive properties
			const page = ref({});
			const homePageContentSections = ref([]);

			// Populate reactive properties with Contentful data
			client.getPage("Home").then((p) => {
				page.value = p;
			});
			client.getHomePageContentSection().then((s) => {
				homePageContentSections.value = s;
			});

			return {
				page,
				homePageContentSections
			};
		}
	});
</script>

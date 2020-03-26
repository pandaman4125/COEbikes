<template>
	<div class="about-page-bike-brand"
	     v-if="section.fields">
		<img :src="section.fields.logo.fields.file.url"
		     :title="section.fields.logo.fields.title">
		<span>{{ section.fields.company }}</span>
	</div>
</template>

<script lang="ts">
	import {defineComponent} from "@vue/composition-api";
	import {documentToHtmlString} from "@contentful/rich-text-html-renderer";

	export default defineComponent({
		props: {
			section: {}
		},
		setup(props) {
			const getHTML = (field: any): string => {
				return documentToHtmlString(field);
			};

			return {
				getHTML
			};
		}
	});
</script>

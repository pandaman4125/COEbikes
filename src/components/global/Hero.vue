<template>
  <div :style="{ backgroundImage: 'url(' + img + ')'}"
       class="hero">
    <div class="container">
      <div class="hero-text"
           v-html="getHTML(text)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";

export default defineComponent({
	props: [
		"img",
		"imgTitle",
		"text"
	],
	setup(props: any) {
		// Methods
		const getHTML = (field: any): string => {
			return documentToHtmlString(field)
				.replace("\n", "<span class='rwb'>&nbsp;</span>");
		};

		return {
			getHTML
		};
	}
});
</script>

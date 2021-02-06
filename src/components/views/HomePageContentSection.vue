<template>
  <div class="home-page-content-section">
    <div class="img aspect-ratio aspect-ratio--16x9">
      <div :style="{backgroundImage: 'url(' + section.fields.image.fields.file.url + ')'}"></div>
    </div>
    <h3>{{ section.fields.title }}</h3>

    <div class="text"
         v-html="getHTML(section.fields.content)"></div>

    <div class="call-to-action">
      <router-link :to="section.fields.callToActionUrl">
        {{ section.fields.callToActionText }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";
import {ref, Ref} from "vue";

export default {
	props: ["section"],
	setup(props: any) {
		const section: Ref = ref(props.section);
		const getHTML = (field: any): string => {
			return documentToHtmlString(field);
		};

		return {
			getHTML,
			section
		};
	}
};
</script>

<template>
  <div class="faq">
    <h3>{{ section.fields.question }}</h3>
    <p>{{ section.fields.answer }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		section: {}
	},
	setup(props) {

	}
});
</script>

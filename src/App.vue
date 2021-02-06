<template>
  <div>
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
import {defineComponent} from "vue";

export default defineComponent({
	components: {
		Header,
		Footer
	},
	setup() {

	}
});

</script>

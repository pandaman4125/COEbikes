<template>
  <header class="header">
    <h1 class="logo">
      <router-link to="/">
        <img src="@/svg/logo.svg"
             title="Colorado E-Bike logo">
        <span>Colorado E-Bike</span>
      </router-link>
    </h1>
    <nav class="navigation">
      <router-link to="/faqs">FAQs</router-link>
      <router-link to="/inventory">Inventory</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	props: {},
	setup(props) {
		return {};
	}
});
</script>

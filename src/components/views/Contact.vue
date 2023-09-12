<template>
  <main>
    <div v-if="!page.fields"
         class="content">
      Loading...
    </div>

    <template v-if="page.fields">
      <Hero :img="page.fields.heroImage.fields.file.url"
            :imgTitle="page.fields.heroImage.fields.title"
            :text="page.fields.heroText"></Hero>

      <div v-if="companyInfo.fields"
           class="content">

        <div class="aspect-ratio aspect-ratio--16x9">
          <iframe :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyAQ0T-TacHuI_2H1-9yHLaFz02VGKLytwE&q=${companyInfo.fields.address}`"
                  class="greyscale"></iframe>
        </div>

        <dl>
          <dt>Email Us:</dt>
          <dd>
            <a :href="`mailto:${companyInfo.fields.emailAddress}`">
              {{ companyInfo.fields.emailAddress }}
            </a>
          </dd>

          <dt>Call Us:</dt>
          <dd>
            <a :href="`tel:${companyInfo.fields.phoneNumber}`">
              {{ companyInfo.fields.phoneNumber }}
            </a>
          </dd>

          <dt>Visit Us:</dt>
          <dd>Colorado E-Bike
            <br/>
              {{ companyInfo.fields.address }}
          </dd>
        </dl>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Hero from "@/components/global/Hero.vue";
import ContentfulClient from "@/lib/ContentfulClient";

export default defineComponent({
  components: {
    Hero
  },
  props: {},
  setup(props) {
    // Contentful client
    const client = new ContentfulClient();

    // Declare reactive properties
    const page = ref({});
    const companyInfo = ref({});

    // Populate reactive properties with Contentful data
    client.getPage("Contact")
        .then((p) => {
          page.value = p;
        });
    client.getCompanyInfo()
        .then((i) => {
          companyInfo.value = i;
        });

    return {
      page,
      companyInfo
    };
  }
});
</script>

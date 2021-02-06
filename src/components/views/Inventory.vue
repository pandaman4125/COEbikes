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

      <div class="content">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <!-- <th>Type</th> -->
                <th>Brand</th>
                <th>Model</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in inventory">
                <td>{{ i.Year }}</td>
                <!-- <td></td> -->
                <td>{{ i.Brand }}</td>
                <td>{{ i.Model }}</td>
                <td>{{ i.Size }}</td>
                <td>{{ i.Color }}</td>
                <td>${{ i.Price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from "vue";
import Hero from "@/components/global/Hero.vue";
import ContentfulClient from "@/lib/ContentfulClient";
import CSVParser from "@/lib/CSVParser";
import * as _ from "lodash";

export default defineComponent({
	components: {
		Hero
	},
	props: {},
	setup(props) {
		const parser = new CSVParser();

		// Contentful client
		const client = new ContentfulClient();

		// Declare reactive properties
		const page: Ref = ref(<object>{});
		const inventory: Ref = ref(<Array<object>>[]);

		// Populate reactive properties with Contentful data
		client.getPage("Inventory")
			.then((p: object): void => {
				page.value = p;
			});

		// Populate inventory
		const XHR = new XMLHttpRequest();
		XHR.onload = (): void => {
			if (XHR.response) {
				const csv: string = XHR.response;

				const obj: Array<Array<string>> = parser.parse(csv, ",");

				// const obj = parse(csv, {
				// 	columns: true,
				// 	delimiter: ",",
				// 	ltrim: true,
				// 	rtrim: true
				// });

				inventory.value = _.filter(obj, {Type: "Electric"});
			}
		};
		XHR.open("GET", "/inventory.csv");
		XHR.send();

		return {
			page,
			inventory
		};
	}
});
</script>

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
import * as _ from "lodash";

export default defineComponent({
  components: {
    Hero
  },
  props: {},
  setup(props) {
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
    XHR.onload = async () => {
      if (XHR.response) {
        const csvStr: string = XHR.response;
        const arr = csvStr.split("\n");
        const jsonObj = [];
        const headers = arr[0].split(",");
        for (let i = 1; i < arr.length; i++) {
          const data = arr[i].split(",");
          const obj = {};
          for (let j = 0; j < data.length; j++) {
            let h = headers[j].trim();
            obj[h] = data[j].replace(/"/g, "")
                .trim();
          }
          jsonObj.push(obj);
        }

        console.log(jsonObj);

        inventory.value = _.filter(jsonObj, {Type: "Electric"});
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

<template>
  <div class="flex flex-col justify-between">
    <div class="mb-4 heading-wrapper">
      <h2 class="tc-h2">
        {{ card.heading }}
      </h2>
      <div
        v-show="card.wysiwyg"
        class="mt-5 w-full lg:mt-12 lg:w-10/12 tc-wys"
        v-html="card.wysiwyg"
      ></div>
    </div>
    <div v-show="card.linkButtons && card.linkButtons.length">
      <template v-if="card.linkButtons.length > 1">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(item, index) in card.linkButtons" :key="index" class="">
            <CraftLink :link="item.cta">
              <ButtonShape>{{
                item.cta.customText || item.cta.text
              }}</ButtonShape>
            </CraftLink>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="mt-5 lg:mt-0">
          <CraftLink :link="card.linkButtons[0].cta">
            <ButtonShape>{{
              card.linkButtons[0].cta.customText || card.linkButtons[0].cta.text
            }}</ButtonShape>
          </CraftLink>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    addressBlock() {
      return get(this.card, 'address[0]') || []
    },
    postalAddress() {
      return get(this.card, 'postalAddress[0]') || []
    },
    contactBlock() {
      return get(this.card, 'contactDetail[0]') || []
    },
  },
}
</script>
<style scoped>
.heading-wrapper {
  min-height: 0;
}
@screen lg {
  .heading-wrapper {
    min-height: 10rem;
  }
}
</style>

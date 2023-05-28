<template>
  <div class="flex flex-col">
    <div class="heading-wrapper mb-4">
      <nuxt-link :to="`/${card.uri}`">
        <h2 class="tc-h2">
          {{ card.title }}
        </h2>
      </nuxt-link>
    </div>

    <div class="excerpt-wrapper">
      <address class="tc-xs flex flex-col not-italic">
        <span>{{ addressBlock.street2 }}</span>
        <span v-if="addressBlock.street1">{{ addressBlock.street1 }}</span>
        <span
          >{{ addressBlock.city }} {{ addressBlock.state }}
          {{ addressBlock.postCode }}</span
        >
      </address>
      <address
        v-if="postalAddress.gpoPoBox"
        class="mt-5 tc-xs flex flex-col not-italic"
      >
        <span>GPO Box {{ postalAddress.gpoPoBox }}</span>
        <span
          >{{ postalAddress.city }} {{ postalAddress.state }}
          {{ postalAddress.postcode }}</span
        >
      </address>
      <div class="mt-5 tc-xs flex flex-col">
        <div class="flex items-start space-x-1">
          <div class="">Phone:</div>
          <span class="">
            {{ contactBlock.phone }}
          </span>
        </div>
        <div class="flex items-start space-x-1">
          <div class="">Fax:</div>
          <span class="">
            {{ contactBlock.fax }}
          </span>
        </div>
        <div class="flex items-start space-x-1">
          <div class="">Email:</div>
          <span class="">
            {{ contactBlock.email }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-5 lg:mt-0">
      <nuxt-link :to="`/${card.uri}`">
        <ButtonShape>More information</ButtonShape>
      </nuxt-link>
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
.excerpt-wrapper {
  min-height: 0;
}
@screen lg {
  .heading-wrapper {
    min-height: 3rem;
  }
  .excerpt-wrapper {
    min-height: 16rem;
  }
}
</style>

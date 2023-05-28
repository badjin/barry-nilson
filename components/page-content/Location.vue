<template>
  <div class="tc-container lg:px-10 py-c">
    <div class="flex flex-col lg:flex-row -mx-10 mb-14">
      <div class="w-full lg:w-6/12 px-10 separator">
        <div class="w-full separator-b">
          <h3 class="tc-sub-heading">Address & opening hours</h3>

          <address class="mt-5 tc-xs flex flex-col not-italic">
            <span v-if="contactBlock.traditionalName">
              {{ contactBlock.traditionalName }}
            </span>
            <span>{{ addressBlock.street2 }}</span>
            <span v-if="addressBlock.street1">{{ addressBlock.street1 }}</span>
            <span
              >{{ addressBlock.city }} {{ addressBlock.state }}
              {{ addressBlock.postCode }}</span
            >
            <div class="pt-2 w-auto">
              <a :href="mapUrl" target="_blank">
                <span class="text-primary tc-menu-link font-display font-bold"
                  >View on map</span
                >
              </a>
            </div>
          </address>
          <address
            v-if="postalAddress.gpoPoBox"
            class="mt-5 tc-xs flex flex-col not-italic"
          >
            <span
              >{{ module.name === 'Sydney' ? 'PO Box' : 'GPO Box' }}
              {{ postalAddress.gpoPoBox }}</span
            >
            <span
              >{{ postalAddress.city }} {{ postalAddress.state }}
              {{ postalAddress.postcode }}</span
            >
          </address>
          <div
            v-if="module.openingHours.length"
            class="mt-5 tc-xs flex flex-col"
          >
            <span v-for="(text, index) in module.openingHours" :key="index">{{
              text.text
            }}</span>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-10 pt-10 lg:pt-0">
        <div>
          <h3 class="tc-sub-heading">
            {{ `Contact our ${module.name} office` }}
          </h3>
          <div class="mt-5 tc-xs flex flex-col">
            <div class="mb-6">
              <a
                v-if="contactBlock.email"
                :href="`mailto:${contactBlock.email}?subject=${module.name} Office enquiry`"
              >
                <span
                  class="text-primary tc-underline font-display text-sm font-bold"
                >
                  {{ contactBlock.email }}
                </span>
              </a>
            </div>
            <div class="flex items-start space-x-1">
              <div class="">Phone</div>
              <a v-if="contactBlock.phone" :href="`tel:${contactBlock.phone}`">
                <span class="text-primary tc-menu-link font-display font-bold">
                  {{ contactBlock.phone }}
                </span>
              </a>
            </div>
            <div class="flex items-start space-x-1">
              <div class="">Fax</div>
              <a v-if="contactBlock.fax" :href="`tel:${contactBlock.fax}`">
                <span class="text-primary tc-menu-link font-display font-bold">
                  {{ contactBlock.fax }}
                </span>
              </a>
            </div>
            <div class="mt-6">
              <nuxt-link to="/get-in-touch/#content">
                <ButtonPrimary> Online enquiry form </ButtonPrimary>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="separator-t">
      <div class="flex flex-col lg:flex-row -mx-10">
        <div v-if="module.howToGetHere" class="w-full lg:w-6/12 px-10">
          <h3 class="tc-sub-heading">How to get here</h3>
          <div class="mt-5 tc-wys" v-html="module.howToGetHere"></div>
        </div>
        <div class="w-full lg:w-6/12 px-10 pt-10 lg:pt-0 pb-4 lg:pb-0">
          <PageContentMap :coordinate="coordinate" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mapDetail: {},
    }
  },
  computed: {
    addressBlock() {
      return get(this.module, 'address[0]') || []
    },
    postalAddress() {
      return get(this.module, 'postalAddress[0]') || []
    },
    openingHours() {
      return get(this.module, 'openingHours[0]') || []
    },
    contactBlock() {
      return get(this.module, 'contactDetail[0]') || []
    },
    locationMapDetails() {
      return get(this.module, 'locationMapDetails[0]') || []
    },
    mapUrl() {
      const address = `${encodeURIComponent(
        this.addressBlock.street1?.toLowerCase()
      )},+${this.addressBlock.city}+${this.addressBlock.state}`
      return `https://www.google.com/maps/place/${address}`
    },
    coordinate() {
      return {
        _geoloc: {
          lat: Number(this.locationMapDetails.lat),
          lng: Number(this.locationMapDetails.lng),
        },
        name: this.module.name,
      }
    },
  },
}
</script>
<style scoped>
.separator-b-meta {
  @apply border-b border-steelblue border-opacity-30;
}
.separator-b {
  @apply border-b border-steelblue border-opacity-30 pt-2 pb-10;
}

.separator-t {
  @apply border-t border-steelblue border-opacity-30 pt-14;
}
.separator {
  @apply border-b-0 border-steelblue border-opacity-30;
}

@screen lg {
  .separator {
    @apply border-b-0 border-r border-steelblue border-opacity-30;
  }
  .separator-b {
    @apply border-b-0 border-steelblue border-opacity-30 py-0;
  }
}

.tc-underline {
  @apply text-sm;
}
.tc-underline::after {
  @apply bg-primary;
}
</style>

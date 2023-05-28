<template>
  <div class="bg-steelblue text-white">
    <div class="flex flex-col tc-container">
      <div class="py-9 md:py-10 relative flex flex-col md:flex-row">
        <div
          class="w-full md:w-5/12 lg:w-4/12 font-display font-medium flex flex-col relative text-lg lg:text-xl leading-normal border-b border-white border-opacity-30 md:border-0 pb-8 mb-8 md:mb-0 md:pb-0"
        >
          <div
            v-for="(item, index) in footerPrimary"
            :key="item.id"
            :class="index < footerPrimary.length - 1 && 'pb-1'"
          >
            <nuxt-link :to="`${item.link}/`" class="tc-menu-link">
              {{ item.title }}
            </nuxt-link>
          </div>
          <div
            class="hidden md:block absolute right-0 w-1 h-full border-r border-white border-opacity-30"
          ></div>
        </div>
        <div class="md:flex-1 flex flex-col md:pl-10">
          <div class="flex flex-col md:flex-row justify-between items-start">
            <div class="grid grid-cols-2 order-2 md:order-1">
              <div
                v-for="location in locations"
                :key="location.title"
                class="w-40"
              >
                <nuxt-link :to="`/${location.uri}/`" class="tc-menu-link">
                  {{ location.title }}
                </nuxt-link>
              </div>
            </div>
            <nuxt-link to="/" class="order-1 md:order-2 mb-8">
              <barryNillsonLogo class="w-auto h-9" />
            </nuxt-link>
          </div>
          <div class="flex flex-col space-y-10 mt-6 md:mt-10">
            <div class="flex space-x-8">
              <template v-for="soc in socialLinks">
                <a
                  :key="soc.socialName"
                  :href="soc.socialUrl"
                  target="_blank"
                  class="tc-social-links"
                >
                  <component
                    :is="soc.socialName"
                    class="h-full tc-social-links--icon"
                  />
                </a>
              </template>
            </div>
            <div class="tc-small opacity-60 w-full lg:w-8/12">
              {{ disclaimer.acknowledgement }}
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-0 w-full h-1 border-b border-white border-opacity-30"
        ></div>
      </div>
      <div
        class="py-9 md:py-10 flex flex-col lg:flex-row justify-between lg:items-center opacity-60 tc-small"
      >
        <div class="inline-block md:flex md:space-x-8 mb-2 lg:mb-0">
          <div class="mb-2 md:mb-0">
            {{ copyrightText }}
          </div>
          <nuxt-link to="/privacy-policy/" class="tc-small-footer mr-7 md:mr-0">
            Privacy policy
          </nuxt-link>
          <nuxt-link to="/terms-of-use/" class="tc-small-footer">
            Terms of Use
          </nuxt-link>
        </div>
        <div class="mt-2 md:mt-0">
          {{ disclaimer.legalNotice }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, orderBy } from 'lodash-es'
import { Entry } from '~/models/entry'
export default {
  components: {
    barryNillsonLogo: () => import('~/assets/svg/bn-logo-white.svg?inline'),
    Facebook: () => import('~/assets/svg/facebookOld.svg?inline'),
    LinkedIn: () => import('~/assets/svg/linkedInOld.svg?inline'),
  },
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    copyrightText() {
      return this.footer.copyright.replace('%YEAR%', this.year)
    },
    year() {
      return new Date().getFullYear()
    },
    disclaimer() {
      return get(this.footer, 'disclaimer[0]') || {}
    },
    locations() {
      const locationArray = orderBy(
        this.module.location,
        'locationIndex',
        'asc'
      )
      return locationArray
      // return locationArray.map((e) => e.title)
    },
    footer() {
      return get(this.module, 'footer') || {}
    },
    socialLinks() {
      return get(this.footer.settings, '[0].socialLinks') || []
    },
    footerPrimary() {
      return this.module.footerPrimary
        ? this.module.footerPrimary.map((item) => Entry(item))
        : []
    },
    newsLetter() {
      return get(this.module, 'newsLetter')
    },
  },
}
</script>
<style scoped>
.tc-small-footer {
  @apply relative inline-block;

  font-size: 12px;
}

.tc-small-footer::after {
  @apply w-full bg-white absolute bottom-0 left-0;

  content: '';
  height: 1px;
  transition: all 0.5s ease;
}

.tc-small-footer:hover::after,
.tc-small-footer:active::after {
  @apply w-0;
}
</style>

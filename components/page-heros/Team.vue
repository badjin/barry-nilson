<template>
  <div class="bg-steelblue text-white py-c">
    <div class="tc-container pt-50px lg:pt-80px">
      <div class="hidden lg:flex relative">
        <div class="w-full lg:w-6/12">
          <PageHerosBreadCrumbs
            :links="module.parentLinks"
          ></PageHerosBreadCrumbs>
          <div class="flex flex-col space-y-6">
            <h1 class="tc-h1 tc-display1">
              {{ module.heading || module.title }}
            </h1>
            <h2 v-show="role" class="tc-h3 lg:mt-2">
              {{ role }}
            </h2>
            <div v-if="contactDetails" class="pt-3 grid grid-cols-2 gap-y-5">
              <a v-if="memberEmail" :href="`mailto:${memberEmail}`">
                <ButtonShape>
                  {{ memberEmail }}
                </ButtonShape>
              </a>
              <a v-if="memberPhone" :href="`tel:${memberPhone}`">
                <ButtonShape>
                  {{ memberPhone }}
                </ButtonShape>
              </a>
            </div>
          </div>
          <div class="absolute bottom-0 grid grid-cols-2 gap-y-5 w-6/12">
            <div v-if="expertise">
              <div class="text-xs tracking-loose text-primary uppercase py-3">
                expertise
              </div>
              <div>{{ expertise }}</div>
            </div>
            <div v-if="location">
              <div class="text-xs tracking-loose text-primary uppercase py-3">
                location
              </div>
              <div>{{ location }}</div>
            </div>
          </div>
        </div>
        <div class="w-2/12"></div>
        <div v-if="heroImage" class="w-3/12 max-w-xl">
          <div class="overflow-hidden w-full">
            <nuxt-img
              :src="heroImage"
              alt="media"
              format="webp"
              loading="lazy"
              preload
            />
          </div>
        </div>
      </div>
      <div class="lg:hidden flex flex-col"></div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    heroImage() {
      return get(this.module, 'image[0].src') || ''
    },
    contactDetails() {
      return get(this.module, 'contactDetails[0]') || null
    },
    memberEmail() {
      return this.contactDetails?.email
    },
    memberPhone() {
      return this.contactDetails?.phone
    },
    role() {
      return get(this.module, 'role[0].title') || ''
    },
    expertise() {
      return this.module.expertise.map((e) => e.title).join(', ')
    },
    location() {
      return get(this.module, 'location[0].title') || ''
    },
  },
}
</script>

<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container pt-26 pb-17 md:pt-31 md:pb-15">
      <div class="md:flex relative">
        <div class="w-full md:w-8/12 lg:w-6/12">
          <PageHerosBreadCrumbs
            :links="module.parentLinks"
          ></PageHerosBreadCrumbs>
          <div class="flex flex-col space-y-6 mt-2 mb-12 md:mb-20 xl:mb-0">
            <h1 class="tc-component-h2 tc-display1">
              {{ module.heading || module.title }}
            </h1>
            <h2 v-show="role" class="tc-sub-heading md:mt-2">
              {{ role }}
            </h2>
            <div
              class="md:hidden w-full xl:w-8/12 pt-2 md:pt-3 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              <div v-if="service">
                <div class="tc-caps-title text-primary pb-1">Expertise</div>
                <div class="text-xs md:text-base">{{ service }}</div>
              </div>
              <div v-if="location">
                <div class="tc-caps-title text-primary pb-1">Location</div>
                <div class="text-xs md:text-base">{{ location }}</div>
              </div>
            </div>
            <div class="hidden md:grid md:grid-cols-2 md:gap-y-5 gap-x-10 pt-2">
              <div v-if="service">
                <div class="tc-caps-title text-primary pb-1">Expertise</div>
                <div>{{ service }}</div>
              </div>
              <div v-if="location">
                <div class="tc-caps-title text-primary pb-1">Location</div>
                <div>{{ location }}</div>
              </div>
            </div>
            <div
              v-if="contactDetails"
              class="md:grid md:grid-cols-2 md:gap-y-5 gap-x-10 border-t pt-8 border-opacity-10 border-white"
            >
              <div class="mb-2 md:mb-0">
                <a v-if="memberEmail" :href="`mailto:${memberEmail}`">
                  <ButtonShape> Email {{ module.firstName }} </ButtonShape>
                </a>
              </div>
              <a v-if="memberPhone" :href="`tel:${memberPhone}`">
                <ButtonShape> Phone {{ module.firstName }} </ButtonShape>
              </a>
            </div>
          </div>
        </div>
        <div class="md:w-2/12"></div>
        <div v-if="heroImage" class="w-full block md:w-3/12 max-w-xl">
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
        <div v-else class="" style="height: 400px"></div>
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
    service() {
      return this.module.expertise
        .filter((e) => e.level === 1)
        .map((e) => e.title)
        .join(', ')
    },
    expertise() {
      return this.module.expertise
        .filter((e) => e.level === 2)
        .map((e) => e.title)
        .join(', ')
    },
    filteredExpertise() {
      return this.expertise?.length ? this.expertise : this.service
    },
    location() {
      return get(this.module, 'location[0].title') || ''
    },
  },
}
</script>

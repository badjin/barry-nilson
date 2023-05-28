<template>
  <div class="bg-steelblue text-white px-5 md:px-10">
    <div class="tc-container-image py-c-mobile md:py-c-desktop">
      <div class="pt-50px md:pt-80px">
        <PageHerosBreadCrumbs
          :links="module.parentLinks"
        ></PageHerosBreadCrumbs>
        <div
          class="flex flex-col-reverse md:items-center md:flex-row md:justify-between"
        >
          <div class="w-full md:w-10/12 lg:w-6/12">
            <h1 class="tc-h1 tc-display1">
              {{ module.heading || module.title }}
            </h1>
            <div class="flex flex-col md:flex-row md:justify-between mt-4">
              <div>
                <div class="text-xs tracking-loose text-primary uppercase py-3">
                  date
                </div>
                <div>{{ module.postDate }}</div>
              </div>
              <div v-if="module.categories && module.categories.length">
                <div class="text-xs tracking-loose text-primary uppercase py-3">
                  category
                </div>
                <div class="flex flex-wrap -mx-2">
                  <div
                    v-for="category in module.categories"
                    :key="category.id"
                    class="px-2 my-1"
                  >
                    <nuxt-link :to="filterUrl(category.title || category)">
                      <ButtonTag :reverse="true">{{
                        category.title || category
                      }}</ButtonTag>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="heroImage" class="md:hidden flex justify-end">
            <div class="w-9/12 mb-10">
              <div
                class="overflow-hidden w-full relative shape-image ratio-square rounded-l-full"
              >
                <nuxt-img
                  :src="heroImage"
                  class="ratio"
                  alt="media"
                  format="webp"
                  loading="lazy"
                  preload
                />
              </div>
            </div>
          </div>
          <div v-if="heroImage" class="hidden md:block w-4/12 max-w-2xl">
            <div
              class="overflow-hidden w-full relative shape-image ratio-square rounded-l-full"
            >
              <nuxt-img
                :src="heroImage"
                class="ratio"
                alt="media"
                format="webp"
                loading="lazy"
                preload
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import filterUrl from '@/components/filterUrl'
export default {
  mixins: [filterUrl],
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
  },
}
</script>

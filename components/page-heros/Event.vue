<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container-image pl-5 md:pl-10 py-c-mobile md:py-c-desktop">
      <div class="pt-50px md:pt-80px">
        <PageHerosBreadCrumbs
          :links="module.parentLinks"
        ></PageHerosBreadCrumbs>
        <div
          class="flex flex-col-reverse items-stretch md:flex-row md:justify-between"
        >
          <div
            class="flex flex-col justify-between w-full md:w-10/12 lg:w-6/12"
          >
            <h1 class="tc-h1 tc-display1">
              {{ module.heading || module.title }}
            </h1>
            <div
              v-if="module.categories && module.categories.length"
              class="mt-7"
            >
              <div class="text-xs tracking-loose text-primary uppercase pb-3">
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

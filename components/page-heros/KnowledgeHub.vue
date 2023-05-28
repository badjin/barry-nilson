<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container-image pl-5 md:pl-10 py-c-mobile lg:py-c-desktop">
      <div class="pt-50px lg:pt-80px">
        <div
          class="flex flex-col-reverse items-stretch lg:flex-row lg:justify-between"
        >
          <div class="flex flex-col justify-end w-full lg:w-6/12 pr-5 md:pr-10">
            <h1 class="tc-h1">
              {{ module.heading }}
            </h1>
            <div
              v-show="module.wysiwyg"
              class="mt-6 md:mt-12 md:w-10/12 tc-wys"
              v-html="module.wysiwyg"
            ></div>
          </div>
          <div v-if="heroImage" class="lg:hidden flex justify-end">
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
          <div v-if="heroImage" class="hidden lg:block w-4/12 max-w-2xl">
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
  },
}
</script>

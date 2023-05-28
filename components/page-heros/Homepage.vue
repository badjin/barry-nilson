<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container pr-0 py-c-desktop">
      <div
        class="pt-2 md:pt-50px flex flex-col-reverse md:items-center md:flex-row md:justify-between"
      >
        <div class="w-full md:w-6/12 pr-5 md:pr-0">
          <h1 class="tc-h1 tc-display1">
            {{ module.heading }}
          </h1>
          <div
            v-show="module.description"
            class="mt-6 md:mt-12 w-10/12 tc-wys"
            v-html="module.description"
          ></div>
          <div
            v-if="hasCta"
            class="mt-8 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-y-5"
          >
            <CraftLink v-for="cta in ctas" :key="cta.url" :link="cta">
              <ButtonShape>{{ cta.customText || cta.text }}</ButtonShape>
            </CraftLink>
          </div>
        </div>
        <div class="md:hidden flex justify-end">
          <div class="w-9/12 mb-10">
            <div
              class="overflow-hidden w-full relative shape-image ratio-square rounded-l-full"
            >
              <template v-if="module.mediaSwitch">
                <video
                  :src="video"
                  :playsinline="true"
                  :poster="image"
                  class="ratio"
                  width="100%"
                  height="100%"
                  loop
                  muted
                  autoplay
                />
              </template>
              <template v-else>
                <nuxt-img
                  :src="image"
                  class="ratio"
                  alt="media"
                  format="webp"
                  loading="lazy"
                  preload
                />
              </template>
            </div>
          </div>
        </div>
        <div class="hidden md:block w-5/12 max-w-2xl">
          <div
            class="overflow-hidden w-full relative shape-image ratio-square rounded-l-full"
          >
            <template v-if="module.mediaSwitch">
              <video
                :src="video"
                :playsinline="true"
                :poster="image"
                class="ratio"
                width="100%"
                height="100%"
                loop
                muted
                autoplay
              />
            </template>
            <template v-else>
              <nuxt-img
                :src="image"
                class="ratio"
                alt="media"
                format="webp"
                loading="lazy"
                preload
              />
            </template>
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
    image() {
      return get(this.module.image, '[0].src')
    },
    video() {
      return get(this.module.videoClip, '[0].url', {})
    },
    hasCta() {
      return this.module.ctas?.length
    },
    ctas() {
      return this.module.ctas.map((cta) => cta.cta)
    },
  },
}
</script>
<style scoped>
@screen lg {
  .tc-h1 {
    max-width: 75%;
  }
}
</style>

<template>
  <div v-if="video || image" class="tc-cta">
    <div class="flex flex-col-reverse md:flex-row md:items-center">
      <div class="flex w-11/12 md:w-5/12 justify-start">
        <div
          class="overflow-hidden w-full ratio-square relative shape-image rounded-r-full"
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
              alt="media"
              format="webp"
              loading="lazy"
              preload
              class="ratio"
            />
          </template>
        </div>
      </div>
      <div
        class="w-full mb-10 md:mb-0 md:w-7/12 flex items-center ml-8 md:ml-28"
      >
        <div class="w-10/12 lg:w-6/12 space-y-7 md:space-y-10">
          <h2
            class="text-4xl lg:text-5xl font-display font-medium leading-tight tracking-tighter mb-8 md:mb-10"
          >
            {{ module.heading }}
          </h2>
          <div v-show="module.wysiwyg" class="tc-wys">
            <div v-html="module.wysiwyg"></div>
          </div>
          <div class="flex">
            <CraftLink :link="module.callToAction">
              <component
                :is="`Button${module.buttonType ? 'Shape' : 'Primary'}`"
                :colour="wrapper.text"
                >{{ module.callToAction.customText }}</component
              >
            </CraftLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="tc-cta px-5 md:px-10">
    <div
      class="flex flex-col space-y-7 md:space-y-10 justify-center py-12 md:py-16 vmin"
      :class="module.alignment ? 'items-center' : 'items-start'"
    >
      <h2
        class="text-4xl lg:text-5xl font-display font-medium leading-tight tracking-tighter w-8/12 md:w-full"
        :class="module.alignment ? 'text-center' : 'text-left'"
      >
        {{ module.heading }}
      </h2>
      <div
        v-show="module.wysiwyg"
        class="tc-wys w-full md:w-8/12 lg:w-6/12"
        :class="module.alignment ? 'text-center' : 'text-left'"
      >
        <div v-html="module.wysiwyg"></div>
      </div>
      <CraftLink :link="module.callToAction">
        <component
          :is="`Button${module.buttonType ? 'Shape' : 'Primary'}`"
          :colour="wrapper.text"
          >{{ module.callToAction.customText }}</component
        >
      </CraftLink>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    image() {
      return get(this.module.image, '[0].src') || null
    },
    video() {
      return get(this.module.videoClip, '[0].url') || null
    },
    wrapper() {
      return this.getTheme(this.module.themes)
    },
  },
}
</script>
<style scoped>
@screen xl {
  .vmin {
    min-height: 18vmin;
  }
}
</style>

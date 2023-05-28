<template>
  <div
    class="tc-img-text flex flex-col-reverse xl:items-center lg:justify-between"
    :class="module.alignment ? 'lg:flex-row-reverse' : 'lg:flex-row'"
  >
    <div
      class="lg:hidden flex"
      :class="module.alignment ? 'justify-end' : 'justify-start'"
    >
      <div
        class="flex w-11/12"
        :class="module.alignment ? '-mr-5 md:-mr-10' : ''"
      >
        <div
          class="overflow-hidden w-full relative shape-image ratio-square"
          :class="
            module.alignment
              ? 'rounded-l-full'
              : 'rounded-r-full -ml-5 md:-ml-10'
          "
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
    <div
      class="hidden lg:block w-5/12 max-w-2xl"
      :class="module.alignment ? 'justify-end' : 'justify-start'"
    >
      <div
        class="overflow-hidden w-full relative shape-image ratio-square"
        :class="
          module.alignment
            ? 'rounded-l-full lg:ml-10'
            : 'rounded-r-full lg:-ml-10'
        "
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
    <div class="w-full mb-10 lg:mb-0 lg:w-1/2 flex items-center lg:px-0">
      <div class="w-full lg:w-3/4 mx-auto lg:max-w-xl space-y-7 lg:space-y-10">
        <div v-show="module.subheading" class="tc-caps-title text-turquoise">
          {{ module.subheading }}
        </div>
        <h2 class="tc-component-h2">{{ module.heading }}</h2>
        <div v-show="module.wysiwyg" class="tc-wys">
          <div v-html="module.wysiwyg"></div>
        </div>
        <div v-if="module.callToAction && module.callToAction.url" class="flex">
          <CraftLink :link="module.callToAction">
            <ButtonShape>{{ module.callToAction.customText }}</ButtonShape>
          </CraftLink>
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
  },
}
</script>

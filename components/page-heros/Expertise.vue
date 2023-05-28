<template>
  <div class="bg-white text-steelblue pl-5 lg:pl-10">
    <div class="tc-container-image py-c-mobile lg:py-c-desktop">
      <PageHerosBreadCrumbs :links="module.parentLinks"></PageHerosBreadCrumbs>
      <div
        class="pt-76px md:pt-64px flex flex-col-reverse lg:items-center lg:flex-row lg:justify-between"
      >
        <div class="w-full lg:w-6/12 pr-5 lg:pr-0">
          <h1 class="tc-h1 tc-display1">
            {{ module.heading || module.title }}
          </h1>
          <h2
            v-show="module.subheading"
            class="tc-h3 mt-6 lg:w-10/12 text-darkteal"
          >
            {{ module.subheading }}
          </h2>
          <div
            v-show="module.wysiwyg"
            class="mt-6 lg:w-10/12 tc-wys"
            v-html="module.wysiwyg"
          ></div>
          <template v-if="hasInThisSection">
            <div class="text-xs tracking-loose text-primary uppercase py-8">
              In this section
            </div>
            <div
              class="border-l border-steelblue border-opacity-30 flex flex-col space-y-4"
            >
              <div
                v-for="(anchor, index) in inThisSection"
                :key="index"
                class="flex space-x-4 group"
              >
                <MenuIndicator
                  class="text-white group-hover:text-primary transition-colors duration-200 fill-current w-4 h-auto"
                />
                <button
                  class="group-hover:text-primary transition-colors duration-200"
                  @click="scrollToAnchor(anchor.url)"
                >
                  {{ anchor.customText || anchor.text }}
                </button>
              </div>
            </div>
          </template>
        </div>
        <div v-if="heroImage" class="lg:hidden flex justify-end">
          <div class="w-11/12 mb-10 pl-5">
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
        <div
          v-if="heroImage"
          class="hidden lg:block w-5/12 xl:w-6/12 max-w-2xl"
        >
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
</template>
<script>
import { get } from 'lodash-es'
export default {
  components: {
    MenuIndicator: () => import('@/assets/svg/cursor.svg?inline=true'),
  },
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
    hasInThisSection() {
      return this.module.inThisSection?.length
    },
    inThisSection() {
      return this.module.inThisSection.map((e) => e.contentTag)
    },
    winSize() {
      return this.$store.state.winSize.width
    },
  },
  mounted() {
    this.scrollToElement()
  },
  methods: {
    scrollToElement() {
      if (this.$route.hash) {
        let hash = this.$route.hash
        hash = hash.replace('#', '')
        const anchor = document.getElementById(hash)

        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    scrollToAnchor(anchor) {
      anchor = anchor.replace('#', '')
      const element = document.getElementById(anchor)
      if (element) {
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          (this.winSize > 768 ? 98 : 82)
        // console.log(y)
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    },
  },
}
</script>

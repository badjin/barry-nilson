<template>
  <div class="flex flex-col lg:flex-row lg:-mx-10">
    <div
      class="flex flex-col w-full lg:w-4/12 pb-5 lg:pb-0 lg:px-10 lg:border-r border-opacity-30 space-y-4 lg:space-y-8"
      :class="{
        'border-steelblue': wrapper.text !== 'white',
        'border-white': wrapper.text === 'white',
      }"
    >
      <h2 class="tc-component-h2">
        {{ module.heading }}
      </h2>
      <h3 v-show="module.subheading" class="tc-sub-heading">
        {{ module.subheading }}
      </h3>
      <div v-show="module.wysiwyg" class="tc-wys" v-html="module.wysiwyg"></div>
    </div>
    <div class="w-full lg:w-8/12 pt-5 lg:pt-0 lg:px-10">
      <AccordionWrap>
        <AccordionItem
          v-for="(content, index) in contentBlocks"
          :key="index"
          :class="{
            'border-t border-opacity-30': index > 0,
            'border-steelblue': wrapper.text !== 'white',
            'border-white': wrapper.text === 'white',
          }"
          :is-multi-option="true"
          @input="(active) => (activeIndex = active)"
        >
          <template slot="accordion-trigger">
            <h3
              class="tc-h3 font-base w-11/12 hover:text-primary transition duration-300"
              :class="{
                'text-primary': activeIndex === index,
                'text-steelblue':
                  activeIndex !== index && wrapper.text !== 'white',
                'text-white': activeIndex !== index && wrapper.text === 'white',
              }"
            >
              {{ content.heading }}
            </h3>
          </template>
          <template slot="accordion-content">
            <div
              class="flex flex-col pt-4 space-y-8 lg:space-y-0 lg:flex-row lg:justify-between mb-8"
            >
              <div class="flex overflow-hidden">
                <div
                  v-if="content.image && content.image.length"
                  class="w-2/12"
                >
                  <TcRatio :height="1" :width="1">
                    <nuxt-img
                      class="rounded-full"
                      :src="content.image[0].orig"
                      alt="media"
                      format="webp"
                      loading="lazy"
                      preload
                    />
                  </TcRatio>
                </div>
                <div
                  :class="
                    content.image &&
                    content.image.length &&
                    'w-10/12 pl-4 lg:pl-8'
                  "
                >
                  <span
                    class="w-full lg:w-10/12 pr-4 tc-wys"
                    v-html="content.wysiwyg"
                  ></span>
                </div>
              </div>
            </div>
          </template>
        </AccordionItem>
      </AccordionWrap>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
    wrapper: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeIndex: -1,
    }
  },
  computed: {
    contentBlocks() {
      return this.module.accordion
    },
  },
}
</script>

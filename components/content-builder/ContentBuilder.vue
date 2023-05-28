<template>
  <div>
    <slot name="before"></slot>
    <div v-for="(component, idx) in modules" :key="idx">
      <component
        :is="component.__typename"
        :id="component.anchorId"
        :module="component"
        :class="noHeading && !idx && 'pt-c'"
      ></component>
    </div>
    <slot name="after"></slot>
  </div>
</template>
<script>
export default {
  components: {
    // Insert components here
    contentBuilder_cta_BlockType: () => import('@/components/cta/module.vue'),
    contentBuilder_entryList_BlockType: () =>
      import('@/components/entry-list/module.vue'),
    contentBuilder_contentBlock_BlockType: () =>
      import('@/components/global-content/module.vue'),
    contentBuilder_imageText_BlockType: () =>
      import('@/components/image-text/module.vue'),
    contentBuilder_textText_BlockType: () =>
      import('@/components/text-text/module.vue'),
    contentBuilder_textTextDivider_BlockType: () =>
      import('@/components/text-divider/module.vue'),
    contentBuilder_textGrid_BlockType: () =>
      import('@/components/text-grid/module.vue'),
    contentBuilder_accordion_BlockType: () =>
      import('@/components/accordion/module.vue'),
    contentBuilder_textColumns_BlockType: () =>
      import('@/components/text-columns/module.vue'),
    contentBuilder_floatingGrid_BlockType: () =>
      import('@/components/floating-grid/module.vue'),
    contentBuilder_fullWidthSection_BlockType: () =>
      import('@/components/full-width-section/module.vue'),
    contentBuilder_expertiseGrid_BlockType: () =>
      import('@/components/expertise-grid/module.vue'),
    contentBuilder_quote_BlockType: () =>
      import('@/components/quote/module.vue'),
    contentBuilder_fullWidthMedia_BlockType: () =>
      import('@/components/full-width-media/module.vue'),
  },
  props: {
    modules: {
      type: Array,
      default: () => [],
    },
    noHeading: {
      type: Boolean,
      default: false,
    },
  },
  // methods: {
  //   spacing(module) {
  //     if (module.spacing && module.spacing.length) {
  //       return {
  //         'pt-c': module.spacing[0].topMargin,
  //         'pb-c': module.spacing[0].bottomMargin,
  //       }
  //     }
  //     return 'py-c'
  //   },
  // },
}
</script>

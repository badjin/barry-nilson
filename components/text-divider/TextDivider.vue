<template>
  <div
    class="flex vmin justify-center"
    :class="module.alignment ? ' flex-wrap-reverse' : 'flex-wrap'"
  >
    <div
      class="w-full lg:w-1/2 flex items-center lg:border-r"
      :class="{
        'lg:border-white': wrapper.text === 'white',
        'lg:border-steelblue': wrapper.text !== 'white',
      }"
    >
      <h2
        class="tc-component-h2 w-full md:w-3/4 mx-auto md:max-w-xl mb-4 lg:mb-0"
      >
        {{ module.mainText }}
      </h2>
    </div>
    <div class="w-full lg:w-1/2 flex items-center">
      <div class="w-full md:w-3/4 mx-auto md:max-w-xl space-y-7 md:space-y-10">
        <div class="tc-wys" v-html="module.wysiwyg"></div>
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
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
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

<template>
  <div class="flex flex-wrap vmin justify-center">
    <div class="w-full lg:w-1/2">
      <div
        class="tc-component-h2 w-full md:w-3/4 mx-auto md:max-w-xl mb-4 lg:mb-0"
      >
        <h2 class="">
          {{ module.mainText }}
        </h2>
        <div
          v-show="module.subText"
          class="tc-wys mt-4"
          v-html="module.subText"
        ></div>
      </div>
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
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
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

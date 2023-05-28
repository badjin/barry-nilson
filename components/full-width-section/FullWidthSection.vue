<template>
  <div class="flex flex-col space-y-6 lg:space-y-12">
    <div class="w-full flex flex-col space-y-4 lg:space-y-8">
      <h2 v-show="module.heading" class="tc-component-h2">
        {{ module.heading }}
      </h2>
      <h3 v-show="module.subheading" class="tc-sub-heading">
        {{ module.subheading }}
      </h3>
      <div
        v-show="module.wysiwyg"
        class="tc-wys overflow-hidden"
        v-html="module.wysiwyg"
      ></div>
    </div>
    <div class="tc-wys" v-html="section"></div>
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
  computed: {
    section() {
      return this.module.fullWidthSection
    },
  },
}
</script>
<style scoped lang="scss">
.tc-wys {
  @apply block w-full overflow-x-auto;
  table {
    @apply w-full max-w-full mb-4;
  }
}
</style>

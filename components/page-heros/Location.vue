<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container pt-26 pb-11 lg:pt-31 lg:pb-22">
      <PageHerosBreadCrumbs :links="module.parentLinks"></PageHerosBreadCrumbs>
      <h1 class="tc-h1">
        {{ module.heading || module.title }}
      </h1>
      <!-- <h2 v-show="module.subheading" class="tc-sub-heading lg:mt-2">
        {{ module.subheading }}
      </h2>
      <div
        v-show="module.wysiwyg"
        class="lg:mt-12 lg:w-10/12 tc-wys"
        v-html="module.wysiwyg"
      ></div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      linkArray: [],
    }
  },
  mounted() {},
}
</script>

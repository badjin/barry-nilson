<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container py-c-mobile lg:py-c-desktop">
      <div class="pt-76px lg:pt-80px">
        <PageHerosBreadCrumbs
          :links="module.parentLinks"
        ></PageHerosBreadCrumbs>
        <h1 class="tc-h1">
          {{ module.heading || module.title }}
        </h1>
        <h2 v-show="module.subheading" class="tc-h3 lg:mt-2">
          {{ module.subheading }}
        </h2>
        <div
          v-show="module.wysiwyg"
          class="lg:mt-12 lg:w-10/12 tc-wys"
          v-html="module.wysiwyg"
        ></div>
      </div>
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
}
</script>

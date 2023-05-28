<template>
  <div class="bg-steelblue text-white">
    <div class="tc-container py-c-mobile lg:py-c-desktop">
      <div class="pt-76px lg:pt-80px">
        <h1 class="tc-h1">
          {{ module.heading || module.title }}
        </h1>
        <CardGridCustom :cards="module.ctaBlocks" />
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

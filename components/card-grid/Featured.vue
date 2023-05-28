<template>
  <div class="lg:border-b lg:border-opacity-30 lg:border-steelblue lg:pb-16">
    <div class="flex flex-wrap -mx-10">
      <div
        class="w-full lg:w-2/3 px-10 lg:border-r lg:border-opacity-30 lg:border-steelblue mb-10 lg:mb-0"
      >
        <CardGridFeaturedItem :card="featured" />
      </div>
      <div class="px-10 w-full lg:w-1/3 mb-3 lg:mb-0">
        <CardGridChannelItem :card="sideCard" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    featured: {
      type: Object,
      default: () => {},
    },
    sideCard: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<template>
  <div class="tc-quote">
    <div
      class="flex flex-col justify-center items-center space-y-7 md:space-y-10 py-12 md:py-16"
    >
      <h2
        class="tc-quote-heading font-display leading-snug font-medium tracking-tighter w-full lg:w-10/12 xl:w-8/12 text-center"
      >
        {{ module.quote }}
      </h2>
      <p v-if="module.writer">{{ module.writer }}</p>
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

<style scoped>
.tc-quote-heading {
  font-size: 24px;
}
@screen md {
  .tc-quote-heading {
    font-size: 32px;
  }
}

@screen lg {
  .tc-quote-heading {
    font-size: 40px;
  }
}
</style>

<template>
  <div
    class="error-container bg-white text-steelblue flex flex-col items-center justiy-center py-10 sm:py-16 mb-20"
  >
    <div class="container flex flex-col space-y-10">
      <span>{{ module.preHeading }}</span>
      <h1 class="tc-h1">{{ module.heading }}</h1>
      <div class="mb-8">{{ module.subheading }}</div>
      <nuxt-link :to="module.link">
        <ButtonPrimary>
          {{ module.link.customText }}
        </ButtonPrimary>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // you can set a custom layout for the error page
  layout: 'error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  head() {
    return {
      title: 'Page not found',
    }
  },
  computed: {
    module() {
      return {
        preHeading: 'Error',
        heading: 'Page not found',
        subheading:
          "The page you were looking for was either moved or doesn't exist.",
        link: {
          customText: 'Back to home page',
          path: '/',
        },
      }
    },
  },
  created() {
    this.$store.commit('globals/transNav', false)
  },
}
</script>

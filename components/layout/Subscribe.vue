<template>
  <div
    v-if="footerSubscribe"
    class="bg-darkteal text-white px-5 md:px-10 py-17"
  >
    <div
      class="flex flex-col space-y-7 md:space-y-10 justify-center py-3 md:py-0 items-center"
    >
      <div
        class="text-4xl md:text-3xl font-display font-medium leading-tight tracking-tighter w-8/12 md:w-full text-center"
      >
        {{ footerSubscribe.heading }}
      </div>
      <div
        v-show="footerSubscribe.wysiwyg"
        class="tc-wys w-full md:w-8/12 lg:w-6/12 text-center"
      >
        <div v-html="footerSubscribe.wysiwyg"></div>
      </div>
      <ButtonPrimary colour="white" @click="togglePopup">
        Subscribe
      </ButtonPrimary>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    footerComponents: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    footerSubscribe() {
      return (
        this.footerComponents.newsletter?.length &&
        this.footerComponents.newsletter[0]
      )
    },
    popupId() {
      return 'popup-newsletter'
    },
    showPopup() {
      return this.$store.state.globals.cache[this.popupId]
    },
  },
  methods: {
    togglePopup() {
      this.$store.commit('globals/cache', {
        key: this.popupId,
        value: !this.showPopup,
      })
    },
  },
}
</script>

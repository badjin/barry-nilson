export default {
  computed: {
    overlay() {
      return this.$store.state.overlay.visible
    },
    route() {
      return this.$route.fullPath
    },
  },

  watch: {
    route() {
      this.$store.commit('overlay/update', false)
    },
    overlay(show) {
      if (show) {
        document.body.style.setProperty('overflow', 'hidden')
      } else {
        document.body.style.removeProperty('overflow')
      }
    },
  },

  methods: {
    closeOverlay() {
      this.$store.commit('overlay/update', false)
    },
  },
}

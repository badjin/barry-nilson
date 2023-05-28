<template>
  <div
    v-show="banner && open"
    class="relative z-50 h-16 md:h-11 bg-steelblue text-white w-full border-opacity-10 border-b border-white"
  >
    <div class="px-5 md:px-10 pt-3 flex justify-between text-xs">
      <div class="opacity-60 tc-site-banner" v-html="banner"></div>
      <a class="text-white tc-menu-link" href="https://www.google.com">
        Quick Exit(esc)
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: true,
    }
  },
  computed: {
    banner() {
      return this.$store.getters['globals/siteBanner'].heading
    },
  },
  mounted() {
    // close modal on pressing ESC
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27 && this.open) {
        this.closeBanner()
      }
    })
  },
  methods: {
    closeBanner() {
      this.$router.push({
        redirect: (window.location.href = 'https://www.google.com'),
      })
      // this.open = false
      // document.body.classList.remove('alert-active')
      // this.$cookies.set('siteBannerIsClosed', true, {
      //   maxAge: 60 * 60 * 24,
      // })
      // this.$store.commit('globals/closeBanner')
    },
  },
}
</script>
<style lang="scss">
.tc-site-banner {
  a {
    @apply border-b border-white;

    padding-bottom: 1px;
  }
}
</style>

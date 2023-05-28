<template>
  <div class="overflow-hidden">
    <!-- <SiteBanner v-if="siteBanner" class="hidden md:block" /> -->
    <LayoutNav :module="headerModule" />

    <main :class="siteBanner && 'md:pt-8'">
      <Nuxt />
    </main>

    <LayoutTalkToUs :footer-components="footerComponents" />
    <LayoutFooter :module="footerModule" />

    <transition name="fade">
      <button
        v-if="overlay"
        style="background: rgba(255, 255, 255, 0.55)"
        class="hide-ie fixed h-screen w-screen top-0 left-0 z-10"
        @click="closeOverlay"
      ></button>
    </transition>
    <portal-target name="modals"></portal-target>

    <div class="hidden py-c-mobile md:py-c-desktop"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import overlay from '@/mixins/overlay'

export default {
  mixins: [overlay],
  computed: {
    headerModule() {
      return {
        primary: this.$store.getters['globals/primary'],
      }
    },
    footerComponents() {
      return this.$store.getters['globals/footer']
    },
    footerModule() {
      return {
        location: this.$store.getters['locations/items'],
        footer: this.$store.getters['globals/settings'],
        footerPrimary: this.$store.getters['globals/footerPrimary'],
      }
    },
    siteBanner() {
      return (
        this.$store.state.globals.bannerOpen &&
        this.$store.getters['globals/siteBanner'].heading
      )
    },
  },
  async mounted() {
    window.Vue = Vue
    await this.$store.dispatch('locations/index')
  },
  created() {
    this.$cookies.get('siteBannerIsClosed') &&
      this.$store.commit('globals/closeBanner')

    this.$store.dispatch('winSize/init')
  },
}
</script>

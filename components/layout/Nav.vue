<template>
  <nav
    v-click-outside="() => (hamburgerOpen = false)"
    class="nav w-full relative"
    :class="{
      toggled: hamburgerOpen,
    }"
  >
    <div
      class="floating-nav w-full left-0 fixed nav-top-level"
      :class="{
        'bg-white': transNav && scrollTop ? false : true,
        'drop-shadow-nav': !scrollTop,
        'alert-active': siteBanner && scrollTop,
        'top-0': !scrollTop,
      }"
    >
      <SiteBanner v-if="siteBanner" class="hidden md:block" />
      <div
        class="nav-header px-5 md:px-10"
        :class="{
          'small-height': !scrollTop,
          'large-height': scrollTop,
        }"
      >
        <nuxt-link to="/">
          <template v-if="transNav && scrollTop">
            <BarryNillsonLogoWhite class="w-auto h-8 md:h-10 fill-current" />
          </template>
          <template v-else>
            <BarryNillsonLogoBlack class="w-auto h-8 md:h-9 fill-current" />
          </template>
        </nuxt-link>

        <!-- Primary Nav -->
        <div class="ml-auto sub-nav flex items-center justify-center">
          <div class="hidden md:flex items-center justify-center">
            <div
              class="flex items-center justify-center transition-all duration-350 cursor-pointer font-semibold"
            >
              <div class="w-full h-10" :class="!menu">
                <client-only>
                  <LayoutSearch
                    class="w-auto h-5 fill-current"
                    :class="
                      transNav && scrollTop
                        ? 'text-white bg-transparent'
                        : 'text-steelblue bg-transparent'
                    "
                    :trans-nav="transNav && scrollTop"
                    @click="toggleMenu"
                  />
                </client-only>
              </div>
              <!-- <nuxt-link to="/search">
                <SearchIcon
                  class="w-auto h-5 fill-current hover:text-primary"
                  :class="
                    transNav && scrollTop ? 'text-white' : 'text-steelblue'
                  "
                />
              </nuxt-link> -->
            </div>
          </div>
          <div class="pl-3 lg:pl-6 flex talk-to-us-button">
            <CraftLink :link="talkToUs">
              <ButtonPrimary :colour="colour" size="sm" class="relative">
                {{ talkToUs.text }}
              </ButtonPrimary>
            </CraftLink>
          </div>
          <div class="pl-3 lg:pl-6 cursor-pointer">
            <!-- @click="hamburgerOpen = true" -->
            <ButtonHamburger
              :colour="colour"
              :value="hamburgerOpen"
              class="h-6 fill-current"
              @input="toggleHamburger(true)"
            ></ButtonHamburger>
          </div>
        </div>
      </div>
    </div>

    <!-- <Hamburger></Hamburger> -->
    <LayoutMenuMainContainer
      :class="hamburgerOpen && 'modal-open'"
      :visible="hamburgerOpen"
      @input="toggleHamburger(false)"
    />
  </nav>
</template>
<script>
import { Entry } from '~/models/entry'
import overlay from '@/mixins/overlay'
export default {
  components: {
    BarryNillsonLogoBlack: () => import('~/assets/svg/bn-logo.svg?inline'),
    BarryNillsonLogoWhite: () =>
      import('~/assets/svg/bn-logo-white.svg?inline'),
    // SearchIcon: () => import('@/assets/svg/search.svg?inline=true'),
  },
  mixins: [overlay],
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      hamburgerOpen: false,
      scrollTop: true,
      timeoutLoaded: false,
      isLoading: false,
      current: 'menuClose',
      menu: true,
    }
  },
  computed: {
    primary() {
      return this.module.primary
        ? this.module.primary.map((item) => Entry(item))
        : []
    },
    talkToUs() {
      return {
        text: 'Get in touch',
        url: '/get-in-touch',
      }
    },
    colour() {
      return this.transNav && this.scrollTop ? 'white' : '#003E53'
    },
    transNav() {
      return this.$store.state.globals.transNav
    },
    siteBanner() {
      return (
        this.$store.state.globals.bannerOpen &&
        this.$store.getters['globals/siteBanner'].heading
      )
    },
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.closeMenu()
      },
    },
    hamburgerOpen(val) {
      val ? this.addClass() : this.removeClass()
    },
  },
  created() {
    this.closeOverlay()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    setTimeout(() => {
      this.timeoutLoaded = true
    }, 450)
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27 && this.current) {
        this.current = 'menuClose'
        this.closeOverlay()
      }
    })
    this.removeClass()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll, { passive: true })
  },
  methods: {
    addClass(value) {
      const claseName = value || 'overflow-y-hidden'
      document.documentElement.classList.add(claseName)
      document.body.classList.add(claseName)
    },
    removeClass(value) {
      const claseName = value || 'overflow-y-hidden'
      document.documentElement.classList.remove(claseName)
      document.body.classList.remove(claseName)
    },
    toggleHamburger(val) {
      this.hamburgerOpen = !this.hamburgerOpen
    },
    onScroll(e) {
      this.scrollTop = window.scrollY < 1
    },
    closeMenu() {
      this.current = 'menuClose'
      this.closeOverlay()
    },
    toggleMenu(value) {
      if (!value) {
        setTimeout(() => {
          this.menu = true
        }, 200)
      }
      this.menu = false
    },
  },
}
</script>
<style>
.floating-nav:not(.drop-shadow-nav) .talk-to-us-button button:hover {
  @apply border-white text-white;
}
.nav-top-level {
  z-index: 99;
}
.nav {
  z-index: 99;
}
.nav-header {
  @apply mx-auto flex flex-row items-center justify-between;

  transition: height 350ms ease;
}
.nav-header.small-height {
  height: 58px;
}
.nav-header.large-height {
  height: 58px;
}
.floating-nav {
  transition: all 350ms ease;
}
.drop-shadow-nav {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

@screen md {
  .nav-header.small-height {
    height: 66px;
  }
  .nav-header.large-height {
    height: 86px;
  }
}

.alert-active {
  top: 0;
}
</style>

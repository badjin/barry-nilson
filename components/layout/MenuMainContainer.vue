<template>
  <div class="main-menu-container bg-steelblue h-screen menu-box-shadow">
    <div class="flex justify-end mb-4">
      <ButtonHamburger
        colour="white"
        :value="visible"
        @input="$emit('input')"
      ></ButtonHamburger>
    </div>
    <ul class="navigation text-white px-6 lg:px-20">
      <div class="mb-4 lg:mb-10">
        <client-only>
          <LayoutSearchInHamburger class="w-full lg:w-10/12" />
        </client-only>
      </div>
      <div
        v-for="(item, index) in nav"
        :key="item.id"
        :style="`animation-delay: ${0.5 + index / 12}s;`"
        class="text-2xl md:text-3xl lg:text-4xl mb-5 relative"
        @mouseover="setHoverState(index, true)"
        @mouseleave="setHoverState(index, false)"
      >
        <template v-if="item.children && item.children.length">
          <AccordionWrap>
            <AccordionMenu :is-multi-option="false">
              <template slot="accordion-trigger">
                <nuxt-link
                  :to="'/' + item.uri"
                  class="hover:text-primary transition-colors duration-200 font-display font-medium"
                >
                  {{ item.title }}
                </nuxt-link>
              </template>
              <template slot="accordion-content">
                <div class="text-base font-bold space-y-4 py-6">
                  <div
                    v-for="childMenu in item.children"
                    :key="childMenu.id"
                    class="flex space-x-5 group"
                  >
                    <template
                      v-if="childMenu.children && childMenu.children.length"
                    >
                      <AccordionWrap>
                        <AccordionMenu :is-multi-option="false">
                          <template slot="accordion-trigger">
                            <div class="w-200px flex space-x-5 group">
                              <MenuIndicator
                                class="text-steelblue group-hover:text-primary transition-colors duration-200 fill-current w-4 h-auto"
                              />
                              <nuxt-link
                                :to="'/' + childMenu.uri"
                                class="hover:text-primary transition-colors duration-200 font-display font-medium"
                              >
                                {{ childMenu.title }}
                              </nuxt-link>
                            </div>
                          </template>
                          <template slot="accordion-content">
                            <div
                              class="text-base font-normal space-y-4 py-4 pl-5"
                            >
                              <div
                                v-for="childChildMenu in childMenu.children"
                                :key="childChildMenu.id"
                                class="flex space-x-5 text-steelblue hover:text-primary"
                              >
                                <MenuIndicator
                                  class="transition-colors duration-200 fill-current w-4 h-auto"
                                />
                                <nuxt-link
                                  :to="'/' + childChildMenu.uri"
                                  class="text-white hover:text-primary transition-colors duration-200 font-display font-medium"
                                >
                                  {{ childChildMenu.title }}
                                </nuxt-link>
                              </div>
                            </div>
                          </template>
                        </AccordionMenu>
                      </AccordionWrap>
                    </template>
                    <template v-else>
                      <MenuIndicator
                        class="text-steelblue group-hover:text-primary transition-colors duration-200 fill-current w-4 h-auto"
                      />
                      <nuxt-link
                        :to="'/' + childMenu.uri"
                        class="group-hover:text-primary transition-colors duration-200 font-display font-medium"
                      >
                        {{ childMenu.title }}
                      </nuxt-link>
                    </template>
                  </div>
                </div>
              </template>
            </AccordionMenu>
          </AccordionWrap>
        </template>
        <template v-else>
          <nuxt-link
            :to="'/' + item.uri"
            class="hover:text-primary transition-colors duration-200 font-display font-medium"
          >
            {{ item.title }}
          </nuxt-link>
        </template>

        <MenuIndicator
          v-if="hovered[index]"
          class="text-primary fill-current indicator absolute"
        />
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  components: {
    MenuIndicator: () => import('@/assets/svg/cursor.svg?inline=true'),
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hovered: [],
      hoveredChild: [],
      activeIndex: -1,
    }
  },
  computed: {
    nav() {
      return this.$store.state.globals.primary
    },
  },
  watch: {
    '$route.fullPath': {
      handler() {
        if (!this.visible) return
        this.$emit('input')
        this.hovered = []
        this.hoveredChild = []
      },
    },
  },
  mounted() {
    // this.openOverlay()
  },
  methods: {
    setHoverState(index, value) {
      this.$set(this.hovered, index, value)
    },
    setHoverStateChild(index, value) {
      this.$set(this.hoveredChild, index, value)
    },
    menuExpanded(index) {
      if (index === -1) return
      this.hovered[index] = true
    },
    menuExpandedChild(index) {
      if (index === -1) return
      this.hoveredChild[index] = true
    },
  },
}
</script>
<style scoped>
.navigation li {
  animation-name: fadeInDown;
  visibility: visible;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.close {
  padding-top: 20px;
  padding-right: 70px;
}
.indicator {
  width: 20px;
  top: 6px;
  left: -30px;
}
@screen md {
  .indicator {
    width: 20px;
    top: 9px;
    left: -30px;
  }
}
@screen lg {
  .indicator {
    width: 27px;
    top: 10px;
    left: -52px;
  }
}
a.nuxt-link-active {
  @apply text-primary;
}
</style>
<style lang="scss">
.toggled .main-menu-container {
  transform: translateX(0);
}

.main-menu-container {
  box-shadow: 0 4px 74px rgb(0 0 0 / 0.25);
  background-size: cover;
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  z-index: 100;
  left: 0;
  right: 0;
  width: 100%;
  padding: 20px 34px;
  // border-radius: 0 0 0 120px;
  transform: translateX(220%);
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}

@screen xl {
  .toggled .main-menu-container {
    transform: translateX(100%);
  }

  .main-menu-container {
    background-size: cover;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    left: 0;
    right: 0;
    width: 50%;
    padding: 20px 34px;
    transform: translateX(220%);
    transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  }
}

.main-menu-container .container {
  margin: 0 auto;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -15%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>

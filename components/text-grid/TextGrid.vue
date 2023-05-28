<template>
  <div
    class="tc-text-grid flex flex-col space-y-6 lg:space-y-0"
    :class="module.alignment ? 'lg:flex-row-reverse' : 'lg:flex-row'"
  >
    <div class="w-full lg:w-5/12 flex flex-col space-y-4 lg:space-y-8">
      <h2 v-show="module.heading" class="tc-component-h2">
        {{ module.heading }}
      </h2>
      <h3 v-show="module.subheading" class="tc-h2">
        {{ module.subheading }}
      </h3>
      <div v-show="module.wysiwyg" class="tc-wys" v-html="module.wysiwyg"></div>
      <div class="flex">
        <CraftLink
          v-show="module.callToAction && module.callToAction.url"
          :link="module.callToAction"
        >
          <ButtonPrimary :colour="wrapper.text">{{
            module.callToAction.customText
          }}</ButtonPrimary>
        </CraftLink>
      </div>
    </div>
    <div class="hidden lg:block w-1/12"></div>
    <div
      class="pt-5 md:pt-10 lg:pt-0 w-full lg:w-6/12 3xl:w-5/12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10"
    >
      <div
        v-for="item in grid"
        :key="item.id"
        class="rounded-md ratio-panel"
        :style="{
          backgroundColor: wrapper.bg2,
        }"
      >
        <template v-if="item.cta && item.cta.url">
          <div
            class="md:absolute md:top-0 md:h-full flex flex-col justify-between"
          >
            <div class="tile-heading p-5 md:p-7">
              {{ item.heading }}
            </div>
            <CraftLink :link="item.cta" class="p-7">
              <ButtonShape>
                {{ item.cta.customText }}
              </ButtonShape>
            </CraftLink>
          </div>
        </template>
        <template v-else>
          <h3 class="tile-heading p-5 md:p-7 md:absolute md:bottom-0">
            {{ item.heading }}
          </h3>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    grid() {
      return this.module.textGrid || []
    },
    wrapper() {
      return this.getTheme(this.module.themes)
    },
  },
}
</script>
<style scoped>
.ratio-panel {
  @apply h-auto;

  padding-top: 0;
}

.tile-heading {
  @apply text-2xl font-display font-medium leading-snug tracking-tighter;
}

@screen md {
  .ratio-panel {
    @apply overflow-hidden h-0 relative;

    padding-top: 100%;
  }
  .tile-heading {
    @apply text-xl;
  }
}
@screen lg {
  .tile-heading {
    @apply text-lg;
  }
}
@screen xl {
  .tile-heading {
    @apply text-3xl;
  }
}

@screen 3xl {
  .ratio-panel {
    @apply overflow-hidden h-0 relative;

    padding-top: 80%;
  }
}
</style>

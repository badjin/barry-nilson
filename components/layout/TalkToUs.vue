<template>
  <div>
    <div
      v-if="footerCta"
      class="tc-cta px-5 md:px-10 bg-sand-300 text-steelblue"
    >
      <div
        class="flex flex-col space-y-7 md:space-y-10 justify-center py-12 md:py-16 items-center"
      >
        <h2
          class="text-4xl lg:text-5xl font-display font-medium leading-tight tracking-tighter w-8/12 md:w-full text-center"
        >
          {{ footerCta.heading }}
        </h2>
        <div
          v-show="footerCta.wysiwyg"
          class="tc-wys w-full md:w-8/12 lg:w-6/12 text-center"
        >
          <div v-html="footerCta.wysiwyg"></div>
        </div>
        <CraftLink
          v-if="footerCta.linkedField && footerCta.linkedField.url"
          :link="footerCta.linkedField"
        >
          <ButtonPrimary colour="#003E53"
            >{{
              footerCta.linkedField.customText || footerCta.linkedField.text
            }}
          </ButtonPrimary>
        </CraftLink>
      </div>
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
    footerCta() {
      return (
        this.footerComponents.footerCta?.length &&
        this.footerComponents.footerCta[0]
      )
    },
  },
}
</script>

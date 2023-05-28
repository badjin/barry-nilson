<template>
  <div>
    <component :is="`pageHeros${pageType}`" v-if="hasHeading" :module="hero" />
    <ContentBuilder :modules="page.contentBuilder" :no-heading="!hasHeading" />
    <template v-if="hasFooterCta">
      <LayoutTalkToUs
        v-show="hasFooterCta && footerCta.talkToUs"
        :footer-components="footerComponents"
      />
      <LayoutSubscribe
        v-show="hasFooterCta && footerCta.newsletter"
        :footer-components="newsletterModule"
      />
    </template>
    <template v-else>
      <LayoutTalkToUs :footer-components="footerComponents" />
      <LayoutSubscribe :footer-components="newsletterModule" />
    </template>
  </div>
</template>

<script>
import { trimStart, trimEnd, get } from 'lodash-es'
import seo from '@/models/seo.js'
export default {
  layout: 'noCtaFooter',
  asyncData(context) {
    return {
      uri: trimEnd(trimStart(context.route.path, '/'), '/'),
      error: context.error,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('pages/get', this.uri)

      this.$store.commit('globals/transNav', this.pageType !== 'Expertise')

      this.$store.commit('entry/CHANGE_TYPE', 'pages')
    } catch (e) {
      console.log(e)
      this.error('404', e)
    }
    if (!Object.keys(this.page || {}).length) {
      this.error('404', 'No page found')
    }
  },
  head() {
    return seo.bind(this)(this.page)
  },

  computed: {
    page() {
      return this.$store.getters['pages/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading,
        subheading: this.page.subheading,
        wysiwyg: this.page.wysiwyg,
        image: this.page.image || [],
        inThisSection: this.page.inThisSection,
        parentLinks: this.uri,
      }
    },
    hasHeading() {
      return (
        this.page.heading || this.page.subheading || this.page.wysiwyg || null
      )
    },
    pageType() {
      return this.page.__typename === 'pages_default_Entry'
        ? 'Generic'
        : this.page.__typename === 'pages_expertise_Entry'
        ? 'Expertise'
        : 'Child'
    },
    newsletterModule() {
      return this.$store.getters['globals/newsletter']
    },
    footerComponents() {
      return this.$store.getters['globals/footer']
    },
    footerCta() {
      return get(this.page, 'footerCtaSwitch[0]') || []
    },
    hasFooterCta() {
      return this.page.footerCtaSwitch?.length
    },
    parentLink() {
      const links = this.uri
        ? this.uri.split('/')
        : trimEnd(trimStart(this.$route.fullPath, '/'), '/').split('/')
      return links.length > 2 ? `${links[0]}/${links[2]}` : this.uri
    },
  },
}
</script>

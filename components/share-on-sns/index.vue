<template>
  <div class="flex space-x-8 text-steelblue">
    <a :href="shareThisToTwitter" target="_blank" class="tc-social-links">
      <Twitter class="h-full tc-social-links--icon" />
      <span class="text-xs font-bold pl-2">Share on Twitter</span>
    </a>
    <a :href="shareThisToLinkedIn" target="_blank" class="tc-social-links">
      <LinkedIn class="h-full tc-social-links--icon" />
      <span class="text-xs font-bold pl-2">Share on LinkedIn</span>
    </a>
  </div>
</template>
<script>
export default {
  components: {
    Twitter: () => import('~/assets/svg/twitter.svg?inline'),
    LinkedIn: () => import('~/assets/svg/linkedInOld.svg?inline'),
  },
  props: {
    fullPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      siteUrl: 'https://bnlaw-prod.netlify.app',
    }
  },
  computed: {
    shareThisToTwitter() {
      return `https://twitter.com/intent/tweet?&url=${this.siteUrl}${this.fullPath}`
    },
    shareThisToLinkedIn() {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${this.siteUrl}${this.fullPath}`
    },
  },
}
</script>

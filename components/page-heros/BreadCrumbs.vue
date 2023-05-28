<template>
  <div v-show="parentLinks.length > 0" class="hidden md:block pb-8 text-xs">
    <!-- {{ parentLinks }} -->
    <div v-for="(link, index) in parentLinks" :key="index" class="inline">
      <span v-show="index > 0" class="mx-1"> - </span>
      <nuxt-link class="opacity-50 hover:opacity-100" :to="link.uri">
        <span class="capitalize">{{
          typeof link.title.replaceAll === 'function'
            ? link.title.replaceAll('-', ' ')
            : 'Page'
        }}</span>
      </nuxt-link>
      <!-- <template v-if="index + 1 === parentLinks.length">
        <span class="capitalize">{{
          typeof link.title.replaceAll === 'function'
            ? link.title.replaceAll('-', ' ')
            : 'Page'
        }}</span>
      </template>
      <template v-else>
        <nuxt-link class="opacity-50 hover:opacity-100" :to="link.uri">
          <span class="capitalize">{{
            typeof link.title.replaceAll === 'function'
              ? link.title.replaceAll('-', ' ')
              : 'Page'
          }}</span>
        </nuxt-link>
      </template> -->
    </div>
  </div>
</template>

<script>
import { drop } from 'lodash-es'
export default {
  props: {
    links: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pageLink: [...drop(this.links)],
      parentLinks: [],
    }
  },
  async mounted() {
    const parent = this.links.split('/')
    if (!parent.length) return
    console.log(parent.pop())
    // parent = parent.splice(1, 1)
    this.parentLinks = await this.getLinks([...parent])
  },
  methods: {
    getLink(index) {
      let link = '/'
      for (let i = 0; i <= index; i++) {
        link += this.pageLink[i]
        if (i < index) link += '/'
      }
      return link
    },
    getLinks(links) {
      let link = ''
      return links.map((item) => {
        return {
          uri: (link += `/${item}`),
          title: item,
        }
      })
    },
  },
}
</script>

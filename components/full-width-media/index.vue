<template>
  <div v-if="module.mediaSwitch">
    <div
      v-if="!showVideo && uri"
      class="relative w-full overflow-hidden rounded"
      style="padding-bottom: 56.2%"
    >
      <template v-if="thumbnail">
        <nuxt-img
          :src="thumbnail"
          class="absolute w-full h-auto object-cover z-40"
          format="webp"
          loading="lazy"
          preload
        />
      </template>
      <template v-else>
        <div class="w-full h-screen absolute object-cover z-40"></div>
      </template>
      <ButtonPlay class="play-button absolute z-50" @click="showVideo = true" />
    </div>
    <div
      v-else-if="uri"
      class="relative overflow-hidden rounded"
      style="padding-bottom: 56.2%"
    >
      <iframe
        :src="uri"
        class="absolute object-none z-40"
        width="100%"
        height="100%"
        frameborder="0"
        autoplay
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <div v-else-if="image" class="flex items-center justify-center">
    <nuxt-img :src="image" alt="media" format="webp" loading="lazy" preload />
  </div>
</template>
<script>
import { get } from 'lodash-es'

export default {
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showVideo: false,
    }
  },
  computed: {
    image() {
      return get(this.module.image, '[0].orig') || undefined
    },
    video() {
      return get(this.module.videoEmbad, '[0]') || {}
    },
    thumbnail() {
      return get(this.video.thumbnail, '[0].orig') || undefined
    },
    uri() {
      const videoPlatform = this.video.videoPlatform
        ? ['vimeo', 'youtube']
        : ['youtube', 'vimeo']
      return this[`${videoPlatform[0]}`] || this[`${videoPlatform[1]}`] || ''
    },
    vimeo() {
      if (!this.video.vimeoId) return ''
      return `https://player.vimeo.com/video/${get(
        this,
        'video.vimeoId'
      )}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1`
    },
    youtube() {
      if (!this.video.youtubeUrl) return ''
      const id = this.youTubeGetID
      return `https://www.youtube.com/embed/${id}?playsinline=1&rel=0&modestbranding=19&autoplay=1`
    },
    youTubeGetID() {
      const [a, , b] = (this.video.youtubeUrl || '')
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      if (b !== undefined) {
        return b.split(/[^0-9a-z_-]/i)[0]
      } else {
        return a
      }
    },
  },
}
</script>
<style scoped>
.play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

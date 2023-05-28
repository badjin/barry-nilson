<template>
  <div>
    <nuxt-link :to="`/${card.uri}`" class="w-full lg:w-6/12 px-3 lg:px-5">
      <div class="rounded overflow-hidden">
        <TcRatio
          v-if="card.image && card.image.length"
          :height="252.86"
          :width="190.4"
        >
          <nuxt-img
            :src="card.image[0].src"
            alt="media"
            format="webp"
            loading="lazy"
            preload
            class="hover:scale-110 transition duration-500"
          />
        </TcRatio>
        <TcRatio v-else :height="252.86" :width="190.4">
          <nuxt-img
            src="/png/bn_placeholder.png"
            alt="media"
            format="webp"
            loading="lazy"
            preload
            class="hover:scale-110 transition duration-500"
          />
        </TcRatio>
      </div>
      <div class="mt-3 lg:mt-4">
        <div class="text-lg md:text-xl xl:text-3xl font-display font-medium">
          {{ card.name }}
        </div>
        <div v-for="(role, index) in card.rolesPosition" :key="index">
          <div class="inline-block">
            {{ role }}
          </div>
          <span v-if="index < card.rolesPosition.length - 1" class="-ml-1"
            >,
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

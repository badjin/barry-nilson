<template>
  <span class="tc-btn-play" @click="$emit('click')">
    <IconPlay class="icon-play" />
  </span>
</template>
<script>
export default {
  components: {
    IconPlay: () => import('~/assets/svg/play-button.svg?inline'),
  },
}
</script>

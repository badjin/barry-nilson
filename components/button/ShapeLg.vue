<template>
  <span class="tc-btn tc-btn-shape tc-btn-shape--lg" @click="$emit('click')">
    <IconArrow class="icon-shape" />
    <slot> Read more </slot>
  </span>
</template>
<script>
export default {
  components: {
    IconArrow: () => import('~/assets/svg/arch.svg?inline'),
  },
}
</script>

<template>
  <span
    class="tc-btn tc-btn-shape"
    :class="color !== 'blue' ? 'text-primary' : 'text-blue'"
    @click="$emit('click')"
  >
    <IconShape :class="`icon-${color}`" />
    <slot> Read more </slot>
  </span>
</template>
<script>
export default {
  components: {
    IconShape: () => import('~/assets/svg/arch.svg?inline'),
  },
  props: {
    color: {
      type: String,
      default: 'shape',
    },
  },
}
</script>

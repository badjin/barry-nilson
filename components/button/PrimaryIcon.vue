<template>
  <button
    class="tc-btn tc-btn-primary tc-btn-primary--icon"
    @click="$emit('click')"
  >
    <Icon class="icon" />
    <span><slot>Primary button w Icon</slot></span>
  </button>
</template>

<script>
export default {
  components: {
    Icon: () => import('~/assets/svg/search.svg?inline'),
  },
}
</script>

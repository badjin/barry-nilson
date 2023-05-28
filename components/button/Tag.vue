<template>
  <button
    class="tc-btn"
    :class="reverse ? 'tc-btn-tag-reverse' : 'tc-btn-tag'"
    @click="$emit('click')"
  >
    <span><slot>Category</slot></span>
  </button>
</template>

<script>
export default {
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

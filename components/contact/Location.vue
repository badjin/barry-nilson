<template>
  <div class="tc-container">
    <CardGridLocation :cards="module" />
  </div>
</template>
<script>
export default {
  props: {
    module: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

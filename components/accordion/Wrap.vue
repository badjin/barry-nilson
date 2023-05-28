<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  provide() {
    return { Accordion: this.Accordion }
  },
  data() {
    return {
      Accordion: {
        count: 0,
        active: null,
        multiActive: [],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

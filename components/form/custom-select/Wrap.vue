<template>
  <ul class="accordion border-b">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  provide() {
    return { Accordion: this.Accordion }
  },
  props: {},
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

<style scoped>
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

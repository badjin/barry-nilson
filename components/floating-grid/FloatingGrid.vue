<template>
  <div class="tc-multi-col">
    <div class="flex flex-col space-y-4 lg:space-y-8">
      <h2 class="tc-component-h2 pb-4">
        {{ module.heading }}
      </h2>
      <h3 v-show="module.subheading" class="tc-sub-heading">
        {{ module.subheading }}
      </h3>
      <div v-show="module.wysiwyg" class="tc-wys" v-html="module.wysiwyg"></div>
    </div>
    <div class="mt-8 lg:flex -mx-10">
      <div
        class="px-10 w-full lg:w-1/3 border-r"
        :style="{ borderColor: tileBg }"
      >
        <div v-for="(item, idx) in getGrid(0)" :key="idx" class="mb-10">
          <div
            class="flex flex-col space-y-7 p-6 md:p-8 rounded"
            :style="{ backgroundColor: tileBg }"
          >
            <h3 class="panel-heading">{{ item.heading }}</h3>
            <div class="tc-wys" v-html="item.wysiwyg"></div>
          </div>
        </div>
      </div>
      <div
        class="px-10 w-full lg:w-1/3 border-r"
        :style="{ borderColor: tileBg }"
      >
        <div v-for="(item, idx) in getGrid(1)" :key="idx" class="mb-10">
          <div
            class="flex flex-col space-y-7 p-6 md:p-8 rounded"
            :style="{ backgroundColor: tileBg }"
          >
            <h3 class="panel-heading">{{ item.heading }}</h3>
            <div class="tc-wys" v-html="item.wysiwyg"></div>
          </div>
        </div>
      </div>
      <div class="px-10 w-full lg:w-1/3">
        <div v-for="(item, idx) in getGrid(2)" :key="idx" class="mb-10">
          <div
            class="flex flex-col space-y-7 p-6 md:p-8 rounded"
            :style="{ backgroundColor: tileBg }"
          >
            <h3 class="panel-heading">{{ item.heading }}</h3>
            <div class="tc-wys" v-html="item.wysiwyg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
    tileBg: {
      type: String,
      default: 'white',
    },
  },
  computed: {
    grid() {
      return this.module.floatingGrid
    },
  },
  methods: {
    getGrid(value) {
      return this.grid.filter((e, index) => index % 3 === value && e)
    },
  },
}
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: repeat(3, 200px);
  gap: 10px;
  grid-auto-flow: column;
  grid-auto-columns: 300px 100px;
}

.panel-heading {
  @apply text-3xl font-display font-medium leading-snug tracking-tighter;
}
</style>

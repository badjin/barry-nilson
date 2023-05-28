<template>
  <div class="flex flex-col space-y-6 lg:space-y-12">
    <div class="w-full flex flex-col space-y-4 lg:space-y-8">
      <h2 v-show="module.heading" class="tc-component-h2">
        {{ module.heading }}
      </h2>
      <h3 v-show="module.subheading" class="tc-sub-heading">
        {{ module.subheading }}
      </h3>
      <div v-show="module.wysiwyg" class="tc-wys" v-html="module.wysiwyg"></div>
    </div>
    <div class="lg:hidden">
      <div v-for="item in columns" :key="item.id" class="tc-wys">
        <div v-html="item.wysiwyg"></div>
      </div>
    </div>
    <div
      class="text-columns hidden lg:grid"
      :class="{
        'grid-cols-1': columns.length === 1,
        'grid-cols-2 -mx-10': columns.length === 2,
        'grid-cols-3 -mx-10': columns.length === 3,
        'grid-cols-4 -mx-10': columns.length === 4,
      }"
    >
      <div
        v-for="(item, index) in columns"
        :key="item.id"
        class="tc-wys"
        :class="
          columns.length > 1 &&
          index < columns.length - 1 &&
          'border-r border-steelblue border-opacity-30'
        "
      >
        <div
          :class="{ 'px-10': columns.length > 1 }"
          v-html="item.wysiwyg"
        ></div>
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
  },
  computed: {
    columns() {
      return this.module.columns || []
    },
  },
}
</script>
<style>
.text-columns .tc-wys h3 {
  margin-top: 0 !important;
}
</style>

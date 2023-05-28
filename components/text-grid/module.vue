<template>
  <div
    :style="{
      backgroundColor: wrapper.bg,
      color: wrapper.text,
    }"
  >
    <div class="tc-container">
      <TextGrid
        :module="module"
        :class="{
          'border-t border-opacity-30': border.topBorder,
          'border-b border-opacity-30': border.bottomBorder,
          'border-steelblue': wrapper.text !== 'white',
          'border-white': wrapper.text === 'white',
          'pt-c': spacing.topMargin,
          'pb-c': spacing.bottomMargin,
        }"
      />
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import ModuleMixin from '@/components/content-builder/ModuleMixin'
import theme from '@/mixins/theme'
export default {
  mixins: [ModuleMixin, theme],
  computed: {
    wrapper() {
      return this.getTheme(this.module.themes)
    },
    border() {
      return (
        get(this.module, 'border[0]') || {
          topBorder: false,
          bottomBorder: false,
        }
      )
    },
    spacing() {
      return (
        get(this.module, 'spacing[0]') || {
          topMargin: false,
          bottomMargin: false,
        }
      )
    },
  },
}
</script>

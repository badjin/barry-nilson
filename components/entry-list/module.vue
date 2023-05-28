<template>
  <div
    :style="{
      backgroundColor: wrapper.bg,
      color: wrapper.text,
    }"
  >
    <client-only>
      <div class="tc-container">
        <EntryList
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
    </client-only>
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
      // bg-white text-steelblue
      return this.getTheme(0)
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

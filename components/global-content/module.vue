<template>
  <!-- <div>
    {{ contentModules.contentBuilder }}
  </div> -->
  <ContentBuilder :modules="contentModules.contentBuilder" />
</template>
<script>
import { first } from 'lodash-es'
import ModuleMixin from '@/components/content-builder/ModuleMixin'

export default {
  mixins: [ModuleMixin],
  computed: {
    contentModules() {
      return {
        ...first(this.module.contentBlock),
      }
    },
  },
}
</script>

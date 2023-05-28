<template>
  <component :is="field.displayType" :field="field" />
</template>

<script>
import FieldMixin from '~/mixins/FieldMixin'

import Checkboxes from '@/components/formie/inputs/Checkboxes.vue'
import Dropdown from '@/components/formie/inputs/Dropdown.vue'
import Hidden from '@/components/formie/inputs/Hidden.vue'
import Radio from '@/components/formie/inputs/Radio.vue'

export default {
  components: {
    Checkboxes,
    Dropdown,
    Hidden,
    Radio,
  },

  mixins: [FieldMixin],
}
</script>

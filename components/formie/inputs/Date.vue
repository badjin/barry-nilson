<template>
  <div>
    <field-label :id="getId()" :field="field" position="above-input" />

    <field-instructions :field="field" position="above-input" />

    <input
      v-bind="attrs()"
      type="date"
      class="mt-1 focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
    />

    <field-instructions :field="field" position="below-input" />

    <field-label :id="getId()" :field="field" position="below-input" />
  </div>
</template>

<script>
import FieldMixin from '~/mixins/FieldMixin'

export default {
  mixins: [FieldMixin],
}
</script>

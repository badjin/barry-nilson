<template>
  <div>
    <field-label :id="getId()" :field="field" position="above-input" />

    <field-instructions :field="field" position="above-input" />

    <select
      :id="getId()"
      :name="getName()"
      :multiple="field.multiple"
      :required="field.required"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-300 focus:border-green-300 sm:text-sm rounded-sm"
    >
      <option
        v-for="(option, index) in field.options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

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

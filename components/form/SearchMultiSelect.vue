<template>
  <div class="flex items-end" :class="{ error: error }">
    <label :for="id" class="tc-filter-label pr-4 mb-2">{{ label }}</label>
    <select
      v-bind="$attrs"
      :id="id"
      class="tc-filter-input border border-grey-300 pl-2 pr-4 py-2 leading-snug w-full"
      :value="value"
      :placeholder="label"
      @change="changed"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.isRefined"
      >
        {{ option.label }}
      </option>
    </select>

    <FormErrorMessage v-bind="$props"></FormErrorMessage>
  </div>
</template>
<script>
import FormElementMixin from '@/components/form/FormElementMixin'
export default {
  components: {},
  mixins: [FormElementMixin],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changed(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

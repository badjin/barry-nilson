<template>
  <div class="w-full relative" :class="{ error: error }">
    <label v-if="label" :for="id" class="sr-only">{{ label }}</label>
    <button class="tc-global-search-text-input__button" @click="$emit('click')">
      <IconSearch v-if="!value" class="tc-global-search-text-input__icon" />
      <IconClose v-else class="mt-1 w-auto h-4 fill-current text-white" />
    </button>
    <input
      v-bind="$attrs"
      :id="id"
      class="tc-search-input"
      :value="value"
      type="text"
      :placeholder="placeholder || label"
      @input="(event) => $emit('input', event.target.value)"
    />

    <FormErrorMessage v-bind="$props"></FormErrorMessage>
  </div>
</template>
<script>
import FormElementMixin from '@/components/form/FormElementMixin'
export default {
  components: {
    IconSearch: () => import('@/assets/svg/search.svg?inline'),
    IconClose: () => import('@/assets/svg/close.svg?inline'),
  },
  mixins: [FormElementMixin],
}
</script>

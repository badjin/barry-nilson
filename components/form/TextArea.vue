<template>
  <textarea
    v-bind="$attrs"
    :class="[
      error ? 'input-error' : 'input-default',
      { 'input-filled': value && value.length },
    ]"
    class="tc-text-input text-base rounded-none font-body text-steelblue leading-none w-full border-b border-solid bg-transparent py-2 h-24 focus:outline-none focus:border-b focus:border-form"
    @input="(event) => $emit('input', event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  ></textarea>
</template>
<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

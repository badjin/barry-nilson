<template>
  <input
    v-bind="$attrs"
    :class="[
      error ? 'input-error' : 'input-default',
      {
        'input-filled': value && value.length,
        'pb-8 sm:pb-3 lg:pb-8 xl:pb-3': overflowed && !(value && value.length),
        'pb-3': !overflowed && !(value && value.length),
      },
    ]"
    :value="value"
    type="type"
    class="tc-text-input rounded-none text-base font-body text-steelblue leading-none w-full border-b border-steelblue border-solid bg-transparent pt-1 focus:outline-none focus:border-b focus:border-form focus:pb-3"
    @input="(event) => $emit('input', event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
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
    overflowed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

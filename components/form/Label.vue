<template>
  <label
    class="tc-label opacity-50"
    :class="[
      noEffect ? 'text-xs' : 'text-base',
      {
        'input-filled-more': overflowed,
      },
    ]"
  >
    <slot>Label</slot>
  </label>
</template>
<script>
export default {
  props: {
    noEffect: {
      type: Boolean,
      default: false,
    },
    overflowed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style>
.required .tc-label::after {
  content: '*';
  @apply ml-1;
}

.tc-text-input + .tc-label {
  @apply absolute left-0 pointer-events-none;

  transition: transform 200ms ease;
  padding: 1.5em 0;
  top: -1.5em;
}

.tc-text-input:focus + .tc-label,
.input-filled + .tc-label {
  @apply text-xs opacity-75;

  transform: translateY(-1.5em);
}

.tc-text-input:focus + .input-filled-more {
  @apply text-xs opacity-75;

  transform: translateY(-3em);
}
@screen sm {
  .tc-text-input:focus + .input-filled-more {
    @apply text-xs opacity-75;

    transform: translateY(-1.5em);
  }
}
</style>

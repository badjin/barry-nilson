<template>
  <span class="tc-error absolute left-0 -top-6 flex items-center">
    <ErrorIcon v-show="message" class="tc-error__icon"></ErrorIcon>
    {{ message }}
  </span>
</template>
<script>
export default {
  components: {
    ErrorIcon: () => import('@/assets/svg/exclamation.svg?inline=true'),
  },
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

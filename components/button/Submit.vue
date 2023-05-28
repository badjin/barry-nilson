<template>
  <span class="group">
    <button
      :disabled="loading"
      type="submit"
      class="tc-btn tc-btn-primary px-6 py-3 text-base"
      :class="{
        'text-white group-hover:bg-white': colour === 'white',
        'text-steelblue group-hover:bg-steelblue': colour !== 'white',
        loading: loading,
      }"
      @click="$emit('click')"
    >
      <span
        :class="{
          'group-hover:text-steelblue': colour === 'white',
          'group-hover:text-white': colour !== 'white',
        }"
        ><slot>Secondary button</slot></span
      >
    </button>
  </span>
</template>

<script>
export default {
  props: {
    colour: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
}
</script>

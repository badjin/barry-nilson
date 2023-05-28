<template>
  <div class="group">
    <button
      class="tc-btn tc-btn-primary"
      :class="{
        'py-3': size === 'md',
        'py-2': size !== 'md',
        'text-white leading-normal group-hover:bg-white': colour === 'white',
        'text-steelblue leading-relaxed group-hover:bg-steelblue':
          colour !== 'white',
      }"
      @click="$emit('click')"
    >
      <span
        :class="{
          'group-hover:text-steelblue': colour === 'white',
          'group-hover:text-white': colour !== 'white',
        }"
        ><slot>Primary button</slot></span
      >
    </button>
  </div>
</template>

<script>
export default {
  props: {
    colour: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
}
</script>

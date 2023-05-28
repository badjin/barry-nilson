<template>
  <div class="group">
    <template v-if="disabled">
      <button
        class="tc-btn tc-btn-dropdown w-full pointer-events-none"
        :class="{
          'py-3': size === 'md',
          'py-2': size !== 'md',
          'text-white text-opacity-50 leading-normal': colour === 'white',
          'text-steelblue text-opacity-50 leading-relaxed':
            colour !== 'white' && !active,
        }"
      >
        <div class="w-full">
          <slot>Primary button</slot>
        </div>
      </button>
    </template>
    <template v-else>
      <button
        class="tc-btn tc-btn-dropdown w-full"
        :class="{
          'py-3': size === 'md',
          'py-2': size !== 'md',
          'text-white leading-normal group-hover:bg-white': colour === 'white',
          'text-steelblue leading-relaxed group-hover:bg-steelblue':
            colour !== 'white' && !active,
          'text-white bg-steelblue': active,
        }"
        @click="$emit('click')"
      >
        <div
          class="w-full"
          :class="{
            'group-hover:text-steelblue': colour === 'white',
            'group-hover:text-white': colour !== 'white' && !active,
          }"
        >
          <slot>Primary button</slot>
        </div>
      </button>
    </template>
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
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
}
</script>

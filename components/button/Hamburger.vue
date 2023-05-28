<template>
  <div
    :class="{ toggled: value }"
    :style="{ backgroundColor: colour }"
    class="hamburger-toggle"
    @click="emit"
  >
    <!-- <span class="inner-line bg-steelblue">
      <span class="outer-lines bg-steelblue"></span>
    </span> -->
    <span class="outer-lines" :style="{ backgroundColor: outerColor }"></span>
  </div>
</template>
<script>
export default {
  props: {
    colour: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
  computed: {
    outerColor() {
      return this.colour === 'white' ? '#003E53' : 'white'
    },
  },
  methods: {
    emit() {
      this.$emit('input')
    },
  },
}
</script>
<style>
.inset-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hamburger-toggle {
  @apply cursor-pointer w-10 h-10 relative flex items-center rounded-full;
}

.hamburger-toggle.toggled span.outer-lines::after {
  transform: rotate(45deg) translate(-0.37rem, 0.65rem);
  left: 59%;
}
.hamburger-toggle.toggled span.outer-lines::before {
  transform: rotate(-45deg) translate(-0.33rem, -0.71rem);
  left: 59%;
}
.hamburger-toggle.toggled span.outer-lines::after {
  top: 40%;
}

.hamburger-toggle span.outer-lines::after,
.hamburger-toggle span.outer-lines::before {
  @apply absolute w-4;

  background: inherit;
  height: 1px;
  content: '';
  top: 59%;
  left: 50%;
  transform: translate(-50%, -59%);
  transition: 0.3s;
}

/* .hamburger-toggle.toggled span.outer-lines::after,
.hamburger-toggle.toggled span.outer-lines::before {
  @apply bg-turquoise;
} */

.hamburger-toggle span.outer-lines::after {
  top: 45%;
}
</style>

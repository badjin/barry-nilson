<template>
  <li class="accordion__item">
    <div class="accordion__trigger" @click="open">
      <div class="flex items-center relative">
        <slot name="accordion-trigger"></slot>
        <div
          :class="active && 'is-active'"
          class="leading-none float-right pointer-events-none accordion-item-trigger-icon-wrapper"
        >
          <div class="accordion-item-trigger-icon">
            <span class="vert"></span>
            <span class="horiz"></span>
          </div>
        </div>
      </div>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div v-show="active">
        <slot name="accordion-content"></slot>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  inject: ['Accordion'],
  props: {
    isMultiOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      index: 0,
      expand: false,
    }
  },
  computed: {
    visible() {
      // return this.expanded
      // if (this.isMenu) return this.expanded
      return this.isMultiOption
        ? this.Accordion.multiActive[this.index]
        : this.index === this.Accordion.active
    },
    active() {
      return this.isMultiOption
        ? this.expand
        : this.index === this.Accordion.active
    },
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.Accordion.active = null
      },
    },
  },
  created() {
    this.index = this.Accordion.count++
    this.Accordion.multiActive[this.index] = false
  },
  methods: {
    open() {
      this.Accordion.multiActive[this.index] =
        !this.Accordion.multiActive[this.index]
      this.expand = this.Accordion.multiActive[this.index]
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
      this.$emit('input', this.Accordion.active !== null ? this.index : -1)
    },
    start(el) {
      if (!el) return
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    },
  },
}
</script>

<style scoped lang="scss">
.accordion__item {
  @apply relative;
}

.accordion__trigger {
  @apply cursor-pointer block;

  &:hover .accordion-item-trigger-icon-wrapper {
    @apply bg-white bg-opacity-10;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.accordion--padding {
  @apply py-3;
}

.accordion-item-trigger-icon-wrapper {
  @apply w-9 h-9 bg-transparent transition-colors duration-300 flex rounded-full items-center
  justify-center;
}
.accordion-item-trigger-icon {
  display: block;
  right: 1.25rem;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #00b48d;
  border-bottom: 2px solid #00b48d;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.2s ease;

  .is-active & {
    transform: translateY(2px) rotate(225deg);
  }
}
</style>

<template>
  <li class="accordion__item">
    <div class="accordion__trigger" @click="open">
      <div class="accordion--padding flex justify-between items-center">
        <slot name="accordion-trigger"></slot>
        <div
          class="leading-none float-right pointer-events-none"
          :class="active && 'is-active'"
        >
          <div class="accordion-item-trigger-icon"></div>
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
      <div v-show="active" class="accordion__content">
        <ul>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot name="accordion-content"></slot>
        </ul>
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
    close: {
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
    close(value) {
      if (value) this.Accordion.active = null
    },
  },
  created() {
    this.index = this.Accordion.count++
    this.Accordion.multiActive[this.index] = false
  },
  methods: {
    open() {
      this.$emit('open')
      this.Accordion.multiActive[this.index] =
        !this.Accordion.multiActive[this.index]
      this.expand = this.Accordion.multiActive[this.index]
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
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
  @apply cursor-pointer relative;
}

.accordion__trigger {
  @apply block;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.4s ease, opacity 0.4s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.accordion--padding {
  @apply pb-4;
}

.accordion-item-trigger-icon {
  display: block;
  right: 1.25rem;
  margin: auto;
  width: 10px;
  height: 10px;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(calc(10px / 4)) rotate(45deg);
  transition: transform 0.2s ease;

  .is-active & {
    transform: translateY(calc(10px / 4)) rotate(225deg);
  }
}
</style>

<template>
  <li class="accordion__item">
    <div class="accordion__trigger" @click="open">
      <div
        class="flex justify-between items-center accordion--padding relative"
      >
        <slot name="accordion-trigger"></slot>
        <div
          :class="active && 'is-active'"
          class="leading-none float-right pointer-events-none"
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

  // &:hover .accordion-item-trigger-icon {
  //   @apply bg-steelblue;
  // }
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
  @apply py-5;
}

.accordion-item-trigger-icon {
  @apply absolute w-6 h-6 bg-transparent transition-colors duration-300 flex rounded-full items-center
  justify-center top-0;

  right: 0;
  top: 1.1rem;
  margin: auto;

  span {
    @apply bg-primary w-4 block transform transition-all absolute duration-500;

    height: 2px;
  }
  .vert {
    transform: rotate(-90deg);
  }

  .is-active & .vert {
    transform: rotate(0deg);
  }

  .is-active & .horiz {
    transform: rotate(180deg);
  }
}

@screen md {
  .accordion-item-trigger-icon {
    @apply w-6 h-6;

    top: 1.2rem;

    span {
      @apply w-4;
    }
  }
}

@screen xl {
  .accordion-item-trigger-icon {
    top: 1.2rem;
  }
}
</style>

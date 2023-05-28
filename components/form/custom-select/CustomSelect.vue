<template>
  <div class="flex flex-col item-center justify-center w-full">
    <FormLabel v-show="value && !errorTag" :no-effect="true">
      {{ label }}
    </FormLabel>
    <FormCustomSelectWrap
      :class="errorTag ? 'border-form' : 'border-steelblue'"
    >
      <FormCustomSelectItem :close="close" @open="close = false">
        <template slot="accordion-trigger">
          <div class="text-steelblue" :class="!optionItem && 'opacity-50'">
            {{
              optionItem
                ? `${optionPrefix} ${optionPrefix && '-'} ${optionItem}`
                : `${label} *`
            }}
          </div>
        </template>
        <template slot="accordion-content">
          <div class="px-6 pb-6">
            <div v-for="item in options" :key="item.value">
              <label class="inline-flex items-center space-x-3 w-full">
                <input
                  v-model="optionItem"
                  :name="optionName"
                  :value="item.label"
                  type="radio"
                  class="tc-form-radio"
                  @change="refine(item.value)"
                />
                <div class="flex justify-between">
                  <span class="pr-2">{{ item.label }}</span>
                </div>
              </label>
            </div>
          </div>
        </template>
      </FormCustomSelectItem>
    </FormCustomSelectWrap>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    optionPrefix: {
      type: String,
      default: '',
    },
    optionName: {
      type: String,
      default: 'Option',
    },
    errorTag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentAccordion: -1,
      isActive: [],
      optionItem: '',
      close: false,
      value: '',
    }
  },
  methods: {
    toggle(index) {
      // if already selected, close the accordion-tabs
      if (index === this.currentAccordion) {
        this.currentAccordion = -1
        return
      }
      // otherwise open  it
      this.currentAccordion = index
    },
    beforeEnter(el) {
      el.style.height = '0'
    },
    enter(el) {
      if (!el) return
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave(el) {
      if (!el) return
      el.style.height = el.scrollHeight + 'px'
    },
    leave(el) {
      el.style.height = '0'
    },
    refine(value) {
      this.$emit('input', value)
      this.value = value
      this.close = true
    },
  },
}
</script>
<style scoped>
.tc-accordion {
  transition: 300ms ease-out;
}

.tc-accordion--content {
  transition: 300ms ease-out;
}

.tc-accordion--link--icon {
  transition: all 300ms ease-out;
}

.tc-form-radio {
  @apply appearance-none rounded-full h-4 w-4 border border-primary bg-white checked:bg-primary checked:border-primary;
  @apply focus:outline-none mt-1 align-top bg-no-repeat bg-center bg-contain float-left;
  @apply mr-2 cursor-pointer;
}
</style>

<template>
  <div
    class="w-full h-13 rounded-full duration-300 border-2 cursor-pointer tc-wys relative text-sm"
    :style="{
      backgroundColor: wrapper.bg,
      color: wrapper.text,
      borderColor: wrapper.text,
    }"
    :aria-checked="value.toString()"
    @click="toggle"
  >
    <div class="flex">
      <div class="w-1/2 h-13 rounded-full">
        <div
          class="flex h-full items-center justify-center leading-normal px-4"
        >
          <span class="-mt-1 font-display font-semibold text-center">{{
            sectionName.section1
          }}</span>
        </div>
      </div>
      <div class="w-1/2 h-13 rounded-full">
        <div
          class="flex h-full items-center justify-center leading-normal px-4"
        >
          <span class="-mt-1 font-display font-semibold text-center">{{
            sectionName.section2
          }}</span>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 w-1/2 h-12 rounded-full transform duration-300"
      :class="{ 'translate-x-full': value }"
      :style="{
        backgroundColor: wrapper.text,
        color: wrapper.bg,
      }"
    >
      <div class="flex h-full items-center justify-center leading-normal px-4">
        <span class="font-display font-semibold text-center">{{
          value ? sectionName.section2 : sectionName.section1
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    sectionName: {
      type: Object,
      default: () => {},
    },
    themeIndex: {
      type: String,
      default: '1',
    },
  },
  computed: {
    wrapper() {
      return this.themeIndex < 0
        ? { bg: 'transparent', text: 'white' }
        : this.getTheme(this.themeIndex)
    },
  },
  methods: {
    toggle() {
      this.$emit('click', this.value)
    },
  },
}
</script>

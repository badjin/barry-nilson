<template>
  <div>
    <ButtonToggle
      v-model="toggleValue"
      :section-name="sectionName"
      :theme-index="module.themes"
      class="w-full md:w-4/12 lg:w-3/12 xl:w-2/12 mb-10"
      @click="
        (toggle) => {
          switchToggle(toggle)
        }
      "
    />

    <div class="tc-sub-heading w-full lg:w-6/12 mb-16">
      {{ heading }}
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div v-for="(cta, index) in section" :key="index">
        <CraftLink :link="cta">
          <ButtonShapeLg>{{ cta.customText || cta.text }}</ButtonShapeLg>
        </CraftLink>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toggleValue: false,
    }
  },
  computed: {
    expertise() {
      return get(this.module, 'expertiseGrid[0]') || {}
    },
    sectionHeadings() {
      return get(this.expertise, 'sectionHeading[0]') || {}
    },
    sectionName() {
      return get(this.expertise, 'sectionName[0]') || {}
    },
    section1() {
      return get(this.module, 'section1') || []
    },
    section2() {
      return get(this.module, 'section2') || []
    },
    heading() {
      return this.toggleValue
        ? this.sectionHeadings.section2
        : this.sectionHeadings.section1
    },
    section() {
      return this.toggleValue
        ? this.section2.map((item) => item.cta)
        : this.section1.map((item) => item.cta)
    },
    wrapper() {
      return this.getTheme(this.module.themes)
    },
  },
  methods: {
    switchToggle(toggle) {
      this.toggleValue = !toggle
    },
  },
}
</script>

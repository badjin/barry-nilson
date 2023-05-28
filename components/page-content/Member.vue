<template>
  <div class="tc-container py-c">
    <div class="flex flex-col lg:flex-row -mx-10">
      <div class="w-full lg:w-6/12 px-10 tc-wys separator">
        <div class="w-full separator-b" v-html="module.mainContent"></div>
      </div>
      <div
        class="w-full lg:w-6/12 px-10 flex flex-col space-y-5 lg:space-y-10 mt-10 lg:mt-0"
      >
        <div v-for="skill in module.skills" :key="skill.id">
          <span class="tc-caps-title text-primary">
            {{ skill.heading }}
          </span>
          <div class="mt-5 lg:mt-6 tc-wys" v-html="skill.description"></div>
        </div>
        <div>
          <div class="tc-caps-title text-primary mb-5 lg:mb-6">Expertise</div>
          <div v-for="(item, index) in filteredExpertise" :key="index">
            <nuxt-link
              :to="`/our-team/?team%5BrefinementList%5D%5B${filter}%5D%5B0%5D=${encodeURIComponent(
                item
              )}`"
            >
              <div class="flex space-x-3 items-center pb-1">
                <div class="order-mark"></div>
                <div class="tc-menu-link">{{ item }}</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { get } from 'lodash-es'
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    service() {
      return this.module.expertise
        .filter((e) => e.level === 1)
        .map((e) => e.title)
    },
    expertise() {
      return this.module.expertise
        .filter((e) => e.level === 2)
        .map((e) => e.title)
    },
    filteredExpertise() {
      return this.expertise?.length ? this.expertise : this.service
    },
    filter() {
      return this.expertise?.length ? 'expertise' : 'service'
    },
  },
}
</script>
<style scoped>
.separator-b-meta {
  @apply border-b border-steelblue border-opacity-30;
}
.separator-b {
  @apply border-b border-steelblue border-opacity-30;
}
.separator {
  @apply border-b-0 border-steelblue border-opacity-30;
}

@screen lg {
  .separator {
    @apply border-b-0 border-r border-steelblue border-opacity-30;
  }
  .separator-b {
    @apply border-b-0 border-steelblue border-opacity-30;
  }
}

.order-mark {
  @apply border-r-2 border-t-2 border-primary rotate-45;

  width: 8px;
  height: 8px;
  margin-left: -1px;
}
</style>

<template>
  <div :class="cardType !== 'Custom' && 'pt-c'">
    <div class="hidden lg:flex flex-col">
      <div v-for="n in sectionItems3.length" :key="n">
        <div class="-mx-10 flex flex-wrap">
          <CardGridChannelItem
            v-for="(item, index) in sectionItems3[n - 1]"
            :key="index"
            :card="item"
            class="px-10 w-1/3"
            :class="{
              'border-r border-opacity-30':
                index < sectionItems3[n - 1].length - 1,
              'border-white': wrapper.text === 'white',
              'border-steelblue': wrapper.text !== 'white',
            }"
          />
        </div>
        <div v-if="n < sectionItems3.length" class="py-c">
          <div
            :class="{
              'border-b border-opacity-30': n < sectionItems3.length,
              'border-white': wrapper.text === 'white',
              'border-steelblue': wrapper.text !== 'white',
            }"
          ></div>
        </div>
      </div>
    </div>
    <!-- <div class="hidden lg:hidden md:flex flex-col mt-4">
      <div
        v-for="n in sectionItems2.length"
        :key="n"
        class="py-10 -mx-6 flex flex-wrap"
        :class="{
          'border-b border-opacity-30': n < sectionItems2.length,
          'border-white': wrapper.text === 'white',
          'border-steelblue': wrapper.text !== 'white',
        }"
      >
        <CardGridChannelItem
          v-for="(item, index) in sectionItems2[n - 1]"
          :key="index"
          :card="item"
          class="px-6 w-1/2"
          :class="{
            'border-r border-opacity-30':
              index < sectionItems2[n - 1].length - 1,
            'border-white': wrapper.text === 'white',
            'border-steelblue': wrapper.text !== 'white',
          }"
        />
      </div>
    </div> -->
    <div class="lg:hidden flex flex-col mt-2">
      <CardGridChannelItem
        v-for="(item, index) in cards"
        :key="index"
        :card="item"
        class="py-8"
        :class="{
          'border-b border-opacity-30': index < cards.length - 1,
          'border-white': wrapper.text === 'white',
          'border-steelblue': wrapper.text !== 'white',
        }"
      />
    </div>
    <div
      v-if="cardType !== 'Custom'"
      class="flex justify-center w-full mt-5 lg:mt-10"
    >
      <nuxt-link to="/knowledge-hub">
        <ButtonPrimary :colour="wrapper.text">
          Back to Knowledge and Insights
        </ButtonPrimary>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import theme from '@/mixins/theme'
export default {
  mixins: [theme],
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    themeIndex: {
      type: String,
      default: '0',
    },
    cardType: {
      type: String,
      default: 'Custom',
    },
  },
  data() {
    return {
      sections: [],
    }
  },
  computed: {
    sectionItems3() {
      return this.listToMatrix(3)
    },
    sectionItems2() {
      return this.listToMatrix(2)
    },
    wrapper() {
      return this.getTheme(this.themeIndex)
    },
  },
  methods: {
    listToMatrix(elementsPerSubArray) {
      return this.cards.reduce(
        (rows, key, index) =>
          (index % elementsPerSubArray === 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows,
        []
      )
    },
  },
}
</script>

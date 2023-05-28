<template>
  <div class="py-c">
    <div class="hidden lg:flex flex-col">
      <div v-for="n in sectionItems3.length" :key="n">
        <div class="-mx-10 flex flex-wrap">
          <CardGridLocationItem
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
    <div class="lg:hidden flex flex-col mt-2">
      <CardGridLocationItem
        v-for="(item, index) in cards"
        :key="index"
        :card="item"
        class="py-5"
        :class="{
          'border-b border-opacity-30': index < cards.length - 1,
          'border-white': wrapper.text === 'white',
          'border-steelblue': wrapper.text !== 'white',
        }"
      />
    </div>
  </div>
</template>
<script>
import { sortBy } from 'lodash-es'
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
    sortedCards() {
      return sortBy(this.cards, 'locationIndex')
    },
  },
  methods: {
    listToMatrix(elementsPerSubArray) {
      return this.sortedCards.reduce(
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

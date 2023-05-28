<template>
  <div v-show="pageIndex === activePage">
    <div class="p-4 sm:p-6 pb-0 sm:pb-0">
      <div v-if="form.settings.displayCurrentPageTitle">
        <h3 class="text-lg leading-6 font-medium text-primary mb-6">
          {{ page.name }}
        </h3>
      </div>

      <div
        v-for="(row, rowIndex) in page.rows"
        :key="rowIndex"
        class="flex flex-wrap"
      >
        <formie-field
          v-for="(field, fieldIndex) in row.fields"
          :key="fieldIndex"
          :field="field"
        />
      </div>
    </div>

    <div class="px-4 sm:px-6 py-3">
      <div class="flex" :class="position">
        <ButtonPrimary
          v-if="page.settings.showBackButton"
          @click.prevent="onBack"
        >
          {{ page.settings.backButtonLabel }}
        </ButtonPrimary>
        <ButtonSubmit :loading="loading">
          {{ page.settings.submitButtonLabel }}
        </ButtonSubmit>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
    },

    page: {
      type: Object,
      default: () => {},
    },

    pageIndex: {
      type: Number,
      default: 0,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    activePage: {
      get() {
        return this.modelValue
      },

      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
    },

    position() {
      if (this.page.settings.buttonsPosition === 'left-right') {
        return 'justify-between'
      }

      if (this.page.settings.buttonsPosition === 'center') {
        return 'justify-center'
      }

      if (this.page.settings.buttonsPosition === 'right') {
        return 'justify-end'
      }

      return ''
    },
  },

  methods: {
    onBack() {
      this.activePage -= 1
    },
  },
}
</script>

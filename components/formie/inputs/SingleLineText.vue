<template>
  <div>
    <field-label :id="getId()" :field="field" position="above-input" />

    <field-instructions :field="field" position="above-input" />

    <input
      v-bind="attrs()"
      :maxlength="maxlength"
      type="text"
      class="mt-1 focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
      @keydown="wordCheck"
    />

    <field-instructions :field="field" position="below-input" />

    <field-label :id="getId()" :field="field" position="below-input" />
  </div>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
  mixins: [FieldMixin],

  computed: {
    maxlength() {
      if (this.field.limit && this.field.limitType === 'characters') {
        return this.field.limitAmount
      }

      return null
    },
  },

  methods: {
    wordCheck(e) {
      if (!this.field.limit || this.field.limitType !== 'words') {
        return
      }

      setTimeout(() => {
        const { value } = e.target
        const wordCount = value.split(/\S+/).length - 1
        const regex = new RegExp(
          `^\\s*\\S+(?:\\s+\\S+){0,${this.field.limitAmount - 1}}`
        )

        if (wordCount >= this.field.limitAmount) {
          e.target.value = value.match(regex)
        }
      }, 1)
    },
  },
}
</script>

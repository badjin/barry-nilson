<template>
  <div>
    <template v-if="field.useMultipleFields">
      <fieldset :aria-labelledby="getId()" class="-mb-5">
        <legend class="block text-sm font-medium text-dark-400 mb-1">
          {{ field.label }}
        </legend>

        <field-instructions :field="field" position="fieldset-start" />

        <div
          v-for="(fields, i) in getSubFields()"
          :key="i"
          class="flex flex-wrap -mx-2"
        >
          <div
            v-for="(subField, index) in fields"
            :key="index"
            class="flex-1 px-2 mb-5"
          >
            <field-label
              :id="getId([index])"
              :field="subField"
              position="above-input"
            />

            <div v-if="index === 'prefix'">
              <select
                :id="getId([index])"
                :name="getName([index])"
                :autocomplete="autocomplete[index]"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-300 focus:border-green-300 sm:text-sm rounded-sm"
              >
                <option
                  v-for="(option, j) in subField.options"
                  :key="j"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div v-else>
              <input
                v-bind="attrs(subField, [index])"
                :autocomplete="autocomplete[index]"
                type="text"
                class="mt-1 focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
              />
            </div>

            <field-label
              :id="getId([index])"
              :field="subField"
              position="below-input"
            />
          </div>
        </div>
      </fieldset>
    </template>

    <template v-else>
      <field-label :id="getId()" :field="field" position="above-input" />

      <field-instructions :field="field" position="fieldset-start" />

      <input
        v-bind="attrs()"
        type="text"
        class="mt-1 focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
      />

      <field-instructions :field="field" position="below-input" />

      <field-label :id="getId()" :field="field" position="fieldset-end" />
    </template>
  </div>
</template>

<script>
import FieldMixin from '~/mixins/FieldMixin'

export default {
  mixins: [FieldMixin],

  data() {
    return {
      subFields: [['prefix', 'firstName', 'middleName', 'lastName']],

      autocomplete: {
        prefix: 'honorific-prefix',
        firstName: 'given-name',
        middleName: 'additional-name',
        lastName: 'family-name',
      },
    }
  },
}
</script>

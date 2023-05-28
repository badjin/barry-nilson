<template>
  <fieldset :aria-labelledby="getId()" class="contents">
    <legend class="block text-sm font-medium text-dark-400 mb-1">
      {{ field.label }}
    </legend>

    <field-instructions :field="field" position="above-input" />

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-md"
          >
            <table ref="table" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-dark-200">
                <tr>
                  <th
                    v-for="(column, cIndex) in field.columns"
                    :key="cIndex"
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-dark-2000 uppercase tracking-wider"
                  >
                    {{ column.heading }}
                  </th>

                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(row, rIndex) in rows" :key="row.__id">
                  <td
                    v-for="(column, cIndex) in field.columns"
                    :key="cIndex"
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-500"
                  >
                    <div v-if="column.type === 'checkbox'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="hidden"
                        aria-checked="false"
                        aria-hidden="true"
                      />

                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="checkbox"
                        value="1"
                        class="focus:ring-green-300 h-4 w-4 text-green-400 border-gray-300 rounded"
                      />

                      <label :for="getId([rIndex, cIndex])">
                        &nbsp;<span class="sr-only">{{ column.heading }}</span>
                      </label>
                    </div>

                    <div v-else-if="column.type === 'color'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="color"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'date'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="date"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'select'">
                      <select
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-300 focus:border-green-300 sm:text-sm rounded-sm"
                      >
                        <option
                          v-for="(option, i) in column.options"
                          :key="i"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>

                    <div v-else-if="column.type === 'email'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="email"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'heading'"></div>

                    <div v-else-if="column.type === 'multiline'">
                      <textarea
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        class="max-w-lg block w-full focus:ring-green-300 focus:border-green-300 sm:text-sm border border-gray-300 rounded-sm"
                      ></textarea>
                    </div>

                    <div v-else-if="column.type === 'number'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="number"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'time'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="time"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'url'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="url"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>

                    <div v-else>
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="text"
                        value=""
                        class="focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-sm"
                      />
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="#"
                      class="text-green-400 hover:text-indigo-900"
                      @click.prevent="onDelete(rIndex)"
                      >Delete</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!field.static"
      type="button"
      class="bg-white py-2 px-4 mt-4 border border-gray-300 rounded-sm text-sm font-medium text-dark-400 hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
      @click.prevent="onAdd"
    >
      {{ field.addRowLabel }}
    </button>

    <field-instructions :field="field" position="below-input" />
  </fieldset>
</template>

<script>
import { uniqueId } from 'lodash-es'

import FieldMixin from '~/mixins/FieldMixin'

export default {
  mixins: [FieldMixin],

  data() {
    return {
      rows: [],
    }
  },

  methods: {
    onAdd() {
      this.rows.push({
        __id: uniqueId(),
      })
    },

    onDelete(rIndex) {
      this.rows.splice(rIndex, 1)
    },
  },
}
</script>

<template>
  <div class="w-full" :class="{ error: error }">
    <label class="tc-checkbox" :for="id">
      <div class="tc-checkbox__icon">
        <template v-if="value">
          <SvgCheckBoxTicked class="border border-white" />
        </template>
        <template v-else>
          <SvgCheckBox />
        </template>
      </div>

      <input
        v-bind="$attrs"
        :id="id"
        :value="value"
        type="checkbox"
        class="sr-only"
        :placeholder="label"
        @change="(event) => $emit('input', !value)"
      />
      {{ label }}
    </label>

    <FormErrorMessage class="block tc-error" v-bind="$props"></FormErrorMessage>
  </div>
</template>
<script>
import SvgCheckBox from '@/assets/svg/checkbox.svg?inline'
import SvgCheckBoxTicked from '@/assets/svg/checkbox-ticked.svg?inline'
import FormElementMixin from '@/components/form/FormElementMixin'
export default {
  components: {
    SvgCheckBox,
    SvgCheckBoxTicked,
  },
  mixins: [FormElementMixin],
}
</script>

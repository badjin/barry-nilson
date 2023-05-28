export default {
  methods: {
    emit(event) {
      this.$emit('input', event.target.value)
    },
  },
  props: {
    label: {
      type: String,
    },
    autocomplete: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Boolean],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: 'Error with this field',
    },
    id: {
      type: String,
      default: () => 'uuid' + Math.round(Math.random() * 10000),
    },
    placeholder: {
      type: String,
    },
  },
}

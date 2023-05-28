export default {
  data() {
    return {
      theme: [
        { bg: 'white', text: '#003E53', bg2: '#F2F5F6' },
        { bg: '#007264', text: 'white', bg2: '#0D796C' }, // Darkteal
        { bg: '#F2EBDF', text: '#003E53', bg2: '#F9F5EF' }, // Sand
        { bg: '#003E53', text: 'white', bg2: '#0D485C' }, // Stealblue
        { bg: '#F2F5F6', text: '#003E53', bg2: '#E5ECEE' }, // Grey
      ],
    }
  },

  methods: {
    getTheme(index) {
      return this.theme[Number(index)]
    },
  },
}

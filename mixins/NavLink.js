export default {
  methods: {
    navLink(item) {
      // if the element is an entry mimic what
      // a link field would return for an entry
      if (item.element && item.element.uri) {
        return {
          type: 'entry',
          url: item.url,
        }
      }
      // otherwise return a url type
      // that will be used in a anchor link
      return {
        type: 'url',
        url: item.url,
        target: item.uri.startsWith('assets') && '_blank',
      }
    },
  },
}

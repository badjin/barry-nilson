import { get, trimStart, drop } from 'lodash-es'
const placeholder = '/images/placeholder.png'

export const makeClass = (data = {}) => {
  if (data.__typename === 'homepage_homepage_Entry') return Homepage(data)
  if (data.__typename === 'campaigns_default_Entry') return Campaigns(data)
  if (data.__typename === 'pages_default_Entry') return Pages(data)
  if (data.__typename === 'staff_default_Entry') return Staff(data)

  return Entry(data)
}

export const hasLazyLoadingImage = (data) => ({
  ...data,

  get hasImage() {
    return get(data.image, '[0].src')
  },

  get $image() {
    let image = get(data.image, '[0].src')
    if (image && image.slice(image.length - 3, image.length) === 'gif') {
      image = get(data.image, '[0].orig')
    }
    return image || placeholder
  },

  get $lazyImage() {
    return {
      src: this.$image,
      loading: get(data.image, '[0].loading'),
      error: placeholder,
    }
  },
})

export const Entry = (data) => {
  return {
    ...data,
    ...hasLazyLoadingImage(data),

    type: 'entry',

    // if there are children, return the children
    // mapped with the factory
    get $children() {
      return this.children ? this.children.map(makeClass) : []
    },

    // same for parents
    get $parent() {
      return this.parent ? makeClass(this.parent) : null
    },

    get link() {
      return '/' + trimStart(this.uri, '/')
    },

    get $image() {
      return get(data.image, '[0].src') || placeholder
    },

    get $lazyImage() {
      return {
        src: this.$image,
        loading: get(data.image, '[0].loading'),
        error: placeholder,
      }
    },

    get $icon() {
      return get(data.icon, '[0].src') || placeholder
    },

    get $lazyIcon() {
      return {
        src: this.$icon,
        loading: get(data.icon, '[0].loading'),
        error: placeholder,
      }
    },

    get $author() {
      const firstName = get(data, 'author.firstName')
      const lastName = get(data, 'author.lastName')

      return `${firstName} ${lastName}`
    },

    get headerType() {
      return 'generic'
    },

    get parentLinks() {
      const parent = drop(this.link.split('/'))
      return ['home', ...parent]
    },
  }
}

export const Homepage = (data) => ({
  ...data,
  ...Entry(data),

  get headerType() {
    return 'homepage'
  },
})

export const Campaigns = (data) => ({
  ...data,
  ...Entry(data),

  get headerType() {
    return 'campaign'
  },
})

export const Pages = (data) => ({
  ...data,
  ...Entry(data),

  get headerType() {
    return 'Pages'
  },
})

export const Staff = (data) => ({
  ...data,
  ...Entry(data),

  get headerType() {
    return 'staff'
  },
})

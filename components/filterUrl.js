export default {
  methods: {
    filterUrl(name, facet = 'categories') {
      const service1 = 'Insurance & Health'

      if (!this.module.service)
        return `/knowledge-hub/?knowledgeHub%5BrefinementList%5D%5B${facet}%5D%5B0%5D=${this.refineWithName(
          name
        )}`

      return service1.includes(this.module.service)
        ? `/knowledge-hub?knowledgeHub%5BrefinementList%5D%5Bservices%5D%5B0%5D=${encodeURIComponent(
            service1
          )}&knowledgeHub%5BrefinementList%5D%5B${facet}%5D%5B0%5D=${this.refineWithName(
            name
          )}`
        : `/knowledge-hub?knowledgeHub%5BrefinementList%5D%5Bservices%5D%5B0%5D=Family%20Law&knowledgeHub%5BrefinementList%5D%5Bservices%5D%5B1%5D=Wills%20%26%20Estates&knowledgeHub%5BrefinementList%5D%5B${facet}%5D%5B0%5D=${this.refineWithName(
            name
          )}`
    },
    refineWithName(name) {
      const value = encodeURIComponent(name)
      return value
    },
  },
}

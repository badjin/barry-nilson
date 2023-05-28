import gql from 'graphql-tag'
import graphqlClient from '../graph-ql/client'

export default async function () {
  let error = true
  let attempts = 0
  let response
  while (error && attempts < 9) {
    try {
      response = await graphqlClient({ token: null }).query({
        query: gql`
          query {
            entries(
              section: [
                "pages"
                "locations"
                "articles"
                "news"
                "events"
                "podcasts"
                "team"
              ]
            ) {
              uri
              ... on pages_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on pages_expertise_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on pages_childPage_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on articles_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on events_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on podcasts_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on news_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on locations_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
              ... on team_default_Entry {
                id
                seoSettings {
                  ... on seoSettings_BlockType {
                    id
                    noIndex
                  }
                }
              }
            }
          }
        `,
      })
      error = false
    } catch (err) {
      console.error('Caught error fetching query', err)
    }
    attempts++
  }
  return response.data.entries
}

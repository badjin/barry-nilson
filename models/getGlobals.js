import gql from 'graphql-tag'
import graphqlClient from '../graph-ql/client'

export default async function () {
  const { data: globals } = await graphqlClient({ token: null }).query({
    query: gql`
      query GetGlobal {
        analytics: globalSet(handle: "analytics") {
          ... on analytics_GlobalSet {
            gtmId
          }
        }
        settings: globalSet(handle: "settings") {
          ... on settings_GlobalSet {
            settings {
              ... on settings_BlockType {
                icon {
                  url
                }
                siteUrl
              }
            }
          }
        }
        dnsPrefetch: globalSet(handle: "dnsPrefetch") {
          ... on dnsPrefetch_GlobalSet {
            dns {
              url
            }
          }
        }
        redirects: globalSet(handle: "redirects") {
          ... on redirects_GlobalSet {
            redirects {
              newPath
              oldPath
            }
          }
        }
      }
    `,
  })

  return globals
}

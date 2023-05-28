import { get, trimStart, trimEnd } from 'lodash-es'

export default function (item) {
  item = item || {}

  const defaultSeo = get(this, '$store.state.globals.seo.seoSettingsGlobal.0')
  const schema = get(this, '$store.state.globals.schema.schema.0')
  const settings = get(this, '$store.state.globals.settings.settings.0')
  const pageSeo = get(item, 'seo[0]', {})

  try {
    window.seo = { defaultSeo, schema, settings, pageSeo }
  } catch {}

  let title = item.title

  if (pageSeo.title) {
    title = pageSeo.title
  }

  if (title && pageSeo.appendTitle) {
    title += ' | ' + defaultSeo.siteTitle
  } else if (!title) {
    title = defaultSeo.siteTitle
  } else if (pageSeo.appendTitle === undefined) {
    title += ' | ' + defaultSeo.siteTitle
  }

  const description = pageSeo.description || ''

  const image =
    get(pageSeo, 'featuredImage[0].url') || get(defaultSeo, 'image[0].url')
  const twitterImage = get(pageSeo, 'twitterImage[0].url') || image
  const facebookImage = get(pageSeo, 'facebookImage[0].url') || image

  const icon = get(settings, 'icon[0].url')

  const canonicalLink =
    item.uri !== '__home__' ? item.uri || trimStart(item.link, '/') : ''
  const canonicalUri =
    get(pageSeo, 'canonicalUrl') || `${process.env.URL}/${canonicalLink}`
  const canonicalUrl = `${trimEnd(canonicalUri, '/')}/`

  const seoObj = {
    title,
    script: [],
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description.replace(/(<([^>]+)>)/gi, ''),
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: title,
      },
      {
        hid: `og:description`,
        property: 'og:description',
        content: description.replace(/(<([^>]+)>)/gi, ''),
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: facebookImage || twitterImage || image,
      },
      {
        hid: `og:url`,
        property: 'og:url',
        content: (process.env.URL || '') + this.$route.fullPath,
      },
      {
        hid: `og:type`,
        property: 'og:type',
        content: 'website',
      },
      {
        hid: `twitter:card`,
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: `twitter:title`,
        name: 'twitter:title',
        content: title,
      },
      {
        hid: `twitter:description`,
        name: 'twitter:description',
        content: description.replace(/(<([^>]+)>)/gi, ''),
      },
      {
        hid: `twitter:image`,
        name: 'twitter:image',
        property: 'twitter:image',
        content: twitterImage || facebookImage || image,
      },
      {
        hid: `twitter:site`,
        name: 'twitter:site',
        content: defaultSeo.twitterHandle,
      },
      {
        hid: `robots`,
        name: 'robots',
        content: pageSeo.noIndex
          ? 'noindex,follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href:
          canonicalUrl ||
          `${process.env.URL}/${item.uri !== '__home__' ? item.uri + '/' : ''}`,
      },
    ],
  }

  if (icon) {
    const sizes1 = [16, 96, 192, 256, 512]
    sizes1.forEach((size) => {
      seoObj.link.push({
        href: '/icons/favicon_' + size + '.ico',
        rel: 'icon',
        sizes: size + 'x' + size,
        type: 'image/x-icon',
      })
    })
    const sizes2 = [120, 152, 167, 180]
    sizes2.forEach((size) => {
      seoObj.link.push({
        href: '/icons/iosIcon_' + size + '.png',
        rel: 'apple-touch-icon',
        sizes: size + 'x' + size,
      })
    })
    const sizes3 = [96, 128, 192, 256]
    sizes3.forEach((size) => {
      seoObj.link.push({
        href: '/icons/androidIcon_' + size + '.png',
        rel: 'icon',
        sizes: size + 'x' + size,
      })
    })
  }

  const schemaObj = {
    type: 'application/ld+json',
    json: {
      '@context': 'http://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': process.env.URL + '/#organization',
          name: schema.organisationName,
          sameAs: (schema.organisationSocialProfiles || []).map((profile) => {
            return profile.url
          }),
          logo: {
            '@type': 'ImageObject',
            '@id': process.env.URL + '/#logo',
            inLanguage: 'en-AU',
            url: get(schema, 'organisationImage.0.url'),
            contentUrl: get(schema, 'organisationImage.0.url'),
            caption: schema.organisationName,
          },
          image: {
            '@id': process.env.URL + '/#logo',
          },
        },
        {
          '@type': 'WebSite',
          '@id': process.env.URL + '/#website',
          url: process.env.URL,
          name: schema.organisationName,
          description: schema.organisationDescription,
          publisher: {
            '@id': process.env.URL + '/#organization',
          },
          inLanguage: 'en-AU',
        },
      ],
    },
  }

  if (schema.searchActionUrlTemplate && schema.searchActionQueryInput) {
    schemaObj.json['@graph'][1].potentialAction = [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: schema.searchActionUrlTemplate,
        },
        'query-input': schema.searchActionQueryInput,
      },
    ]
  }

  seoObj.script.push(schemaObj)

  return seoObj
}

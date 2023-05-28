export default async function ({
  app,
  isServer,
  route,
  store,
  redirect,
  isDev,
}) {
  if (!store.state.globals.loaded) await store.dispatch('globals/index')
  // eslint-disable-next-line no-console
  if (route.query.token)
    await store.dispatch('globals/setToken', route.query.token)

  // const redirects = store.getters['globals/redirects']

  // const redirectsExist = redirects.find((e) => {
  //   return (
  //     e.oldPath === route.fullPath ||
  //     RegExp('^' + e.oldPath).test(route.fullPath)
  //   )
  // })

  // if (redirectsExist) {
  //   redirect(redirectsExist.newPath)
  // }
}

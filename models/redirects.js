import fs from 'fs'
import { get } from 'lodash-es'

export default function (globals) {
  // redirect generate
  fs.unlink('_redirects', function (err) {
    if (err && err.code === 'ENOENT') {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.")
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error('Error occurred while trying to remove file')
    } else {
      console.info(`removed`)
    }
  })

  const redirects = get(globals, 'redirects.redirects')
  if (redirects) {
    const redirectsExist = redirects.map((e) => {
      return `${e.oldPath} ${e.newPath}`
    })
    fs.writeFileSync('_redirects', redirectsExist.join('\n'))
  }

  fs.writeFileSync('_redirects', '\n/*   /200.html   404', {
    encoding: 'utf8',
    flag: 'a+',
  })
}

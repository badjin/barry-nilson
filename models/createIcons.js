import fs from 'fs'
import { get } from 'lodash-es'
import resize from './resize'

export default async function (globals) {
  // delete icons folder before recreating icons
  try {
    fs.rmSync('static/icons', { recursive: true })
  } catch (err) {
    console.error(err)
  }

  fs.mkdirSync('static/icons')

  const icon = get(globals, 'settings.settings.0.icon.0.url')

  if (icon) {
    console.log('Creating icons')
    await resize(icon, 'favicon', [16, 96, 192, 256, 512], true)
    await resize(icon, 'iosIcon', [120, 152, 167, 180])
    await resize(icon, 'androidIcon', [96, 128, 192, 256])
  }
}

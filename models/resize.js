#!/usr/bin/env node

import fs from 'fs'

const path = require('path')
const Jimp = require('jimp')
const pngToIco = require('png-to-ico')

export default async function (inputPath, filename, sizes = [], ico = false) {
  const image = await Jimp.read(inputPath).catch(function (err) {
    console.error(err)
  })
  // Check input image is square
  const existingWidth = image.bitmap.width
  const existingHeight = image.bitmap.height

  if (existingWidth !== existingHeight) {
    console.error('We can only process square images')
  }

  const inputFileDetails = path.parse(inputPath)

  for (const size of sizes) {
    const image = await Jimp.read(inputPath).catch(function (err) {
      console.error(err)
    })

    const outputPath =
      'static/icons/' + filename + '_' + size.toString() + inputFileDetails.ext

    await image.resize(size, size).quality(100).writeAsync(outputPath)

    if (ico) {
      const buf = await pngToIco([outputPath]).catch(console.error)

      const icoOutputPath =
        'static/icons/' + filename + '_' + size.toString() + '.ico'

      fs.writeFileSync(icoOutputPath, buf)
    }
  }
}

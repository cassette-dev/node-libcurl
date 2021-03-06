/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Example showing how one can receive cookies and store them in a file.
 */
const path = require('path')
const fs = require('fs')

const Curl = require('../lib/Curl')

const curl = new Curl()
const url = 'http://www.google.com'

const cookieJarFile = path.join(__dirname, 'cookiejar.txt')

curl.setOpt(Curl.option.URL, url)
curl.setOpt(Curl.option.VERBOSE, true)
curl.setOpt(Curl.option.FOLLOWLOCATION, true)
curl.setOpt(Curl.option.COOKIEFILE, cookieJarFile)
curl.setOpt(Curl.option.COOKIEJAR, cookieJarFile)

if (!fs.existsSync(cookieJarFile)) {
  fs.writeFileSync(cookieJarFile)
}

curl.perform()

curl.on('end', () => {
  curl.close()

  console.info('Cookie file contents:')
  console.info(fs.readFileSync(cookieJarFile).toString('utf8'))
})

curl.on('error', curl.close.bind(curl))

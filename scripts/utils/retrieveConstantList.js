const cheerio = require('cheerio')

const { curl } = require('../../dist')

const {
  convertCurlConstantToCamelCase,
} = require('./convertCurlConstantToCamelCase')

const retrieveConstantList = async ({ url, constantPrefix, blacklist }) => {
  const { data } = await curl.get(url, {
    SSL_VERIFYPEER: false,
  })

  const $ = cheerio.load(data)

  const constants = $('.nroffip')

  return constants
    .map((i, el) => {
      const $descriptionEl = $(el)
        .parent()
        .next()

      $descriptionEl.find('a').remove()

      const description = $descriptionEl
        .text()
        .trim()
        .replace(/See$/, '')
        .trim()

      const constantOriginal = $(el).text()
      const constantName = constantOriginal.replace(constantPrefix, '')

      const url = `https://curl.haxx.se/libcurl/c/${constantOriginal}.html`

      return {
        constantOriginal,
        constantName,
        constantNameCamelCase: convertCurlConstantToCamelCase(constantName),
        description,
        url,
      }
    })
    .get()
    .sort((a, b) => a.constantName.localeCompare(b.constantName))
    .filter(item => !blacklist.includes(item.constantName))
}

module.exports = {
  retrieveConstantList,
}

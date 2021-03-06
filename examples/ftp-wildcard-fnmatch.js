/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Example showing how to download files from a FTP server
 * using custom wildcard pattern matching
 * Based on the ftp-wildcard example
 */
const path = require('path')
const util = require('util')
const fs = require('fs')

const Curl = require('../lib/Curl')
const Easy = require('../lib/Easy')

// Using the Easy interface because currently there is an issue
//  when using libcurl with wildcard matching on the multi interface
//  https://github.com/curl/curl/issues/800
const handle = new Easy()
const url = 'ftp://speedtest.tele2.net/*.zip'

// object to be used to share data between callbacks
const data = {
  output: null,
}

handle.setOpt(Curl.option.URL, url)
handle.setOpt(Curl.option.VERBOSE, 1)
handle.setOpt(Curl.option.WILDCARDMATCH, true)
handle.setOpt(Curl.option.FNMATCH_FUNCTION, fnMatch)
handle.setOpt(Curl.option.CHUNK_BGN_FUNCTION, fileIsComing)
handle.setOpt(Curl.option.CHUNK_END_FUNCTION, filesIsDownloaded)

handle.setOpt(Curl.option.WRITEFUNCTION, (buff, nmemb, size) => {
  let written = 0

  if (data.output) {
    written = fs.writeSync(data.output, buff, 0, nmemb * size)
  } else {
    /* listing output */
    process.stdout.write(buff.toString())
    written = size * nmemb
  }

  return written
})

// Functions globStringToRegex and pregQuote from: http://stackoverflow.com/a/13818704/710693

function globStringToRegex(str) {
  return new RegExp(
    pregQuote(str)
      .replace(/\\\*/g, '.*')
      .replace(/\\\?/g, '.'),
    'g',
  )
}

function pregQuote(str, delimiter) {
  // http://kevin.vanzonneveld.net
  // +   original by: booeyOH
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: preg_quote("$40");
  // *     returns 1: '\$40'
  // *     example 2: preg_quote("*RRRING* Hello?");
  // *     returns 2: '\*RRRING\* Hello\?'
  // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
  // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
  return (str + '').replace(
    new RegExp(
      '[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]',
      'g',
    ),
    '\\$&',
  )
}

/**
 * Use our own logic to make the wildcard matching.
 *
 * Here we are just changing from the default libcurl logic
 *  to use one equivalent using javascript RegExp.
 *
 * @param {String} pattern
 * @param {String} string
 * @returns {number}
 */
function fnMatch(pattern, string) {
  const regex = new RegExp(globStringToRegex(pattern), 'g')

  return string.match(regex) ? Curl.fnmatchfunc.MATCH : Curl.fnmatchfunc.NOMATCH
}

/**
 * @param {module:node-libcurl~CurlFileInfo} fileInfo
 * @param {Number} remains Number of entries remaining
 * @returns {Number}
 */
function fileIsComing(fileInfo, remains) {
  process.stdout.write(
    util.format(
      'Remaining entries: %d / Current: %s / Size: %d - ',
      remains,
      fileInfo.fileName,
      fileInfo.size,
    ),
  )

  switch (fileInfo.fileType) {
    case Curl.filetype.DIRECTORY:
      console.log(' DIR')
      break
    case Curl.filetype.FILE:
      console.log(' FILE')
      break
    default:
      console.log(' OTHER')
      break
  }

  if (fileInfo.fileType === Curl.filetype.FILE) {
    /* do not transfer files > 1MB */
    if (fileInfo.size > 1024 * 1024) {
      console.log('SKIPPED')
      return Curl.chunk.BGN_FUNC_SKIP
    }

    data.output = fs.openSync(path.join(process.cwd(), fileInfo.fileName), 'w+')

    if (!data.output) {
      return Curl.chunk.BGN_FUNC_FAIL
    }
  } else {
    console.log('SKIPPED')
    return Curl.chunk.BGN_FUNC_SKIP
  }

  return Curl.chunk.BGN_FUNC_OK
}

function filesIsDownloaded() {
  if (data.output) {
    console.log('DOWNLOADED')
    fs.closeSync(data.output)
    data.output = null
  }

  return Curl.chunk.END_FUNC_OK
}

handle.perform()

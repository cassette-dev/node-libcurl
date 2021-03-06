/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'should'

import { app, host, port, server } from '../helper/server'
import { Curl } from '../../lib'

let curl: Curl

const url = `http://${host}:${port}/delayed`

describe('Callbacks', () => {
  beforeEach(() => {
    curl = new Curl()
  })

  afterEach(() => {
    curl.close()
  })

  before(done => {
    server.listen(port, host, done)

    app.get('/delayed', (_req, res) => {
      const delayBetweenSends = 10
      const data = [
        '<html>',
        '<body>',
        '<h1>Hello, World!</h1>',
        '</body>',
        '</html>',
      ]
      const send = () => {
        const item = data.shift()

        if (!item) {
          res.end()
          return
        }

        res.write(item)
        setTimeout(send, delayBetweenSends)
      }

      send()
    })
  })

  after(() => {
    server.close()
    app._router.stack.pop()
  })

  describe('progress', function() {
    this.timeout(10000)

    it('should work', done => {
      let wasCalled = false

      curl.setOpt('URL', url)
      curl.setOpt('NOPROGRESS', false)

      curl.setProgressCallback((dltotal, dlnow, ultotal, ulnow) => {
        wasCalled = true
        dltotal.should.be.a.Number()
        dlnow.should.be.a.Number()
        ultotal.should.be.a.Number()
        ulnow.should.be.a.Number()
        return 0
      })

      curl.on('end', () => {
        wasCalled.should.be.true
        done()
      })

      curl.on('error', done)

      curl.perform()
    })

    it('should not accept undefined return', done => {
      curl.setOpt('URL', url)
      curl.setOpt('NOPROGRESS', false)

      // @ts-ignore we want to test returning undefined here
      curl.setProgressCallback((_dltotal, dlnow, _ultotal, _ulnow) => {
        return dlnow >= 40 ? undefined : 0
      })

      curl.on('end', () => {
        done()
      })

      curl.on('error', error => {
        // eslint-disable-next-line no-undef
        error.should.be.a.instanceOf(TypeError)
        done()
      })

      curl.perform()
    })
  })
})

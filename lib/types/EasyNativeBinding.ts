/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Share } from '../Share'
import { CurlCode } from '../enum/CurlCode'
import {
  CurlOptionName,
  DataCallbackOptions,
  ProgressCallbackOptions,
  StringListOptions,
  SpecificOptions,
} from '../generated/CurlOption'
import { CurlInfoName } from '../generated/CurlInfo'

import { SocketStateEnum } from '../enum/SocketState'
import { CurlPause } from '../enum/CurlPause'

import { FileInfo, HttpPostField } from './'

export interface GetInfoReturn {
  data: number | string | null
  code: CurlCode
}

export declare class EasyNativeBinding {
  isInsideMultiHandle: boolean

  // START AUTOMATICALLY GENERATED CODE - DO NOT EDIT
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: DataCallbackOptions,
    value: ((data: Buffer, size: number, nmemb: number) => number) | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: ProgressCallbackOptions,
    value:
      | ((
          dltotal: number,
          dlnow: number,
          ultotal: number,
          ulnow: number,
        ) => number)
      | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(option: StringListOptions, value: string[] | null): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: 'CHUNK_BGN_FUNCTION',
    value: ((fileInfo: FileInfo, remains: number) => number) | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(option: 'CHUNK_END_FUNCTION', value: (() => number) | null): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: 'DEBUGFUNCTION',
    value: ((type: number, data: Buffer) => void) | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: 'FNMATCH_FUNCTION',
    value: ((pattern: string, value: string) => number) | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: 'SEEKFUNCTION',
    value: ((offset: number, origin: number) => number) | null,
  ): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(option: 'SHARE', value: Share | null): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(option: 'HTTPPOST', value: HttpPostField[] | null): CurlCode
  /**
   * Use `Curl.option` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_setopt()](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html)
   */
  setOpt(
    option: Exclude<CurlOptionName, SpecificOptions>,
    value: string | number | boolean | null,
  ): CurlCode
  // END AUTOMATICALLY GENERATED CODE - DO NOT EDIT
  /**
   * Use `Curl.info` for predefined constants.
   *
   * Official libcurl documentation: [curl_easy_getinfo()](http://curl.haxx.se/libcurl/c/curl_easy_getinfo.html)
   */
  getInfo(info: CurlInfoName): GetInfoReturn

  /**
   * Sends arbitrary data over the established connection.
   *
   * Official libcurl documentation: [curl_easy_send()](http://curl.haxx.se/libcurl/c/curl_easy_send.html)
   */
  send(data: Buffer): { code: CurlCode; bytesSent: number }

  /**
   * Receives data over the established connection, data will be written to the passed buffer
   *
   * Official libcurl documentation: [curl_easy_recv()](http://curl.haxx.se/libcurl/c/curl_easy_recv.html)
   */
  recv(storage: Buffer): { code: CurlCode; bytesReceived: number }

  /**
   * Performs the entire request in a blocking manner and returns when done.
   *
   * Official libcurl documentation: [curl_easy_perform()](http://curl.haxx.se/libcurl/c/curl_easy_perform.html)
   */
  perform(): CurlCode

  /**
   * Using this function, you can explicitly mark a running connection
   * to get paused, and you can unpause a connection that was previously paused.
   *
   * Use `Curl.pause` for predefined constants
   *
   * Official libcurl documentation: [curl_easy_pause()]{@link http://curl.haxx.se/libcurl/c/curl_easy_pause.html}
   */
  pause(bitmask: CurlPause): CurlCode

  /**
   * Reset this handle to their original state.
   *
   * Official libcurl documentation: [curl_easy_reset()](http://curl.haxx.se/libcurl/c/curl_easy_reset.html)
   */
  reset(): CurlCode

  /**
   * Duplicate this handle with all their options
   *
   * Official libcurl documentation: [curl_easy_duphandle()](http://curl.haxx.se/libcurl/c/curl_easy_duphandle.html)
   */
  dupHandle(): EasyNativeBinding

  /**
   * The only time this method should be used is when one enables the internal polling of the connection socket used by
   *  this handle (by calling `Easy#monitorSocketEvents`)
   * The callback is going to be called everytime there is some change to the socket.
   * One use case for that is when using the `Easy.send` and `Easy.recv` methods
   *
   * Pass `null` to remove the current callback set
   */
  onSocketEvent(
    cb: ((error: Error | null, events: SocketStateEnum) => void) | null,
  ): this

  /**
   * Start monitoring for events in the connection socket used by this handle.
   */
  monitorSocketEvents(): this

  /**
   * Stop monitoring for events in the connection socket used by this handle.
   */
  unmonitorSocketEvents(): this

  /**
   * Close this handle and dispose any resources bound to it.
   * After closed, the handle **MUST** not be used again.
   *
   * This is basically the same than [curl_easy_cleanup()](http://curl.haxx.se/libcurl/c/curl_easy_cleanup.html)
   */
  close(): void
}

export declare interface EasyNativeBindingObject {
  new (): EasyNativeBinding

  /**
   * Returns a description for the given error code.
   *
   * Official libcurl documentation: [curl_easy_strerror()](http://curl.haxx.se/libcurl/c/curl_easy_strerror.html)
   */
  strError(errorCode: CurlCode): string
}

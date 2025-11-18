import { createFileRoute, lazyRouteComponent, createRootRouteWithContext, Outlet, HeadContent, Scripts, redirect, RouterProvider, createRouter as createRouter$1 } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { queryOptions, QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { isPlainObject, isRedirect, isNotFound, joinPaths, trimPath, processRouteTree, isResolvedRedirect, rootRouteId, getMatchedRoutes } from '@tanstack/router-core';
import { mergeHeaders, json } from '@tanstack/router-core/ssr/client';
import { AsyncLocalStorage } from 'node:async_hooks';
import { _ as _crypto, u as unseal, d as defaults$1, s as seal } from '../nitro/nitro.mjs';
import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import z$1, { z } from 'zod';
import * as Applicative from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Applicative';
import * as internal from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/internal';
import * as Chain from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Chain';
import * as Compactable from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Compactable';
import * as ChainRec from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/ChainRec';
import * as FromEither from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromEither';
import * as Functor from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Functor';
import * as Separated from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Separated';
import * as Witherable from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Witherable';
import * as EitherT from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/EitherT';
import * as Filterable from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Filterable';
import * as FromIO from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromIO';
import * as FromTask from '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromTask';
import { createMemoryHistory } from '@tanstack/history';
import { attachRouterServerSsrUtils } from '@tanstack/router-core/ssr/server';
import { defineHandlerCallback, renderRouterToStream } from '@tanstack/react-router/ssr/server';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function getResponseStatus$1(event) {
  return event.node.res.statusCode;
}
function getResponseHeaders$1(event) {
  return event.node.res.getHeaders();
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const getSessionPromise = Symbol("getSession");
const DEFAULT_NAME = "h3";
const DEFAULT_COOKIE = {
  path: "/",
  secure: true,
  httpOnly: true
};
async function useSession$1(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  await getSession$2(event, config);
  const sessionManager = {
    get id() {
      return event.context.sessions?.[sessionName]?.id;
    },
    get data() {
      return event.context.sessions?.[sessionName]?.data || {};
    },
    update: async (update) => {
      await updateSession(event, config, update);
      return sessionManager;
    },
    clear: () => {
      clearSession(event, config);
      return Promise.resolve(sessionManager);
    }
  };
  return sessionManager;
}
async function getSession$2(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (!event.context.sessions) {
    event.context.sessions = /* @__PURE__ */ Object.create(null);
  }
  const existingSession = event.context.sessions[sessionName];
  if (existingSession) {
    return existingSession[getSessionPromise] || existingSession;
  }
  const session = {
    id: "",
    createdAt: 0,
    data: /* @__PURE__ */ Object.create(null)
  };
  event.context.sessions[sessionName] = session;
  let sealedSession;
  if (config.sessionHeader !== false) {
    const headerName = typeof config.sessionHeader === "string" ? config.sessionHeader.toLowerCase() : `x-${sessionName.toLowerCase()}-session`;
    const headerValue = event.node.req.headers[headerName];
    if (typeof headerValue === "string") {
      sealedSession = headerValue;
    }
  }
  if (!sealedSession) {
    sealedSession = getCookie(event, sessionName);
  }
  if (sealedSession) {
    const promise = unsealSession(event, config, sealedSession).catch(() => {
    }).then((unsealed) => {
      Object.assign(session, unsealed);
      delete event.context.sessions[sessionName][getSessionPromise];
      return session;
    });
    event.context.sessions[sessionName][getSessionPromise] = promise;
    await promise;
  }
  if (!session.id) {
    session.id = config.generateId?.() ?? (config.crypto || _crypto).randomUUID();
    session.createdAt = Date.now();
    await updateSession(event, config);
  }
  return session;
}
async function updateSession(event, config, update) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession$2(event, config);
  if (typeof update === "function") {
    update = update(session.data);
  }
  if (update) {
    Object.assign(session.data, update);
  }
  if (config.cookie !== false) {
    const sealed = await sealSession(event, config);
    setCookie(event, sessionName, sealed, {
      ...DEFAULT_COOKIE,
      expires: config.maxAge ? new Date(session.createdAt + config.maxAge * 1e3) : void 0,
      ...config.cookie
    });
  }
  return session;
}
async function sealSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession$2(event, config);
  const sealed = await seal(config.crypto || _crypto, session, config.password, {
    ...defaults$1,
    ttl: config.maxAge ? config.maxAge * 1e3 : 0,
    ...config.seal
  });
  return sealed;
}
async function unsealSession(_event, config, sealed) {
  const unsealed = await unseal(
    config.crypto || _crypto,
    sealed,
    config.password,
    {
      ...defaults$1,
      ttl: config.maxAge ? config.maxAge * 1e3 : 0,
      ...config.seal
    }
  );
  if (config.maxAge) {
    const age = Date.now() - (unsealed.createdAt || Number.NEGATIVE_INFINITY);
    if (age > config.maxAge * 1e3) {
      throw new Error("Session expired!");
    }
  }
  return unsealed;
}
function clearSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (event.context.sessions?.[sessionName]) {
    delete event.context.sessions[sessionName];
  }
  setCookie(event, sessionName, "", {
    ...DEFAULT_COOKIE,
    ...config.cookie
  });
  return Promise.resolve();
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var _function = {};

(function (exports) {
	var __spreadArray = (_function && _function.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dual = exports.getEndomorphismMonoid = exports.SK = exports.hole = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.unsafeCoerce = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
	exports.identity = identity;
	exports.constant = constant;
	exports.flip = flip;
	exports.flow = flow;
	exports.tuple = tuple;
	exports.increment = increment;
	exports.decrement = decrement;
	exports.absurd = absurd;
	exports.tupled = tupled;
	exports.untupled = untupled;
	exports.pipe = pipe;
	exports.not = not;
	// -------------------------------------------------------------------------------------
	// instances
	// -------------------------------------------------------------------------------------
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getBooleanAlgebra = function (B) {
	    return function () { return ({
	        meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
	        join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
	        zero: function () { return B.zero; },
	        one: function () { return B.one; },
	        implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
	        not: function (x) { return function (a) { return B.not(x(a)); }; }
	    }); };
	};
	exports.getBooleanAlgebra = getBooleanAlgebra;
	/**
	 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
	 *
	 * @example
	 * import { Predicate, getSemigroup } from 'fp-ts/function'
	 * import * as B from 'fp-ts/boolean'
	 *
	 * const f: Predicate<number> = (n) => n <= 2
	 * const g: Predicate<number> = (n) => n >= 0
	 *
	 * const S1 = getSemigroup(B.SemigroupAll)<number>()
	 *
	 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
	 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
	 *
	 * const S2 = getSemigroup(B.SemigroupAny)<number>()
	 *
	 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
	 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemigroup = function (S) {
	    return function () { return ({
	        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
	    }); };
	};
	exports.getSemigroup = getSemigroup;
	/**
	 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
	 *
	 * @example
	 * import { Predicate } from 'fp-ts/Predicate'
	 * import { getMonoid } from 'fp-ts/function'
	 * import * as B from 'fp-ts/boolean'
	 *
	 * const f: Predicate<number> = (n) => n <= 2
	 * const g: Predicate<number> = (n) => n >= 0
	 *
	 * const M1 = getMonoid(B.MonoidAll)<number>()
	 *
	 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
	 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
	 *
	 * const M2 = getMonoid(B.MonoidAny)<number>()
	 *
	 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
	 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var getMonoid = function (M) {
	    var getSemigroupM = (0, exports.getSemigroup)(M);
	    return function () { return ({
	        concat: getSemigroupM().concat,
	        empty: function () { return M.empty; }
	    }); };
	};
	exports.getMonoid = getMonoid;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemiring = function (S) { return ({
	    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
	    zero: function () { return S.zero; },
	    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
	    one: function () { return S.one; }
	}); };
	exports.getSemiring = getSemiring;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getRing = function (R) {
	    var S = (0, exports.getSemiring)(R);
	    return {
	        add: S.add,
	        mul: S.mul,
	        one: S.one,
	        zero: S.zero,
	        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
	    };
	};
	exports.getRing = getRing;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.11.0
	 */
	var apply = function (a) {
	    return function (f) {
	        return f(a);
	    };
	};
	exports.apply = apply;
	/**
	 * @since 2.0.0
	 */
	function identity(a) {
	    return a;
	}
	/**
	 * @since 2.0.0
	 */
	exports.unsafeCoerce = identity;
	/**
	 * @since 2.0.0
	 */
	function constant(a) {
	    return function () { return a; };
	}
	/**
	 * A thunk that returns always `true`.
	 *
	 * @since 2.0.0
	 */
	exports.constTrue = constant(true);
	/**
	 * A thunk that returns always `false`.
	 *
	 * @since 2.0.0
	 */
	exports.constFalse = constant(false);
	/**
	 * A thunk that returns always `null`.
	 *
	 * @since 2.0.0
	 */
	exports.constNull = constant(null);
	/**
	 * A thunk that returns always `undefined`.
	 *
	 * @since 2.0.0
	 */
	exports.constUndefined = constant(undefined);
	/**
	 * A thunk that returns always `void`.
	 *
	 * @since 2.0.0
	 */
	exports.constVoid = exports.constUndefined;
	function flip(f) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length > 1) {
	            return f(args[1], args[0]);
	        }
	        return function (a) { return f(a)(args[0]); };
	    };
	}
	function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
	    switch (arguments.length) {
	        case 1:
	            return ab;
	        case 2:
	            return function () {
	                return bc(ab.apply(this, arguments));
	            };
	        case 3:
	            return function () {
	                return cd(bc(ab.apply(this, arguments)));
	            };
	        case 4:
	            return function () {
	                return de(cd(bc(ab.apply(this, arguments))));
	            };
	        case 5:
	            return function () {
	                return ef(de(cd(bc(ab.apply(this, arguments)))));
	            };
	        case 6:
	            return function () {
	                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
	            };
	        case 7:
	            return function () {
	                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
	            };
	        case 8:
	            return function () {
	                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
	            };
	        case 9:
	            return function () {
	                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
	            };
	    }
	    return;
	}
	/**
	 * @since 2.0.0
	 */
	function tuple() {
	    var t = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        t[_i] = arguments[_i];
	    }
	    return t;
	}
	/**
	 * @since 2.0.0
	 */
	function increment(n) {
	    return n + 1;
	}
	/**
	 * @since 2.0.0
	 */
	function decrement(n) {
	    return n - 1;
	}
	/**
	 * @since 2.0.0
	 */
	function absurd(_) {
	    throw new Error('Called `absurd` function which should be uncallable');
	}
	/**
	 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
	 *
	 * @example
	 * import { tupled } from 'fp-ts/function'
	 *
	 * const add = tupled((x: number, y: number): number => x + y)
	 *
	 * assert.strictEqual(add([1, 2]), 3)
	 *
	 * @since 2.4.0
	 */
	function tupled(f) {
	    return function (a) { return f.apply(void 0, a); };
	}
	/**
	 * Inverse function of `tupled`
	 *
	 * @since 2.4.0
	 */
	function untupled(f) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return f(a);
	    };
	}
	function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
	    switch (arguments.length) {
	        case 1:
	            return a;
	        case 2:
	            return ab(a);
	        case 3:
	            return bc(ab(a));
	        case 4:
	            return cd(bc(ab(a)));
	        case 5:
	            return de(cd(bc(ab(a))));
	        case 6:
	            return ef(de(cd(bc(ab(a)))));
	        case 7:
	            return fg(ef(de(cd(bc(ab(a))))));
	        case 8:
	            return gh(fg(ef(de(cd(bc(ab(a)))))));
	        case 9:
	            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
	        default: {
	            var ret = arguments[0];
	            for (var i = 1; i < arguments.length; i++) {
	                ret = arguments[i](ret);
	            }
	            return ret;
	        }
	    }
	}
	/**
	 * Type hole simulation
	 *
	 * @since 2.7.0
	 */
	exports.hole = absurd;
	/**
	 * @since 2.11.0
	 */
	var SK = function (_, b) { return b; };
	exports.SK = SK;
	/**
	 * Use `Predicate` module instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function not(predicate) {
	    return function (a) { return !predicate(a); };
	}
	/**
	 * Use `Endomorphism` module instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	var getEndomorphismMonoid = function () { return ({
	    concat: function (first, second) { return flow(first, second); },
	    empty: identity
	}); };
	exports.getEndomorphismMonoid = getEndomorphismMonoid;
	/** @internal */
	var dual = function (arity, body) {
	    var isDataFirst = typeof arity === 'number' ? function (args) { return args.length >= arity; } : arity;
	    return function () {
	        var args = Array.from(arguments);
	        if (isDataFirst(arguments)) {
	            return body.apply(this, args);
	        }
	        return function (self) { return body.apply(void 0, __spreadArray([self], args, false)); };
	    };
	};
	exports.dual = dual; 
} (_function));

var TaskEither = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Applicative);

var Apply = {};

const require$$12 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(internal);

var __createBinding = (Apply && Apply.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (Apply && Apply.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (Apply && Apply.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(Apply, "__esModule", { value: true });
Apply.ap = ap;
Apply.apFirst = apFirst;
Apply.apSecond = apSecond;
Apply.apS = apS;
Apply.getApplySemigroup = getApplySemigroup;
Apply.sequenceT = sequenceT;
Apply.sequenceS = sequenceS;
/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
 * const fa: O.Option<string> = O.some('s')
 * const fb: O.Option<number> = O.some(1)
 * const fc: O.Option<boolean> = O.some(true)
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     // lift a function
 *     O.some(f),
 *     // apply the first argument
 *     O.ap(fa),
 *     // apply the second argument
 *     O.ap(fb),
 *     // apply the third argument
 *     O.ap(fc)
 *   ),
 *   O.some('s1true')
 * )
 *
 * @since 2.0.0
 */
var function_1 = _function;
var _ = __importStar(require$$12);
function ap(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
function apSecond(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
function apS(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!_.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}

const require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Chain);

const require$$3$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Compactable);

var Either = {};

const require$$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(ChainRec);

const require$$7 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(FromEither);

const require$$11 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Functor);

const require$$8$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Separated);

const require$$9$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Witherable);

(function (exports) {
	var __createBinding = (Either && Either.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (Either && Either.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Either && Either.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.asUnit = exports.as = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.flatMap = exports.right = exports.left = void 0;
	exports.either = exports.stringifyJSON = exports.chainFirstW = exports.chainFirst = exports.chain = exports.chainW = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.exists = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.tap = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = exports.fold = void 0;
	exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = void 0;
	exports.toError = toError;
	exports.elem = elem;
	exports.parseJSON = parseJSON;
	exports.getValidation = getValidation;
	var Applicative_1 = require$$0;
	var Apply_1 = Apply;
	var chainable = __importStar(require$$2);
	var ChainRec_1 = require$$3;
	var FromEither_1 = require$$7;
	var function_1 = _function;
	var Functor_1 = require$$11;
	var _ = __importStar(require$$12);
	var Separated_1 = require$$8$1;
	var Witherable_1 = require$$9$1;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
	 * structure.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.left = _.left;
	/**
	 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
	 * of this structure.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.right = _.right;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) { return ((0, exports.isLeft)(ma) ? ma : f(ma.right)); });
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) { return function (fa, f) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return (0, function_1.pipe)(fa, foldMapM(f));
	}; };
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	var _bimap = function (fa, f, g) { return (0, function_1.pipe)(fa, (0, exports.bimap)(f, g)); };
	var _mapLeft = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f)); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	var _chainRec = function (a, f) {
	    return (0, ChainRec_1.tailRec)(f(a), function (e) {
	        return (0, exports.isLeft)(e) ? (0, exports.right)((0, exports.left)(e.left)) : (0, exports.isLeft)(e.right) ? (0, exports.left)(f(e.right.left)) : (0, exports.right)((0, exports.right)(e.right.right));
	    });
	};
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Either';
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	var getShow = function (SE, SA) { return ({
	    show: function (ma) { return ((0, exports.isLeft)(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")")); }
	}); };
	exports.getShow = getShow;
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	var getEq = function (EL, EA) { return ({
	    equals: function (x, y) {
	        return x === y || ((0, exports.isLeft)(x) ? (0, exports.isLeft)(y) && EL.equals(x.left, y.left) : (0, exports.isRight)(y) && EA.equals(x.right, y.right));
	    }
	}); };
	exports.getEq = getEq;
	/**
	 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
	 * concatenated using the provided `Semigroup`
	 *
	 * @example
	 * import { getSemigroup, left, right } from 'fp-ts/Either'
	 * import { SemigroupSum } from 'fp-ts/number'
	 *
	 * const S = getSemigroup<string, number>(SemigroupSum)
	 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
	 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
	 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
	 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getSemigroup = function (S) { return ({
	    concat: function (x, y) { return ((0, exports.isLeft)(y) ? x : (0, exports.isLeft)(x) ? y : (0, exports.right)(S.concat(x.right, y.right))); }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
	 *
	 * @category filtering
	 * @since 2.10.0
	 */
	var getCompactable = function (M) {
	    var empty = (0, exports.left)(M.empty);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        compact: function (ma) { return ((0, exports.isLeft)(ma) ? ma : ma.right._tag === 'None' ? empty : (0, exports.right)(ma.right.value)); },
	        separate: function (ma) {
	            return (0, exports.isLeft)(ma)
	                ? (0, Separated_1.separated)(ma, ma)
	                : (0, exports.isLeft)(ma.right)
	                    ? (0, Separated_1.separated)((0, exports.right)(ma.right.left), empty)
	                    : (0, Separated_1.separated)(empty, (0, exports.right)(ma.right.right));
	        }
	    };
	};
	exports.getCompactable = getCompactable;
	/**
	 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
	 *
	 * @category filtering
	 * @since 2.10.0
	 */
	var getFilterable = function (M) {
	    var empty = (0, exports.left)(M.empty);
	    var _a = (0, exports.getCompactable)(M), compact = _a.compact, separate = _a.separate;
	    var filter = function (ma, predicate) {
	        return (0, exports.isLeft)(ma) ? ma : predicate(ma.right) ? ma : empty;
	    };
	    var partition = function (ma, p) {
	        return (0, exports.isLeft)(ma)
	            ? (0, Separated_1.separated)(ma, ma)
	            : p(ma.right)
	                ? (0, Separated_1.separated)(empty, (0, exports.right)(ma.right))
	                : (0, Separated_1.separated)((0, exports.right)(ma.right), empty);
	    };
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: compact,
	        separate: separate,
	        filter: filter,
	        filterMap: function (ma, f) {
	            if ((0, exports.isLeft)(ma)) {
	                return ma;
	            }
	            var ob = f(ma.right);
	            return ob._tag === 'None' ? empty : (0, exports.right)(ob.value);
	        },
	        partition: partition,
	        partitionMap: function (ma, f) {
	            if ((0, exports.isLeft)(ma)) {
	                return (0, Separated_1.separated)(ma, ma);
	            }
	            var e = f(ma.right);
	            return (0, exports.isLeft)(e) ? (0, Separated_1.separated)((0, exports.right)(e.left), empty) : (0, Separated_1.separated)(empty, (0, exports.right)(e.right));
	        }
	    };
	};
	exports.getFilterable = getFilterable;
	/**
	 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var getWitherable = function (M) {
	    var F_ = (0, exports.getFilterable)(M);
	    var C = (0, exports.getCompactable)(M);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: F_.compact,
	        separate: F_.separate,
	        filter: F_.filter,
	        filterMap: F_.filterMap,
	        partition: F_.partition,
	        partitionMap: F_.partitionMap,
	        traverse: _traverse,
	        sequence: exports.sequence,
	        reduce: _reduce,
	        foldMap: _foldMap,
	        reduceRight: _reduceRight,
	        wither: (0, Witherable_1.witherDefault)(exports.Traversable, C),
	        wilt: (0, Witherable_1.wiltDefault)(exports.Traversable, C)
	    };
	};
	exports.getWitherable = getWitherable;
	/**
	 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as A from 'fp-ts/Apply'
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 *
	 * const parseString = (u: unknown): E.Either<string, string> =>
	 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
	 *
	 * const parseNumber = (u: unknown): E.Either<string, number> =>
	 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age: number
	 * }
	 *
	 * const parsePerson = (
	 *   input: Record<string, unknown>
	 * ): E.Either<string, Person> =>
	 *   pipe(
	 *     E.Do,
	 *     E.apS('name', parseString(input.name)),
	 *     E.apS('age', parseNumber(input.age))
	 *   )
	 *
	 * assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error
	 *
	 * const Applicative = E.getApplicativeValidation(
	 *   pipe(string.Semigroup, S.intercalate(', '))
	 * )
	 *
	 * const apS = A.apS(Applicative)
	 *
	 * const parsePersonAll = (
	 *   input: Record<string, unknown>
	 * ): E.Either<string, Person> =>
	 *   pipe(
	 *     E.Do,
	 *     apS('name', parseString(input.name)),
	 *     apS('age', parseNumber(input.age))
	 *   )
	 *
	 * assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	var getApplicativeValidation = function (SE) { return ({
	    URI: exports.URI,
	    _E: undefined,
	    map: _map,
	    ap: function (fab, fa) {
	        return (0, exports.isLeft)(fab)
	            ? (0, exports.isLeft)(fa)
	                ? (0, exports.left)(SE.concat(fab.left, fa.left))
	                : fab
	            : (0, exports.isLeft)(fa)
	                ? fa
	                : (0, exports.right)(fab.right(fa.right));
	    },
	    of: exports.of
	}); };
	exports.getApplicativeValidation = getApplicativeValidation;
	/**
	 * The default [`Alt`](#alt) instance returns the last error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 *
	 * const parseString = (u: unknown): E.Either<string, string> =>
	 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
	 *
	 * const parseNumber = (u: unknown): E.Either<string, number> =>
	 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
	 *
	 * const parse = (u: unknown): E.Either<string, string | number> =>
	 *   pipe(
	 *     parseString(u),
	 *     E.alt<string, string | number>(() => parseNumber(u))
	 *   )
	 *
	 * assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error
	 *
	 * const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))
	 *
	 * const parseAll = (u: unknown): E.Either<string, string | number> =>
	 *   Alt.alt<string | number>(parseString(u), () => parseNumber(u))
	 *
	 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	var getAltValidation = function (SE) { return ({
	    URI: exports.URI,
	    _E: undefined,
	    map: _map,
	    alt: function (me, that) {
	        if ((0, exports.isRight)(me)) {
	            return me;
	        }
	        var ea = that();
	        return (0, exports.isLeft)(ea) ? (0, exports.left)(SE.concat(me.left, ea.left)) : ea;
	    }
	}); };
	exports.getAltValidation = getAltValidation;
	/**
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? fa : (0, exports.right)(f(fa.right));
	}; };
	exports.map = map;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the `Right` value of this `Either` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Right` value of this `Either` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category constructors
	 * @since 2.7.0
	 */
	exports.of = exports.right;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Less strict version of [`ap`](#ap).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.8.0
	 */
	var apW = function (fa) { return function (fab) {
	    return (0, exports.isLeft)(fab) ? fab : (0, exports.isLeft)(fa) ? fa : (0, exports.right)(fab.right(fa.right));
	}; };
	exports.apW = apW;
	/**
	 * @since 2.0.0
	 */
	exports.ap = exports.apW;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * Left-associative fold of a structure.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 *
	 * const startWith = 'prefix'
	 * const concat = (a: string, b: string) => `${a}:${b}`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.reduce(startWith, concat)),
	 *   'prefix:a'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.reduce(startWith, concat)),
	 *   'prefix'
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var reduce = function (b, f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? b : f(b, fa.right);
	}; };
	exports.reduce = reduce;
	/**
	 * Map each element of the structure to a monoid, and combine the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 * import * as S from 'fp-ts/string'
	 *
	 * const yell = (a: string) => `${a}!`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.foldMap(S.Monoid)(yell)),
	 *   'a!'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.foldMap(S.Monoid)(yell)),
	 *   S.Monoid.empty
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var foldMap = function (M) { return function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? M.empty : f(fa.right);
	}; }; };
	exports.foldMap = foldMap;
	/**
	 * Right-associative fold of a structure.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 *
	 * const startWith = 'postfix'
	 * const concat = (a: string, b: string) => `${a}:${b}`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
	 *   'a:postfix'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
	 *   'postfix'
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var reduceRight = function (b, f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? b : f(fa.right, b);
	}; };
	exports.reduceRight = reduceRight;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as E from 'fp-ts/Either'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
	 *   O.some(E.right('a'))
	 *  )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
	 *   O.none
	 * )
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    return function (f) {
	        return function (ta) {
	            return (0, exports.isLeft)(ta) ? F.of((0, exports.left)(ta.left)) : F.map(f(ta.right), exports.right);
	        };
	    };
	};
	exports.traverse = traverse;
	/**
	 * Evaluate each monadic action in the structure from left to right, and collect the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
	 *   O.some(E.right('a'))
	 *  )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
	 *   O.none
	 * )
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? F.of((0, exports.left)(ma.left)) : F.map(ma.right, exports.right);
	    };
	};
	exports.sequence = sequence;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * Map a pair of functions over the two type arguments of the bifunctor.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var bimap = function (f, g) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : (0, exports.right)(g(fa.right));
	}; };
	exports.bimap = bimap;
	/**
	 * Map a function over the first type argument of a bifunctor.
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	var mapLeft = function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : fa;
	}; };
	exports.mapLeft = mapLeft;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    bimap: _bimap,
	    mapLeft: _mapLeft
	};
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? that() : fa;
	}; };
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).
	 *
	 * | x        | y        | pipe(x, alt(() => y) |
	 * | -------- | -------- | -------------------- |
	 * | left(a)  | left(b)  | left(b)              |
	 * | left(a)  | right(2) | right(2)             |
	 * | right(1) | left(b)  | right(1)             |
	 * | right(1) | right(2) | right(1)             |
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.alt(() => E.left('b'))
	 *   ),
	 *   E.left('b')
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.alt(() => E.right(2))
	 *   ),
	 *   E.right(2)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.alt(() => E.left('b'))
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.alt(() => E.right(2))
	 *   ),
	 *   E.right(1)
	 * )
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = exports.altW;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @since 2.0.0
	 */
	var extend = function (f) { return function (wa) {
	    return (0, exports.isLeft)(wa) ? wa : (0, exports.right)(f(wa));
	}; };
	exports.extend = extend;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Extend = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ChainRec = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: _chainRec
	};
	/**
	 * @since 2.6.3
	 */
	exports.throwError = exports.left;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.MonadThrow = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap,
	    throwError: exports.throwError
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: function_1.identity
	};
	/**
	 * @example
	 * import { fromPredicate, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     1,
	 *     fromPredicate(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     -1,
	 *     fromPredicate(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   left('error')
	 * )
	 *
	 * @category lifting
	 * @since 2.0.0
	 */
	exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     O.some(1),
	 *     E.fromOption(() => 'error')
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     O.none,
	 *     E.fromOption(() => 'error')
	 *   ),
	 *   E.left('error')
	 * )
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromOption = 
	/*#__PURE__*/ (0, FromEither_1.fromOption)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isLeft = _.isLeft;
	/**
	 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isRight = _.isRight;
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	var matchW = function (onLeft, onRight) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : onRight(ma.right);
	    };
	};
	exports.matchW = matchW;
	/**
	 * Alias of [`matchW`](#matchw).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.foldW = exports.matchW;
	/**
	 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
	 * if the value is a `Right` the inner value is applied to the second function.
	 *
	 * @example
	 * import { match, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * function onLeft(errors: Array<string>): string {
	 *   return `Errors: ${errors.join(', ')}`
	 * }
	 *
	 * function onRight(value: number): string {
	 *   return `Ok: ${value}`
	 * }
	 *
	 * assert.strictEqual(
	 *   pipe(
	 *     right(1),
	 *     match(onLeft, onRight)
	 *   ),
	 *   'Ok: 1'
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     left(['error 1', 'error 2']),
	 *     match(onLeft, onRight)
	 *   ),
	 *   'Errors: error 1, error 2'
	 * )
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.match = exports.matchW;
	/**
	 * Alias of [`match`](#match).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.fold = exports.match;
	/**
	 * Less strict version of [`getOrElse`](#getorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
	 *
	 * @category error handling
	 * @since 2.6.0
	 */
	var getOrElseW = function (onLeft) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma.right;
	    };
	};
	exports.getOrElseW = getOrElseW;
	/**
	 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
	 *
	 * @example
	 * import { getOrElse, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     right(1),
	 *     getOrElse(() => 0)
	 *   ),
	 *   1
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     left('error'),
	 *     getOrElse(() => 0)
	 *   ),
	 *   0
	 * )
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.getOrElse = exports.getOrElseW;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Less strict version of [`apFirst`](#apfirst)
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apFirstW = exports.apFirst;
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * Less strict version of [`apSecond`](#apsecond)
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apSecondW = exports.apSecond;
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Less strict version of [`flatten`](#flatten).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.flattenW = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
	 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
	 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
	 *
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.flattenW;
	/**
	 * @since 2.0.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * Use `liftOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.fromOptionK = 
	/*#__PURE__*/ (0, FromEither_1.fromOptionK)(exports.FromEither);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.13.2
	 */
	exports.chainOptionKW = exports.chainOptionK;
	/** @internal */
	var _FromEither = {
	    fromEither: exports.FromEither.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftNullable = _.liftNullable(_FromEither);
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftOption = _.liftOption(_FromEither);
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
	/**
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(-1),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.left('error')
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.left('a')
	 * )
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.filterOrElse = (0, FromEither_1.filterOrElse)(exports.FromEither, exports.Chain);
	/**
	 * Less strict version of [`filterOrElse`](#filterorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category filtering
	 * @since 2.9.0
	 */
	exports.filterOrElseW = exports.filterOrElse;
	/**
	 * Returns a `Right` if is a `Left` (and vice versa).
	 *
	 * @since 2.0.0
	 */
	var swap = function (ma) { return ((0, exports.isLeft)(ma) ? (0, exports.right)(ma.left) : (0, exports.left)(ma.right)); };
	exports.swap = swap;
	/**
	 * Less strict version of [`orElse`](#orelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	var orElseW = function (onLeft) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma;
	    };
	};
	exports.orElseW = orElseW;
	/**
	 * Useful for recovering from errors.
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.orElse = exports.orElseW;
	/**
	 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
	 * the provided default as a `Left`.
	 *
	 * @example
	 * import { fromNullable, left, right } from 'fp-ts/Either'
	 *
	 * const parse = fromNullable('nully')
	 *
	 * assert.deepStrictEqual(parse(1), right(1))
	 * assert.deepStrictEqual(parse(null), left('nully'))
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromNullable = function (e) {
	    return function (a) {
	        return a == null ? (0, exports.left)(e) : (0, exports.right)(a);
	    };
	};
	exports.fromNullable = fromNullable;
	/**
	 * Constructs a new `Either` from a function that might throw.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 *
	 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
	 *   if (as.length > 0) {
	 *     return as[0]
	 *   } else {
	 *     throw new Error('empty array')
	 *   }
	 * }
	 *
	 * const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
	 *   E.tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
	 *
	 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
	 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f, onThrow) {
	    try {
	        return (0, exports.right)(f());
	    }
	    catch (e) {
	        return (0, exports.left)(onThrow(e));
	    }
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function that may throw to one returning a `Either`.
	 *
	 * @category interop
	 * @since 2.10.0
	 */
	var tryCatchK = function (f, onThrow) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); }, onThrow);
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * Use `liftNullable`.
	 *
	 * @category legacy
	 * @since 2.9.0
	 */
	var fromNullableK = function (e) {
	    var from = (0, exports.fromNullable)(e);
	    return function (f) { return (0, function_1.flow)(f, from); };
	};
	exports.fromNullableK = fromNullableK;
	/**
	 * Use `flatMapNullable`.
	 *
	 * @category legacy
	 * @since 2.9.0
	 */
	var chainNullableK = function (e) {
	    var from = (0, exports.fromNullableK)(e);
	    return function (f) { return (0, exports.flatMap)(from(f)); };
	};
	exports.chainNullableK = chainNullableK;
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.toUnion = (0, exports.foldW)(function_1.identity, function_1.identity);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * Default value for the `onError` argument of `tryCatch`
	 *
	 * @since 2.0.0
	 */
	function toError(e) {
	    try {
	        return e instanceof Error ? e : new Error(String(e));
	    }
	    catch (error) {
	        return new Error();
	    }
	}
	function elem(E) {
	    return function (a, ma) {
	        if (ma === undefined) {
	            var elemE_1 = elem(E);
	            return function (ma) { return elemE_1(a, ma); };
	        }
	        return (0, exports.isLeft)(ma) ? false : E.equals(a, ma.right);
	    };
	}
	/**
	 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
	 *
	 * @example
	 * import { exists, left, right } from 'fp-ts/Either'
	 *
	 * const gt2 = exists((n: number) => n > 2)
	 *
	 * assert.strictEqual(gt2(left('a')), false)
	 * assert.strictEqual(gt2(right(1)), false)
	 * assert.strictEqual(gt2(right(3)), true)
	 *
	 * @since 2.0.0
	 */
	var exists = function (predicate) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? false : predicate(ma.right);
	    };
	};
	exports.exists = exists;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindW = exports.bind;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	/**
	 * Less strict version of [`apS`](#aps).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apSW = exports.apS;
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return function (as) {
	        var e = f(0, _.head(as));
	        if ((0, exports.isLeft)(e)) {
	            return e;
	        }
	        var out = [e.right];
	        for (var i = 1; i < as.length; i++) {
	            var e_1 = f(i, as[i]);
	            if ((0, exports.isLeft)(e_1)) {
	                return e_1;
	            }
	            out.push(e_1.right);
	        }
	        return (0, exports.right)(out);
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.6.0
	 */
	exports.chainW = exports.flatMap;
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.8.0
	 */
	exports.chainFirstW = exports.tap;
	/**
	 * Use [`parse`](./Json.ts.html#parse) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function parseJSON(s, onError) {
	    return (0, exports.tryCatch)(function () { return JSON.parse(s); }, onError);
	}
	/**
	 * Use [`stringify`](./Json.ts.html#stringify) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var stringifyJSON = function (u, onError) {
	    return (0, exports.tryCatch)(function () {
	        var s = JSON.stringify(u);
	        if (typeof s !== 'string') {
	            throw new Error('Converting unsupported structure to JSON');
	        }
	        return s;
	    }, onError);
	};
	exports.stringifyJSON = stringifyJSON;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
	 * (where `E` is from `import E from 'fp-ts/Either'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.either = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _ap,
	    chain: exports.flatMap,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    bimap: _bimap,
	    mapLeft: _mapLeft,
	    alt: _alt,
	    extend: _extend,
	    chainRec: _chainRec,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
	 * are concatenated using the provided `Semigroup`
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = 
	/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.Apply);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = 
	/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.Applicative);
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getValidationSemigroup = function (SE, SA) {
	    return (0, Apply_1.getApplySemigroup)((0, exports.getApplicativeValidation)(SE))(SA);
	};
	exports.getValidationSemigroup = getValidationSemigroup;
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getValidationMonoid = function (SE, MA) {
	    return (0, Applicative_1.getApplicativeMonoid)((0, exports.getApplicativeValidation)(SE))(MA);
	};
	exports.getValidationMonoid = getValidationMonoid;
	/**
	 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getValidation(SE) {
	    var ap = (0, exports.getApplicativeValidation)(SE).ap;
	    var alt = (0, exports.getAltValidation)(SE).alt;
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        of: exports.of,
	        chain: exports.flatMap,
	        bimap: _bimap,
	        mapLeft: _mapLeft,
	        reduce: _reduce,
	        foldMap: _foldMap,
	        reduceRight: _reduceRight,
	        extend: _extend,
	        traverse: _traverse,
	        sequence: exports.sequence,
	        chainRec: _chainRec,
	        throwError: exports.throwError,
	        ap: ap,
	        alt: alt
	    };
	} 
} (Either));

const require$$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(EitherT);

const require$$6 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(Filterable);

const require$$8 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(FromIO);

const require$$9 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(FromTask);

var Task = {};

(function (exports) {
	var __createBinding = (Task && Task.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (Task && Task.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Task && Task.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.chainFirst = exports.chain = exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.never = exports.FromTask = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.tapIO = exports.tap = exports.flatMapIO = exports.FromIO = exports.MonadTask = exports.fromTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecond = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.URI = exports.flatten = exports.flatMap = exports.of = exports.ap = exports.map = exports.fromIO = void 0;
	exports.getMonoid = exports.getSemigroup = exports.taskSeq = exports.task = void 0;
	exports.delay = delay;
	exports.getRaceMonoid = getRaceMonoid;
	/**
	 * ```ts
	 * interface Task<A> {
	 *   (): Promise<A>
	 * }
	 * ```
	 *
	 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
	 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
	 *
	 * @since 2.0.0
	 */
	var Applicative_1 = require$$0;
	var Apply_1 = Apply;
	var chainable = __importStar(require$$2);
	var FromIO_1 = require$$8;
	var function_1 = _function;
	var Functor_1 = require$$11;
	var _ = __importStar(require$$12);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromIO = function (ma) { return function () { return Promise.resolve().then(ma); }; };
	exports.fromIO = fromIO;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Creates a task that will complete after a time delay
	 *
	 * @example
	 * import { sequenceT } from 'fp-ts/Apply'
	 * import * as T from 'fp-ts/Task'
	 * import { takeRight } from 'fp-ts/Array'
	 *
	 * async function test() {
	 *   const log: Array<string> = []
	 *   const append = (message: string): T.Task<void> =>
	 *     T.fromIO(() => {
	 *       log.push(message)
	 *     })
	 *   const fa = append('a')
	 *   const fb = T.delay(20)(append('b'))
	 *   const fc = T.delay(10)(append('c'))
	 *   const fd = append('d')
	 *   await sequenceT(T.ApplyPar)(fa, fb, fc, fd)()
	 *   assert.deepStrictEqual(takeRight(2)(log), ['c', 'b'])
	 * }
	 *
	 * test()
	 *
	 * @since 2.0.0
	 */
	function delay(millis) {
	    return function (ma) { return function () {
	        return new Promise(function (resolve) {
	            setTimeout(function () {
	                Promise.resolve().then(ma).then(resolve);
	            }, millis);
	        });
	    }; };
	}
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) { return function () {
	    return Promise.resolve().then(fa).then(f);
	}; }; };
	exports.map = map;
	/**
	 * @since 2.0.0
	 */
	var ap = function (fa) { return function (fab) { return function () {
	    return Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(function (_a) {
	        var f = _a[0], a = _a[1];
	        return f(a);
	    });
	}; }; };
	exports.ap = ap;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var of = function (a) { return function () { return Promise.resolve(a); }; };
	exports.of = of;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return function () {
	        return Promise.resolve()
	            .then(ma)
	            .then(function (a) { return f(a)(); });
	    };
	});
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Task';
	/**
	 * Monoid returning the first completed task.
	 *
	 * Note: uses `Promise.race` internally.
	 *
	 * @example
	 * import * as T from 'fp-ts/Task'
	 *
	 * async function test() {
	 *   const S = T.getRaceMonoid<string>()
	 *   const fa = T.delay(20)(T.of('a'))
	 *   const fb = T.delay(10)(T.of('b'))
	 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
	 * }
	 *
	 * test()
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	function getRaceMonoid() {
	    return {
	        concat: function (x, y) { return function () { return Promise.race([Promise.resolve().then(x), Promise.resolve().then(y)]); }; },
	        empty: exports.never
	    };
	}
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the value to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the value to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO
	};
	/**
	 * @category zone of death
	 * @since 2.7.0
	 * @deprecated
	 */
	exports.fromTask = function_1.identity;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as T from 'fp-ts/Task'
	 * import * as Console from 'fp-ts/Console'
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effect = pipe(
	 *   T.of('fp-ts'),
	 *   T.tapIO((value) => Console.log(`Hello, ${value}`)),
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), 'fp-ts')
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromIOK = 
	/*#__PURE__*/ (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * A `Task` that never completes.
	 *
	 * @since 2.0.0
	 */
	var never = function () { return new Promise(function (_) { return undefined; }); };
	exports.never = never;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return function (as) {
	        return function () {
	            return Promise.all(as.map(function (a, i) { return Promise.resolve().then(function () { return f(i, a)(); }); }));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (bs) {
	                    return Promise.resolve()
	                        .then(f(i + 1, a))
	                        .then(function (b) {
	                        bs.push(b);
	                        return bs;
	                    });
	                });
	            }, Promise.resolve()
	                .then(f(0, _.head(as)))
	                .then(_.singleton));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); });
	};
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); });
	};
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.task`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.task = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.taskSeq`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskSeq = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getSemigroup = (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getMonoid = (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq); 
} (Task));

(function (exports) {
	var __createBinding = (TaskEither && TaskEither.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (TaskEither && TaskEither.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (TaskEither && TaskEither.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (TaskEither && TaskEither.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (TaskEither && TaskEither.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (g && (g = 0, op[0] && (_ = 0)), _) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.throwError = exports.of = exports.altW = exports.alt = exports.flatten = exports.flattenW = exports.flatMap = exports.apW = exports.ap = exports.mapLeft = exports.mapError = exports.bimap = exports.mapBoth = exports.map = exports.fromIOEitherK = exports.chainTaskOptionK = exports.chainTaskOptionKW = exports.fromTaskOptionK = exports.swap = exports.orLeft = exports.orElseFirstTaskK = exports.orElseFirstIOK = exports.tapError = exports.orElseW = exports.orElse = exports.chainNullableK = exports.fromNullableK = exports.fromNullable = exports.toUnion = exports.tryCatchK = exports.tryCatch = exports.getOrElseW = exports.getOrElse = exports.foldW = exports.matchEW = exports.fold = exports.matchE = exports.matchW = exports.match = exports.fromTaskOption = exports.fromIOEither = exports.fromEither = exports.fromTask = exports.fromIO = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.right = exports.left = void 0;
	exports.fromEitherK = exports.filterOrElseW = exports.filterOrElse = exports.fromPredicate = exports.chainFirstEitherKW = exports.chainFirstEitherK = exports.chainEitherKW = exports.chainEitherK = exports.flatMapTaskOption = exports.flatMapIOEither = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.fromOption = exports.Alt = exports.Bifunctor = exports.tapTask = exports.tapIO = exports.tapEither = exports.tap = exports.FromTask = exports.FromIO = exports.FromEither = exports.MonadThrow = exports.MonadTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.getCompactable = exports.URI = void 0;
	exports.getSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.taskEitherSeq = exports.taskEither = exports.orElseFirstW = exports.orElseFirst = exports.chainFirstW = exports.chainFirst = exports.chainW = exports.chain = exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.bracketW = exports.bracket = exports.chainIOEitherK = exports.chainIOEitherKW = exports.chainFirstTaskK = exports.chainTaskK = exports.fromTaskK = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = void 0;
	exports.getApplicativeTaskValidation = getApplicativeTaskValidation;
	exports.getAltTaskValidation = getAltTaskValidation;
	exports.getFilterable = getFilterable;
	exports.taskify = taskify;
	exports.getTaskValidation = getTaskValidation;
	var Applicative_1 = require$$0;
	var Apply_1 = Apply;
	var chainable = __importStar(require$$2);
	var Compactable_1 = require$$3$1;
	var E = __importStar(Either);
	var ET = __importStar(require$$5);
	var Filterable_1 = require$$6;
	var FromEither_1 = require$$7;
	var FromIO_1 = require$$8;
	var FromTask_1 = require$$9;
	var function_1 = _function;
	var Functor_1 = require$$11;
	var _ = __importStar(require$$12);
	var T = __importStar(Task);
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.left = ET.left(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.right = ET.right(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightTask = ET.rightF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftTask = ET.leftF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightIO = (0, function_1.flow)(T.fromIO, exports.rightTask);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftIO = (0, function_1.flow)(T.fromIO, exports.leftTask);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromIO = exports.rightIO;
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromTask = exports.rightTask;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromEither = T.of;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromIOEither = T.fromIO;
	/**
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromTaskOption = function (onNone) {
	    return T.map(E.fromOption(onNone));
	};
	exports.fromTaskOption = fromTaskOption;
	/**
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.match = 
	/*#__PURE__*/ ET.match(T.Functor);
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchW = exports.match;
	/**
	 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchE = ET.matchE(T.Monad);
	/**
	 * Alias of [`matchE`](#matche).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.fold = exports.matchE;
	/**
	 * Less strict version of [`matchE`](#matche).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchEW = exports.matchE;
	/**
	 * Alias of [`matchEW`](#matchew).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.foldW = exports.matchEW;
	/**
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.getOrElse = 
	/*#__PURE__*/ ET.getOrElse(T.Monad);
	/**
	 * Less strict version of [`getOrElse`](#getorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
	 *
	 * @category error handling
	 * @since 2.6.0
	 */
	exports.getOrElseW = exports.getOrElse;
	/**
	 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import { left, right } from 'fp-ts/Either'
	 * import { tryCatch } from 'fp-ts/TaskEither'
	 *
	 * tryCatch(() => Promise.resolve(1), String)().then(result => {
	 *   assert.deepStrictEqual(result, right(1))
	 * })
	 * tryCatch(() => Promise.reject('error'), String)().then(result => {
	 *   assert.deepStrictEqual(result, left('error'))
	 * })
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f, onRejected) {
	    return function () { return __awaiter(void 0, void 0, void 0, function () {
	        var reason_1;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    _a.trys.push([0, 2, , 3]);
	                    return [4 /*yield*/, f().then(_.right)];
	                case 1: return [2 /*return*/, _a.sent()];
	                case 2:
	                    reason_1 = _a.sent();
	                    return [2 /*return*/, _.left(onRejected(reason_1))];
	                case 3: return [2 /*return*/];
	            }
	        });
	    }); };
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function returning a `Promise` to one returning a `TaskEither`.
	 *
	 * @category interop
	 * @since 2.5.0
	 */
	var tryCatchK = function (f, onRejected) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); }, onRejected);
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.toUnion = ET.toUnion(T.Functor);
	/**
	 * @category conversions
	 * @since 2.12.0
	 */
	exports.fromNullable = ET.fromNullable(T.Pointed);
	/**
	 * Use `liftNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.fromNullableK = ET.fromNullableK(T.Pointed);
	/**
	 * Use `flatMapNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainNullableK = 
	/*#__PURE__*/ ET.chainNullableK(T.Monad);
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
	 *
	 * See also [alt](#alt).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
	 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
	 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.orElse = 
	/*#__PURE__*/ ET.orElse(T.Monad);
	/**
	 * Less strict version of [`orElse`](#orelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	exports.orElseW = exports.orElse;
	/**
	 * Returns an effect that effectfully "peeks" at the failure of this effect.
	 *
	 * @category error handling
	 * @since 2.15.0
	 */
	exports.tapError = (0, function_1.dual)(2, ET.tapError(T.Monad));
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstIOK = function (onLeft) { return (0, exports.tapError)((0, exports.fromIOK)(onLeft)); };
	exports.orElseFirstIOK = orElseFirstIOK;
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstTaskK = function (onLeft) { return (0, exports.tapError)((0, exports.fromTaskK)(onLeft)); };
	exports.orElseFirstTaskK = orElseFirstTaskK;
	/**
	 * @category error handling
	 * @since 2.11.0
	 */
	exports.orLeft = 
	/*#__PURE__*/ ET.orLeft(T.Monad);
	/**
	 * @since 2.0.0
	 */
	exports.swap = ET.swap(T.Functor);
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	var fromTaskOptionK = function (onNone) {
	    var from = (0, exports.fromTaskOption)(onNone);
	    return function (f) { return (0, function_1.flow)(f, from); };
	};
	exports.fromTaskOptionK = fromTaskOptionK;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.3
	 */
	var chainTaskOptionKW = function (onNone) {
	    return function (f) {
	        return function (ma) {
	            return (0, exports.flatMap)(ma, (0, exports.fromTaskOptionK)(onNone)(f));
	        };
	    };
	};
	exports.chainTaskOptionKW = chainTaskOptionKW;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.chainTaskOptionK = exports.chainTaskOptionKW;
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	var fromIOEitherK = function (f) { return (0, function_1.flow)(f, exports.fromIOEither); };
	exports.fromIOEitherK = fromIOEitherK;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	exports.map = ET.map(T.Functor);
	/**
	 * Returns a `TaskEither` whose failure and success channels have been mapped by the specified pair of functions, `f` and `g`.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 * const g = (n: number) => n * 2
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.right(1), f, g)(), Either.right(2))
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.left('err'), f, g)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapBoth = (0, function_1.dual)(3, ET.mapBoth(T.Functor));
	/**
	 * Alias of `mapBoth`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.bimap = exports.mapBoth;
	/**
	 * Returns a `TaskEither` with its error channel mapped using the specified function.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.right(1), f)(), Either.right(1))
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.left('err'), f)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapError = (0, function_1.dual)(2, ET.mapError(T.Functor));
	/**
	 * Alias of `mapError`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.mapLeft = exports.mapError;
	/**
	 * @since 2.0.0
	 */
	exports.ap = 
	/*#__PURE__*/ ET.ap(T.ApplyPar);
	/**
	 * Less strict version of [`ap`](#ap).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.8.0
	 */
	exports.apW = exports.ap;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, ET.flatMap(T.Monad));
	/**
	 * Less strict version of [`flatten`](#flatten).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.flattenW = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.flattenW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
	 *
	 * See also [orElse](#orelse).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.right(1),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(1)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(2)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.left('b'))
	 *     )(),
	 *     E.left('b')
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = 
	/*#__PURE__*/ ET.alt(T.Monad);
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	exports.altW = exports.alt;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.of = exports.right;
	/**
	 * @since 2.7.0
	 */
	exports.throwError = exports.left;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'TaskEither';
	/**
	 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 * import * as T from 'fp-ts/Task'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * interface User {
	 *   readonly id: string
	 *   readonly name: string
	 * }
	 *
	 * const remoteDatabase: ReadonlyArray<User> = [
	 *   { id: 'id1', name: 'John' },
	 *   { id: 'id2', name: 'Mary' },
	 *   { id: 'id3', name: 'Joey' }
	 * ]
	 *
	 * const fetchUser = (id: string): TE.TaskEither<string, User> =>
	 *   pipe(
	 *     remoteDatabase,
	 *     RA.findFirst((user) => user.id === id),
	 *     TE.fromOption(() => `${id} not found`)
	 *   )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(TE.ApplicativePar)(fetchUser))(),
	 *     E.left('id4 not found') // <= first error
	 *   )
	 *
	 *   const Applicative = TE.getApplicativeTaskValidation(
	 *     T.ApplyPar,
	 *     pipe(string.Semigroup, S.intercalate(', '))
	 *   )
	 *
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(Applicative)(fetchUser))(),
	 *     E.left('id4 not found, id5 not found') // <= all errors
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getApplicativeTaskValidation(A, S) {
	    var ap = (0, Apply_1.ap)(A, E.getApplicativeValidation(S));
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: function (fab, fa) { return (0, function_1.pipe)(fab, ap(fa)); },
	        of: exports.of
	    };
	}
	/**
	 * The default [`Alt`](#alt) instance returns the last error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getAltTaskValidation(S) {
	    var alt = ET.altValidation(T.Monad, S);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        alt: function (fa, that) { return (0, function_1.pipe)(fa, alt(that)); }
	    };
	}
	/**
	 * @category filtering
	 * @since 2.10.0
	 */
	var getCompactable = function (M) {
	    var C = E.getCompactable(M);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        compact: (0, Compactable_1.compact)(T.Functor, C),
	        separate: (0, Compactable_1.separate)(T.Functor, C, E.Functor)
	    };
	};
	exports.getCompactable = getCompactable;
	/**
	 * @category filtering
	 * @since 2.1.0
	 */
	function getFilterable(M) {
	    var F = E.getFilterable(M);
	    var C = (0, exports.getCompactable)(M);
	    var filter = (0, Filterable_1.filter)(T.Functor, F);
	    var filterMap = (0, Filterable_1.filterMap)(T.Functor, F);
	    var partition = (0, Filterable_1.partition)(T.Functor, F);
	    var partitionMap = (0, Filterable_1.partitionMap)(T.Functor, F);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: C.compact,
	        separate: C.separate,
	        filter: function (fa, predicate) { return (0, function_1.pipe)(fa, filter(predicate)); },
	        filterMap: function (fa, f) { return (0, function_1.pipe)(fa, filterMap(f)); },
	        partition: function (fa, predicate) { return (0, function_1.pipe)(fa, partition(predicate)); },
	        partitionMap: function (fa, f) { return (0, function_1.pipe)(fa, partitionMap(f)); }
	    };
	}
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the `Right` value of this `TaskEither` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Right` value of this `TaskEither` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Less strict version of [`apFirst`](#apfirst).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apFirstW = exports.apFirst;
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Less strict version of [`apSecond`](#apsecond).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apSecondW = exports.apSecond;
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadThrow = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    throwError: exports.throwError
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * const checkString = (value: string) => pipe(
	 *   TE.of(value),
	 *   TE.tapEither(() => value.length > 0 ? E.right('ok') : E.left('error'))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await checkString('')(), E.left('error'))
	 *   assert.deepStrictEqual(await checkString('fp-ts')(), E.right('fp-ts'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports.FromEither, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as E from 'fp-ts/Either'
	 * import * as Console from 'fp-ts/Console'
	 *
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effectA = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => Console.log(`Hello, ${value}`)
	 * )
	 *
	 * // No output to the stdout
	 * const effectB = pipe(
	 *   TE.left('error'),
	 *   TE.tapIO((value) => Console.log(`Hello, ${value}`))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effectA(), E.of(1))
	 *   assert.deepStrictEqual(await effectB(), E.left('error'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as T from 'fp-ts/Task'
	 * import * as E from 'fp-ts/Either'
	 *
	 *
	 * const effect = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => T.of(value + 1)
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), E.of(1))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapTask = (0, function_1.dual)(2, (0, FromTask_1.tapTask)(exports.FromTask, exports.Chain));
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromOption = 
	/*#__PURE__*/ (0, FromEither_1.fromOption)(exports.FromEither);
	/**
	 * Use `liftOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.fromOptionK = 
	/*#__PURE__*/ (0, FromEither_1.fromOptionK)(exports.FromEither);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.13.2
	 */
	exports.chainOptionKW = exports.chainOptionK;
	/** @internal */
	var _FromEither = {
	    fromEither: exports.FromEither.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftNullable = _.liftNullable(_FromEither);
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftOption = _.liftOption(_FromEither);
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/** @internal */
	var _FromTask = {
	    fromTask: exports.fromTask
	};
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapEither = _.flatMapEither(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTask = _.flatMapTask(_FromTask, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIOEither = (0, function_1.dual)(2, function (self, f) {
	    return (0, exports.flatMap)(self, (0, exports.fromIOEitherK)(f));
	});
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTaskOption = (0, function_1.dual)(3, function (self, f, onNone) {
	    return (0, exports.flatMap)(self, function (a) { return (0, exports.fromTaskOption)(function () { return onNone(a); })(f(a)); });
	});
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainEitherK = exports.flatMapEither;
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainEitherKW = exports.flatMapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherK = exports.tapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherKW = exports.tapEither;
	/**
	 * @category lifting
	 * @since 2.0.0
	 */
	exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.filterOrElse = (0, FromEither_1.filterOrElse)(exports.FromEither, exports.Chain);
	/**
	 * Less strict version of [`filterOrElse`](#filterorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category filtering
	 * @since 2.9.0
	 */
	exports.filterOrElseW = exports.filterOrElse;
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromIOK = (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromTaskK = (0, FromTask_1.fromTaskK)(exports.FromTask);
	/**
	 * Alias of `flatMapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainTaskK = exports.flatMapTask;
	/**
	 * Alias of `tapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstTaskK = exports.tapTask;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainIOEitherKW = exports.flatMapIOEither;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOEitherK = exports.flatMapIOEither;
	function taskify(f) {
	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        return function () {
	            return new Promise(function (resolve) {
	                var cbResolver = function (e, r) { return (e != null ? resolve(_.left(e)) : resolve(_.right(r))); };
	                f.apply(null, args.concat(cbResolver));
	            });
	        };
	    };
	}
	/**
	 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
	 * whether the body action throws (\*) or returns.
	 *
	 * (\*) i.e. returns a `Left`
	 *
	 * @since 2.0.0
	 */
	var bracket = function (acquire, use, release) { return (0, exports.bracketW)(acquire, use, release); };
	exports.bracket = bracket;
	/**
	 * Less strict version of [`bracket`](#bracket).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	var bracketW = function (acquire, use, release) {
	    return (0, exports.flatMap)(acquire, function (a) { return T.flatMap(use(a), function (e) { return (0, exports.flatMap)(release(a, e), function () { return T.of(e); }); }); });
	};
	exports.bracketW = bracketW;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindW = exports.bind;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
	/**
	 * Less strict version of [`apS`](#aps).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apSW = exports.apS;
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return (0, function_1.flow)(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (ebs) {
	                    return _.isLeft(ebs)
	                        ? acc
	                        : f(i + 1, a)().then(function (eb) {
	                            if (_.isLeft(eb)) {
	                                return eb;
	                            }
	                            ebs.right.push(eb.right);
	                            return ebs;
	                        });
	                });
	            }, f(0, _.head(as))().then(E.map(_.singleton)));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); }); };
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.6.0
	 */
	exports.chainW = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.8.0
	 */
	exports.chainFirstW = exports.tap;
	/**
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirst = exports.tapError;
	/**
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirstW = exports.tapError;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEither`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEither = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEitherSeq`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEitherSeq = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = 
	/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = 
	/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq);
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getSemigroup = function (S) {
	    return (0, Apply_1.getApplySemigroup)(T.ApplySeq)(E.getSemigroup(S));
	};
	exports.getSemigroup = getSemigroup;
	/**
	 * Use [`getApplicativeTaskValidation`](#getapplicativetaskvalidation) and [`getAltTaskValidation`](#getalttaskvalidation) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getTaskValidation(SE) {
	    var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
	    var altTaskValidation = getAltTaskValidation(SE);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: applicativeTaskValidation.ap,
	        of: exports.of,
	        chain: exports.flatMap,
	        bimap: exports.mapBoth,
	        mapLeft: exports.mapError,
	        alt: altTaskValidation.alt,
	        fromIO: exports.fromIO,
	        fromTask: exports.fromTask,
	        throwError: exports.throwError
	    };
	} 
} (TaskEither));

function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
const defaultStreamHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) => renderRouterToStream({
    request,
    router,
    responseHeaders,
    children: /* @__PURE__ */ jsx(StartServer, { router })
  })
);
const startSerializer = {
  stringify: (value) => JSON.stringify(value, function replacer(key, val) {
    const ogVal = this[key];
    const serializer = serializers.find((t) => t.stringifyCondition(ogVal));
    if (serializer) {
      return serializer.stringify(ogVal);
    }
    return val;
  }),
  parse: (value) => JSON.parse(value, function parser(key, val) {
    const ogVal = this[key];
    if (isPlainObject(ogVal)) {
      const serializer = serializers.find((t) => t.parseCondition(ogVal));
      if (serializer) {
        return serializer.parse(ogVal);
      }
    }
    return val;
  }),
  encode: (value) => {
    if (Array.isArray(value)) {
      return value.map((v) => startSerializer.encode(v));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, v]) => [
          key,
          startSerializer.encode(v)
        ])
      );
    }
    const serializer = serializers.find((t) => t.stringifyCondition(value));
    if (serializer) {
      return serializer.stringify(value);
    }
    return value;
  },
  decode: (value) => {
    if (isPlainObject(value)) {
      const serializer = serializers.find((t) => t.parseCondition(value));
      if (serializer) {
        return serializer.parse(value);
      }
    }
    if (Array.isArray(value)) {
      return value.map((v) => startSerializer.decode(v));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, v]) => [
          key,
          startSerializer.decode(v)
        ])
      );
    }
    return value;
  }
};
const createSerializer = (key, check, toValue, fromValue) => ({
  key,
  stringifyCondition: check,
  stringify: (value) => ({ [`$${key}`]: toValue(value) }),
  parseCondition: (value) => Object.hasOwn(value, `$${key}`),
  parse: (value) => fromValue(value[`$${key}`])
});
const serializers = [
  createSerializer(
    // Key
    "undefined",
    // Check
    (v) => v === void 0,
    // To
    () => 0,
    // From
    () => void 0
  ),
  createSerializer(
    // Key
    "date",
    // Check
    (v) => v instanceof Date,
    // To
    (v) => v.toISOString(),
    // From
    (v) => new Date(v)
  ),
  createSerializer(
    // Key
    "error",
    // Check
    (v) => v instanceof Error,
    // To
    (v) => ({
      ...v,
      message: v.message,
      stack: void 0,
      cause: v.cause
    }),
    // From
    (v) => Object.assign(new Error(v.message), v)
  ),
  createSerializer(
    // Key
    "formData",
    // Check
    (v) => v instanceof FormData,
    // To
    (v) => {
      const entries = {};
      v.forEach((value, key) => {
        const entry = entries[key];
        if (entry !== void 0) {
          if (Array.isArray(entry)) {
            entry.push(value);
          } else {
            entries[key] = [entry, value];
          }
        } else {
          entries[key] = value;
        }
      });
      return entries;
    },
    // From
    (v) => {
      const formData = new FormData();
      Object.entries(v).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, value);
        }
      });
      return formData;
    }
  ),
  createSerializer(
    // Key
    "bigint",
    // Check
    (v) => typeof v === "bigint",
    // To
    (v) => v.toString(),
    // From
    (v) => BigInt(v)
  ),
  createSerializer(
    // Key
    "server-function",
    // Check
    (v) => typeof v === "function" && "functionId" in v && typeof v.functionId === "string",
    // To
    ({ functionId }) => ({ functionId, __serverFn: true }),
    // From, dummy impl. the actual server function lookup is done on the server in packages/start-server-core/src/server-functions-handler.ts
    (v) => v
  )
];
const startStorage = new AsyncLocalStorage();
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && (opts == null ? void 0 : opts.throwIfNotFound) !== false) {
    throw new Error(
      `No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return context;
}
const globalMiddleware = [];
const getRouterInstance = () => {
  var _a;
  return (_a = getStartContext({
    throwIfNotFound: false
  })) == null ? void 0 : _a.router;
};
function createServerFn(options, __opts) {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") {
    resolvedOptions.method = "GET";
  }
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        middleware
      }));
    },
    validator: (validator) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        validator
      }));
    },
    type: (type) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        type
      }));
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      Object.assign(resolvedOptions, {
        ...extractedFn,
        extractedFn,
        serverFn
      });
      const resolvedMiddleware = [...resolvedOptions.middleware || [], serverFnBaseToMiddleware(resolvedOptions)];
      return Object.assign(async (opts) => {
        return executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...resolvedOptions,
          data: opts == null ? void 0 : opts.data,
          headers: opts == null ? void 0 : opts.headers,
          signal: opts == null ? void 0 : opts.signal,
          context: {},
          router: getRouterInstance()
        }).then((d) => {
          if (resolvedOptions.response === "full") {
            return d;
          }
          if (d.error) throw d.error;
          return d.result;
        });
      }, {
        // This copies over the URL, function ID
        ...extractedFn,
        // The extracted function on the server-side calls
        // this function
        __executeServer: async (opts_, signal) => {
          const opts = opts_ instanceof FormData ? extractFormDataContext(opts_) : opts_;
          opts.type = typeof resolvedOptions.type === "function" ? resolvedOptions.type(opts) : resolvedOptions.type;
          const ctx = {
            ...extractedFn,
            ...opts,
            signal
          };
          const run = () => executeMiddleware$1(resolvedMiddleware, "server", ctx).then((d) => ({
            // Only send the result and sendContext back to the client
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
          if (ctx.type === "static") {
            let response;
            if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.getItem) {
              response = await serverFnStaticCache.getItem(ctx);
            }
            if (!response) {
              response = await run().then((d) => {
                return {
                  ctx: d,
                  error: null
                };
              }).catch((e) => {
                return {
                  ctx: void 0,
                  error: e
                };
              });
              if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.setItem) {
                await serverFnStaticCache.setItem(ctx, response);
              }
            }
            invariant(response, "No response from both server and static cache!");
            if (response.error) {
              throw response.error;
            }
            return response.ctx;
          }
          return run();
        }
      });
    }
  };
}
async function executeMiddleware$1(middlewares, env, opts) {
  const flattenedMiddlewares = flattenMiddlewares([...globalMiddleware, ...middlewares]);
  const next = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) {
      return ctx;
    }
    if (nextMiddleware.options.validator && (env === "client" ? nextMiddleware.options.validateClient : true)) {
      ctx.data = await execValidator(nextMiddleware.options.validator, ctx.data);
    }
    const middlewareFn = env === "client" ? nextMiddleware.options.client : nextMiddleware.options.server;
    if (middlewareFn) {
      return applyMiddleware(middlewareFn, ctx, async (newCtx) => {
        return next(newCtx).catch((error) => {
          if (isRedirect(error) || isNotFound(error)) {
            return {
              ...newCtx,
              error
            };
          }
          throw error;
        });
      });
    }
    return next(ctx);
  };
  return next({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || {}
  });
}
let serverFnStaticCache;
function setServerFnStaticCache(cache) {
  const previousCache = serverFnStaticCache;
  serverFnStaticCache = typeof cache === "function" ? cache() : cache;
  return () => {
    serverFnStaticCache = previousCache;
  };
}
function createServerFnStaticCache(serverFnStaticCache2) {
  return serverFnStaticCache2;
}
async function sha1Hash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
setServerFnStaticCache(() => {
  const getStaticCacheUrl = async (options, hash) => {
    const filename = await sha1Hash(`${options.functionId}__${hash}`);
    return `/__tsr/staticServerFnCache/${filename}.json`;
  };
  const jsonToFilenameSafeString = (json2) => {
    const sortedKeysReplacer = (key, value) => value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort().reduce((acc, curr) => {
      acc[curr] = value[curr];
      return acc;
    }, {}) : value;
    const jsonString = JSON.stringify(json2 ?? "", sortedKeysReplacer);
    return jsonString.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "_");
  };
  const staticClientCache = typeof document !== "undefined" ? /* @__PURE__ */ new Map() : null;
  return createServerFnStaticCache({
    getItem: async (ctx) => {
      if (typeof document === "undefined") {
        const hash = jsonToFilenameSafeString(ctx.data);
        const url = await getStaticCacheUrl(ctx, hash);
        const publicUrl = "/Users/brymadrid/kachingko/kachingko_web/.output/public";
        const {
          promises: fs
        } = await import('node:fs');
        const path = await import('node:path');
        const filePath = path.join(publicUrl, url);
        const [cachedResult, readError] = await fs.readFile(filePath, "utf-8").then((c) => [startSerializer.parse(c), null]).catch((e) => [null, e]);
        if (readError && readError.code !== "ENOENT") {
          throw readError;
        }
        return cachedResult;
      }
      return void 0;
    },
    setItem: async (ctx, response) => {
      const {
        promises: fs
      } = await import('node:fs');
      const path = await import('node:path');
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      const publicUrl = "/Users/brymadrid/kachingko/kachingko_web/.output/public";
      const filePath = path.join(publicUrl, url);
      await fs.mkdir(path.dirname(filePath), {
        recursive: true
      });
      await fs.writeFile(filePath, startSerializer.stringify(response));
    },
    fetchItem: async (ctx) => {
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      let result = staticClientCache == null ? void 0 : staticClientCache.get(url);
      if (!result) {
        result = await fetch(url, {
          method: "GET"
        }).then((r) => r.text()).then((d) => startSerializer.parse(d));
        staticClientCache == null ? void 0 : staticClientCache.set(url, result);
      }
      return result;
    }
  });
});
function extractFormDataContext(formData) {
  const serializedContext = formData.get("__TSR_CONTEXT");
  formData.delete("__TSR_CONTEXT");
  if (typeof serializedContext !== "string") {
    return {
      context: {},
      data: formData
    };
  }
  try {
    const context = startSerializer.parse(serializedContext);
    return {
      context,
      data: formData
    };
  } catch {
    return {
      data: formData
    };
  }
}
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m) => {
      if (m.options.middleware) {
        recurse(m.options.middleware);
      }
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
const applyMiddleware = async (middlewareFn, ctx, nextFn) => {
  return middlewareFn({
    ...ctx,
    next: async (userCtx = {}) => {
      return nextFn({
        ...ctx,
        ...userCtx,
        context: {
          ...ctx.context,
          ...userCtx.context
        },
        sendContext: {
          ...ctx.sendContext,
          ...userCtx.sendContext ?? {}
        },
        headers: mergeHeaders(ctx.headers, userCtx.headers),
        result: userCtx.result !== void 0 ? userCtx.result : ctx.response === "raw" ? userCtx : ctx.result,
        error: userCtx.error ?? ctx.error
      });
    }
  });
};
function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = validator["~standard"].validate(input);
    if (result instanceof Promise) throw new Error("Async validation not supported");
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) {
    return validator.parse(input);
  }
  if (typeof validator === "function") {
    return validator(input);
  }
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    _types: void 0,
    options: {
      validator: options.validator,
      validateClient: options.validateClient,
      client: async ({
        next,
        sendContext,
        ...ctx
      }) => {
        var _a;
        const payload = {
          ...ctx,
          // switch the sendContext over to context
          context: sendContext,
          type: typeof ctx.type === "function" ? ctx.type(ctx) : ctx.type
        };
        if (ctx.type === "static" && "production" === "production" && typeof document !== "undefined") {
          invariant(serverFnStaticCache, "serverFnStaticCache.fetchItem is not available!");
          const result = await serverFnStaticCache.fetchItem(payload);
          if (result) {
            if (result.error) {
              throw result.error;
            }
            return next(result.ctx);
          }
          warning(result, `No static cache item found for ${payload.functionId}__${JSON.stringify(payload.data)}, falling back to server function...`);
        }
        const res = await ((_a = options.extractedFn) == null ? void 0 : _a.call(options, payload));
        return next(res);
      },
      server: async ({
        next,
        ...ctx
      }) => {
        var _a;
        const result = await ((_a = options.serverFn) == null ? void 0 : _a.call(options, ctx));
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
const eventStorage = new AsyncLocalStorage();
function defineEventHandler(handler) {
  return defineEventHandler$1((event) => {
    return runWithEvent(event, () => handler(event));
  });
}
async function runWithEvent(event, fn) {
  return eventStorage.run(event, fn);
}
function getEvent() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return event;
}
const HTTPEventSymbol = Symbol("$HTTPEvent");
function isEvent(obj) {
  return typeof obj === "object" && (obj instanceof H3Event || (obj == null ? void 0 : obj[HTTPEventSymbol]) instanceof H3Event || (obj == null ? void 0 : obj.__is_event__) === true);
}
function createWrapperFunction(h3Function) {
  return function(...args) {
    const event = args[0];
    if (!isEvent(event)) {
      args.unshift(getEvent());
    } else {
      args[0] = event instanceof H3Event || event.__is_event__ ? event : event[HTTPEventSymbol];
    }
    return h3Function(...args);
  };
}
const getResponseStatus = createWrapperFunction(getResponseStatus$1);
const getResponseHeaders = createWrapperFunction(getResponseHeaders$1);
const useSession = createWrapperFunction(useSession$1);
function requestHandler(handler) {
  return handler;
}
const VIRTUAL_MODULES = {
  routeTree: "tanstack-start-route-tree:v",
  startManifest: "tanstack-start-manifest:v",
  serverFnManifest: "tanstack-start-server-fn-manifest:v"
};
async function loadVirtualModule(id) {
  switch (id) {
    case VIRTUAL_MODULES.routeTree:
      return await Promise.resolve().then(() => routeTree_gen);
    case VIRTUAL_MODULES.startManifest:
      return await import('./_tanstack-start-manifest_v-CSSKbvSj.mjs');
    case VIRTUAL_MODULES.serverFnManifest:
      return await import('./_tanstack-start-server-fn-manifest_v-mX2-3T7D.mjs');
    default:
      throw new Error(`Unknown virtual module: ${id}`);
  }
}
async function getStartManifest(opts) {
  const { tsrStartManifest } = await loadVirtualModule(
    VIRTUAL_MODULES.startManifest
  );
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let script = `import('${startManifest.clientEntry}')`;
  rootRoute.assets.push({
    tag: "script",
    attrs: {
      type: "module",
      suppressHydrationWarning: true,
      async: true
    },
    children: script
  });
  const manifest = {
    ...startManifest,
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).map(([k, v]) => {
        const { preloads, assets } = v;
        return [
          k,
          {
            preloads,
            assets
          }
        ];
      })
    )
  };
  return manifest;
}
function sanitizeBase$1(base) {
  return base.replace(/^\/|\/$/g, "");
}
async function revive(root, reviver) {
  async function reviveNode(holder2, key) {
    const value = holder2[key];
    if (value && typeof value === "object") {
      await Promise.all(Object.keys(value).map((k) => reviveNode(value, k)));
    }
    if (reviver) {
      holder2[key] = await reviver(key, holder2[key]);
    }
  }
  const holder = {
    "": root
  };
  await reviveNode(holder, "");
  return holder[""];
}
async function reviveServerFns(key, value) {
  if (value && value.__serverFn === true && value.functionId) {
    const serverFn = await getServerFnById(value.functionId);
    return async (opts, signal) => {
      const result = await serverFn(opts ?? {}, signal);
      return result.result;
    };
  }
  return value;
}
async function getServerFnById(serverFnId) {
  const {
    default: serverFnManifest
  } = await loadVirtualModule(VIRTUAL_MODULES.serverFnManifest);
  const serverFnInfo = serverFnManifest[serverFnId];
  if (!serverFnInfo) {
    console.info("serverFnManifest", serverFnManifest);
    throw new Error("Server function info not found for " + serverFnId);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + serverFnId);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(`Server function module export not resolved for serverFn ID: ${serverFnId}`);
  }
  return action;
}
async function parsePayload(payload) {
  const parsedPayload = startSerializer.parse(payload);
  await revive(parsedPayload, reviveServerFns);
  return parsedPayload;
}
const handleServerAction = async ({
  request
}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort);
  const method = request.method;
  const url = new URL(request.url, "http://localhost:3000");
  const regex = new RegExp(`${sanitizeBase$1("/_serverFn")}/([^/?#]+)`);
  const match2 = url.pathname.match(regex);
  const serverFnId = match2 ? match2[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = "createServerFn" in search;
  const isRaw = "raw" in search;
  if (typeof serverFnId !== "string") {
    throw new Error("Invalid server action param for serverFnId: " + serverFnId);
  }
  const action = await getServerFnById(serverFnId);
  const formDataContentTypes = ["multipart/form-data", "application/x-www-form-urlencoded"];
  const response = await (async () => {
    try {
      let result = await (async () => {
        if (request.headers.get("Content-Type") && formDataContentTypes.some((type) => {
          var _a;
          return (_a = request.headers.get("Content-Type")) == null ? void 0 : _a.includes(type);
        })) {
          invariant(method.toLowerCase() !== "get", "GET requests with FormData payloads are not supported");
          return await action(await request.formData(), signal);
        }
        if (method.toLowerCase() === "get") {
          let payload2 = search;
          if (isCreateServerFn) {
            payload2 = search.payload;
          }
          payload2 = payload2 ? await parsePayload(payload2) : payload2;
          return await action(payload2, signal);
        }
        const jsonPayloadAsString = await request.text();
        const payload = await parsePayload(jsonPayloadAsString);
        if (isCreateServerFn) {
          return await action(payload, signal);
        }
        return await action(...payload, signal);
      })();
      if (result.result instanceof Response) {
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      return new Response(result !== void 0 ? startSerializer.stringify(result) : void 0, {
        status: getResponseStatus(getEvent()),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      return new Response(startSerializer.stringify(error), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  })();
  request.signal.removeEventListener("abort", abort);
  if (isRaw) {
    return response;
  }
  return response;
};
function isNotFoundResponse(error) {
  const {
    headers,
    ...rest
  } = error;
  return new Response(JSON.stringify(rest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
const HEADERS = {
  TSS_SHELL: "X-TSS_SHELL"
};
function getStartResponseHeaders(opts) {
  const headers = mergeHeaders(
    getResponseHeaders(),
    {
      "Content-Type": "text/html; charset=UTF-8"
    },
    ...opts.router.state.matches.map((match2) => {
      return match2.headers;
    })
  );
  return headers;
}
function createStartHandler({
  createRouter: createRouter2
}) {
  let routeTreeModule = null;
  let startRoutesManifest = null;
  let processedServerRouteTree = void 0;
  return (cb) => {
    const originalFetch = globalThis.fetch;
    const startRequestResolver = async ({ request }) => {
      globalThis.fetch = async function(input, init) {
        function resolve(url2, requestOptions) {
          const fetchRequest = new Request(url2, requestOptions);
          return startRequestResolver({ request: fetchRequest });
        }
        function getOrigin() {
          return request.headers.get("Origin") || request.headers.get("Referer") || "http://localhost";
        }
        if (typeof input === "string" && input.startsWith("/")) {
          const url2 = new URL(input, getOrigin());
          return resolve(url2, init);
        } else if (typeof input === "object" && "url" in input && typeof input.url === "string" && input.url.startsWith("/")) {
          const url2 = new URL(input.url, getOrigin());
          return resolve(url2, init);
        }
        return originalFetch(input, init);
      };
      const url = new URL(request.url);
      const href = url.href.replace(url.origin, "");
      const APP_BASE = "/";
      const router = await createRouter2();
      const history = createMemoryHistory({
        initialEntries: [href]
      });
      const isPrerendering = process.env.TSS_PRERENDERING === "true";
      let isShell = process.env.TSS_SHELL === "true";
      if (isPrerendering && !isShell) {
        isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
      }
      router.update({
        history,
        isShell,
        isPrerendering
      });
      const response = await (async () => {
        try {
          if (false) ;
          const serverFnBase = joinPaths([
            APP_BASE,
            trimPath("/_serverFn"),
            "/"
          ]);
          if (href.startsWith(serverFnBase)) {
            return await handleServerAction({ request });
          }
          if (routeTreeModule === null) {
            try {
              routeTreeModule = await loadVirtualModule(
                VIRTUAL_MODULES.routeTree
              );
              if (routeTreeModule.serverRouteTree) {
                processedServerRouteTree = processRouteTree({
                  routeTree: routeTreeModule.serverRouteTree,
                  initRoute: (route, i) => {
                    route.init({
                      originalIndex: i
                    });
                  }
                });
              }
            } catch (e) {
              console.log(e);
            }
          }
          const executeRouter = () => runWithStartContext({ router }, async () => {
            const requestAcceptHeader = request.headers.get("Accept") || "*/*";
            const splitRequestAcceptHeader = requestAcceptHeader.split(",");
            const supportedMimeTypes = ["*/*", "text/html"];
            const isRouterAcceptSupported = supportedMimeTypes.some(
              (mimeType) => splitRequestAcceptHeader.some(
                (acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)
              )
            );
            if (!isRouterAcceptSupported) {
              return json(
                {
                  error: "Only HTML requests are supported here"
                },
                {
                  status: 500
                }
              );
            }
            if (startRoutesManifest === null) {
              startRoutesManifest = await getStartManifest({
                basePath: APP_BASE
              });
            }
            attachRouterServerSsrUtils(router, startRoutesManifest);
            await router.load();
            if (router.state.redirect) {
              return router.state.redirect;
            }
            await router.serverSsr.dehydrate();
            const responseHeaders = getStartResponseHeaders({ router });
            const response2 = await cb({
              request,
              router,
              responseHeaders
            });
            return response2;
          });
          if (processedServerRouteTree) {
            const [_matchedRoutes, response2] = await handleServerRoutes({
              processedServerRouteTree,
              router,
              request,
              basePath: APP_BASE,
              executeRouter
            });
            if (response2) return response2;
          }
          const routerResponse = await executeRouter();
          return routerResponse;
        } catch (err) {
          if (err instanceof Response) {
            return err;
          }
          throw err;
        }
      })();
      if (isRedirect(response)) {
        if (isResolvedRedirect(response)) {
          if (request.headers.get("x-tsr-redirect") === "manual") {
            return json(
              {
                ...response.options,
                isSerializedRedirect: true
              },
              {
                headers: response.headers
              }
            );
          }
          return response;
        }
        if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) {
          throw new Error(
            `Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(response.options)}`
          );
        }
        if (["params", "search", "hash"].some(
          (d) => typeof response.options[d] === "function"
        )) {
          throw new Error(
            `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
              response.options
            ).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`
          );
        }
        const redirect2 = router.resolveRedirect(response);
        if (request.headers.get("x-tsr-redirect") === "manual") {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true
            },
            {
              headers: response.headers
            }
          );
        }
        return redirect2;
      }
      return response;
    };
    return requestHandler(startRequestResolver);
  };
}
async function handleServerRoutes(opts) {
  var _a, _b;
  const url = new URL(opts.request.url);
  const pathname = url.pathname;
  const serverTreeResult = getMatchedRoutes({
    pathname,
    basepath: opts.basePath,
    caseSensitive: true,
    routesByPath: opts.processedServerRouteTree.routesByPath,
    routesById: opts.processedServerRouteTree.routesById,
    flatRoutes: opts.processedServerRouteTree.flatRoutes
  });
  const routeTreeResult = opts.router.getMatchedRoutes(pathname, void 0);
  let response;
  let matchedRoutes = [];
  matchedRoutes = serverTreeResult.matchedRoutes;
  if (routeTreeResult.foundRoute) {
    if (serverTreeResult.matchedRoutes.length < routeTreeResult.matchedRoutes.length) {
      const closestCommon = [...routeTreeResult.matchedRoutes].reverse().find((r) => {
        return opts.processedServerRouteTree.routesById[r.id] !== void 0;
      });
      if (closestCommon) {
        let routeId = closestCommon.id;
        matchedRoutes = [];
        do {
          const route = opts.processedServerRouteTree.routesById[routeId];
          if (!route) {
            break;
          }
          matchedRoutes.push(route);
          routeId = (_a = route.parentRoute) == null ? void 0 : _a.id;
        } while (routeId);
        matchedRoutes.reverse();
      }
    }
  }
  if (matchedRoutes.length) {
    const middlewares = flattenMiddlewares(
      matchedRoutes.flatMap((r) => r.options.middleware).filter(Boolean)
    ).map((d) => d.options.server);
    if ((_b = serverTreeResult.foundRoute) == null ? void 0 : _b.options.methods) {
      const method = Object.keys(
        serverTreeResult.foundRoute.options.methods
      ).find(
        (method2) => method2.toLowerCase() === opts.request.method.toLowerCase()
      );
      if (method) {
        const handler = serverTreeResult.foundRoute.options.methods[method];
        if (handler) {
          if (typeof handler === "function") {
            middlewares.push(handlerToMiddleware(handler));
          } else {
            if (handler._options.middlewares && handler._options.middlewares.length) {
              middlewares.push(
                ...flattenMiddlewares(handler._options.middlewares).map(
                  (d) => d.options.server
                )
              );
            }
            if (handler._options.handler) {
              middlewares.push(handlerToMiddleware(handler._options.handler));
            }
          }
        }
      }
    }
    middlewares.push(handlerToMiddleware(opts.executeRouter));
    const ctx = await executeMiddleware(middlewares, {
      request: opts.request,
      context: {},
      params: serverTreeResult.routeParams,
      pathname
    });
    response = ctx.response;
  }
  return [matchedRoutes, response];
}
function handlerToMiddleware(handler) {
  return async ({ next: _next, ...rest }) => {
    const response = await handler(rest);
    if (response) {
      return { response };
    }
    return _next(rest);
  };
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    const result = await middleware({
      ...ctx2,
      // Allow the middleware to call the next middleware in the chain
      next: async (nextCtx) => {
        const nextResult = await next({
          ...ctx2,
          ...nextCtx,
          context: {
            ...ctx2.context,
            ...(nextCtx == null ? void 0 : nextCtx.context) || {}
          }
        });
        return Object.assign(ctx2, handleCtxResult(nextResult));
      }
      // Allow the middleware result to extend the return context
    }).catch((err) => {
      if (isSpecialResponse(err)) {
        return {
          response: err
        };
      }
      throw err;
    });
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
function sanitizeBase(base) {
  return base.replace(/^\/|\/$/g, "");
}
const createServerRpc = (functionId, serverBase, splitImportFn) => {
  invariant(
    splitImportFn,
    "🚨splitImportFn required for the server functions server runtime, but was not provided."
  );
  const sanitizedAppBase = sanitizeBase("/");
  const sanitizedServerBase = sanitizeBase(serverBase);
  const url = `${sanitizedAppBase ? `/${sanitizedAppBase}` : ``}/${sanitizedServerBase}/${functionId}`;
  return Object.assign(splitImportFn, {
    url,
    functionId
  });
};
const appCss = "/assets/app-DD1JxDrM.css";
const PASSWORD = process.env.SESSION_PASSWORD;
if (!PASSWORD) {
  throw new Error("SESSION_PASSWORD environment variable is required");
}
const useAppSession = () => useSession({
  password: PASSWORD,
  cookie: {
    maxAge: 15 * 60,
    // 30 minutes in seconds (3600 seconds)
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: "production" === "production"
  }
});
const createSession_createServerFn_handler = createServerRpc("src_lib_session_index_ts--createSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return createSession.__executeServer(opts, signal);
});
const createSession = createServerFn({
  method: "POST"
}).handler(createSession_createServerFn_handler, async (data) => {
  const session = await useAppSession();
  session.update(data);
  return await getSession$1();
});
const getSession_createServerFn_handler$1 = createServerRpc("src_lib_session_index_ts--getSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getSession$1.__executeServer(opts, signal);
});
const getSession$1 = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler$1, async () => {
  const session = await useAppSession();
  return session.data;
});
const deleteSession_createServerFn_handler = createServerRpc("src_lib_session_index_ts--deleteSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return deleteSession.__executeServer(opts, signal);
});
const deleteSession = createServerFn({
  method: "GET"
}).handler(deleteSession_createServerFn_handler, async () => {
  const session = await useAppSession();
  await session.clear();
});
const initialState = {
  theme: "system",
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [theme, setTheme] = useState(
    // () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    defaultTheme
  );
  useEffect(() => {
    if (!isHydrated) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme, isHydrated]);
  useEffect(() => {
    setIsHydrated(true);
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);
  const value = {
    theme,
    setTheme: (theme2) => {
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  return context;
};
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
const getSession_createServerFn_handler = createServerRpc("src_app_routes_root_tsx--getSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getSession.__executeServer(opts, signal);
});
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const session = await useAppSession();
  if (!session.data.token) {
    return null;
  }
  return session.data;
});
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "KachingKo — Track & Understand Your Credit Card Spending"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }]
  }),
  beforeLoad: async () => {
    const session = await getSession();
    return {
      session
    };
  },
  notFoundComponent: () => /* @__PURE__ */ jsx("div", { children: "404 Not Found" }),
  context: () => {
    return {
      queryClient: new QueryClient({
        queryCache: new QueryCache({
          onSuccess: (data) => {
            if (data?.status === 401) {
              window.location.href = "/logout";
            }
          }
        }),
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1e3,
            retry: 1
          }
        }
      })
    };
  },
  component: RootComponent
});
function RootComponent() {
  const {
    queryClient
  } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { storageKey: "vite-ui-theme", children: /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(SidebarProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }) }) });
}
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$9 = () => import('./_unathenticated-In_zNY0g.mjs');
const Route$9 = createFileRoute("/_unathenticated")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import('./_authenticated-33ktARjl.mjs');
const Route$8 = createFileRoute("/_authenticated")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import('./index-B_QYwmQm.mjs');
const Route$7 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  shouldReload: false
});
const fromZod = (schema) => (input) => {
  try {
    if (typeof schema.safeParse !== "function") {
      console.error("Invalid schema passed to fromZod:", schema);
      return Either.left({
        type: "JsonError",
        error: new Error("Invalid Zod schema provided")
      });
    }
    const result = schema.safeParse(input);
    return result.success ? Either.right(result.data) : Either.left({
      type: "JsonError",
      error: new Error(result.error.message)
    });
  } catch (error) {
    console.error("ZodType constructor error:", error);
    return Either.left({
      type: "JsonError",
      error: new Error(`Schema validation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    });
  }
};
const handleRequestStatus = (res) => {
  if (res.status >= 500) {
    return TaskEither.left({
      type: "HttpError",
      error: new Error(`Something went wrong. Please try again later.`),
      status: res.status
    });
  }
  return TaskEither.right(res);
};
const parseJson = (res) => TaskEither.tryCatch(
  () => res.json().then((response) => ({ response, status: res.status })),
  (error) => ({
    type: "InvalidJson",
    error: new Error(error.message),
    status: res.status
  })
);
const fetchJsonError = (error) => {
  console.log("fetchJsonError: ", error);
  return { type: "HttpError", error: new Error(`Can't connect to the server. Please try again later.`) };
};
const extractErrorMessage = (success, error) => {
  if (typeof error === "string") {
    return error;
  }
  return `Something went wrong. Please try again later.`;
};
const processJsonResponse = (schema) => (result) => {
  const { response } = result;
  if (!response.success) {
    const errorMessage = extractErrorMessage(response.success, response.error);
    return Either.left({
      type: "HttpError",
      error: new Error(errorMessage),
      status: result.status
    });
  }
  return fromZod(schema)(response);
};
const API_URL = "http://localhost:8888";
const makeApiClient = (config) => {
  const request = (endpoint, schema, options = {}) => {
    const url = `${config.baseUrl}${endpoint}`;
    const headers = {
      ...config.defaultHeaders || {},
      ...options?.headers || {}
    };
    let payload;
    if (options?.body instanceof FormData) {
      payload = options.body;
    } else if (options?.body) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(options.body);
    }
    const init = {
      method: options?.method || "GET",
      headers,
      body: payload,
      signal: options?.signal
    };
    return _function.pipe(
      TaskEither.tryCatch(
        () => fetch(url, init),
        fetchJsonError
      ),
      TaskEither.chain(handleRequestStatus),
      TaskEither.chain(parseJson),
      TaskEither.chainEitherK(processJsonResponse(schema))
    );
  };
  const withToken = (token) => makeApiClient({
    ...config,
    defaultHeaders: {
      ...config.defaultHeaders || {},
      Authorization: `Bearer ${token}`
    }
  });
  const handleResponse = (response, onError) => {
    return Either.match(
      ({ error, type, status }) => {
        if (onError) {
          onError(error, type, status);
        }
        return { success: false, error, status: status ?? 0 };
      },
      (data) => {
        return { success: true, data: data.data };
      }
    )(response);
  };
  return { request, handleResponse, withToken };
};
const $$splitComponentImporter$6 = () => import('./signup-B3Q5MP46.mjs');
const Route$6 = createFileRoute("/_unathenticated/signup")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
z$1.object({
  email: z$1.string().email("email doesn't look right"),
  password: z$1.string().min(3, "password minumum of 3 character(s)"),
  confirmPassword: z$1.string().min(3, "password minumum of 3 character(s)")
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"]
  // this makes the error show on confirmPassword
});
const signupResponseSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.object({
    token: z$1.string(),
    user: z$1.object({
      id: z$1.number(),
      email: z$1.string().email()
    })
  })
});
const signupFn_createServerFn_handler = createServerRpc("src_app_routes_unathenticated_signup_tsx--signupFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return signupFn.__executeServer(opts, signal);
});
const signupFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(signupFn_createServerFn_handler, async ({
  data
}) => {
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  });
  const reqOpts = {
    body: data,
    method: "POST"
  };
  const resp = await client.request("/api/auth/register", signupResponseSchema, reqOpts)();
  if (resp._tag === "Right") {
    const session = await useAppSession();
    await session.update(resp.right.data);
  }
  return client.handleResponse(resp);
});
const $$splitComponentImporter$5 = () => import('./login-B3rqN2cY.mjs');
const Route$5 = createFileRoute("/_unathenticated/login")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const authSchema = z.object({
  email: z.string().email("email doesn't look right"),
  password: z.string().min(4)
});
const userResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.string().email()
    })
  })
}).strict();
const authenticateCredentialsFn_createServerFn_handler = createServerRpc("src_lib_auth_index_ts--authenticateCredentialsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return authenticateCredentialsFn.__executeServer(opts, signal);
});
const authenticateCredentialsFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(authenticateCredentialsFn_createServerFn_handler, async ({
  data
}) => {
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  });
  const reqOpts = {
    body: data,
    method: "POST"
  };
  const resp = await client.request("/api/auth/login", userResponseSchema, reqOpts)();
  if (resp._tag === "Right") {
    const session = await useAppSession();
    await session.update(resp.right.data);
  }
  return client.handleResponse(resp);
});
const logout_createServerFn_handler = createServerRpc("src_lib_auth_index_ts--logout_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return logout.__executeServer(opts, signal);
});
const logout = createServerFn({
  method: "GET"
}).handler(logout_createServerFn_handler, async () => {
  const session = await useAppSession();
  await session.clear();
});
const $$splitComponentImporter$4 = () => import('./logout-x4H_M1DI.mjs');
const logoutSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.string()
});
const logoutFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_logout_tsx--logoutFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return logoutFn.__executeServer(opts, signal);
});
const logoutFn = createServerFn({
  method: "GET"
}).handler(logoutFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = `/api/auth/logout`;
  const request = await client.request(url, logoutSchema)();
  console.log("API REQUEST LOGOUT: ", url);
  const response = client.handleResponse(request);
  return response;
});
const Route$4 = createFileRoute("/_authenticated/logout")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  loader: async () => {
    await Promise.all([logout(), logoutFn()]);
    throw redirect({
      to: "/login"
    });
  }
});
const $$splitComponentImporter$3 = () => import('./dashboard-CkArPomx.mjs');
const Route$3 = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const $$splitComponentImporter$2 = () => import('./index-1GifJtbQ.mjs');
const txnEntry = z$1.object({
  id: z$1.string().uuid(),
  card: z$1.string(),
  details: z$1.string(),
  amount: z$1.string(),
  sale_date: z$1.string(),
  posted_date: z$1.string(),
  user_id: z$1.number()
});
const respSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.object({
    entries: z$1.array(txnEntry),
    metadata: z$1.object({
      limit: z$1.number(),
      next_cursor: z$1.string().nullable()
    })
  })
});
const monthlyTotalAmountSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.object({
    date: z$1.string(),
    daily_spent: z$1.array(z$1.number()),
    spent_pct: z$1.string()
  })
});
const fetchTxnDailyTrendFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_index_tsx--fetchTxnDailyTrendFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchTxnDailyTrendFn.__executeServer(opts, signal);
});
const fetchTxnDailyTrendFn = createServerFn({
  method: "GET"
}).validator((data) => data).handler(fetchTxnDailyTrendFn_createServerFn_handler, async ({
  data: {
    startDate,
    endDate
  }
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = `/api/statements/month-summary-spent?start_date=${startDate}&end_date=${endDate}`;
  const request = await client.request(url, monthlyTotalAmountSchema)();
  console.log("API REQUEST LOGGING TXN REQUEST: ", url);
  const response = client.handleResponse(request);
  return response;
});
const fetchTxnsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_index_tsx--fetchTxnsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchTxnsFn.__executeServer(opts, signal);
});
const fetchTxnsFn = createServerFn({
  method: "GET"
}).validator((data) => data).handler(fetchTxnsFn_createServerFn_handler, async ({
  data: {
    page
  }
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = !page ? "/api/statements/txns?limit=50" : `/api/statements/txns?limit=50&cursor=${page}`;
  console.log("API REQUEST LOGGING TXN REQUEST: ", url);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const request = await client.request(url, respSchema)();
  const response = client.handleResponse(request);
  return response;
});
const fetchTxnQueryOpts = () => ({
  queryKey: ["txns"],
  initialPageParam: void 0,
  queryFn: ({
    pageParam
  }) => fetchTxnsFn({
    data: {
      page: pageParam
    }
  }),
  getNextPageParam: (lastPage) => {
    const metadata = lastPage?.data?.metadata;
    return metadata?.next_cursor || void 0;
  },
  onError: (error) => {
    console.log({
      error
    });
  }
});
const Route$2 = createFileRoute("/_authenticated/txns/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function TableSkeleton({
  length
}) {
  const skeletonRows = Array.from({
    length
  }, (_, index) => /* @__PURE__ */ jsxs(TableRow, { className: "odd:bg-muted/50", children: [
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "font-medium text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-52" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }) }) })
  ] }, index));
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-24" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-52" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-right font-bold", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20 " }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: skeletonRows })
  ] });
}
const $$splitComponentImporter$1 = () => import('./index-C7qaomgn.mjs');
const Route$1 = createFileRoute("/_authenticated/spending-highlights/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const fetchUserChartsOpts = (startDate, endDate) => queryOptions({
  queryKey: ["fetchUserChartsOpts", startDate, endDate],
  queryFn: () => fetchUserChartsFn({
    data: {
      startDate,
      endDate
    }
  })
});
const chartsSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.object({
    highest_purchase: z$1.string(),
    monthly_avg: z$1.string(),
    overall_amount: z$1.string(),
    ytd_amount: z$1.string(),
    monthly_expenses: z$1.array(z$1.object({
      amount: z$1.number(),
      total_txns: z$1.number(),
      month: z$1.string(),
      name: z$1.string().nullable()
    })),
    top_expenses: z$1.array(z$1.object({
      amount: z$1.number(),
      sale_date: z$1.string(),
      details: z$1.string()
    }))
  })
});
const fetchUserChartsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_spending-highlights_index_tsx--fetchUserChartsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchUserChartsFn.__executeServer(opts, signal);
});
const fetchUserChartsFn = createServerFn({
  method: "GET"
}).validator((data) => data).handler(fetchUserChartsFn_createServerFn_handler, async ({
  data: {
    startDate,
    endDate
  }
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = `/api/charts?start_date=${startDate}&end_date=${endDate}`;
  const request = await client.request(url, chartsSchema)();
  console.log("API REQUEST LOGGING USER CHARTS REQUEST: ", url);
  const response = client.handleResponse(request);
  return response;
});
const $$splitComponentImporter = () => import('./upload-Clc8x4tc.mjs');
const Route = createFileRoute("/_authenticated/txns/upload")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const listUserCardSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.array(z$1.object({
    bank: z$1.string(),
    id: z$1.string(),
    name: z$1.string()
  }))
});
const listUserCardsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--listUserCardsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return listUserCardsFn.__executeServer(opts, signal);
});
const listUserCardsFn = createServerFn({
  method: "GET"
}).handler(listUserCardsFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    method: "GET"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/cards";
  const request = await client.request(url, listUserCardSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
const uploadSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.array(z$1.any())
});
const uploadTxnsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--uploadTxnsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return uploadTxnsFn.__executeServer(opts, signal);
});
const uploadTxnsFn = createServerFn({
  method: "POST"
}).validator((input) => input).handler(uploadTxnsFn_createServerFn_handler, async ({
  data
}) => {
  if (!(data instanceof FormData)) {
    throw new Error("Invalid Form Data");
  }
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    body: data,
    method: "POST"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/upload";
  const request = await client.request(url, uploadSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
const createNewCardSchema = z$1.object({
  success: z$1.boolean(),
  data: z$1.object({
    id: z$1.string(),
    name: z$1.string(),
    bank: z$1.string()
  })
});
const createNewCardFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--createNewCardFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return createNewCardFn.__executeServer(opts, signal);
});
const createNewCardFn = createServerFn({
  method: "POST"
}).validator((input) => input).handler(createNewCardFn_createServerFn_handler, async ({
  data
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    body: {
      bank: data.bank,
      card_name: data.name
    },
    method: "POST"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/new-card";
  const request = await client.request(url, createNewCardSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
const UnathenticatedRoute = Route$9.update({
  id: "/_unathenticated",
  getParentRoute: () => Route$a
});
const AuthenticatedRoute = Route$8.update({
  id: "/_authenticated",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const UnathenticatedSignupRoute = Route$6.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => UnathenticatedRoute
});
const UnathenticatedLoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => UnathenticatedRoute
});
const AuthenticatedLogoutRoute = Route$4.update({
  id: "/logout",
  path: "/logout",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedDashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedTxnsIndexRoute = Route$2.update({
  id: "/txns/",
  path: "/txns/",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedSpendingHighlightsIndexRoute = Route$1.update({
  id: "/spending-highlights/",
  path: "/spending-highlights/",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedTxnsUploadRoute = Route.update({
  id: "/txns/upload",
  path: "/txns/upload",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedLogoutRoute,
  AuthenticatedTxnsUploadRoute,
  AuthenticatedSpendingHighlightsIndexRoute,
  AuthenticatedTxnsIndexRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const UnathenticatedRouteChildren = {
  UnathenticatedLoginRoute,
  UnathenticatedSignupRoute
};
const UnathenticatedRouteWithChildren = UnathenticatedRoute._addFileChildren(
  UnathenticatedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  UnathenticatedRoute: UnathenticatedRouteWithChildren
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const routeTree_gen = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routeTree
}, Symbol.toStringTag, { value: "Module" }));
function createRouter() {
  const router = createRouter$1({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient: void 0,
      session: void 0
    }
  });
  return router;
}
const serverEntry$1 = createStartHandler({
  createRouter
})(defaultStreamHandler);
const serverEntry = defineEventHandler(function(event) {
  const request = toWebRequest(event);
  return serverEntry$1({ request });
});

export { Route as A, Button as B, useAppSession as C, appCss as D, ThemeProvider as E, SidebarProvider as F, makeApiClient as G, API_URL as H, fetchTxnDailyTrendFn as I, fetchTxnQueryOpts as J, TableSkeleton as K, createNewCardFn as L, uploadTxnsFn as M, TooltipProvider as N, Tooltip as O, TooltipTrigger as P, TooltipContent as Q, Route$7 as R, Sidebar as S, TableRow as T, listUserCardsFn as U, SidebarHeader as a, SidebarContent as b, cn as c, SidebarGroup as d, serverEntry as default, SidebarGroupLabel as e, SidebarGroupContent as f, SidebarMenu as g, SidebarMenuItem as h, SidebarMenuButton as i, SidebarRail as j, SidebarFooter as k, createServerFn as l, logout as m, createServerRpc as n, authSchema as o, authenticateCredentialsFn as p, TableCell as q, Skeleton as r, signupFn as s, Table as t, useTheme as u, TableHeader as v, TableHead as w, TableBody as x, Route$2 as y, fetchUserChartsOpts as z };
//# sourceMappingURL=ssr.mjs.map

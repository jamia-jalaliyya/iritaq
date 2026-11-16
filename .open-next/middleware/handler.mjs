
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.16";globalThis.nextVersion = "16.4.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => !["cf-connecting-ip", "x-forwarded-host"].includes(key.toLowerCase())));
        if (eventHeaders.host) {
          headers["x-forwarded-host"] = eventHeaders.host;
        }
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0h-u1c1sve-7_.js
var require_node_modules_next_dist_esm_build_templates_edge_wrapper_0h_u1c1sve_7 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0h-u1c1sve-7_.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0h-u1c1sve-7_.js", 38022, (e, t, l) => {
      self._ENTRIES ||= {};
      let s = Promise.resolve().then(() => e.i(42738));
      s.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(s, { get(e2, t2) {
        if ("then" === t2) return (t3, l3) => e2.then(t3, l3);
        let l2 = (...l3) => e2.then((e3) => (0, e3[t2])(...l3));
        return l2.then = (l3, s2) => e2.then((e3) => e3[t2]).then(l3, s2), l2;
      } });
    }]);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__218ianxd1r9q_._.js
var require_root_of_the_server_218ianxd1r9q = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__218ianxd1r9q_._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__218ianxd1r9q_._.js", 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 99929, (e, t, r) => {
      "use strict";
      let s;
      Object.defineProperty(r, "__esModule", { value: true }), r.parseCookie = h, r.parse = h, r.stringifyCookie = function(e2, t2) {
        let r2 = t2?.encode || encodeURIComponent, s2 = [];
        for (let t3 of Object.keys(e2)) {
          let a2 = e2[t3];
          if (void 0 === a2) continue;
          if (!n.test(t3)) throw TypeError(`cookie name is invalid: ${t3}`);
          let o2 = r2(a2);
          if (!i.test(o2)) throw TypeError(`cookie val is invalid: ${a2}`);
          s2.push(`${t3}=${o2}`);
        }
        return s2.join("; ");
      }, r.stringifySetCookie = d, r.serialize = d, r.parseSetCookie = function(e2, t2) {
        let r2 = t2?.decode || m, s2 = e2.length, n2 = p(e2, 0, s2), i2 = f(e2, 0, n2), a2 = -1 === i2 ? { name: "", value: r2(g(e2, 0, n2)) } : { name: g(e2, 0, i2), value: r2(g(e2, i2 + 1, n2)) }, o2 = n2 + 1;
        for (; o2 < s2; ) {
          let t3 = p(e2, o2, s2), r3 = f(e2, o2, t3), n3 = -1 === r3 ? g(e2, o2, t3) : g(e2, o2, r3), i3 = -1 === r3 ? void 0 : g(e2, r3 + 1, t3);
          switch (n3.toLowerCase()) {
            case "httponly":
              a2.httpOnly = true;
              break;
            case "secure":
              a2.secure = true;
              break;
            case "partitioned":
              a2.partitioned = true;
              break;
            case "domain":
              a2.domain = i3;
              break;
            case "path":
              a2.path = i3;
              break;
            case "max-age":
              i3 && l.test(i3) && (a2.maxAge = Number(i3));
              break;
            case "expires":
              if (!i3) break;
              let u2 = new Date(i3);
              Number.isFinite(u2.valueOf()) && (a2.expires = u2);
              break;
            case "priority":
              if (!i3) break;
              let c2 = i3.toLowerCase();
              ("low" === c2 || "medium" === c2 || "high" === c2) && (a2.priority = c2);
              break;
            case "samesite":
              if (!i3) break;
              let h2 = i3.toLowerCase();
              ("lax" === h2 || "strict" === h2 || "none" === h2) && (a2.sameSite = h2);
          }
          o2 = t3 + 1;
        }
        return a2;
      }, r.stringifySetCookie = d, r.serialize = d;
      let n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, i = /^[\u0021-\u003A\u003C-\u007E]*$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, l = /^-?\d+$/, u = Object.prototype.toString, c = ((s = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), s);
      function h(e2, t2) {
        let r2 = new c(), s2 = e2.length;
        if (s2 < 2) return r2;
        let n2 = t2?.decode || m, i2 = 0;
        do {
          let t3 = f(e2, i2, s2);
          if (-1 === t3) break;
          let a2 = p(e2, i2, s2);
          if (t3 > a2) {
            i2 = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let o2 = g(e2, i2, t3);
          void 0 === r2[o2] && (r2[o2] = n2(g(e2, t3 + 1, a2))), i2 = a2 + 1;
        } while (i2 < s2);
        return r2;
      }
      function d(e2, t2, r2) {
        let s2 = "object" == typeof e2 ? e2 : { ...r2, name: e2, value: String(t2) }, l2 = ("object" == typeof t2 ? t2 : r2)?.encode || encodeURIComponent;
        if (!n.test(s2.name)) throw TypeError(`argument name is invalid: ${s2.name}`);
        let c2 = s2.value ? l2(s2.value) : "";
        if (!i.test(c2)) throw TypeError(`argument val is invalid: ${s2.value}`);
        let h2 = s2.name + "=" + c2;
        if (void 0 !== s2.maxAge) {
          if (!Number.isInteger(s2.maxAge)) throw TypeError(`option maxAge is invalid: ${s2.maxAge}`);
          h2 += "; Max-Age=" + s2.maxAge;
        }
        if (s2.domain) {
          if (!a.test(s2.domain)) throw TypeError(`option domain is invalid: ${s2.domain}`);
          h2 += "; Domain=" + s2.domain;
        }
        if (s2.path) {
          if (!o.test(s2.path)) throw TypeError(`option path is invalid: ${s2.path}`);
          h2 += "; Path=" + s2.path;
        }
        if (s2.expires) {
          var d2;
          if (d2 = s2.expires, "[object Date]" !== u.call(d2) || !Number.isFinite(s2.expires.valueOf())) throw TypeError(`option expires is invalid: ${s2.expires}`);
          h2 += "; Expires=" + s2.expires.toUTCString();
        }
        if (s2.httpOnly && (h2 += "; HttpOnly"), s2.secure && (h2 += "; Secure"), s2.partitioned && (h2 += "; Partitioned"), s2.priority) switch ("string" == typeof s2.priority ? s2.priority.toLowerCase() : void 0) {
          case "low":
            h2 += "; Priority=Low";
            break;
          case "medium":
            h2 += "; Priority=Medium";
            break;
          case "high":
            h2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${s2.priority}`);
        }
        if (s2.sameSite) switch ("string" == typeof s2.sameSite ? s2.sameSite.toLowerCase() : s2.sameSite) {
          case true:
          case "strict":
            h2 += "; SameSite=Strict";
            break;
          case "lax":
            h2 += "; SameSite=Lax";
            break;
          case "none":
            h2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${s2.sameSite}`);
        }
        return h2;
      }
      function p(e2, t2, r2) {
        let s2 = e2.indexOf(";", t2);
        return -1 === s2 ? r2 : s2;
      }
      function f(e2, t2, r2) {
        let s2 = e2.indexOf("=", t2);
        return s2 < r2 ? s2 : -1;
      }
      function g(e2, t2, r2) {
        let s2 = t2, n2 = r2;
        do {
          let t3 = e2.charCodeAt(s2);
          if (32 !== t3 && 9 !== t3) break;
        } while (++s2 < n2);
        for (; n2 > s2; ) {
          let t3 = e2.charCodeAt(n2 - 1);
          if (32 !== t3 && 9 !== t3) break;
          n2--;
        }
        return e2.slice(s2, n2);
      }
      function m(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 28042, (e, t, r) => {
      "use strict";
      var s = Object.defineProperty, n = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, o = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => h, parseSetCookie: () => d, stringifyCookie: () => c };
      for (var u in l) s(o, u, { get: l[u], enumerable: true });
      function c(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), s2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? s2 : `${s2}; ${r2.join("; ")}`;
      }
      function h(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [s2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(s2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function d(e2) {
        if (!e2) return;
        let [[t2, r2], ...s2] = h(e2), { domain: n2, expires: i2, httponly: a2, maxage: o2, path: l2, samesite: u2, secure: c2, partitioned: d2, priority: g2 } = Object.fromEntries(s2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, y, b = { name: t2, value: decodeURIComponent(r2), domain: n2, ...i2 && { expires: new Date(i2) }, ...a2 && { httpOnly: true }, ..."string" == typeof o2 && { maxAge: Number(o2) }, path: l2, ...u2 && { sameSite: p.includes(m2 = (m2 = u2).toLowerCase()) ? m2 : void 0 }, ...c2 && { secure: true }, ...g2 && { priority: f.includes(y = (y = g2).toLowerCase()) ? y : void 0 }, ...d2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let o2 of i(t2)) a.call(e2, o2) || void 0 === o2 || s(e2, o2, { get: () => t2[o2], enumerable: !(r2 = n(t2, o2)) || r2.enumerable });
        return e2;
      })(s({}, "__esModule", { value: true }), o);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of h(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === s2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, s2 = this._parsed;
          return s2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(s2).map(([e3, t3]) => c(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => c(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, s2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let n2 = null != (s2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? s2 : [];
          for (let e3 of Array.isArray(n2) ? n2 : (function(e4) {
            if (!e4) return [];
            var t3, r3, s3, n3, i2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (s3 = o2, o2 += 1, l2(), n3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (i2 = true, o2 = n3, a2.push(e4.substring(t3, s3)), t3 = o2) : o2 = s3 + 1;
              } else o2 += 1;
              (!i2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          })(n2)) {
            let t3 = d(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === s2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, s2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, (function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          })({ name: t2, value: r2, ...s2 })), (function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = c(r3);
              t3.append("set-cookie", e4);
            }
          })(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(c).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, s, n, i, a;
        var o, l, u, c, h, d, p, f, g, m, y, b, v, w, _, S, k = { 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let s2 = r3(108), n2 = r3(221), i2 = r3(44), a2 = "context", o2 = new s2.NoopContextManager();
          t2.ContextAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalContextManager(e4) {
              return (0, n2.registerGlobal)(a2, e4, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e4, t3, r4, ...s3) {
              return this._getContextManager().with(e4, t3, r4, ...s3);
            }
            bind(e4, t3) {
              return this._getContextManager().bind(e4, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(a2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          };
        }, 44: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let s2 = r3(757), n2 = r3(412), i2 = r3(711), a2 = r3(221);
          t2.DiagAPI = class e3 {
            constructor() {
              function e4(e5) {
                return function(...t4) {
                  let r4 = (0, a2.getGlobal)("diag");
                  if (r4) return r4[e5](...t4);
                };
              }
              let t3 = this;
              t3.setLogger = (e5, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var s3, o2, l2;
                if (e5 === t3) {
                  let e6 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (s3 = e6.stack) ? s3 : e6.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let u2 = (0, a2.getGlobal)("diag"), c2 = (0, n2.createLogLevelDiagLogger)(null != (o2 = r4.logLevel) ? o2 : i2.DiagLogLevel.INFO, e5);
                if (u2 && !r4.suppressOverrideMessage) {
                  let e6 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  u2.warn(`Current logger will be overwritten from ${e6}`), c2.warn(`Current logger will overwrite one already registered from ${e6}`);
                }
                return (0, a2.registerGlobal)("diag", c2, t3, true);
              }, t3.disable = () => {
                (0, a2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e5) => new s2.DiagComponentLogger(e5), t3.verbose = e4("verbose"), t3.debug = e4("debug"), t3.info = e4("info"), t3.warn = e4("warn"), t3.error = e4("error");
            }
            static instance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
          };
        }, 262: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let s2 = r3(586), n2 = r3(221), i2 = r3(44), a2 = "metrics";
          t2.MetricsAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalMeterProvider(e4) {
              return (0, n2.registerGlobal)(a2, e4, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(a2) || s2.NOOP_METER_PROVIDER;
            }
            getMeter(e4, t3, r4) {
              return this.getMeterProvider().getMeter(e4, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          };
        }, 25: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let s2 = r3(221), n2 = r3(19), i2 = r3(92), a2 = r3(398), o2 = r3(504), l2 = r3(44), u2 = "propagation", c2 = new n2.NoopTextMapPropagator();
          t2.PropagationAPI = class e3 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = a2.getBaggage, this.getActiveBaggage = a2.getActiveBaggage, this.setBaggage = a2.setBaggage, this.deleteBaggage = a2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalPropagator(e4) {
              return (0, s2.registerGlobal)(u2, e4, l2.DiagAPI.instance());
            }
            inject(e4, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e4, t3, r4);
            }
            extract(e4, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e4, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, s2.unregisterGlobal)(u2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, s2.getGlobal)(u2) || c2;
            }
          };
        }, 397: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let s2 = r3(221), n2 = r3(498), i2 = r3(477), a2 = r3(793), o2 = r3(44), l2 = "trace";
          t2.TraceAPI = class e3 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = a2.deleteSpan, this.getSpan = a2.getSpan, this.getActiveSpan = a2.getActiveSpan, this.getSpanContext = a2.getSpanContext, this.setSpan = a2.setSpan, this.setSpanContext = a2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalTracerProvider(e4) {
              let t3 = (0, s2.registerGlobal)(l2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e4), t3;
            }
            getTracerProvider() {
              return (0, s2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e4, t3) {
              return this.getTracerProvider().getTracer(e4, t3);
            }
            disable() {
              (0, s2.unregisterGlobal)(l2, o2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          };
        }, 398: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let s2 = r3(912), n2 = (0, r3(23).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(s2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 152: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0, t2.BaggageImpl = class e3 {
            constructor(e4) {
              this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
            }
            getEntry(e4) {
              let t3 = this._entries.get(e4);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e4, t3]) => [e4, t3]);
            }
            setEntry(t3, r3) {
              let s2 = new e3(this._entries);
              return s2._entries.set(t3, r3), s2;
            }
            removeEntry(t3) {
              let r3 = new e3(this._entries);
              return r3._entries.delete(t3), r3;
            }
            removeEntries(...t3) {
              let r3 = new e3(this._entries);
              for (let e4 of t3) r3._entries.delete(e4);
              return r3;
            }
            clear() {
              return new e3();
            }
          };
        }, 647: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");
        }, 504: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let s2 = r3(44), n2 = r3(152), i2 = r3(647), a2 = s2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 778: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(912).ContextAPI.getInstance();
        }, 108: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let s2 = r3(23);
          t2.NoopContextManager = class {
            active() {
              return s2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...s3) {
              return t3.call(r4, ...s3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 23: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          }, t2.ROOT_CONTEXT = new class e3 {
            constructor(t3) {
              let r3 = this;
              r3._currentContext = t3 ? new Map(t3) : /* @__PURE__ */ new Map(), r3.getValue = (e4) => r3._currentContext.get(e4), r3.setValue = (t4, s2) => {
                let n2 = new e3(r3._currentContext);
                return n2._currentContext.set(t4, s2), n2;
              }, r3.deleteValue = (t4) => {
                let s2 = new e3(r3._currentContext);
                return s2._currentContext.delete(t4), s2;
              };
            }
          }();
        }, 304: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(44).DiagAPI.instance();
        }, 757: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let s2 = r3(221);
          function n2(e3, t3, r4) {
            let n3 = (0, s2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 83: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ (function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              })(r3[e3].c);
            }
          };
        }, 412: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let s2 = r3(711);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, s3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= s3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < s2.DiagLogLevel.NONE ? e3 = s2.DiagLogLevel.NONE : e3 > s2.DiagLogLevel.ALL && (e3 = s2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", s2.DiagLogLevel.ERROR), warn: r4("warn", s2.DiagLogLevel.WARN), info: r4("info", s2.DiagLogLevel.INFO), debug: r4("debug", s2.DiagLogLevel.DEBUG), verbose: r4("verbose", s2.DiagLogLevel.VERBOSE) };
          };
        }, 711: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 221: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let s2 = r3(678), n2 = r3(652), i2 = r3(662), a2 = n2.VERSION.split(".")[0], o2 = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${a2}`), l2 = s2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, s3 = false) {
            var i3;
            let a3 = l2[o2] = null != (i3 = l2[o2]) ? i3 : { version: n2.VERSION };
            if (!s3 && a3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let s3 = null == (t3 = l2[o2]) ? void 0 : t3.version;
            if (s3 && (0, i2.isCompatible)(s3)) return null == (r4 = l2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[o2];
            r4 && delete r4[e3];
          };
        }, 662: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let s2 = r3(652), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), s3 = e3.match(n2);
            if (!s3) return () => false;
            let i3 = { major: +s3[1], minor: +s3[2], patch: +s3[3], prerelease: s3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let s4 = e4.match(n2);
              if (!s4) return a2(e4);
              let o2 = { major: +s4[1], minor: +s4[2], patch: +s4[3], prerelease: s4[4] };
              if (null != o2.prerelease || i3.major !== o2.major) return a2(e4);
              if (0 === i3.major) return i3.minor === o2.minor && i3.patch <= o2.patch ? (t3.add(e4), true) : a2(e4);
              return i3.minor <= o2.minor ? (t3.add(e4), true) : a2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(s2.VERSION);
        }, 120: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(262).MetricsAPI.getInstance();
        }, 532: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 440: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class s2 {
          }
          t2.NoopMetric = s2;
          class n2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class i2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class a2 extends s2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class l2 extends o2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class u2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = u2;
          class c2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = c2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new a2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new u2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 586: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let s2 = r3(440);
          class n2 {
            getMeter(e3, t3, r4) {
              return s2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 678: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(59), t2);
        }, 460: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 59: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(460), t2);
        }, 27: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(25).PropagationAPI.getInstance();
        }, 19: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 92: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 816: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(397).TraceAPI.getInstance();
        }, 374: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let s2 = r3(546);
          t2.NonRecordingSpan = class {
            constructor(e3 = s2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 637: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let s2 = r3(912), n2 = r3(793), i2 = r3(374), a2 = r3(477), o2 = s2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var s3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (s3 = l2) && "string" == typeof s3.spanId && "string" == typeof s3.traceId && "number" == typeof s3.traceFlags && (0, a2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, s3) {
              let i3, a3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, a3 = r4, l2 = s3);
              let u2 = null != a3 ? a3 : o2.active(), c2 = this.startSpan(e3, i3, u2), h2 = (0, n2.setSpan)(u2, c2);
              return o2.with(h2, l2, void 0, c2);
            }
          };
        }, 76: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let s2 = r3(637);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new s2.NoopTracer();
            }
          };
        }, 779: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let s2 = new (r3(637)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, s3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = s3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, s3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : s2;
            }
          };
        }, 498: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let s2 = r3(779), n2 = new (r3(76)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new s2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var s3;
              return null == (s3 = this._delegate) ? void 0 : s3.getTracer(e3, t3, r4);
            }
          };
        }, 312: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 793: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let s2 = r3(23), n2 = r3(374), i2 = r3(912), a2 = (0, s2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(a2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(a2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 285: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let s2 = r3(240);
          t2.TraceStateImpl = class e3 {
            constructor(e4) {
              this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
            }
            set(e4, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e4) && r4._internalState.delete(e4), r4._internalState.set(e4, t3), r4;
            }
            unset(e4) {
              let t3 = this._clone();
              return t3._internalState.delete(e4), t3;
            }
            get(e4) {
              return this._internalState.get(e4);
            }
            serialize() {
              return this._keys().reduce((e4, t3) => (e4.push(t3 + "=" + this.get(t3)), e4), []).join(",");
            }
            _parse(e4) {
              !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce((e5, t3) => {
                let r4 = t3.trim(), n2 = r4.indexOf("=");
                if (-1 !== n2) {
                  let i2 = r4.slice(0, n2), a2 = r4.slice(n2 + 1, t3.length);
                  (0, s2.validateKey)(i2) && (0, s2.validateValue)(a2) && e5.set(i2, a2);
                }
                return e5;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let t3 = new e3();
              return t3._internalState = new Map(this._internalState), t3;
            }
          };
        }, 240: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", s2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${s2}|${n2})$`), a2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return a2.test(e3) && !o2.test(e3);
          };
        }, 87: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let s2 = r3(285);
          t2.createTraceState = function(e3) {
            return new s2.TraceStateImpl(e3);
          };
        }, 546: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let s2 = r3(731);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: s2.TraceFlags.NONE };
        }, 613: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 477: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let s2 = r3(546), n2 = r3(374), i2 = /^([0-9a-f]{32})$/i, a2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return i2.test(e3) && e3 !== s2.INVALID_TRACEID;
          }
          function l2(e3) {
            return a2.test(e3) && e3 !== s2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 854: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 731: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 652: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, E = {};
        function T(e2) {
          var t2 = E[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = E[e2] = { exports: {} }, s2 = true;
          try {
            k[e2].call(r3.exports, r3, r3.exports, T), s2 = false;
          } finally {
            s2 && delete E[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var x = {};
        Object.defineProperty(x, "__esModule", { value: true }), x.trace = x.propagation = x.metrics = x.diag = x.context = x.INVALID_SPAN_CONTEXT = x.INVALID_TRACEID = x.INVALID_SPANID = x.isValidSpanId = x.isValidTraceId = x.isSpanContextValid = x.createTraceState = x.TraceFlags = x.SpanStatusCode = x.SpanKind = x.SamplingDecision = x.ProxyTracerProvider = x.ProxyTracer = x.defaultTextMapSetter = x.defaultTextMapGetter = x.ValueType = x.createNoopMeter = x.DiagLogLevel = x.DiagConsoleLogger = x.ROOT_CONTEXT = x.createContextKey = x.baggageEntryMetadataFromString = void 0, o = T(504), Object.defineProperty(x, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), l = T(23), Object.defineProperty(x, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(x, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), u = T(83), Object.defineProperty(x, "DiagConsoleLogger", { enumerable: true, get: function() {
          return u.DiagConsoleLogger;
        } }), c = T(711), Object.defineProperty(x, "DiagLogLevel", { enumerable: true, get: function() {
          return c.DiagLogLevel;
        } }), h = T(440), Object.defineProperty(x, "createNoopMeter", { enumerable: true, get: function() {
          return h.createNoopMeter;
        } }), d = T(532), Object.defineProperty(x, "ValueType", { enumerable: true, get: function() {
          return d.ValueType;
        } }), p = T(92), Object.defineProperty(x, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(x, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(779), Object.defineProperty(x, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = T(498), Object.defineProperty(x, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = T(312), Object.defineProperty(x, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), y = T(613), Object.defineProperty(x, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), b = T(854), Object.defineProperty(x, "SpanStatusCode", { enumerable: true, get: function() {
          return b.SpanStatusCode;
        } }), v = T(731), Object.defineProperty(x, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), w = T(87), Object.defineProperty(x, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), _ = T(477), Object.defineProperty(x, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(x, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(x, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), S = T(546), Object.defineProperty(x, "INVALID_SPANID", { enumerable: true, get: function() {
          return S.INVALID_SPANID;
        } }), Object.defineProperty(x, "INVALID_TRACEID", { enumerable: true, get: function() {
          return S.INVALID_TRACEID;
        } }), Object.defineProperty(x, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return S.INVALID_SPAN_CONTEXT;
        } }), r2 = T(778), Object.defineProperty(x, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), s = T(304), Object.defineProperty(x, "diag", { enumerable: true, get: function() {
          return s.diag;
        } }), n = T(120), Object.defineProperty(x, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), i = T(27), Object.defineProperty(x, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), a = T(816), Object.defineProperty(x, "trace", { enumerable: true, get: function() {
          return a.trace;
        } }), x.default = { context: r2.context, diag: s.diag, metrics: n.metrics, propagation: i.propagation, trace: a.trace }, t.exports = x;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, s, n, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, i2 = t2.split(s), a = (r3 || {}).decode || e2, o = 0; o < i2.length; o++) {
            var l = i2[o], u = l.indexOf("=");
            if (!(u < 0)) {
              var c = l.substr(0, u).trim(), h = l.substr(++u, l.length).trim();
              '"' == h[0] && (h = h.slice(1, -1)), void 0 == n2[c] && (n2[c] = (function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              })(h, a));
            }
          }
          return n2;
        }, i.serialize = function(e3, t2, s2) {
          var i2 = s2 || {}, a = i2.encode || r2;
          if ("function" != typeof a) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var o = a(t2);
          if (o && !n.test(o)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + o;
          if (null != i2.maxAge) {
            var u = i2.maxAge - 0;
            if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(u);
          }
          if (i2.domain) {
            if (!n.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!n.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, s = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 63398, (e, t, r) => {
      var s = { 226: (e2, t2, r2) => {
        "use strict";
        var s2 = r2(302), n2 = r2(551);
        function i2() {
          this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
        }
        t2.BlockHash = i2, i2.prototype.update = function(e3, t3) {
          if (e3 = s2.toArray(e3, t3), this.pending ? this.pending = this.pending.concat(e3) : this.pending = e3, this.pendingTotal += e3.length, this.pending.length >= this._delta8) {
            var r3 = (e3 = this.pending).length % this._delta8;
            this.pending = e3.slice(e3.length - r3, e3.length), 0 === this.pending.length && (this.pending = null), e3 = s2.join32(e3, 0, e3.length - r3, this.endian);
            for (var n3 = 0; n3 < e3.length; n3 += this._delta32) this._update(e3, n3, n3 + this._delta32);
          }
          return this;
        }, i2.prototype.digest = function(e3) {
          return this.update(this._pad()), n2(null === this.pending), this._digest(e3);
        }, i2.prototype._pad = function() {
          var e3 = this.pendingTotal, t3 = this._delta8, r3 = t3 - (e3 + this.padLength) % t3, s3 = Array(r3 + this.padLength);
          s3[0] = 128;
          for (var n3 = 1; n3 < r3; n3++) s3[n3] = 0;
          if (e3 <<= 3, "big" === this.endian) {
            for (var i3 = 8; i3 < this.padLength; i3++) s3[n3++] = 0;
            s3[n3++] = 0, s3[n3++] = 0, s3[n3++] = 0, s3[n3++] = 0, s3[n3++] = e3 >>> 24 & 255, s3[n3++] = e3 >>> 16 & 255, s3[n3++] = e3 >>> 8 & 255, s3[n3++] = 255 & e3;
          } else for (s3[n3++] = 255 & e3, s3[n3++] = e3 >>> 8 & 255, s3[n3++] = e3 >>> 16 & 255, s3[n3++] = e3 >>> 24 & 255, s3[n3++] = 0, s3[n3++] = 0, s3[n3++] = 0, s3[n3++] = 0, i3 = 8; i3 < this.padLength; i3++) s3[n3++] = 0;
          return s3;
        };
      }, 563: (e2, t2, r2) => {
        "use strict";
        var s2 = r2(302), n2 = r2(226), i2 = r2(101), a = r2(551), o = s2.sum32, l = s2.sum32_4, u = s2.sum32_5, c = i2.ch32, h = i2.maj32, d = i2.s0_256, p = i2.s1_256, f = i2.g0_256, g = i2.g1_256, m = n2.BlockHash, y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function b() {
          if (!(this instanceof b)) return new b();
          m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = y, this.W = Array(64);
        }
        s2.inherits(b, m), e2.exports = b, b.blockSize = 512, b.outSize = 256, b.hmacStrength = 192, b.padLength = 64, b.prototype._update = function(e3, t3) {
          for (var r3 = this.W, s3 = 0; s3 < 16; s3++) r3[s3] = e3[t3 + s3];
          for (; s3 < r3.length; s3++) r3[s3] = l(g(r3[s3 - 2]), r3[s3 - 7], f(r3[s3 - 15]), r3[s3 - 16]);
          var n3 = this.h[0], i3 = this.h[1], m2 = this.h[2], y2 = this.h[3], b2 = this.h[4], v = this.h[5], w = this.h[6], _ = this.h[7];
          for (a(this.k.length === r3.length), s3 = 0; s3 < r3.length; s3++) {
            var S = u(_, p(b2), c(b2, v, w), this.k[s3], r3[s3]), k = o(d(n3), h(n3, i3, m2));
            _ = w, w = v, v = b2, b2 = o(y2, S), y2 = m2, m2 = i3, i3 = n3, n3 = o(S, k);
          }
          this.h[0] = o(this.h[0], n3), this.h[1] = o(this.h[1], i3), this.h[2] = o(this.h[2], m2), this.h[3] = o(this.h[3], y2), this.h[4] = o(this.h[4], b2), this.h[5] = o(this.h[5], v), this.h[6] = o(this.h[6], w), this.h[7] = o(this.h[7], _);
        }, b.prototype._digest = function(e3) {
          return "hex" === e3 ? s2.toHex32(this.h, "big") : s2.split32(this.h, "big");
        };
      }, 101: (e2, t2, r2) => {
        "use strict";
        var s2 = r2(302).rotr32;
        function n2(e3, t3, r3) {
          return e3 & t3 ^ e3 & r3 ^ t3 & r3;
        }
        t2.ft_1 = function(e3, t3, r3, s3) {
          var i2;
          return 0 === e3 ? (i2 = t3) & r3 ^ ~i2 & s3 : 1 === e3 || 3 === e3 ? t3 ^ r3 ^ s3 : 2 === e3 ? n2(t3, r3, s3) : void 0;
        }, t2.ch32 = function(e3, t3, r3) {
          return e3 & t3 ^ ~e3 & r3;
        }, t2.maj32 = n2, t2.p32 = function(e3, t3, r3) {
          return e3 ^ t3 ^ r3;
        }, t2.s0_256 = function(e3) {
          return s2(e3, 2) ^ s2(e3, 13) ^ s2(e3, 22);
        }, t2.s1_256 = function(e3) {
          return s2(e3, 6) ^ s2(e3, 11) ^ s2(e3, 25);
        }, t2.g0_256 = function(e3) {
          return s2(e3, 7) ^ s2(e3, 18) ^ e3 >>> 3;
        }, t2.g1_256 = function(e3) {
          return s2(e3, 17) ^ s2(e3, 19) ^ e3 >>> 10;
        };
      }, 302: (e2, t2, r2) => {
        "use strict";
        var s2 = r2(551);
        function n2(e3) {
          return (e3 >>> 24 | e3 >>> 8 & 65280 | e3 << 8 & 16711680 | (255 & e3) << 24) >>> 0;
        }
        function i2(e3) {
          return 1 === e3.length ? "0" + e3 : e3;
        }
        function a(e3) {
          if (7 === e3.length) return "0" + e3;
          if (6 === e3.length) return "00" + e3;
          if (5 === e3.length) return "000" + e3;
          if (4 === e3.length) return "0000" + e3;
          if (3 === e3.length) return "00000" + e3;
          else if (2 === e3.length) return "000000" + e3;
          else if (1 === e3.length) return "0000000" + e3;
          else return e3;
        }
        t2.inherits = r2(638), t2.toArray = function(e3, t3) {
          if (Array.isArray(e3)) return e3.slice();
          if (!e3) return [];
          var r3 = [];
          if ("string" == typeof e3) if (t3) {
            if ("hex" === t3) for ((e3 = e3.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e3 = "0" + e3), n3 = 0; n3 < e3.length; n3 += 2) r3.push(parseInt(e3[n3] + e3[n3 + 1], 16));
          } else for (var s3 = 0, n3 = 0; n3 < e3.length; n3++) {
            var i3, a2, o = e3.charCodeAt(n3);
            o < 128 ? r3[s3++] = o : (o < 2048 ? r3[s3++] = o >> 6 | 192 : ((i3 = e3, a2 = n3, (64512 & i3.charCodeAt(a2)) != 55296 || a2 < 0 || a2 + 1 >= i3.length ? 1 : (64512 & i3.charCodeAt(a2 + 1)) != 56320) ? r3[s3++] = o >> 12 | 224 : (o = 65536 + ((1023 & o) << 10) + (1023 & e3.charCodeAt(++n3)), r3[s3++] = o >> 18 | 240, r3[s3++] = o >> 12 & 63 | 128), r3[s3++] = o >> 6 & 63 | 128), r3[s3++] = 63 & o | 128);
          }
          else for (n3 = 0; n3 < e3.length; n3++) r3[n3] = 0 | e3[n3];
          return r3;
        }, t2.toHex = function(e3) {
          for (var t3 = "", r3 = 0; r3 < e3.length; r3++) t3 += i2(e3[r3].toString(16));
          return t3;
        }, t2.htonl = n2, t2.toHex32 = function(e3, t3) {
          for (var r3 = "", s3 = 0; s3 < e3.length; s3++) {
            var i3 = e3[s3];
            "little" === t3 && (i3 = n2(i3)), r3 += a(i3.toString(16));
          }
          return r3;
        }, t2.zero2 = i2, t2.zero8 = a, t2.join32 = function(e3, t3, r3, n3) {
          var i3, a2 = r3 - t3;
          s2(a2 % 4 == 0);
          for (var o = Array(a2 / 4), l = 0, u = t3; l < o.length; l++, u += 4) i3 = "big" === n3 ? e3[u] << 24 | e3[u + 1] << 16 | e3[u + 2] << 8 | e3[u + 3] : e3[u + 3] << 24 | e3[u + 2] << 16 | e3[u + 1] << 8 | e3[u], o[l] = i3 >>> 0;
          return o;
        }, t2.split32 = function(e3, t3) {
          for (var r3 = Array(4 * e3.length), s3 = 0, n3 = 0; s3 < e3.length; s3++, n3 += 4) {
            var i3 = e3[s3];
            "big" === t3 ? (r3[n3] = i3 >>> 24, r3[n3 + 1] = i3 >>> 16 & 255, r3[n3 + 2] = i3 >>> 8 & 255, r3[n3 + 3] = 255 & i3) : (r3[n3 + 3] = i3 >>> 24, r3[n3 + 2] = i3 >>> 16 & 255, r3[n3 + 1] = i3 >>> 8 & 255, r3[n3] = 255 & i3);
          }
          return r3;
        }, t2.rotr32 = function(e3, t3) {
          return e3 >>> t3 | e3 << 32 - t3;
        }, t2.rotl32 = function(e3, t3) {
          return e3 << t3 | e3 >>> 32 - t3;
        }, t2.sum32 = function(e3, t3) {
          return e3 + t3 >>> 0;
        }, t2.sum32_3 = function(e3, t3, r3) {
          return e3 + t3 + r3 >>> 0;
        }, t2.sum32_4 = function(e3, t3, r3, s3) {
          return e3 + t3 + r3 + s3 >>> 0;
        }, t2.sum32_5 = function(e3, t3, r3, s3, n3) {
          return e3 + t3 + r3 + s3 + n3 >>> 0;
        }, t2.sum64 = function(e3, t3, r3, s3) {
          var n3 = e3[t3], i3 = s3 + e3[t3 + 1] >>> 0;
          e3[t3] = +(i3 < s3) + r3 + n3 >>> 0, e3[t3 + 1] = i3;
        }, t2.sum64_hi = function(e3, t3, r3, s3) {
          return +(t3 + s3 >>> 0 < t3) + e3 + r3 >>> 0;
        }, t2.sum64_lo = function(e3, t3, r3, s3) {
          return t3 + s3 >>> 0;
        }, t2.sum64_4_hi = function(e3, t3, r3, s3, n3, i3, a2, o) {
          var l, u = t3;
          return e3 + r3 + n3 + a2 + (l = 0 + +((u = u + s3 >>> 0) < t3) + +((u = u + i3 >>> 0) < i3) + +((u = u + o >>> 0) < o)) >>> 0;
        }, t2.sum64_4_lo = function(e3, t3, r3, s3, n3, i3, a2, o) {
          return t3 + s3 + i3 + o >>> 0;
        }, t2.sum64_5_hi = function(e3, t3, r3, s3, n3, i3, a2, o, l, u) {
          var c, h = t3;
          return e3 + r3 + n3 + a2 + l + (c = 0 + +((h = h + s3 >>> 0) < t3) + +((h = h + i3 >>> 0) < i3) + +((h = h + o >>> 0) < o) + +((h = h + u >>> 0) < u)) >>> 0;
        }, t2.sum64_5_lo = function(e3, t3, r3, s3, n3, i3, a2, o, l, u) {
          return t3 + s3 + i3 + o + u >>> 0;
        }, t2.rotr64_hi = function(e3, t3, r3) {
          return (t3 << 32 - r3 | e3 >>> r3) >>> 0;
        }, t2.rotr64_lo = function(e3, t3, r3) {
          return (e3 << 32 - r3 | t3 >>> r3) >>> 0;
        }, t2.shr64_hi = function(e3, t3, r3) {
          return e3 >>> r3;
        }, t2.shr64_lo = function(e3, t3, r3) {
          return (e3 << 32 - r3 | t3 >>> r3) >>> 0;
        };
      }, 638: (e2) => {
        "function" == typeof Object.create ? e2.exports = function(e3, t2) {
          t2 && (e3.super_ = t2, e3.prototype = Object.create(t2.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }));
        } : e2.exports = function(e3, t2) {
          if (t2) {
            e3.super_ = t2;
            var r2 = function() {
            };
            r2.prototype = t2.prototype, e3.prototype = new r2(), e3.prototype.constructor = e3;
          }
        };
      }, 551: (e2) => {
        function t2(e3, t3) {
          if (!e3) throw Error(t3 || "Assertion failed");
        }
        e2.exports = t2, t2.equal = function(e3, t3, r2) {
          if (e3 != t3) throw Error(r2 || "Assertion failed: " + e3 + " != " + t3);
        };
      } }, n = {};
      function i(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, a = true;
        try {
          s[e2](r2, r2.exports, i), a = false;
        } finally {
          a && delete n[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/hash.js/sha256/", t.exports = i(563);
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, s, n, i;
        var a = { 234: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function s2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, s3, i3, a3) {
            if ("function" != typeof s3) throw TypeError("The listener must be a function");
            var o3 = new n2(s3, i3 || e4, a3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], o3] : e4._events[l2].push(o3) : (e4._events[l2] = o3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new s2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new s2(), this._eventsCount = 0;
          }
          Object.create && (s2.prototype = /* @__PURE__ */ Object.create(null), new s2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, s3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (s3 in e4 = this._events) t2.call(e4, s3) && n3.push(r3 ? s3.slice(1) : s3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            if (!s3) return [];
            if (s3.fn) return [s3.fn];
            for (var n3 = 0, i3 = s3.length, a3 = Array(i3); n3 < i3; n3++) a3[n3] = s3[n3].fn;
            return a3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            return s3 ? s3.fn ? 1 : s3.length : 0;
          }, o2.prototype.emit = function(e4, t3, s3, n3, i3, a3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var l2, u2, c = this._events[o3], h = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e4, c.fn, void 0, true), h) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, s3), true;
                case 4:
                  return c.fn.call(c.context, t3, s3, n3), true;
                case 5:
                  return c.fn.call(c.context, t3, s3, n3, i3), true;
                case 6:
                  return c.fn.call(c.context, t3, s3, n3, i3, a3), true;
              }
              for (u2 = 1, l2 = Array(h - 1); u2 < h; u2++) l2[u2 - 1] = arguments[u2];
              c.fn.apply(c.context, l2);
            } else {
              var d, p = c.length;
              for (u2 = 0; u2 < p; u2++) switch (c[u2].once && this.removeListener(e4, c[u2].fn, void 0, true), h) {
                case 1:
                  c[u2].fn.call(c[u2].context);
                  break;
                case 2:
                  c[u2].fn.call(c[u2].context, t3);
                  break;
                case 3:
                  c[u2].fn.call(c[u2].context, t3, s3);
                  break;
                case 4:
                  c[u2].fn.call(c[u2].context, t3, s3, n3);
                  break;
                default:
                  if (!l2) for (d = 1, l2 = Array(h - 1); d < h; d++) l2[d - 1] = arguments[d];
                  c[u2].fn.apply(c[u2].context, l2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, s3, n3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return a2(this, i3), this;
            var o3 = this._events[i3];
            if (o3.fn) o3.fn !== t3 || n3 && !o3.once || s3 && o3.context !== s3 || a2(this, i3);
            else {
              for (var l2 = 0, u2 = [], c = o3.length; l2 < c; l2++) (o3[l2].fn !== t3 || n3 && !o3[l2].once || s3 && o3[l2].context !== s3) && u2.push(o3[l2]);
              u2.length ? this._events[i3] = 1 === u2.length ? u2[0] : u2 : a2(this, i3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new s2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 274: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 294: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let s2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let i2 = n2 / 2 | 0, a2 = s2 + i2;
              0 >= r3(e4[a2], t3) ? (s2 = ++a2, n2 -= i2 + 1) : n2 = i2;
            }
            return s2;
          };
        }, 838: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let s2 = r3(294);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = s2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 138: (e3, t2, r3) => {
          let s2 = r3(274);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, a2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (1 / 0 === t3) return void i3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              let s3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new n2(s3);
              "function" == typeof e4.cancel && e4.cancel(), a2(o3);
            }, t3);
            s2(e4.then(i3, a2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = n2;
        } }, o = {};
        function l(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, s2 = true;
          try {
            a[e3](r3, r3.exports, l), s2 = false;
          } finally {
            s2 && delete o[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var u = {};
        Object.defineProperty(u, "__esModule", { value: true }), e2 = l(234), r2 = l(138), s = l(838), n = () => {
        }, i = new r2.TimeoutError(), u.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: s.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = 1 / 0 === e3.intervalCap || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((s2, n2) => {
              let a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(i);
                  });
                  s2(await a3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = u;
      })();
    }, 54846, (e, t, r) => {
      !(function() {
        "use strict";
        var e2 = { 431: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, s3 = "", n = 0, i = -1, a = 0, o = 0; o <= e4.length; ++o) {
              if (o < e4.length) r4 = e4.charCodeAt(o);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (i === o - 1 || 1 === a) ;
                else if (i !== o - 1 && 2 === a) {
                  if (s3.length < 2 || 2 !== n || 46 !== s3.charCodeAt(s3.length - 1) || 46 !== s3.charCodeAt(s3.length - 2)) {
                    if (s3.length > 2) {
                      var l = s3.lastIndexOf("/");
                      if (l !== s3.length - 1) {
                        -1 === l ? (s3 = "", n = 0) : n = (s3 = s3.slice(0, l)).length - 1 - s3.lastIndexOf("/"), i = o, a = 0;
                        continue;
                      }
                    } else if (2 === s3.length || 1 === s3.length) {
                      s3 = "", n = 0, i = o, a = 0;
                      continue;
                    }
                  }
                  t3 && (s3.length > 0 ? s3 += "/.." : s3 = "..", n = 2);
                } else s3.length > 0 ? s3 += "/" + e4.slice(i + 1, o) : s3 = e4.slice(i + 1, o), n = o - i - 1;
                i = o, a = 0;
              } else 46 === r4 && -1 !== a ? ++a : a = -1;
            }
            return s3;
          }
          var s2 = { resolve: function() {
            for (var e4, s3, n = "", i = false, a = arguments.length - 1; a >= -1 && !i; a--) a >= 0 ? s3 = arguments[a] : (void 0 === e4 && (e4 = ""), s3 = e4), t2(s3), 0 !== s3.length && (n = s3 + "/" + n, i = 47 === s3.charCodeAt(0));
            if (n = r3(n, !i), i) if (n.length > 0) return "/" + n;
            else return "/";
            return n.length > 0 ? n : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var s3 = 47 === e4.charCodeAt(0), n = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !s3)).length || s3 || (e4 = "."), e4.length > 0 && n && (e4 += "/"), s3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var n = arguments[r4];
              t2(n), n.length > 0 && (void 0 === e4 ? e4 = n : e4 += "/" + n);
            }
            return void 0 === e4 ? "." : s2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = s2.resolve(e4)) === (r4 = s2.resolve(r4))) return "";
            for (var n = 1; n < e4.length && 47 === e4.charCodeAt(n); ++n) ;
            for (var i = e4.length, a = i - n, o = 1; o < r4.length && 47 === r4.charCodeAt(o); ++o) ;
            for (var l = r4.length - o, u = a < l ? a : l, c = -1, h = 0; h <= u; ++h) {
              if (h === u) {
                if (l > u) {
                  if (47 === r4.charCodeAt(o + h)) return r4.slice(o + h + 1);
                  else if (0 === h) return r4.slice(o + h);
                } else a > u && (47 === e4.charCodeAt(n + h) ? c = h : 0 === h && (c = 0));
                break;
              }
              var d = e4.charCodeAt(n + h);
              if (d !== r4.charCodeAt(o + h)) break;
              47 === d && (c = h);
            }
            var p = "";
            for (h = n + c + 1; h <= i; ++h) (h === i || 47 === e4.charCodeAt(h)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(o + c) : (o += c, 47 === r4.charCodeAt(o) && ++o, r4.slice(o));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), s3 = 47 === r4, n = -1, i = true, a = e4.length - 1; a >= 1; --a) if (47 === (r4 = e4.charCodeAt(a))) {
              if (!i) {
                n = a;
                break;
              }
            } else i = false;
            return -1 === n ? s3 ? "/" : "." : s3 && 1 === n ? "//" : e4.slice(0, n);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var s3, n = 0, i = -1, a = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var o = r4.length - 1, l = -1;
              for (s3 = e4.length - 1; s3 >= 0; --s3) {
                var u = e4.charCodeAt(s3);
                if (47 === u) {
                  if (!a) {
                    n = s3 + 1;
                    break;
                  }
                } else -1 === l && (a = false, l = s3 + 1), o >= 0 && (u === r4.charCodeAt(o) ? -1 == --o && (i = s3) : (o = -1, i = l));
              }
              return n === i ? i = l : -1 === i && (i = e4.length), e4.slice(n, i);
            }
            for (s3 = e4.length - 1; s3 >= 0; --s3) if (47 === e4.charCodeAt(s3)) {
              if (!a) {
                n = s3 + 1;
                break;
              }
            } else -1 === i && (a = false, i = s3 + 1);
            return -1 === i ? "" : e4.slice(n, i);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, s3 = 0, n = -1, i = true, a = 0, o = e4.length - 1; o >= 0; --o) {
              var l = e4.charCodeAt(o);
              if (47 === l) {
                if (!i) {
                  s3 = o + 1;
                  break;
                }
                continue;
              }
              -1 === n && (i = false, n = o + 1), 46 === l ? -1 === r4 ? r4 = o : 1 !== a && (a = 1) : -1 !== r4 && (a = -1);
            }
            return -1 === r4 || -1 === n || 0 === a || 1 === a && r4 === n - 1 && r4 === s3 + 1 ? "" : e4.slice(r4, n);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, s3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return s3;
            var n = e4.charCodeAt(0), i = 47 === n;
            i ? (s3.root = "/", r4 = 1) : r4 = 0;
            for (var a = -1, o = 0, l = -1, u = true, c = e4.length - 1, h = 0; c >= r4; --c) {
              if (47 === (n = e4.charCodeAt(c))) {
                if (!u) {
                  o = c + 1;
                  break;
                }
                continue;
              }
              -1 === l && (u = false, l = c + 1), 46 === n ? -1 === a ? a = c : 1 !== h && (h = 1) : -1 !== a && (h = -1);
            }
            return -1 === a || -1 === l || 0 === h || 1 === h && a === l - 1 && a === o + 1 ? -1 !== l && (0 === o && i ? s3.base = s3.name = e4.slice(1, l) : s3.base = s3.name = e4.slice(o, l)) : (0 === o && i ? (s3.name = e4.slice(1, a), s3.base = e4.slice(1, l)) : (s3.name = e4.slice(o, a), s3.base = e4.slice(o, l)), s3.ext = e4.slice(a, l)), o > 0 ? s3.dir = e4.slice(0, o - 1) : i && (s3.dir = "/"), s3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          s2.posix = s2, e3.exports = s2;
        } }, r2 = {};
        function s(t2) {
          var n = r2[t2];
          if (void 0 !== n) return n.exports;
          var i = r2[t2] = { exports: {} }, a = true;
          try {
            e2[t2](i, i.exports, s), a = false;
          } finally {
            a && delete r2[t2];
          }
          return i.exports;
        }
        s.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = s(431);
      })();
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = (function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var s3 = e4[r4];
                if ("*" === s3 || "+" === s3 || "?" === s3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === s3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === s3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === s3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === s3) {
                  for (var n2 = "", i3 = r4 + 1; i3 < e4.length; ) {
                    var a3 = e4.charCodeAt(i3);
                    if (a3 >= 48 && a3 <= 57 || a3 >= 65 && a3 <= 90 || a3 >= 97 && a3 <= 122 || 95 === a3) {
                      n2 += e4[i3++];
                      continue;
                    }
                    break;
                  }
                  if (!n2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: n2 }), r4 = i3;
                  continue;
                }
                if ("(" === s3) {
                  var o3 = 1, l2 = "", i3 = r4 + 1;
                  if ("?" === e4[i3]) throw TypeError('Pattern cannot start with "?" at '.concat(i3));
                  for (; i3 < e4.length; ) {
                    if ("\\" === e4[i3]) {
                      l2 += e4[i3++] + e4[i3++];
                      continue;
                    }
                    if (")" === e4[i3]) {
                      if (0 == --o3) {
                        i3++;
                        break;
                      }
                    } else if ("(" === e4[i3] && (o3++, "?" !== e4[i3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(i3));
                    l2 += e4[i3++];
                  }
                  if (o3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = i3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            })(e3), s2 = t3.prefixes, i2 = void 0 === s2 ? "./" : s2, a2 = t3.delimiter, o2 = void 0 === a2 ? "/#?" : a2, l = [], u = 0, c = 0, h = "", d = function(e4) {
              if (c < r3.length && r3[c].type === e4) return r3[c++].value;
            }, p = function(e4) {
              var t4 = d(e4);
              if (void 0 !== t4) return t4;
              var s3 = r3[c], n2 = s3.type, i3 = s3.index;
              throw TypeError("Unexpected ".concat(n2, " at ").concat(i3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = d("CHAR") || d("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < o2.length; t4++) {
                var r4 = o2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(n(o2), "]+?") : "(?:(?!".concat(n(r4), ")[^").concat(n(o2), "])+?");
            }; c < r3.length; ) {
              var y = d("CHAR"), b = d("NAME"), v = d("PATTERN");
              if (b || v) {
                var w = y || "";
                -1 === i2.indexOf(w) && (h += w, w = ""), h && (l.push(h), h = ""), l.push({ name: b || u++, prefix: w, suffix: "", pattern: v || m(w), modifier: d("MODIFIER") || "" });
                continue;
              }
              var _ = y || d("ESCAPED_CHAR");
              if (_) {
                h += _;
                continue;
              }
              if (h && (l.push(h), h = ""), d("OPEN")) {
                var w = f(), S = d("NAME") || "", k = d("PATTERN") || "", E = f();
                p("CLOSE"), l.push({ name: S || (k ? u++ : ""), pattern: S && !k ? m(w) : k, prefix: w, suffix: E, modifier: d("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = i(t3), s2 = t3.encode, n2 = void 0 === s2 ? function(e4) {
              return e4;
            } : s2, a2 = t3.validate, o2 = void 0 === a2 || a2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", s3 = 0; s3 < e3.length; s3++) {
                var i2 = e3[s3];
                if ("string" == typeof i2) {
                  r4 += i2;
                  continue;
                }
                var a3 = t4 ? t4[i2.name] : void 0, u = "?" === i2.modifier || "*" === i2.modifier, c = "*" === i2.modifier || "+" === i2.modifier;
                if (Array.isArray(a3)) {
                  if (!c) throw TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                  if (0 === a3.length) {
                    if (u) continue;
                    throw TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                  }
                  for (var h = 0; h < a3.length; h++) {
                    var d = n2(a3[h], i2);
                    if (o2 && !l[s3].test(d)) throw TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(d, '"'));
                    r4 += i2.prefix + d + i2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof a3 || "number" == typeof a3) {
                  var d = n2(String(a3), i2);
                  if (o2 && !l[s3].test(d)) throw TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(d, '"'));
                  r4 += i2.prefix + d + i2.suffix;
                  continue;
                }
                if (!u) {
                  var p = c ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(i2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function s(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var s2 = r3.decode, n2 = void 0 === s2 ? function(e4) {
              return e4;
            } : s2;
            return function(r4) {
              var s3 = e3.exec(r4);
              if (!s3) return false;
              for (var i2 = s3[0], a2 = s3.index, o2 = /* @__PURE__ */ Object.create(null), l = 1; l < s3.length; l++) !(function(e4) {
                if (void 0 !== s3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? o2[r5.name] = s3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return n2(e5, r5);
                  }) : o2[r5.name] = n2(s3[e4], r5);
                }
              })(l);
              return { path: i2, index: a2, params: o2 };
            };
          }
          function n(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function i(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function a(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var s2 = r3.strict, a2 = void 0 !== s2 && s2, o2 = r3.start, l = r3.end, u = r3.encode, c = void 0 === u ? function(e4) {
              return e4;
            } : u, h = r3.delimiter, d = r3.endsWith, p = "[".concat(n(void 0 === d ? "" : d), "]|$"), f = "[".concat(n(void 0 === h ? "/#?" : h), "]"), g = void 0 === o2 || o2 ? "^" : "", m = 0; m < e3.length; m++) {
              var y = e3[m];
              if ("string" == typeof y) g += n(c(y));
              else {
                var b = n(c(y.prefix)), v = n(c(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), b || v) if ("+" === y.modifier || "*" === y.modifier) {
                  var w = "*" === y.modifier ? "?" : "";
                  g += "(?:".concat(b, "((?:").concat(y.pattern, ")(?:").concat(v).concat(b, "(?:").concat(y.pattern, "))*)").concat(v, ")").concat(w);
                } else g += "(?:".concat(b, "(").concat(y.pattern, ")").concat(v, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  g += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else g += "(?:".concat(b).concat(v, ")").concat(y.modifier);
              }
            }
            if (void 0 === l || l) a2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var _ = e3[e3.length - 1], S = "string" == typeof _ ? f.indexOf(_[_.length - 1]) > -1 : void 0 === _;
              a2 || (g += "(?:".concat(f, "(?=").concat(p, "))?")), S || (g += "(?=".concat(f, "|").concat(p, ")"));
            }
            return new RegExp(g, i(r3));
          }
          function o(e3, r3, s2) {
            if (e3 instanceof RegExp) {
              var n2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, u = 0, c = l.exec(e3.source); c; ) r3.push({ name: c[1] || u++, prefix: "", suffix: "", modifier: "", pattern: "" }), c = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (n2 = e3.map(function(e4) {
              return o(e4, r3, s2).source;
            }), new RegExp("(?:".concat(n2.join("|"), ")"), i(s2))) : a(t2(e3, s2), r3, s2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, s2) {
            return r2(t2(e3, s2), s2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return s(o(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = s, e2.tokensToRegexp = a, e2.pathToRegexp = o;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var s = { 943: function(t2, r2) {
        !(function(s2) {
          "use strict";
          var n2 = "function", i2 = "undefined", a = "object", o = "string", l = "major", u = "model", c = "name", h = "type", d = "vendor", p = "version", f = "architecture", g = "console", m = "mobile", y = "tablet", b = "smarttv", v = "wearable", w = "embedded", _ = "Amazon", S = "Apple", k = "ASUS", E = "BlackBerry", T = "Browser", x = "Chrome", R = "Firefox", C = "Google", O = "Huawei", P = "Microsoft", A = "Motorola", I = "Opera", j = "Samsung", N = "Sharp", $ = "Sony", L = "Xiaomi", D = "Zebra", U = "Facebook", M = "Chromium OS", q = "Mac OS", B = function(e2, t3) {
            var r3 = {};
            for (var s3 in e2) t3[s3] && t3[s3].length % 2 == 0 ? r3[s3] = t3[s3].concat(e2[s3]) : r3[s3] = e2[s3];
            return r3;
          }, F = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, H = function(e2, t3) {
            return typeof e2 === o && -1 !== G(t3).indexOf(G(e2));
          }, G = function(e2) {
            return e2.toLowerCase();
          }, z = function(e2, t3) {
            if (typeof e2 === o) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i2 ? e2 : e2.substring(0, 350);
          }, V = function(e2, t3) {
            for (var r3, s3, i3, o2, l2, u2, c2 = 0; c2 < t3.length && !l2; ) {
              var h2 = t3[c2], d2 = t3[c2 + 1];
              for (r3 = s3 = 0; r3 < h2.length && !l2 && h2[r3]; ) if (l2 = h2[r3++].exec(e2)) for (i3 = 0; i3 < d2.length; i3++) u2 = l2[++s3], typeof (o2 = d2[i3]) === a && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == n2 ? this[o2[0]] = o2[1].call(this, u2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== n2 || o2[1].exec && o2[1].test ? this[o2[0]] = u2 ? u2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = u2 ? o2[1].call(this, u2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = u2 ? o2[3].call(this, u2.replace(o2[1], o2[2])) : void 0) : this[o2] = u2 || void 0;
              c2 += 2;
            }
          }, W = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === a && t3[r3].length > 0) {
              for (var s3 = 0; s3 < t3[r3].length; s3++) if (H(t3[r3][s3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (H(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, K = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, J = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [c, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [c, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [c, p], [/opios[\/ ]+([\w\.]+)/i], [p, [c, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [c, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [c, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [c, "UC" + T]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [c, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [c, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [c, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [c, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [c, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[c, /(.+)/, "$1 Secure " + T], p], [/\bfocus\/([\w\.]+)/i], [p, [c, R + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [c, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [c, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [c, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [c, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [c, "MIUI " + T]], [/fxios\/([-\w\.]+)/i], [p, [c, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[c, "360 " + T]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[c, /(.+)/, "$1 " + T], p], [/(comodo_dragon)\/([\w\.]+)/i], [[c, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [c, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [c], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[c, U], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [c, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [c, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [c, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [c, x + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[c, x + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [c, "Android " + T]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [c, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [c, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, c], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [c, [p, W, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [c, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[c, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [c, R + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [c, p], [/(cobalt)\/([\w\.]+)/i], [c, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, G]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", G]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, G]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [d, j], [h, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [d, j], [h, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [d, S], [h, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [d, S], [h, y]], [/(macintosh);/i], [u, [d, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [d, N], [h, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [d, O], [h, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [d, O], [h, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [d, L], [h, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [d, L], [h, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [d, "OPPO"], [h, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [d, "Vivo"], [h, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [d, "Realme"], [h, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [d, A], [h, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [d, A], [h, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [d, "LG"], [h, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [d, "LG"], [h, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [d, "Lenovo"], [h, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [d, "Nokia"], [h, m]], [/(pixel c)\b/i], [u, [d, C], [h, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [d, C], [h, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [d, $], [h, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [d, $], [h, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [d, "OnePlus"], [h, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [d, _], [h, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [d, _], [h, m]], [/(playbook);[-\w\),; ]+(rim)/i], [u, d, [h, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [d, E], [h, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [d, k], [h, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [d, k], [h, m]], [/(nexus 9)/i], [u, [d, "HTC"], [h, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [d, [u, /_/g, " "], [h, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [d, "Acer"], [h, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [d, "Meizu"], [h, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [d, u, [h, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [d, u, [h, y]], [/(surface duo)/i], [u, [d, P], [h, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [d, "Fairphone"], [h, m]], [/(u304aa)/i], [u, [d, "AT&T"], [h, m]], [/\bsie-(\w*)/i], [u, [d, "Siemens"], [h, m]], [/\b(rct\w+) b/i], [u, [d, "RCA"], [h, y]], [/\b(venue[\d ]{2,7}) b/i], [u, [d, "Dell"], [h, y]], [/\b(q(?:mv|ta)\w+) b/i], [u, [d, "Verizon"], [h, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [d, "Barnes & Noble"], [h, y]], [/\b(tm\d{3}\w+) b/i], [u, [d, "NuVision"], [h, y]], [/\b(k88) b/i], [u, [d, "ZTE"], [h, y]], [/\b(nx\d{3}j) b/i], [u, [d, "ZTE"], [h, m]], [/\b(gen\d{3}) b.+49h/i], [u, [d, "Swiss"], [h, m]], [/\b(zur\d{3}) b/i], [u, [d, "Swiss"], [h, y]], [/\b((zeki)?tb.*\b) b/i], [u, [d, "Zeki"], [h, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[d, "Dragon Touch"], u, [h, y]], [/\b(ns-?\w{0,9}) b/i], [u, [d, "Insignia"], [h, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [d, "NextBook"], [h, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[d, "Voice"], u, [h, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[d, "LvTel"], u, [h, m]], [/\b(ph-1) /i], [u, [d, "Essential"], [h, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [d, "Envizen"], [h, y]], [/\b(trio[-\w\. ]+) b/i], [u, [d, "MachSpeed"], [h, y]], [/\btu_(1491) b/i], [u, [d, "Rotor"], [h, y]], [/(shield[\w ]+) b/i], [u, [d, "Nvidia"], [h, y]], [/(sprint) (\w+)/i], [d, u, [h, m]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [d, P], [h, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [d, D], [h, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [d, D], [h, m]], [/smart-tv.+(samsung)/i], [d, [h, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [d, j], [h, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[d, "LG"], [h, b]], [/(apple) ?tv/i], [d, [u, S + " TV"], [h, b]], [/crkey/i], [[u, x + "cast"], [d, C], [h, b]], [/droid.+aft(\w)( bui|\))/i], [u, [d, _], [h, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [d, N], [h, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [d, $], [h, b]], [/(mitv-\w{5}) bui/i], [u, [d, L], [h, b]], [/Hbbtv.*(technisat) (.*);/i], [d, u, [h, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[d, z], [u, z], [h, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [d, u, [h, g]], [/droid.+; (shield) bui/i], [u, [d, "Nvidia"], [h, g]], [/(playstation [345portablevi]+)/i], [u, [d, $], [h, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [d, P], [h, g]], [/((pebble))app/i], [d, u, [h, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [d, S], [h, v]], [/droid.+; (glass) \d/i], [u, [d, C], [h, v]], [/droid.+; (wt63?0{2,3})\)/i], [u, [d, D], [h, v]], [/(quest( 2| pro)?)/i], [u, [d, U], [h, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [d, [h, w]], [/(aeobc)\b/i], [u, [d, _], [h, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [h, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, m]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [d, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [c, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [c, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [c, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, c]], os: [[/microsoft (windows) (vista|xp)/i], [c, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [c, [p, W, K]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[c, "Windows"], [p, W, K]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [c, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[c, q], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, c], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [c, p], [/\(bb(10);/i], [p, [c, E]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [c, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [c, R + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [c, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [c, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [c, x + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[c, M], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [c, p], [/(sunos) ?([\w\.\d]*)/i], [[c, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [c, p]] }, X = function(e2, t3) {
            if (typeof e2 === a && (t3 = e2, e2 = void 0), !(this instanceof X)) return new X(e2, t3).getResult();
            var r3 = typeof s2 !== i2 && s2.navigator ? s2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), b2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? B(J, t3) : J, w2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[c] = void 0, t4[p] = void 0, V.call(t4, g2, v2.browser), t4[l] = typeof (e3 = t4[p]) === o ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == n2 && (t4[c] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, V.call(e3, g2, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[d] = void 0, e3[u] = void 0, e3[h] = void 0, V.call(e3, g2, v2.device), w2 && !e3[h] && b2 && b2.mobile && (e3[h] = m), w2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== i2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[h] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[c] = void 0, e3[p] = void 0, V.call(e3, g2, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[c] = void 0, e3[p] = void 0, V.call(e3, g2, v2.os), w2 && !e3[c] && b2 && "Unknown" != b2.platform && (e3[c] = b2.platform.replace(/chrome os/i, M).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === o && e3.length > 350 ? z(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (X.VERSION = "1.0.35", X.BROWSER = F([c, p, l]), X.CPU = F([f]), X.DEVICE = F([u, d, h, g, m, b, y, v, w]), X.ENGINE = X.OS = F([c, p]), typeof r2 !== i2) t2.exports && (r2 = t2.exports = X), r2.UAParser = X;
          else if (typeof define === n2 && define.amd) e.r, void 0 !== X && e.v(X);
          else typeof s2 !== i2 && (s2.UAParser = X);
          var Y = typeof s2 !== i2 && (s2.jQuery || s2.Zepto);
          if (Y && !Y.ua) {
            var Q = new X();
            Y.ua = Q.getResult(), Y.ua.get = function() {
              return Q.getUA();
            }, Y.ua.set = function(e2) {
              Q.setUA(e2);
              var t3 = Q.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        })(this);
      } }, n = {};
      function i(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, a = true;
        try {
          s[e2].call(r2.exports, r2, r2.exports, i), a = false;
        } finally {
          a && delete n[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(943);
    }, 74398, (e, t, r) => {
    }, 42738, (e) => {
      "use strict";
      let t, r, s, n, i, a;
      async function o() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let l = null;
      async function u() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        l || (l = o());
        let e10 = await l;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function c(...e10) {
        let t10 = await o();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let h = null;
      function d() {
        return h || (h = u()), h;
      }
      function p(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Error(p(e10));
          }, construct() {
            throw Error(p(e10));
          }, apply(r10, s10, n10) {
            if ("function" == typeof n10[0]) return n10[0](t10);
            throw Error(p(e10));
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      d();
      class f extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class g extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class m extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let y = "x-prerender-revalidate", b = "x-prerender-revalidate-if-generated", v = ".segments", w = ".segment.rsc", _ = ".rsc", S = ".json", k = ".meta", E = "x-next-cache-tags", T = "x-next-revalidated-tags", x = "_N_T_", R = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function C(e10) {
        var t10, r10, s10, n10, i10, a3 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, i10 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (s10 = o2, o2 += 1, l2(), n10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (i10 = true, o2 = n10, a3.push(e10.substring(t10, s10)), t10 = o2) : o2 = s10 + 1;
          } else o2 += 1;
          (!i10 || o2 >= e10.length) && a3.push(e10.substring(t10, e10.length));
        }
        return a3;
      }
      function O(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [s10, n10] of e10.entries()) "set-cookie" === s10.toLowerCase() ? (r10.push(...C(n10)), t10[s10] = 1 === r10.length ? r10[0] : r10) : t10[s10] = n10;
        return t10;
      }
      function P(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...R, GROUP: { builtinReact: [R.reactServerComponents, R.actionBrowser], serverOnly: [R.reactServerComponents, R.actionBrowser, R.instrument, R.middleware], neutralTarget: [R.apiNode, R.apiEdge], clientOnly: [R.serverSideRendering, R.appPagesBrowser], bundled: [R.reactServerComponents, R.actionBrowser, R.serverSideRendering, R.appPagesBrowser, R.shared, R.instrument, R.middleware], appPages: [R.reactServerComponents, R.serverSideRendering, R.appPagesBrowser, R.actionBrowser] } });
      let A = /* @__PURE__ */ Symbol("response"), I = /* @__PURE__ */ Symbol("passThrough"), j = /* @__PURE__ */ Symbol("waitUntil");
      class N {
        constructor(e10, t10) {
          this[I] = false, this[j] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[A] || (this[A] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[I] = true;
        }
        waitUntil(e10) {
          if ("external" === this[j].kind) return (0, this[j].function)(e10);
          this[j].promises.push(e10);
        }
      }
      class $ extends N {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new f({ page: this.sourcePage });
        }
        respondWith() {
          throw new f({ page: this.sourcePage });
        }
      }
      function L(e10) {
        return 47 === e10.charCodeAt(e10.length - 1) && e10.length > 1 ? e10.slice(0, -1) : e10;
      }
      function D(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), s10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return s10 || t10 > -1 ? { pathname: e10.substring(0, s10 ? r10 : t10), query: s10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function U(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: n10 } = D(e10);
        return `${t10}${r10}${s10}${n10}`;
      }
      function M(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: n10 } = D(e10);
        return `${r10}${t10}${s10}${n10}`;
      }
      function q(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = D(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let B = /* @__PURE__ */ new WeakMap();
      function F(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let s10 = B.get(t10);
        s10 || (s10 = t10.map((e11) => e11.toLowerCase()), B.set(t10, s10));
        let n10 = e10.split("/", 2);
        if (!n10[1]) return { pathname: e10 };
        let i10 = n10[1].toLowerCase(), a3 = s10.indexOf(i10);
        return a3 < 0 ? { pathname: e10 } : (r10 = t10[a3], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let H = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function G(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return H.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let z = /* @__PURE__ */ Symbol("NextURLInternal");
      class V {
        constructor(e10, t10, r10) {
          let s10, n10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (s10 = t10, n10 = r10 || {}) : n10 = r10 || t10 || {}, this[z] = { url: G(e10, s10 ?? n10.base), options: n10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, s10, n10;
          let i10 = (function(e11, t11) {
            let { basePath: r11, i18n: s11, trailingSlash: n11 } = t11.nextConfig ?? {}, i11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n11 };
            r11 && q(i11.pathname, r11) && (i11.pathname = (function(e12, t12) {
              if (!q(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            })(i11.pathname, r11), i11.basePath = r11);
            let a4 = i11.pathname;
            if (i11.pathname.startsWith("/_next/data/") && i11.pathname.endsWith(".json")) {
              let e12 = i11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i11.buildId = e12[0], a4 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i11.pathname = a4);
            }
            if (s11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i11.pathname) : F(i11.pathname, s11.locales);
              i11.locale = e12.detectedLocale, i11.pathname = e12.pathname ?? i11.pathname, !e12.detectedLocale && i11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a4) : F(a4, s11.locales)).detectedLocale && (i11.locale = e12.detectedLocale);
            }
            return i11;
          })(this[z].url.pathname, { nextConfig: this[z].options.nextConfig, parseData: true, i18nProvider: this[z].options.i18nProvider }), a3 = (function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          })(this[z].url, this[z].options.headers);
          this[z].domainLocale = this[z].options.i18nProvider ? this[z].options.i18nProvider.detectDomainLocale(a3) : (function(e11, t11, r11) {
            if (e11) {
              for (let s11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === s11.domain?.split(":", 1)[0].toLowerCase() || r11 === s11.defaultLocale.toLowerCase() || s11.locales?.some((e12) => e12.toLowerCase() === r11)) return s11;
            }
          })(null == (t10 = this[z].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a3);
          let o2 = (null == (r10 = this[z].domainLocale) ? void 0 : r10.defaultLocale) || (null == (n10 = this[z].options.nextConfig) || null == (s10 = n10.i18n) ? void 0 : s10.defaultLocale);
          this[z].url.pathname = i10.pathname, this[z].defaultLocale = o2, this[z].basePath = i10.basePath ?? "", this[z].buildId = i10.buildId, this[z].locale = i10.locale ?? o2, this[z].trailingSlash = i10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = (function(e11, t11, r10, s10) {
            if (!t11 || t11 === r10) return e11;
            let n10 = e11.toLowerCase();
            return !s10 && (q(n10, "/api") || q(n10, `/${t11.toLowerCase()}`)) ? e11 : U(e11, `/${t11}`);
          })((e10 = { basePath: this[z].basePath, buildId: this[z].buildId, defaultLocale: this[z].options.forceLocale ? void 0 : this[z].defaultLocale, locale: this[z].locale, pathname: this[z].url.pathname, trailingSlash: this[z].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = L(t10)), e10.buildId && (t10 = M(U(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = U(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : M(t10, "/") : L(t10);
        }
        formatSearch() {
          return this[z].url.search;
        }
        get buildId() {
          return this[z].buildId;
        }
        set buildId(e10) {
          this[z].buildId = e10;
        }
        get locale() {
          return this[z].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[z].locale || !(null == (r10 = this[z].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[z].locale = e10;
        }
        get defaultLocale() {
          return this[z].defaultLocale;
        }
        get domainLocale() {
          return this[z].domainLocale;
        }
        get searchParams() {
          return this[z].url.searchParams;
        }
        get host() {
          return this[z].url.host;
        }
        set host(e10) {
          this[z].url.host = e10;
        }
        get hostname() {
          return this[z].url.hostname;
        }
        set hostname(e10) {
          this[z].url.hostname = e10;
        }
        get port() {
          return this[z].url.port;
        }
        set port(e10) {
          this[z].url.port = e10;
        }
        get protocol() {
          return this[z].url.protocol;
        }
        set protocol(e10) {
          this[z].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[z].url = G(e10), this.analyze();
        }
        get origin() {
          return this[z].url.origin;
        }
        get pathname() {
          return this[z].url.pathname;
        }
        set pathname(e10) {
          this[z].url.pathname = e10;
        }
        get hash() {
          return this[z].url.hash;
        }
        set hash(e10) {
          this[z].url.hash = e10;
        }
        get search() {
          return this[z].url.search;
        }
        set search(e10) {
          this[z].url.search = e10;
        }
        get password() {
          return this[z].url.password;
        }
        set password(e10) {
          this[z].url.password = e10;
        }
        get username() {
          return this[z].url.username;
        }
        set username(e10) {
          this[z].url.username = e10;
        }
        get basePath() {
          return this[z].basePath;
        }
        set basePath(e10) {
          this[z].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new V(String(this), this[z].options);
        }
      }
      var W, K, J, X, Y, Q, Z, ee, et, er, es, en, ei, ea, eo, el, eu, ec, eh, ed, ep, ef, eg, em, ey, eb, ev, ew, e_, eS, ek, eE, eT, ex, eR, eC, eO = e.i(28042);
      let eP = /* @__PURE__ */ Symbol("internal request");
      class eA extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          P(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let s10 = new V(r10, { headers: O(this.headers), nextConfig: t10.nextConfig });
          this[eP] = { cookies: new eO.RequestCookies(this.headers), nextUrl: s10, url: s10.toString() };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[eP].cookies;
        }
        get nextUrl() {
          return this[eP].nextUrl;
        }
        get page() {
          throw new g();
        }
        get ua() {
          throw new m();
        }
        get url() {
          return this[eP].url;
        }
      }
      class eI {
        static get(e10, t10, r10) {
          let s10 = Reflect.get(e10, t10, r10);
          return "function" == typeof s10 ? s10.bind(e10) : s10;
        }
        static set(e10, t10, r10, s10) {
          return Reflect.set(e10, t10, r10, s10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ej = /* @__PURE__ */ Symbol("internal response"), eN = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function e$(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [s10, n10] of e10.request.headers) t10.set("x-middleware-request-" + s10, n10), r11.push(s10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eL extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, s10 = new Proxy(new eO.ResponseCookies(r10), { get(e11, s11, n10) {
            switch (s11) {
              case "delete":
              case "set":
                return (...n11) => {
                  let i10 = Reflect.apply(e11[s11], e11, n11), a3 = new Headers(r10);
                  return i10 instanceof eO.ResponseCookies && r10.set("x-middleware-set-cookie", i10.getAll().map((e12) => (0, eO.stringifyCookie)(e12)).join(",")), e$(t10, a3), i10;
                };
              default:
                return eI.get(e11, s11, n10);
            }
          } });
          this[ej] = { cookies: s10, url: t10.url ? new V(t10.url, { headers: O(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ej].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eL(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eN.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let s10 = "object" == typeof t10 ? t10 : {}, n10 = new Headers(null == s10 ? void 0 : s10.headers);
          return n10.set("Location", P(e10)), new eL(null, { ...s10, headers: n10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", P(e10)), e$(t10, r10), new eL(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), e$(e10, t10), new eL(null, { ...e10, headers: t10 });
        }
      }
      function eD(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, s10 = new URL(e10, t10), n10 = s10.origin === r10.origin;
        return { url: n10 ? s10.toString().slice(r10.origin.length) : s10.toString(), isRelative: n10 };
      }
      let eU = "next-router-prefetch", eM = ["rsc", "next-router-state-tree", eU, "next-hmr-refresh", "next-router-segment-prefetch"], eq = "_rsc";
      function eB(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function eF(e10) {
        return eB(e10.split("/").reduce((e11, t10, r10, s10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === s10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eH extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eH();
        }
      }
      class eG extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, s10) {
            if ("symbol" == typeof r10) return eI.get(t10, r10, s10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            if (void 0 !== i10) return eI.get(t10, i10, s10);
          }, set(t10, r10, s10, n10) {
            if ("symbol" == typeof r10) return eI.set(t10, r10, s10, n10);
            let i10 = r10.toLowerCase(), a3 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return eI.set(t10, a3 ?? r10, s10, n10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return eI.has(t10, r10);
            let s10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            return void 0 !== n10 && eI.has(t10, n10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return eI.deleteProperty(t10, r10);
            let s10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            return void 0 === n10 || eI.deleteProperty(t10, n10);
          } });
        }
        static seal(e10, t10) {
          let r10, s10 = t10 && t10.size > 0 ? (e11) => t10.has(e11.toLowerCase()) : null, n10 = new Proxy(e10, { get(e11, t11, s11) {
            switch (t11) {
              case "append":
              case "delete":
              case "set":
                return eH.callable;
              case Symbol.iterator:
                return r10[Symbol.iterator];
              case "get":
              case "has":
              case "getSetCookie":
              case "keys":
              case "values":
              case "entries":
              case "forEach":
                return r10[t11];
              default:
                return eI.get(e11, t11, s11);
            }
          } });
          return r10 = s10 ? /* @__PURE__ */ (function(e11, t11, r11) {
            function* s11() {
              for (let t12 of e11.entries()) r11(t12[0]) || (yield t12);
            }
            return { entries: s11, [Symbol.iterator]: s11, get: (t12) => r11(t12) ? null : e11.get(t12), has: (t12) => !r11(t12) && e11.has(t12), getSetCookie: () => r11("set-cookie") ? [] : e11.getSetCookie(), *keys() {
              for (let t12 of e11.keys()) r11(t12) || (yield t12);
            }, *values() {
              for (let [, e12] of s11()) yield e12;
            }, forEach(e12, r12) {
              for (let [n11, i10] of s11()) e12.call(r12, i10, n11, t11);
            } };
          })(e10, n10, s10) : { get: e10.get.bind(e10), has: e10.has.bind(e10), getSetCookie: e10.getSetCookie.bind(e10), keys: e10.keys.bind(e10), values: e10.values.bind(e10), entries: e10.entries.bind(e10), [Symbol.iterator]: e10[Symbol.iterator].bind(e10), forEach(t11, r11) {
            for (let [s11, i10] of e10.entries()) t11.call(r11, i10, s11, n10);
          } }, n10;
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eI.get(e11, t10, r10) });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eG(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, s10] of this.entries()) e10.call(t10, s10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let ez = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class eV {
        disable() {
          throw ez;
        }
        getStore() {
        }
        run() {
          throw ez;
        }
        exit() {
          throw ez;
        }
        enterWith() {
          throw ez;
        }
        static bind(e10) {
          return e10;
        }
      }
      let eW = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eK(e10) {
        let t10 = /* @__PURE__ */ Symbol.for(`@next/${e10}@16.4.6`), r10 = globalThis;
        return r10[t10] ??= eW ? new eW() : new eV();
      }
      let eJ = eK("work-async-storage");
      class eX extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eX();
        }
      }
      class eY {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eX.callable;
              default:
                return eI.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eI.get(e11, t10, r10) });
        }
      }
      let eQ = /* @__PURE__ */ Symbol.for("next.mutated.cookies");
      class eZ {
        static wrap(e10, t10) {
          let r10 = new eO.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let s10 = [], n10 = /* @__PURE__ */ new Set(), i10 = () => {
            let e11 = eJ.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), s10 = r10.getAll().filter((e12) => n10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of s10) {
                let r11 = new eO.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, a3 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eQ:
                return s10;
              case "delete":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a3;
                  } finally {
                    i10();
                  }
                };
              case "set":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a3;
                  } finally {
                    i10();
                  }
                };
              default:
                return eI.get(e11, t11, r11);
            }
          } });
          return a3;
        }
      }
      function e0(e10, t10) {
        if ("action" !== e10.phase) throw new eX();
      }
      var e1 = ((W = e1 || {}).handleRequest = "BaseServer.handleRequest", W.run = "BaseServer.run", W.pipe = "BaseServer.pipe", W.getStaticHTML = "BaseServer.getStaticHTML", W.render = "BaseServer.render", W.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", W.renderToResponse = "BaseServer.renderToResponse", W.renderToHTML = "BaseServer.renderToHTML", W.renderError = "BaseServer.renderError", W.renderErrorToResponse = "BaseServer.renderErrorToResponse", W.renderErrorToHTML = "BaseServer.renderErrorToHTML", W.render404 = "BaseServer.render404", W), e2 = ((K = e2 || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", K.loadComponents = "LoadComponents.loadComponents", K.loadRouteModule = "LoadComponents.loadRouteModule", K), e4 = ((J = e4 || {}).loadModule = "Instrumentation.loadModule", J.register = "Instrumentation.register", J), e3 = ((X = e3 || {}).getRequestHandler = "NextServer.getRequestHandler", X.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", X.getServer = "NextServer.getServer", X.getServerRequestHandler = "NextServer.getServerRequestHandler", X.createServer = "createServer.createServer", X), e5 = ((Y = e5 || {}).compression = "NextNodeServer.compression", Y.getBuildId = "NextNodeServer.getBuildId", Y.createComponentTree = "NextNodeServer.createComponentTree", Y.clientComponentLoading = "NextNodeServer.clientComponentLoading", Y.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", Y.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", Y.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", Y.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", Y.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", Y.sendRenderResult = "NextNodeServer.sendRenderResult", Y.proxyRequest = "NextNodeServer.proxyRequest", Y.runApi = "NextNodeServer.runApi", Y.render = "NextNodeServer.render", Y.renderHTML = "NextNodeServer.renderHTML", Y.imageOptimizer = "NextNodeServer.imageOptimizer", Y.getPagePath = "NextNodeServer.getPagePath", Y.getRoutesManifest = "NextNodeServer.getRoutesManifest", Y.findPageComponents = "NextNodeServer.findPageComponents", Y.getFontManifest = "NextNodeServer.getFontManifest", Y.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", Y.getRequestHandler = "NextNodeServer.getRequestHandler", Y.renderToHTML = "NextNodeServer.renderToHTML", Y.renderError = "NextNodeServer.renderError", Y.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", Y.render404 = "NextNodeServer.render404", Y.startResponse = "NextNodeServer.startResponse", Y.route = "route", Y.onProxyReq = "onProxyReq", Y.apiResolver = "apiResolver", Y.internalFetch = "internalFetch", Y), e6 = ((Q = e6 || {}).startServer = "startServer.startServer", Q), e8 = ((Z = e8 || {}).getServerSideProps = "Render.getServerSideProps", Z.getStaticProps = "Render.getStaticProps", Z.renderToString = "Render.renderToString", Z.renderDocument = "Render.renderDocument", Z.createBodyResult = "Render.createBodyResult", Z), e9 = ((ee = e9 || {}).renderToString = "AppRender.renderToString", ee.renderToReadableStream = "AppRender.renderToReadableStream", ee.getBodyResult = "AppRender.getBodyResult", ee.fetch = "AppRender.fetch", ee.waitShellReady = "AppRender.waitShellReady", ee.renderToNodeFizzStream = "AppRender.renderToNodeFizzStream", ee.instantInsights = "AppRender.instantInsights", ee.instantInsightsPrepareValidation = "AppRender.instantInsights.prepareValidation", ee.instantInsightsRunValidation = "AppRender.instantInsights.runValidation", ee), e7 = ((et = e7 || {}).ensurePage = "DevBundlerService.ensurePage", et), te = ((er = te || {}).executeRoute = "Router.executeRoute", er), tt = ((es = tt || {}).runHandler = "Node.runHandler", es), tr = ((en = tr || {}).runHandler = "AppRouteRouteHandlers.runHandler", en), ts = ((ei = ts || {}).loadUserland = "AppRouteRouteModule.loadUserland", ei), tn = ((ea = tn || {}).prepare = "RouteModule.prepare", ea.loadManifests = "RouteModule.loadManifests", ea), ti = ((eo = ti || {}).generateMetadata = "ResolveMetadata.generateMetadata", eo.generateViewport = "ResolveMetadata.generateViewport", eo), ta = ((el = ta || {}).execute = "Middleware.execute", el), to = ((eu = to || {}).request = "Next.request", eu);
      let tl = /* @__PURE__ */ new Set(["Middleware.execute", "Next.request", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "LoadComponents.loadRouteModule", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "AppRouteRouteModule.loadUserland", "RouteModule.prepare", "Instrumentation.loadModule", "Instrumentation.register", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), tu = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function tc(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let th = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      function td() {
      }
      /* @__PURE__ */ Symbol.for("@next/local-span-recorder");
      let { context: tp, propagation: tf, trace: tg, SpanStatusCode: tm, SpanKind: ty, ROOT_CONTEXT: tb } = t = e.r(59110);
      class tv extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let tw = (e10, t10, r10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof tv && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: tm.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end(r10);
      }, t_ = /* @__PURE__ */ new Map(), tS = t.createContextKey("next.rootSpanId"), tk = 0, tE = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, tT = (a = new class e {
        getTracerInstance() {
          return tg.getTracer("next.js", "16.4.6");
        }
        isOpenTelemetryEnabled() {
          var e10, t10;
          let r10 = tg.getSpan(tp.active());
          if (null == r10 ? void 0 : r10.isRecording()) return true;
          let s10 = tg.getTracerProvider();
          return !("getDelegate" in s10) || (null == s10.getDelegate || null == (t10 = s10.getDelegate.call(s10)) || null == (e10 = t10.constructor) ? void 0 : e10.name) !== "NoopTracerProvider";
        }
        getContext() {
          return tp;
        }
        getTracePropagationData() {
          let e10 = tp.active(), t10 = [];
          return tf.inject(e10, t10, tE), t10;
        }
        getTraceContextHeaders() {
          let e10 = tp.active();
          if (!tg.getSpanContext(e10) || !this.isOpenTelemetryEnabled()) return;
          let t10 = {};
          tf.inject(e10, t10);
          let { traceparent: r10, tracestate: s10 } = t10;
          if (r10) return { traceparent: r10, tracestate: s10 };
        }
        hasActiveSpanContext() {
          let e10 = tg.getSpanContext(tp.active());
          return !!(e10 && tg.isSpanContextValid(e10));
        }
        getActiveScopeSpan() {
          let e10 = td(), t10 = null == e10 ? void 0 : e10.getActiveLocalSpan();
          return t10 && (null == e10 ? void 0 : e10.isOpenTelemetryIsolatedSpan(t10)) ? t10 : tg.getSpan(tp.active());
        }
        withPropagatedContext(e10, t10, r10, s10 = false) {
          let n10 = tp.active();
          if (!th && !this.isOpenTelemetryEnabled() && !tg.getSpanContext(n10)) return t10();
          if (s10) {
            let s11 = tf.extract(tb, e10, r10);
            if (tg.getSpanContext(s11)) return tp.with(s11, t10);
            let i11 = tf.extract(n10, e10, r10);
            return tp.with(i11, t10);
          }
          if (tg.getSpanContext(n10)) return t10();
          let i10 = tf.extract(n10, e10, r10);
          return tp.with(i10, t10);
        }
        trace(...e10) {
          let [t10, r10, s10] = e10, n10 = !!th || this.isOpenTelemetryEnabled(), i10 = td(), a3 = (null == i10 ? void 0 : i10.isLocalSpanRecordingEnabled()) ?? false;
          if (!n10 && !a3) return "function" == typeof r10 ? r10() : s10();
          let { fn: o2, options: l2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: s10, options: { ...r10 } }, u2 = l2.spanName ?? t10, c2 = l2.parentSpan ?? this.getActiveScopeSpan(), h2 = c2 && (null == i10 ? void 0 : i10.isOpenTelemetryIsolatedSpan(c2)) ? c2 : void 0, d2 = !h2 && (tl.has(t10) || "1" === process.env.NEXT_OTEL_VERBOSE);
          if (!(d2 || (null == i10 ? void 0 : i10.isRequestInsightsEnabled())) || l2.hideSpan) return o2();
          let p2 = h2 ? tp.active() : this.getSpanContext(c2);
          p2 || (p2 = (null == tp ? void 0 : tp.active()) ?? tb);
          let f2 = p2.getValue(tS), g2 = "number" != typeof f2 || !t_.has(f2), m2 = tk++;
          return l2.attributes = { "next.span_category": "nextjs", "next.span_name": u2, "next.span_type": t10, ...l2.attributes }, tp.with(p2.setValue(tS, m2), () => this.runWithActiveSpan(u2, l2, p2, n10 && d2, a3, h2, (e11) => {
            let r11;
            th && t10 && tu.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let s11 = false, n11 = () => {
              !s11 && (s11 = true, t_.delete(m2), r11 && performance.measure(`${th}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (g2 && t_.set(m2, new Map(Object.entries(l2.attributes ?? {}))), o2.length > 1) try {
              return o2(e11, (t11) => {
                t11 ? tw(e11, t11, l2.endTime) : e11.end(l2.endTime);
              });
            } catch (t11) {
              throw tw(e11, t11, l2.endTime), t11;
            } finally {
              n11();
            }
            try {
              let t11 = o2(e11);
              if (tc(t11)) return t11.then((t12) => (e11.end(l2.endTime), t12)).catch((t12) => {
                throw tw(e11, t12, l2.endTime), t12;
              }).finally(n11);
              return e11.end(l2.endTime), n11(), t11;
            } catch (t11) {
              throw tw(e11, t11, l2.endTime), n11(), t11;
            }
          }));
        }
        runWithActiveSpan(e10, t10, r10, s10, n10, i10, a3) {
          if (s10) return this.getTracerInstance().startActiveSpan(e10, t10, (s11) => a3(n10 ? this.createLocalRecordingSpan(e10, t10, r10, s11, i10) : s11));
          let o2 = this.createLocalRecordingSpan(e10, t10, r10, void 0, i10), l2 = td();
          return l2.withLocalSpan(o2, () => l2.isOpenTelemetryIsolatedSpan(o2) ? a3(o2) : tp.with(tg.setSpan(tp.active(), o2), a3, void 0, o2));
        }
        createLocalRecordingSpan(e10, t10, r10, s10, n10) {
          let i10 = (null == n10 ? void 0 : n10.spanContext()) ?? tg.getSpanContext(r10), a3 = null == s10 ? void 0 : s10.spanContext();
          return td().createLocalSpan({ name: e10, attributes: t10.attributes, links: t10.links, startTime: t10.startTime, delegateSpan: s10, traceId: (null == a3 ? void 0 : a3.traceId) ?? (null == i10 ? void 0 : i10.traceId), spanId: null == a3 ? void 0 : a3.spanId, parentSpanId: null == i10 ? void 0 : i10.spanId, isolateOpenTelemetry: void 0 !== n10 });
        }
        wrap(...e10) {
          let t10 = this, [r10, s10, n10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return tl.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = s10;
            "function" == typeof e11 && "function" == typeof n10 && (e11 = e11.apply(this, arguments));
            let i10 = arguments.length - 1, a3 = arguments[i10];
            if ("function" != typeof a3) return t10.trace(r10, e11, () => n10.apply(this, arguments));
            {
              let s11 = t10.getContext().bind(tp.active(), a3);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i10] = function(e13) {
                return null == t11 || t11(e13), s11.apply(this, arguments);
              }, n10.apply(this, arguments)));
            }
          } : n10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, s10 = r10 ? { ...r10, attributes: { "next.span_category": "nextjs", ...r10.attributes } } : { attributes: { "next.span_category": "nextjs" } }, n10 = td(), i10 = s10.parentSpan ?? this.getActiveScopeSpan(), a3 = i10 && (null == n10 ? void 0 : n10.isOpenTelemetryIsolatedSpan(i10)) ? i10 : void 0, o2 = (a3 ? void 0 : this.getSpanContext(i10)) ?? tp.active();
          if (!(null == n10 ? void 0 : n10.isLocalSpanRecordingEnabled())) return this.getTracerInstance().startSpan(t10, s10, o2);
          let l2 = !a3 && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(t10, s10, o2) : void 0;
          return this.createLocalRecordingSpan(t10, s10, o2, l2, a3);
        }
        getSpanContext(e10) {
          return e10 ? tg.setSpan(tp.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = tp.active().getValue(tS);
          return t_.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = tp.active().getValue(tS), s10 = t_.get(r10);
          s10 && !s10.has(e10) && s10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = td();
          return (null == r10 ? void 0 : r10.isLocalRecordingSpan(e10)) ? r10.withLocalSpan(e10, () => r10.isOpenTelemetryIsolatedSpan(e10) ? t10() : tp.with(tg.setSpan(tp.active(), e10), t10)) : tp.with(tg.setSpan(tp.active(), e10), t10);
        }
      }(), () => a), tx = "__prerender_bypass";
      /* @__PURE__ */ Symbol("__next_preview_data"), Symbol(tx);
      class tR {
        constructor(e10, t10, r10, s10) {
          var n10;
          let i10 = e10 && (function(e11, t11) {
            if ("function" == typeof e11.get) {
              let r11 = eG.from(e11);
              return { isOnDemandRevalidate: r11.get(y) === t11.previewModeId, revalidateOnlyGenerated: r11.has(b) };
            }
            return { isOnDemandRevalidate: e11[y] === t11.previewModeId, revalidateOnlyGenerated: e11.hasOwnProperty(b) };
          })(t10, e10).isOnDemandRevalidate, a3 = null == (n10 = r10.get(tx)) ? void 0 : n10.value;
          this._isEnabled = !!(!i10 && a3 && e10 && a3 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = s10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: tx, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: tx, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      let tC = new Set([...eM, "x-nextjs-request-id", "x-nextjs-html-request-id"].map((e10) => e10.toLowerCase()));
      function tO(e10, t10) {
        if ("x-middleware-set-cookie" in e10 && "string" == typeof e10["x-middleware-set-cookie"]) {
          let r10 = e10["x-middleware-set-cookie"], s10 = new Headers();
          for (let e11 of C(r10)) s10.append("set-cookie", e11);
          for (let e11 of new eO.ResponseCookies(s10).getAll()) t10.set(e11);
        }
      }
      let tP = eK("work-unit-async-storage");
      function tA(e10) {
        switch (e10.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            return e10.resumeDataCache;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "build-time-generator":
            return null;
          default:
            return e10;
        }
      }
      var tI = e.i(99734);
      class tj extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var tN = e.i(51615);
      function t$() {
      }
      new TextEncoder();
      let tL = new TextEncoder();
      function tD(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tL.encode(e10)), t10.close();
        } });
      }
      function tU(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tM(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), s10 = "";
        for await (let n10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return s10;
          s10 += r10.decode(n10, { stream: true });
        }
        return s10 + r10.decode();
      }
      process.env.NEXT_PRIVATE_DEBUG_CACHE, /* @__PURE__ */ Symbol.for("@next/cache-handlers");
      let tq = /* @__PURE__ */ Symbol.for("@next/cache-handlers-map"), tB = /* @__PURE__ */ Symbol.for("@next/cache-handlers-set");
      /* @__PURE__ */ Symbol.for("@next/custom-cache-handlers-registration"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-private"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-built-in"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-fronts"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-tiered"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-memory-disabled");
      let tF = globalThis;
      function tH() {
        let e10 = tF[tq];
        if (e10) return e10.entries();
      }
      async function tG(e10, t10) {
        if (!e10) return t10();
        let r10 = tz(e10);
        try {
          return await t10();
        } finally {
          var s10, n10, i10, a3;
          let t11, o2, l2, u2, c2 = (s10 = r10, n10 = tz(e10), t11 = new Map(s10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return [`${e11.tag}:${t12}`, e11.revalidatedAt];
          })), o2 = new Set(s10.pendingRevalidateWrites), { pendingRevalidatedTags: n10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "", s11 = t11.get(`${e11.tag}:${r11}`);
            return void 0 === s11 || e11.revalidatedAt > s11;
          }), pendingRevalidates: Object.fromEntries(Object.entries(n10.pendingRevalidates).filter(([e11]) => !(e11 in s10.pendingRevalidates))), pendingRevalidateWrites: n10.pendingRevalidateWrites.filter((e11) => !o2.has(e11)) });
          await (i10 = e10, l2 = [], (u2 = (null == (a3 = c2) ? void 0 : a3.pendingRevalidatedTags) ?? i10.pendingRevalidatedTags ?? []).length > 0 && l2.push(tV(u2, i10.incrementalCache, i10)), l2.push(...Object.values((null == a3 ? void 0 : a3.pendingRevalidates) ?? i10.pendingRevalidates ?? {})), l2.push(...(null == a3 ? void 0 : a3.pendingRevalidateWrites) ?? i10.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tz(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? e10.pendingRevalidatedTags.map((e11) => ({ ...e11 })) : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tV(e10, t10, r10) {
        if (0 === e10.length) return;
        let s10 = (function() {
          let e11 = tF[tB];
          if (e11) return Array.from(e11);
        })() ?? [], n10 = [], i10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of i10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let s11 = e11 || r11;
          i10.has(s11) || i10.set(s11, []), i10.get(s11).push(t11.tag);
        }
        for (let [e11, a3] of i10) {
          let i11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11 && !(t11 = null == r10 ? void 0 : r10.cacheLifeProfiles[e11])) throw Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`);
            t11 && (i11 = { expire: t11.expire });
          }
          for (let t11 of s10) e11 ? n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, a3, i11)) : n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, a3));
          t10 && n10.push(t10.revalidateTag(a3, i11));
        }
        await Promise.all(n10);
      }
      let tW = eK("after-task-async-storage");
      class tK {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.isRequestClosed = false, this.initialOnCloseError = null, this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new tI.default(), this.callbackQueue.pause();
          try {
            t10(() => {
              for (let e11 of (this.isRequestClosed = true, this.workUnitStores)) e11.phase = "after";
            });
          } catch (e11) {
            this.initialOnCloseError = { error: e11 };
          }
        }
        after(e10, t10) {
          if (this.initialOnCloseError) throw new tj("An onClose call failed, which means after() can't work correctly.", { cause: this.initialOnCloseError.error });
          if (this.workUnitStores.add(t10), tc(e10)) this.addThenable(e10);
          else if ("function" == typeof e10) this.addCallback(e10, t10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addThenable(e10) {
          this.waitUntil || tJ(), this.waitUntil(new Promise((t10) => {
            e10.then(() => {
              t10();
            }, (e11) => {
              t10(), this.reportTaskError("promise", e11);
            });
          }));
        }
        addCallback(e10, t10) {
          var r10;
          this.waitUntil || tJ();
          let s10 = tW.getStore(), n10 = s10 ? s10.rootTaskSpawnPhase : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (r10 = async () => {
            try {
              await tW.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, eW ? eW.bind(r10) : eV.bind(r10));
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return this.isRequestClosed ? await new Promise((e10) => {
            setTimeout(e10, 0);
          }) : await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          let e10 = eJ.getStore();
          if (!e10) throw new tj("Missing workStore in AfterContext.runCallbacks");
          return tG(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new tj("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function tJ() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      function tX(e10) {
        let t10, r10 = { then: (s10, n10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(s10, n10)) };
        return r10;
      }
      class tY {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      let tQ = "x-middleware-override-headers", tZ = "x-middleware-request-";
      function t0(e10) {
        let [, t10, r10] = (null == e10 ? void 0 : e10.toLowerCase().split("-")) ?? [];
        return t10 && r10 ? `${t10}-${r10}` : void 0;
      }
      function t1(e10) {
        return "traceparent" === e10 || "tracestate" === e10;
      }
      function t2(e10, t10, r10) {
        e10.set(tZ + "traceparent", r10.traceparent), t10.push("traceparent"), r10.tracestate ? (e10.set(tZ + "tracestate", r10.tracestate), t10.push("tracestate")) : e10.delete(tZ + "tracestate"), e10.set(tQ, t10.join(","));
      }
      function t4() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let t3 = /* @__PURE__ */ Symbol.for("@next/request-context"), t5 = /[^\t\x20-\x7e]/, t6 = /[^\t\x20-\x7e]+/g;
      function t8(e10) {
        return t5.test(e10) ? e10.replace(t6, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function t9(e10, t10, r10) {
        let s10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.indexOf("/", 1);
            for (; ; ) {
              -1 === r11 && (r11 = e11.length);
              let s11 = e11.slice(0, r11);
              if (s11 && (s11.endsWith("/page") || s11.endsWith("/route") || (s11 = `${s11}${!s11.endsWith("/") ? "/" : ""}layout`), t12.push(s11)), r11 === e11.length) break;
              r11 = e11.indexOf("/", r11 + 1);
            }
          }
          return t12;
        })(e10)) t11 = t8(`${x}${t11}`), s10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = t8(`${x}${t10}`);
          s10.add(e11);
        }
        s10.has(`${x}/`) && s10.add(`${x}/index`), s10.has(`${x}/index`) && s10.add(`${x}/`);
        let n10 = Array.from(s10);
        return { tags: n10, expirationsByCacheKind: (function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tH();
          if (r11) for (let [s11, n11] of r11) "getExpiration" in n11 && t11.set(s11, tX(async () => n11.getExpiration(e11)));
          return t11;
        })(n10) };
      }
      let t7 = /* @__PURE__ */ Symbol.for("NextInternalRequestMeta"), re = { get default() {
        throw new tj("Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected.");
      } };
      class rt extends eA {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new f({ page: this.sourcePage });
        }
        respondWith() {
          throw new f({ page: this.sourcePage });
        }
        waitUntil() {
          throw new f({ page: this.sourcePage });
        }
      }
      let rr = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, rs = (e10, t10) => tT().withPropagatedContext(e10.headers, t10, rr), rn = false;
      async function ri(t10) {
        var r10, s10, n10, i10, a3, o2;
        let l2, u2, c2, h2, p2, f2, g2;
        !(function() {
          if (!rn && (rn = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), rs = r11(rs);
          }
        })(), await d();
        let m2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let y2 = t10.bypassNextUrl ? new URL(t10.request.url) : new V(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...y2.searchParams.keys()]) {
          let t11 = y2.searchParams.getAll(e10), r11 = (function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          })(e10);
          if (r11) {
            for (let e11 of (y2.searchParams.delete(r11), t11)) y2.searchParams.append(r11, e11);
            y2.searchParams.delete(e10);
          }
        }
        let b2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in y2 && (b2 = y2.buildId || "", y2.buildId = "");
        let v2 = (function(e10) {
          let t11 = new Headers();
          for (let [r11, s11] of Object.entries(e10)) for (let e11 of Array.isArray(s11) ? s11 : [s11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        })(t10.request.headers), w2 = v2.has("x-nextjs-data"), _2 = "1" === v2.get("rsc");
        w2 && "/index" === y2.pathname && (y2.pathname = "/");
        let S2 = /* @__PURE__ */ new Map();
        if (!m2) for (let e10 of eM) {
          let t11 = v2.get(e10);
          null !== t11 && (S2.set(e10, t11), v2.delete(e10));
        }
        let k2 = y2.searchParams.get(eq), E2 = new rt({ page: t10.page, input: ((f2 = (p2 = "string" == typeof y2) ? new URL(y2) : y2).searchParams.delete(eq), p2 ? f2.toString() : f2).toString(), init: { body: t10.request.body, headers: v2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (a3 = t10.request.requestMeta, E2[t7] = a3), w2 && Object.defineProperty(E2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, previewProps: t4(), prerenderManifest: { version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: t4() } }));
        let T2 = t10.request.waitUntil ?? (null == (r10 = null == (g2 = globalThis[t3]) ? void 0 : g2.get()) ? void 0 : r10.waitUntil), x2 = new $({ request: E2, page: t10.page, context: T2 ? { waitUntil: T2 } : void 0 }), R2 = "/middleware" === (o2 = t10.page) || "/src/middleware" === o2 || "/proxy" === o2 || "/src/proxy" === o2;
        if ((l2 = await rs(E2, () => {
          if (R2) {
            let e10 = x2.waitUntil.bind(x2), r11 = new tY(), s11 = tT(), n11 = () => {
              let n12 = new Headers(E2.headers);
              return (c2 = (function(e11, t11) {
                if (!t11) return;
                let r12 = e11.get("traceparent"), s12 = t0(r12);
                if (r12 && s12 && s12 === t0(t11.traceparent)) {
                  let t12 = e11.get("tracestate");
                  return t12 ? { traceparent: r12, tracestate: t12 } : { traceparent: r12, tracestate: void 0 };
                }
                return t11;
              })(n12, s11.getTraceContextHeaders())) && (h2 = n12), s11.trace(ta.execute, { spanName: `middleware ${E2.method}`, startTime: t10.emitInstrumentationSpans ? t10.requestStartTime : void 0, attributes: { "http.target": E2.nextUrl.pathname, "http.method": E2.method } }, async () => {
                null == t10.emitInstrumentationSpans || t10.emitInstrumentationSpans.call(t10);
                try {
                  var s12, n13, i11, a4, o3, l3;
                  let c3 = t4(), h3 = await t9("/", E2.nextUrl.pathname, null), d2 = (i11 = E2.nextUrl, a4 = (e11) => {
                    u2 = e11;
                  }, o3 = void 0, (function(e11) {
                    let { phase: t11, headers: r12, onUpdateCookies: s13, url: n14, rootParams: i12, implicitTags: a5, resumeDataCache: o4, previewProps: l4, isHmrRefresh: u3, serverComponentsHmrCache: c4, hmrRefreshHash: h4, stagedFallbackParams: d3 } = e11, p4 = {};
                    return { type: "request", phase: t11, implicitTags: a5, url: { pathname: n14.pathname, search: n14.search ?? "" }, rootParams: i12, get headers() {
                      return p4.headers || (p4.headers = eG.seal(eG.from(r12), tC)), p4.headers;
                    }, get cookies() {
                      if (!p4.cookies) {
                        let e12 = new eO.RequestCookies(eG.from(r12));
                        tO(r12, e12), p4.cookies = eY.seal(e12);
                      }
                      return p4.cookies;
                    }, set cookies(e12) {
                      p4.cookies = e12;
                    }, get mutableCookies() {
                      if (!p4.mutableCookies) {
                        let e12, t12 = (e12 = new eO.RequestCookies(eG.from(r12)), eZ.wrap(e12, s13));
                        tO(r12, t12), p4.mutableCookies = t12;
                      }
                      return p4.mutableCookies;
                    }, get userspaceMutableCookies() {
                      if (!p4.userspaceMutableCookies) {
                        var e12;
                        let t12;
                        e12 = this, p4.userspaceMutableCookies = t12 = new Proxy(e12.mutableCookies, { get(r13, s14, n15) {
                          switch (s14) {
                            case "delete":
                              return function(...s15) {
                                return e0(e12, "cookies().delete"), r13.delete(...s15), t12;
                              };
                            case "set":
                              return function(...s15) {
                                return e0(e12, "cookies().set"), r13.set(...s15), t12;
                              };
                            default:
                              return eI.get(r13, s14, n15);
                          }
                        } });
                      }
                      return p4.userspaceMutableCookies;
                    }, get draftMode() {
                      return p4.draftMode || (p4.draftMode = new tR(l4, r12, this.cookies, this.mutableCookies)), p4.draftMode;
                    }, resumeDataCache: o4 ?? null, isHmrRefresh: u3, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, hmrRefreshHash: h4, stagedFallbackParams: d3, usedDynamic: false };
                  })({ phase: "action", headers: E2.headers, onUpdateCookies: a4, url: i11, rootParams: {}, implicitTags: h3, resumeDataCache: null, previewProps: c3, isHmrRefresh: false, serverComponentsHmrCache: void 0, hmrRefreshHash: o3, stagedFallbackParams: null })), p3 = (l3 = { page: "/", renderOpts: { cacheLifeProfiles: re, staticPageGenerationTimeout: 0, cacheComponents: false, validationLevel: "warning", experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (n13 = t10.request.nextConfig) || null == (s12 = n13.experimental) ? void 0 : s12.authInterrupts), useCacheTimeout: 0, durableUseCacheEntries: false }, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === E2.headers.get(eU), buildId: b2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] }, (function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: s13, deploymentId: n14, previouslyRevalidatedTags: i12, nonce: a5 }, o4) {
                    let l4 = { page: e11, route: eF(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, useCacheTimeout: t11.experimental.useCacheTimeout, durableUseCacheEntries: t11.experimental.durableUseCacheEntries, staticPageGenerationTimeout: t11.staticPageGenerationTimeout, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, requestId: void 0, htmlRequestId: void 0, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: s13, deploymentId: n14, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: a5, afterContext: (function(e12) {
                      let { waitUntil: t12, onClose: r13, onAfterTaskError: s14 } = e12;
                      return new tK({ waitUntil: t12, onClose: r13, onTaskError: s14 });
                    })(t11), cacheComponentsEnabled: t11.cacheComponents, validationLevel: t11.validationLevel, previouslyRevalidatedTags: i12, requestStartTime: performance.timeOrigin + performance.now(), refreshTagsByCacheKind: (function() {
                      let e12 = /* @__PURE__ */ new Map(), t12 = tH();
                      if (t12) for (let [r13, s14] of t12) "refreshTags" in s14 && e12.set(r13, tX(async () => s14.refreshTags()));
                      return e12;
                    })(), runInCleanSnapshot: eW ? eW.snapshot() : function(e12, ...t12) {
                      return e12(...t12);
                    }, shouldTrackFetchMetrics: o4, clientComponentLoadTracker: void 0, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                    return t11.store = l4, l4;
                  })(l3, false));
                  return await eJ.run(p3, () => tP.run(d2, t10.handler, E2, x2));
                } finally {
                  setTimeout(() => {
                    r11.dispatchClose();
                  }, 0);
                }
              });
            };
            return s11.isOpenTelemetryEnabled() && !s11.hasActiveSpanContext() ? s11.trace(to.request, { spanName: E2.method, kind: ty.SERVER, startTime: t10.requestStartTime, attributes: { "http.target": E2.nextUrl.pathname, "http.method": E2.method } }, n11) : n11();
          }
          return t10.handler(E2, x2);
        })) && !(l2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        l2 && !R2 && l2.headers.has("x-middleware-set-cookie") && (l2 = new Response(l2.body, l2)).headers.delete("x-middleware-set-cookie"), l2 && u2 && l2.headers.set("set-cookie", u2);
        let C2 = null == l2 ? void 0 : l2.headers.get("x-middleware-rewrite");
        if (l2 && C2 && (_2 || !m2)) {
          let e10 = new V(C2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          m2 || e10.host !== E2.nextUrl.host || (e10.buildId = b2 || e10.buildId, l2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: a4 } = eD(e10.toString(), y2.toString());
          !m2 && w2 && l2.headers.set("x-nextjs-rewrite", r11);
          let o3 = !a4 && (null == (i10 = t10.request.nextConfig) || null == (n10 = i10.experimental) || null == (s10 = n10.clientParamParsingOrigins) ? void 0 : s10.some((t11) => new RegExp(t11).test(e10.origin)));
          _2 && (a4 || o3) && (y2.pathname !== e10.pathname && l2.headers.set("x-nextjs-rewritten-path", e10.pathname), y2.search !== e10.search && l2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (l2 && C2 && _2 && k2) {
          let e10 = new URL(C2);
          e10.searchParams.has(eq) || (e10.searchParams.set(eq, k2), l2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let O2 = null == l2 ? void 0 : l2.headers.get("Location");
        if (l2 && O2 && !m2) {
          let e10 = new V(O2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          l2 = new Response(l2.body, l2), e10.host === y2.host && (e10.buildId = b2 || e10.buildId, l2.headers.set("Location", eD(e10, y2).url)), w2 && (l2.headers.delete("Location"), l2.headers.set("x-nextjs-redirect", eD(e10.toString(), y2.toString()).url));
        }
        let P2 = l2 || eL.next();
        h2 && (function(e10, t11, r11) {
          if (!r11 || !e10.has("x-middleware-next") && !e10.has("x-middleware-rewrite")) return;
          let s11 = e10.get(tQ);
          if (!s11) {
            if (t11.get("traceparent") === r11.traceparent && t11.get("tracestate") === (r11.tracestate ?? null)) return;
            let s12 = [];
            for (let [r12, n12] of t11) t1(r12) || (e10.set(tZ + r12, n12), s12.push(r12));
            t2(e10, s12, r11);
            return;
          }
          let n11 = s11.split(",").map((e11) => e11.trim()).filter(Boolean);
          n11.includes("traceparent") && e10.get(tZ + "traceparent") !== t11.get("traceparent") || t2(e10, n11.filter((e11) => !t1(e11)), r11);
        })(P2.headers, h2, c2);
        let A2 = P2.headers.get("x-middleware-override-headers"), I2 = [];
        if (A2) {
          for (let [e10, t11] of S2) P2.headers.set(`x-middleware-request-${e10}`, t11), I2.push(e10);
          I2.length > 0 && P2.headers.set("x-middleware-override-headers", A2 + "," + I2.join(","));
        }
        return { response: P2, waitUntil: ("internal" === x2[j].kind ? Promise.all(x2[j].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: E2.fetchMetrics };
      }
      let ra = ["(..)(..)", "(.)", "(..)", "(...)"], ro = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, rl = /\/\[[^/]+\](?=\/|$)/;
      class ru {
        constructor(e10 = []) {
          this.normalizers = e10;
        }
        push(e10) {
          this.normalizers.push(e10);
        }
        normalize(e10) {
          return this.normalizers.reduce((e11, t10) => t10.normalize(e11), e10);
        }
      }
      class rc {
        normalize(e10) {
          return e10.replace(/%5F/g, "_");
        }
      }
      var rh = ((ec = {}).PAGES = "PAGES", ec.PAGES_API = "PAGES_API", ec.APP_PAGE = "APP_PAGE", ec.APP_ROUTE = "APP_ROUTE", ec.IMAGE = "IMAGE", ec);
      let rd = "route-cache", rp = new class extends ru {
        constructor() {
          super([{ normalize: eF }, new rc()]);
        }
        normalize(e10) {
          return super.normalize(e10);
        }
      }();
      function rf(e10, t10, r10, s10) {
        if (!r10) return false;
        let n10 = null === r10.dataRoute ? rh.APP_ROUTE : r10.dataRoute.endsWith(".json") ? rh.PAGES : r10.dataRoute.endsWith(".rsc") ? rh.APP_PAGE : void 0;
        return n10 === t10.kind && (("srcRoute" in r10 ? r10.srcRoute : r10.fallbackSourceRoute) ?? (n10 === rh.PAGES ? F(e10, s10).pathname : e10)) === (n10 === rh.PAGES ? t10.sourceRoute : rp.normalize(t10.sourceRoute));
      }
      function rg(t10, r10) {
        let s10;
        if (!r10) throw new tj("Response cache requires a source route");
        let { sourceRoute: n10 } = r10;
        return s10 = e.r(63398)().update(new TextEncoder().encode(n10)).digest("hex"), `/${rd}/${r10.kind}/${s10}/$${/^\/index(\/|$)/.test(t10) && !(function(e10, t11 = true) {
          return (void 0 !== e10.split("/").find((e11) => ra.find((t12) => e11.startsWith(t12))) && (e10 = (function(e11) {
            let t12, r11, s11;
            for (let n11 of e11.split("/")) if (r11 = ra.find((e12) => n11.startsWith(e12))) {
              [t12, s11] = e11.split(r11, 2);
              break;
            }
            if (!t12 || !r11 || !s11) throw Error(`Invalid interception route: ${e11}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
            switch (t12 = eF(t12), r11) {
              case "(.)":
                s11 = "/" === t12 ? `/${s11}` : t12 + "/" + s11;
                break;
              case "(..)":
                if ("/" === t12) throw Error(`Invalid interception route: ${e11}. Cannot use (..) marker at the root level, use (.) instead.`);
                s11 = t12.split("/").slice(0, -1).concat(s11).join("/");
                break;
              case "(...)":
                s11 = "/" + s11;
                break;
              case "(..)(..)":
                let n11 = t12.split("/");
                if (n11.length <= 2) throw Error(`Invalid interception route: ${e11}. Cannot use (..)(..) marker at the root level or one level up.`);
                s11 = n11.slice(0, -2).concat(s11).join("/");
                break;
              default:
                throw Error("Invariant: unexpected marker");
            }
            return { interceptingRoute: t12, interceptedRoute: s11 };
          })(e10).interceptedRoute), t11) ? rl.test(e10) : ro.test(e10);
        })(t10) ? `/index${t10}` : "/" === t10 ? "/index" : eB(t10)}`;
      }
      var rm = ((eh = {}).APP_PAGE = "APP_PAGE", eh.APP_ROUTE = "APP_ROUTE", eh.PAGES = "PAGES", eh.FETCH = "FETCH", eh.REDIRECT = "REDIRECT", eh.IMAGE = "IMAGE", eh), ry = ((ed = {}).APP_PAGE = "APP_PAGE", ed.APP_ROUTE = "APP_ROUTE", ed.PAGES = "PAGES", ed.FETCH = "FETCH", ed.IMAGE = "IMAGE", ed);
      function rb() {
        let e10, t10, r10 = new Promise((r11, s10) => {
          e10 = r11, t10 = s10;
        });
        return { resolve: e10, reject: t10, promise: r10 };
      }
      class rv {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class rw {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class r_ {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new rw(), this.tail = new rw(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10, e10)) ?? 1;
          if (r10 <= 0) throw Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`);
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let s10 = this.cache.get(e10);
          if (s10) s10.data = t10, this.totalSize = this.totalSize - s10.size + r10, s10.size = r10, this.moveToHead(s10);
          else {
            let s11 = new rv(e10, t10, r10);
            this.cache.set(e10, s11), this.addToHead(s11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: rS, stdout: rk } = (null == (ew = globalThis) ? void 0 : ew.process) ?? {}, rE = rS && !rS.NO_COLOR && (rS.FORCE_COLOR || (null == rk ? void 0 : rk.isTTY) && !rS.CI && "dumb" !== rS.TERM);
      (null == rk ? void 0 : rk.isTTY) || rS.NEXT_PRIVATE_PROMPT_OUTPUT;
      let rT = (e10, t10, r10, s10) => {
        let n10 = e10.substring(0, s10) + r10, i10 = e10.substring(s10 + t10.length), a3 = i10.indexOf(t10);
        return ~a3 ? n10 + rT(i10, t10, r10, a3) : n10 + i10;
      }, rx = (e10, t10, r10 = e10) => rE ? (s10) => {
        let n10 = "" + s10, i10 = n10.indexOf(t10, e10.length);
        return ~i10 ? e10 + rT(n10, t10, r10, i10) + t10 : e10 + n10 + t10;
      } : String, rR = rx("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      rx("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), rx("\x1B[3m", "\x1B[23m"), rx("\x1B[4m", "\x1B[24m"), rx("\x1B[7m", "\x1B[27m"), rx("\x1B[8m", "\x1B[28m"), rx("\x1B[9m", "\x1B[29m"), rx("\x1B[30m", "\x1B[39m");
      let rC = rx("\x1B[31m", "\x1B[39m"), rO = rx("\x1B[32m", "\x1B[39m"), rP = rx("\x1B[33m", "\x1B[39m");
      rx("\x1B[34m", "\x1B[39m");
      let rA = rx("\x1B[35m", "\x1B[39m");
      rx("\x1B[38;2;173;127;168m", "\x1B[39m"), rx("\x1B[36m", "\x1B[39m");
      let rI = rx("\x1B[37m", "\x1B[39m");
      rx("\x1B[90m", "\x1B[39m"), rx("\x1B[40m", "\x1B[49m"), rx("\x1B[41m", "\x1B[49m"), rx("\x1B[42m", "\x1B[49m"), rx("\x1B[43m", "\x1B[49m"), rx("\x1B[44m", "\x1B[49m"), rx("\x1B[45m", "\x1B[49m"), rx("\x1B[46m", "\x1B[49m"), rx("\x1B[47m", "\x1B[49m"), rI(rR("\u25CB")), rC(rR("\u2A2F")), rP(rR("\u26A0")), rI(rR(" ")), rO(rR("\u2713")), rA(rR("\xBB")), new r_(1e4, (e10) => e10.length), new r_(1e4, (e10) => e10.length);
      let rj = "ResponseAborted";
      class rN extends Error {
        constructor(...e10) {
          super(...e10), this.name = rj;
        }
      }
      function r$(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === rj;
      }
      let rL = "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      async function rD(e10, t10, r10, s10) {
        try {
          let n10, { errored: i10, destroyed: a3 } = t10;
          if (i10 || a3) return;
          let o2 = (n10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n10.abort(new rN());
          }), n10), l2 = (function(e11, t11, r11) {
            let s11 = false, n11 = rb();
            function i11() {
              n11.resolve();
            }
            e11.on("drain", i11), e11.once("close", () => {
              e11.off("drain", i11), n11.resolve();
            });
            let a4 = rb();
            return e11.once("finish", () => {
              a4.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!s11) {
                if (s11 = true, rL) {
                  let e12 = null == r11 ? void 0 : r11.snapshot();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), tT().trace(e5.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n11.promise, n11 = rb());
              } catch (t13) {
                throw e11.end(), Error("failed to write chunk to response", { cause: t13 });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a4.promise;
            } });
          })(t10, r10, s10);
          await e10.pipeTo(l2, { signal: o2.signal });
        } catch (e11) {
          if (r$(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      async function rU(e10, t10, r10, s10) {
        try {
          let { errored: n10, destroyed: i10 } = t10;
          if (n10 || i10) return;
          let a3 = false, o2 = rb(), l2 = false, u2 = () => {
            l2 && !e10.destroyed && (l2 = false, e10.resume());
          };
          t10.on("drain", u2), t10.once("close", () => {
            t10.off("drain", u2), e10.destroy(), o2.resolve();
          }), e10.on("data", (r11) => {
            if (!a3) {
              if (a3 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                let e11 = null == s10 ? void 0 : s10.snapshot();
                e11 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e11.clientComponentLoadStart, end: e11.clientComponentLoadStart + e11.clientComponentLoadTimes });
              }
              t10.flushHeaders(), tT().trace(e5.startResponse, { spanName: "start response" }, () => void 0);
            }
            let n11 = t10.write(r11);
            "flush" in t10 && "function" == typeof t10.flush && t10.flush(), n11 || (l2 = true, e10.pause());
          }), e10.on("end", async () => {
            r10 && await r10, t10.writableFinished || t10.end(), o2.resolve();
          }), e10.on("error", (e11) => {
            r$(e11) || t10.destroy(e11), o2.resolve();
          }), await o2.promise;
        } catch (e11) {
          if (r$(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      function rM(e10) {
        return null !== e10 && "object" == typeof e10 && "function" == typeof e10.pipe && "function" == typeof e10.on && !(e10 instanceof ReadableStream);
      }
      class rq {
        static #e = this.EMPTY = new rq(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new rq(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: s10 }) {
          this.response = e10, this.contentType = t10, this.metadata = s10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw new tj("dynamic responses cannot be unchunked. This is a bug in Next.js");
            return tM(this.readable);
          }
          return this.response;
        }
        get readable() {
          if (null === this.response) return new ReadableStream({ start(e10) {
            e10.close();
          } });
          if ("string" == typeof this.response) return tD(this.response);
          if (tN.Buffer.isBuffer(this.response)) return tU(this.response);
          if (Array.isArray(this.response)) return (function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), s10 = e10[0].pipeTo(r10, { preventClose: true }), n10 = 1;
            for (; n10 < e10.length - 1; n10++) {
              let t11 = e10[n10];
              s10 = s10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let i10 = e10[n10];
            return (s10 = s10.then(() => i10.pipeTo(r10))).catch(t$), t10;
          })(...this.response);
          if (rM(this.response)) throw new tj("Node.js Readable cannot be converted to a web stream in the edge runtime");
          return this.response;
        }
        coerce() {
          if (null === this.response) return [];
          if ("string" == typeof this.response) return [tD(this.response)];
          if (Array.isArray(this.response)) return this.response;
          if (tN.Buffer.isBuffer(this.response)) return [tU(this.response)];
          if (!rM(this.response)) return [this.response];
          throw new tj("Node.js Readable cannot be converted to a web stream in the edge runtime");
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (r$(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          null !== this.response && "string" != typeof this.response && !tN.Buffer.isBuffer(this.response) && !Array.isArray(this.response) && rM(this.response) ? await rU(this.response, e10, this.waitUntil, this.metadata.clientComponentLoadTracker) : await rD(this.readable, e10, this.waitUntil, this.metadata.clientComponentLoadTracker);
        }
      }
      function rB(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      rB(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), rB(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var rF = e.i(68886);
      let rH = /* @__PURE__ */ new Map(), rG = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rH.get(r10), s10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof s10 && s10 <= performance.timeOrigin + performance.now() && s10 > t10) return true;
        }
        return false;
      }, rz = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rH.get(r10), s10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof s10 && s10 > t10) return true;
        }
        return false;
      };
      class rV {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(rF.default.dirname(e10)), s10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          s10.catch(() => {
          }), r10[2].push(s10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function rW(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class rK {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        static #t = this.seedReads = /* @__PURE__ */ new Map();
        constructor(e10) {
          if (this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize) if (rK.memoryCache) rK.debug && console.log("FileSystemCache: memory store already initialized");
          else {
            var t10;
            rK.debug && console.log("FileSystemCache: using memory store for fetch cache"), t10 = e10.maxMemoryCacheSize, r || (r = new r_(t10, function({ value: e11 }, t11) {
              var r10, s10;
              let n10;
              if (e11) if (e11.kind === rm.REDIRECT) n10 = JSON.stringify(e11.props).length;
              else if (e11.kind === rm.IMAGE) throw Error("invariant image should not be incremental-cache");
              else n10 = e11.kind === rm.FETCH ? JSON.stringify(e11.data || "").length : e11.kind === rm.APP_ROUTE ? e11.body.length : e11.kind === rm.APP_PAGE ? Math.max(1, e11.html.length + rW(e11.rscData) + ((null == (r10 = e11.postponed) ? void 0 : r10.length) || 0) + (function(e12) {
                if (!e12) return 0;
                let t12 = 0;
                for (let [r11, s11] of e12) t12 += r11.length + rW(s11);
                return t12;
              })(e11.segmentData)) : e11.html.length + ((null == (s10 = JSON.stringify(e11.pageData)) ? void 0 : s10.length) || 0);
              else n10 = 25;
              return t11.length + n10;
            })), rK.memoryCache = r;
          }
          else rK.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        getSeedReadState(e10) {
          return rK.seedReads.get(`${this.serverDistDir}:${e10}`);
        }
        beginSeedRead(e10) {
          let t10 = `${this.serverDistDir}:${e10}`, r10 = rK.seedReads.get(t10);
          return r10 || (r10 = { readers: 0, version: 0 }, rK.seedReads.set(t10, r10)), r10.readers++, { stateKey: t10, state: r10, version: r10.version };
        }
        finishSeedRead(e10, t10) {
          t10.readers--, 0 !== t10.readers || t10.promotion || rK.seedReads.delete(e10);
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rK.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let s10 of e10) {
            let e11 = rH.get(s10) || {};
            if (t10) {
              let n10 = { ...e11 };
              n10.stale = r10, void 0 !== t10.expire && (n10.expired = r10 + 1e3 * t10.expire), rH.set(s10, n10);
            } else rH.set(s10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, s10, n10, i10, a3, o2, l2, u2, c2;
          let h2, [d2, p2] = e10, { kind: f2 } = p2, g2 = null == (t10 = rK.memoryCache) ? void 0 : t10.get(d2), m2 = null == (r10 = this.getSeedReadState(d2)) ? void 0 : r10.promotion;
          !g2 && m2 && (await m2, g2 = null == (o2 = rK.memoryCache) ? void 0 : o2.get(d2)), rK.debug && (f2 === ry.FETCH ? console.log("FileSystemCache: get", d2, p2.tags, f2, !!g2) : console.log("FileSystemCache: get", d2, f2, !!g2));
          let y2 = f2 === ry.PAGES || f2 === ry.APP_PAGE || f2 === ry.APP_ROUTE;
          if (!g2 && y2 && d2.startsWith(`/${rd}/`), (null == g2 || null == (s10 = g2.value) ? void 0 : s10.kind) === rm.APP_PAGE || (null == g2 || null == (n10 = g2.value) ? void 0 : n10.kind) === rm.APP_ROUTE || (null == g2 || null == (i10 = g2.value) ? void 0 : i10.kind) === rm.PAGES) {
            let e11 = null == (l2 = g2.value.headers) ? void 0 : l2[E];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && rG(t11, g2.lastModified)) return rK.debug && console.log("FileSystemCache: expired tags", t11), h2 && this.finishSeedRead(h2.stateKey, h2.state), null;
            }
          } else if ((null == g2 || null == (a3 = g2.value) ? void 0 : a3.kind) === rm.FETCH) {
            let e11 = p2.kind === ry.FETCH ? [...p2.tags || [], ...p2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rK.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (rG(e11, g2.lastModified)) return rK.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          if (h2 && g2) {
            let { stateKey: e11, state: t11, version: r11 } = h2;
            try {
              t11.version === r11 && (await this.promoteSeed(d2, d2, g2, p2, e11, t11, r11), t11.version !== r11 || (null == (u2 = rK.memoryCache) ? void 0 : u2.get(d2)) || null == (c2 = rK.memoryCache) || c2.set(d2, g2));
            } finally {
              this.finishSeedRead(e11, t11);
            }
          }
          return g2 ?? null;
        }
        async promoteSeed(e10, t10, r10, s10, n10, i10, a3) {
          let o2 = this.fs.writeFileAtomic;
          if (!this.flushToDisk || !o2 || !r10.value) return;
          if (i10.promotion) return void await i10.promotion;
          let l2 = (async () => {
            let n11 = r10.value;
            if (!n11 || i10.version !== a3 || n11.kind !== rm.PAGES && n11.kind !== rm.APP_PAGE && n11.kind !== rm.APP_ROUTE) return;
            let l3 = s10.kind, u2 = this.getFilePath(n11.kind === rm.APP_ROUTE ? `${e10}.body` : `${e10}.html`, l3);
            if (this.fs.existsSync(u2)) return;
            let c2 = this.getFilePath(n11.kind === rm.APP_ROUTE ? `${t10}.body` : `${t10}.html`, l3), h2 = c2.replace(n11.kind === rm.APP_ROUTE ? /\.body$/ : /\.html$/, k), d2 = JSON.parse(await this.fs.readFile(h2, "utf8"));
            d2.routeCacheLastModified = r10.lastModified;
            let p2 = [];
            n11.kind !== rm.PAGES || s10.isFallback ? n11.kind === rm.APP_PAGE && (s10.isFallback || s10.isRoutePPREnabled && null != d2.postponed || p2.push({ path: this.getFilePath(`${e10}${_}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${_}`, l3)) }), p2.push(...await Promise.all((d2.segmentPaths ?? []).map(async (r11) => ({ path: this.getFilePath(e10 + v + r11 + w, l3), data: await this.fs.readFile(this.getFilePath(t10 + v + r11 + w, l3)) }))))) : p2.push({ path: this.getFilePath(`${e10}${S}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${S}`, l3)) });
            let f2 = new rV(this.fs);
            for (let e11 of p2) f2.append(e11.path, e11.data);
            if (await f2.wait(), i10.version !== a3) return;
            let g2 = u2.replace(n11.kind === rm.APP_ROUTE ? /\.body$/ : /\.html$/, k);
            await this.fs.mkdir(rF.default.dirname(g2)), await this.fs.writeFile(g2, JSON.stringify(d2)), i10.version !== a3 || this.fs.existsSync(u2) || await o2.call(this.fs, u2, await this.fs.readFile(c2));
          })();
          i10.promotion = l2.catch((e11) => {
            rK.debug && console.log("FileSystemCache: failed to promote build seed", e11);
          });
          try {
            await i10.promotion;
          } finally {
            i10.promotion && (i10.promotion = void 0), 0 === i10.readers && rK.seedReads.delete(n10);
          }
        }
        async set(e10, t10, r10) {
          var s10;
          let n10 = r10.fetchCache ? void 0 : r10.cacheControl, i10 = this.getSeedReadState(e10);
          if (i10 && i10.version++, null == (s10 = rK.memoryCache) || s10.set(e10, { value: t10, lastModified: Date.now(), cacheControl: n10 }), rK.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          await (null == i10 ? void 0 : i10.promotion);
          let a3 = new rV(this.fs);
          if (t10.kind === rm.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, ry.APP_ROUTE);
            a3.append(r11, t10.body);
            let s11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0, cacheControl: n10 };
            a3.append(r11.replace(/\.body$/, k), JSON.stringify(s11, null, 2));
          } else if (t10.kind === rm.PAGES || t10.kind === rm.APP_PAGE) {
            let s11 = t10.kind === rm.APP_PAGE, i11 = this.getFilePath(`${e10}.html`, s11 ? ry.APP_PAGE : ry.PAGES);
            if (a3.append(i11, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || a3.append(this.getFilePath(`${e10}${s11 ? _ : S}`, s11 ? ry.APP_PAGE : ry.PAGES), s11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === rm.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = i11.replace(/\.html$/, v);
                for (let [s12, n11] of t10.segmentData) {
                  e11.push(s12);
                  let t11 = r12 + s12 + w;
                  a3.append(t11, n11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0, cacheControl: n10 };
              a3.append(i11.replace(/\.html$/, k), JSON.stringify(r11));
            } else {
              let e11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
              a3.append(i11.replace(/\.html$/, k), JSON.stringify(e11));
            }
          } else if (t10.kind === rm.FETCH) {
            let s11 = this.getFilePath(e10, ry.FETCH);
            a3.append(s11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await a3.wait();
        }
        getFilePath(e10, t10) {
          let r10;
          switch (t10) {
            case ry.FETCH:
              r10 = rF.default.join(this.serverDistDir, "..", "cache", "fetch-cache");
              break;
            case ry.PAGES:
              r10 = rF.default.join(this.serverDistDir, "pages");
              break;
            case ry.IMAGE:
            case ry.APP_PAGE:
            case ry.APP_ROUTE:
              r10 = rF.default.join(this.serverDistDir, "app");
              break;
            default:
              throw Error(`Unexpected file path kind: ${t10}`);
          }
          (t10 === ry.PAGES || t10 === ry.APP_PAGE || t10 === ry.APP_ROUTE) && e10.startsWith(`/${rd}/`) && (r10 = rF.default.join(this.serverDistDir, "."));
          let s10 = rF.default.join(r10, e10);
          if (!(s10.startsWith(r10 + rF.default.sep) || s10 === r10)) throw Error(`Invalid file path: ${s10}`);
          return s10;
        }
      }
      class rJ {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10, t10) {
          this.prerenderManifest = e10, this.locales = t10;
        }
        get(e10, t10) {
          let r10 = rJ.cacheControls.get(rg(e10, t10));
          if (r10) return r10;
          let s10 = this.prerenderManifest.routes[e10];
          if (s10 && rf(e10, t10, s10, this.locales)) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = s10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n10 = t10.kind === rh.PAGES ? F(e10, this.locales).pathname : e10, i10 = this.prerenderManifest.dynamicRoutes[n10];
          if (i10 && rf(e10, t10, i10, this.locales)) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = i10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rJ.cacheControls.set(e10, t10);
        }
        clear() {
          rJ.cacheControls.clear();
        }
      }
      function rX(e10) {
        let t10 = "buffer" in e10 ? new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength) : new Uint8Array(e10), r10 = "";
        for (let e11 of t10) r10 += e11.toString(16).padStart(2, "0");
        return r10;
      }
      async function rY(e10) {
        {
          let t10 = new TextEncoder().encode(e10);
          return rX(await crypto.subtle.digest("SHA-256", t10));
        }
      }
      e.i(67914);
      class rQ {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: s10, serverDistDir: n10, requestHeaders: i10, maxMemoryCacheSize: a3, previewProps: o2, prerenderManifest: l2, fetchCacheKeyPrefix: u2, CurCacheHandler: c2, allowedRevalidateHeaderKeys: h2, locales: d2 }) {
          var p2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c2;
          let f2 = /* @__PURE__ */ Symbol.for("@next/cache-handlers"), g2 = globalThis;
          if (c2) rQ.debug && console.log("IncrementalCache: using custom cache handler", c2.name);
          else {
            let t11 = g2[f2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c2 = t11.FetchCache, rQ.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && n10 && (rQ.debug && console.log("IncrementalCache: using filesystem cache handler"), c2 = rK);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (a3 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = s10, this.requestHeaders = i10, this.allowedRevalidateHeaderKeys = h2, this.previewProps = o2, this.prerenderManifest = l2, this.locales = d2, this.cacheControls = new rJ(this.prerenderManifest, d2), this.fetchCacheKeyPrefix = u2;
          let m2 = [];
          i10[y] === this.previewProps.previewModeId && (this.isOnDemandRevalidate = true), s10 && (m2 = this.revalidatedTags = (p2 = this.previewProps.previewModeId, "string" == typeof i10[T] && i10["x-next-revalidate-tag-token"] === p2 ? i10[T].split(",") : [])), c2 && (this.cacheHandler = new c2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: n10, revalidatedTags: m2, maxMemoryCacheSize: a3, _requestHeaders: i10, fetchCacheKeyPrefix: u2 }));
        }
        calculateRevalidate(e10, t10, r10, s10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let n10 = e10 ? e10.revalidate : !s10 && 1;
          return "number" == typeof n10 ? 1e3 * n10 + t10 : n10;
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (rQ.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = rb();
          return rQ.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateSimpleCacheKey(e10) {
          return rY(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10]));
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], s10 = new TextEncoder(), n10 = null, i10 = t10.body;
          if (i10) if ("object" == typeof i10 && "byteLength" in i10) r10.push(`bytes:${rX(i10)}`), t10._ogBody = i10;
          else if ("function" == typeof i10.getReader) {
            let e11 = [];
            try {
              await i10.pipeTo(new WritableStream({ write(t11) {
                e11.push("string" == typeof t11 ? s10.encode(t11) : t11);
              } }));
              let n11 = e11.reduce((e12, t11) => e12 + t11.length, 0), a4 = new Uint8Array(n11), o2 = 0;
              for (let t11 of e11) a4.set(t11, o2), o2 += t11.length;
              r10.push(`bytes:${rX(a4)}`), t10._ogBody = a4;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof i10.keys) for (let [e11, s11] of (n10 = "[object FormData]" === String(i10) ? "multipart/form-data; boundary=" : "application/x-www-form-urlencoded;charset=UTF-8", t10._ogBody = i10, i10.entries())) r10.push(`key:${e11}`), "string" == typeof s11 ? r10.push(`str:${s11}`) : r10.push("file", s11.name, s11.type, `bytes:${rX(await s11.arrayBuffer())}`);
          else if ("function" == typeof i10.arrayBuffer) {
            let e11 = await i10.arrayBuffer();
            r10.push("blob", i10.type, `bytes:${rX(e11)}`), t10._ogBody = new Blob([e11], { type: i10.type }), n10 = i10.type;
          } else if ("string" == typeof i10) r10.push(`str:${i10}`), t10._ogBody = i10, n10 = "text/plain;charset=UTF-8";
          else throw Error(`Unsupported body type: ${typeof i10}`);
          let a3 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          return "traceparent" in a3 && delete a3.traceparent, "tracestate" in a3 && delete a3.tracestate, rY(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10, t10.method, n10, a3, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]));
        }
        async get(e10, t10) {
          var r10, s10, n10, i10, a3, o2, l2;
          let u2, c2;
          if (t10.kind === ry.IMAGE) throw new tj("Images must use the image optimizer cache");
          if (t10.kind === ry.FETCH) {
            let r11 = tP.getStore(), s11 = r11 ? tA(r11) : null;
            if (s11) {
              let r12 = s11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === rm.FETCH) {
                let s12 = eJ.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == s12 || null == (r13 = s12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return rQ.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                rQ.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else rQ.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else rQ.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== ry.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          let h2 = e10, d2 = t10;
          if (t10.kind !== ry.FETCH) {
            let { route: r11, ...s11 } = t10;
            h2 = rg(e10, r11), d2 = s11;
          }
          let p2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(h2, d2));
          if (t10.kind === ry.FETCH) {
            if (!p2) return null;
            if ((null == (n10 = p2.value) ? void 0 : n10.kind) !== rm.FETCH) throw new tj(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (i10 = p2.value) ? void 0 : i10.kind)} instead.`);
            let r11 = eJ.getStore(), s11 = [...t10.tags || [], ...t10.softTags || []];
            if (s11.some((e11) => {
              var t11, s12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (s12 = r11.pendingRevalidatedTags) ? void 0 : s12.some((t12) => t12.tag === e11));
            })) return rQ.debug && console.log("IncrementalCache: expired tag", e10), null;
            let a4 = tP.getStore();
            if (a4) {
              let t11 = tA(a4);
              (null == t11 ? void 0 : t11.mutable) && (rQ.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, p2.value));
            }
            let o3 = t10.revalidate || p2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (p2.lastModified || 0)) / 1e3 > o3, u3 = p2.value.data;
            return rG(s11, p2.lastModified) ? null : (rz(s11, p2.lastModified) && (l3 = true), { isStale: l3, value: { kind: rm.FETCH, data: u3, revalidate: o3 } });
          }
          if ((null == p2 || null == (s10 = p2.value) ? void 0 : s10.kind) === rm.FETCH) throw new tj(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`);
          let f2 = null, { isFallback: g2 } = t10, m2 = this.cacheControls.get(e10, t10.route);
          if ((null == p2 ? void 0 : p2.cacheControl) && (m2 = p2.cacheControl, this.cacheControls.set(h2, m2)), (null == p2 ? void 0 : p2.lastModified) === -1) u2 = -1, c2 = -31536e6;
          else {
            let e11 = performance.timeOrigin + performance.now(), r11 = (null == p2 ? void 0 : p2.lastModified) || e11;
            c2 = this.calculateRevalidate(m2, r11, this.dev ?? false, t10.isFallback);
            let s11 = "number" == typeof (null == m2 ? void 0 : m2.expire) ? 1e3 * m2.expire + r11 : void 0;
            if (void 0 !== s11 && s11 < e11) u2 = -1;
            else if (void 0 === (u2 = false !== c2 && c2 < e11 || void 0) && ((null == p2 || null == (a3 = p2.value) ? void 0 : a3.kind) === rm.APP_PAGE || (null == p2 || null == (o2 = p2.value) ? void 0 : o2.kind) === rm.APP_ROUTE)) {
              let e12 = null == (l2 = p2.value.headers) ? void 0 : l2[E];
              if ("string" == typeof e12) {
                let t11 = e12.split(",");
                t11.length > 0 && (rG(t11, r11) ? u2 = -1 : rz(t11, r11) && (u2 = true));
              }
            }
          }
          return p2 && (f2 = { isStale: u2, cacheControl: m2, revalidateAfter: c2, value: p2.value, isFallback: g2 }), !p2 && this.prerenderManifest.notFoundRoutes.includes(e10) && rf(e10, t10.route, this.prerenderManifest.routes[e10], this.locales) && (f2 = { isStale: u2, value: null, cacheControl: m2, revalidateAfter: c2, isFallback: g2 }, this.set(e10, f2.value, { ...t10, cacheControl: m2 })), f2;
        }
        async set(e10, t10, r10) {
          if ("kind" in r10 && r10.kind === ry.IMAGE) throw new tj("Images must use the image optimizer cache");
          if ((null == t10 ? void 0 : t10.kind) === rm.FETCH) {
            let r11 = tP.getStore(), s11 = r11 ? tA(r11) : null;
            (null == s11 ? void 0 : s11.mutable) && (rQ.debug && console.log("IncrementalCache: rdc:set", e10), s11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          let s10 = e10, n10 = r10;
          if (!r10.fetchCache) {
            let { route: t11, ...i11 } = r10;
            if (!t11) throw new tj("Response cache requires a source route");
            s10 = rg(e10, t11), n10 = i11;
          }
          let i10 = JSON.stringify(t10).length;
          if (r10.fetchCache && i10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${i10} bytes)`;
            if (this.dev) throw Error(t11);
            console.warn(t11);
            return;
          }
          try {
            var a3;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(s10, r10.cacheControl), await (null == (a3 = this.cacheHandler) ? void 0 : a3.set(s10, t10, n10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      e.i(64445);
      var rZ = ((ep = {})[ep.Before = 1] = "Before", ep[ep.ShellStatic = 10] = "ShellStatic", ep[ep.PrefetchStatic_prefetchApi = 11] = "PrefetchStatic_prefetchApi", ep[ep.PrefetchStatic = 12] = "PrefetchStatic", ep[ep.NavigationStatic = 13] = "NavigationStatic", ep[ep.Static = 14] = "Static", ep[ep.ShellRuntime = 20] = "ShellRuntime", ep[ep.PrefetchRuntime_prefetchApi = 21] = "PrefetchRuntime_prefetchApi", ep[ep.PrefetchRuntime = 22] = "PrefetchRuntime", ep[ep.NavigationRuntime = 23] = "NavigationRuntime", ep[ep.Dynamic = 30] = "Dynamic", ep[ep.Abandoned = 40] = "Abandoned", ep);
      function r0() {
      }
      /* @__PURE__ */ new WeakMap(), process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA, process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA;
      class r1 extends Promise {
        #r;
        static get [Symbol.species]() {
          return Promise;
        }
        static from(e10, t10) {
          let r10 = new r1(e10.then.bind(e10));
          return r10.#r = t10, Promise.prototype.then.call(r10, void 0, r0), r10;
        }
        then(e10, t10) {
          let r10 = this.#r;
          if (r10) try {
            r10();
          } catch (e11) {
            console.error(e11);
          }
          return Promise.prototype.then.call(this, e10, t10);
        }
        constructor(...e10) {
          super(...e10), this.#r = null;
        }
      }
      rZ.ShellRuntime, rZ.PrefetchStatic_prefetchApi, rZ.PrefetchRuntime_prefetchApi, rZ.PrefetchStatic, rZ.PrefetchRuntime, rZ.PrefetchRuntime, eK("action-async-storage");
      let r2 = /* @__PURE__ */ Symbol.for("@supabase/supabase-js.traceContextExtractor");
      class r4 extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, context: this.context };
        }
      }
      class r3 extends r4 {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class r5 extends r4 {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class r6 extends r4 {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      (ef = e_ || (e_ = {})).Any = "any", ef.ApNortheast1 = "ap-northeast-1", ef.ApNortheast2 = "ap-northeast-2", ef.ApSouth1 = "ap-south-1", ef.ApSoutheast1 = "ap-southeast-1", ef.ApSoutheast2 = "ap-southeast-2", ef.CaCentral1 = "ca-central-1", ef.EuCentral1 = "eu-central-1", ef.EuWest1 = "eu-west-1", ef.EuWest2 = "eu-west-2", ef.EuWest3 = "eu-west-3", ef.SaEast1 = "sa-east-1", ef.UsEast1 = "us-east-1", ef.UsWest1 = "us-west-1", ef.UsWest2 = "us-west-2";
      "function" == typeof SuppressedError && SuppressedError;
      class r8 {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: s10 = e_.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = s10, this.fetch = r10 ? (...e11) => r10(...e11) : (...e11) => fetch(...e11);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10) {
          var t10, r10, s10, n10;
          return t10 = this, r10 = arguments, s10 = void 0, n10 = function* (e11, t11 = {}) {
            var r11, s11;
            let n11, i10, a3;
            try {
              let s12, { headers: o2, method: l2, body: u2, signal: c2, timeout: h2 } = t11, d2 = {}, { region: p2 } = t11;
              p2 || (p2 = this.region);
              let f2 = new URL(`${this.url}/${e11}`);
              p2 && "any" !== p2 && (d2["x-region"] = p2, f2.searchParams.set("forceFunctionRegion", p2));
              let g2 = !!o2 && Object.keys(o2).some((e12) => "content-type" === e12.toLowerCase());
              u2 && !g2 ? "u" > typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer ? (d2["Content-Type"] = u2.type || "application/octet-stream", s12 = u2) : "string" == typeof u2 ? (d2["Content-Type"] = "text/plain", s12 = u2) : "u" > typeof FormData && u2 instanceof FormData ? s12 = u2 : (d2["Content-Type"] = "application/json", s12 = JSON.stringify(u2)) : s12 = !u2 || "string" == typeof u2 || "u" > typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer || "u" > typeof FormData && u2 instanceof FormData ? u2 : JSON.stringify(u2);
              let m2 = c2;
              h2 && (i10 = new AbortController(), n11 = setTimeout(() => i10.abort(), h2), c2 ? (m2 = i10.signal, a3 = () => i10.abort(), c2.addEventListener("abort", a3)) : m2 = i10.signal);
              let y2 = yield this.fetch(f2.toString(), { method: l2 || "POST", headers: Object.assign(Object.assign(Object.assign({}, d2), this.headers), o2), body: s12, signal: m2 }).catch((e12) => {
                throw new r3(e12);
              }), b2 = y2.headers.get("x-relay-error");
              if (b2 && "true" === b2) throw new r5(y2);
              if (!y2.ok) throw new r6(y2);
              let v2 = (null != (r11 = y2.headers.get("Content-Type")) ? r11 : "text/plain").split(";")[0].trim().toLowerCase();
              return { data: "application/json" === v2 ? yield y2.json() : "application/octet-stream" === v2 || "application/pdf" === v2 ? yield y2.blob() : "text/event-stream" === v2 ? y2 : "multipart/form-data" === v2 ? yield y2.formData() : yield y2.text(), error: null, response: y2 };
            } catch (e12) {
              return { data: null, error: e12, response: e12 instanceof r6 || e12 instanceof r5 ? e12.context : void 0 };
            } finally {
              n11 && clearTimeout(n11), a3 && (null == (s11 = t11.signal) || s11.removeEventListener("abort", a3));
            }
          }, new (s10 || (s10 = Promise))(function(e11, i10) {
            function a3(e12) {
              try {
                l2(n10.next(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function o2(e12) {
              try {
                l2(n10.throw(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function l2(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof s10 ? r11 : new s10(function(e12) {
                e12(r11);
              })).then(a3, o2);
            }
            l2((n10 = n10.apply(t10, r10 || [])).next());
          });
        }
      }
      var r9 = class extends Error {
        constructor(e10) {
          super(e10.message), this.name = "PostgrestError", this.details = e10.details, this.hint = e10.hint, this.code = e10.code;
        }
        toJSON() {
          return { name: this.name, message: this.message, details: this.details, hint: this.hint, code: this.code };
        }
      };
      let r7 = (e10) => Math.min(1e3 * 2 ** e10, 3e4), se = [520, 503], st = ["GET", "HEAD", "OPTIONS"];
      function sr(e10) {
        return (sr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function ss(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s10 = Object.getOwnPropertySymbols(e10);
          t10 && (s10 = s10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s10);
        }
        return r10;
      }
      function sn(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? ss(Object(r10), true).forEach(function(t11) {
            !(function(e11, t12, r11) {
              var s10;
              (s10 = (function(e12, t13) {
                if ("object" != sr(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s11 = r12.call(e12, t13 || "default");
                  if ("object" != sr(s11)) return s11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              })(t12, "string"), (t12 = "symbol" == sr(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            })(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : ss(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      function si(e10, t10) {
        return new Promise((r10) => {
          if (null == t10 ? void 0 : t10.aborted) return void r10();
          let s10 = setTimeout(() => {
            null == t10 || t10.removeEventListener("abort", n10), r10();
          }, e10);
          function n10() {
            clearTimeout(s10), r10();
          }
          null == t10 || t10.addEventListener("abort", n10);
        });
      }
      async function sa(e10, t10, r10, s10) {
        let n10 = 0;
        for (; ; ) {
          var i10, a3, o2, l2, u2, c2;
          let h2, d2 = sn({}, r10.headers);
          n10 > 0 && (d2["X-Retry-Count"] = String(n10));
          try {
            h2 = await e10(t10, { method: r10.method, headers: d2, body: r10.body, signal: r10.signal });
          } catch (e11) {
            if ((null == e11 ? void 0 : e11.name) === "AbortError" || (null == e11 ? void 0 : e11.code) === "ABORT_ERR" || (null == e11 ? void 0 : e11.name) === "TimeoutError" && (null == (i10 = r10.signal) ? void 0 : i10.aborted) || !st.includes(r10.method)) throw e11;
            if (s10 && n10 < 3) {
              let e12 = r7(n10);
              n10++, await si(e12, r10.signal);
              continue;
            }
            throw e11;
          }
          if (l2 = r10.method, u2 = h2.status, c2 = n10, s10 && !(c2 >= 3) && st.includes(l2) && se.includes(u2) && 1) {
            let e11 = null != (a3 = null == (o2 = h2.headers) ? void 0 : o2.get("Retry-After")) ? a3 : null, t11 = null !== e11 ? 1e3 * Math.max(0, parseInt(e11, 10) || 0) : r7(n10);
            await h2.text(), n10++, await si(t11, r10.signal);
            continue;
          }
          return h2;
        }
      }
      var so = class {
        constructor(e10) {
          var t10, r10, s10, n10, i10;
          this.shouldThrowOnError = false, this.retryEnabled = true, this.method = e10.method, this.url = e10.url, this.headers = new Headers(e10.headers), this.schema = e10.schema, this.body = e10.body, this.shouldThrowOnError = null != (t10 = e10.shouldThrowOnError) && t10, this.signal = e10.signal, this.isMaybeSingle = null != (r10 = e10.isMaybeSingle) && r10, this.shouldStripNulls = null != (s10 = e10.shouldStripNulls) && s10, this.urlLengthLimit = null != (n10 = e10.urlLengthLimit) ? n10 : 8e3, this.retryEnabled = null == (i10 = e10.retry) || i10, e10.fetch ? this.fetch = e10.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        stripNulls() {
          if ("text/csv" === this.headers.get("Accept")) throw Error("stripNulls() cannot be used with csv()");
          return this.shouldStripNulls = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = new Headers(this.headers), this.headers.set(e10, t10), this;
        }
        retry(e10) {
          return this.retryEnabled = e10, this;
        }
        then(e10, t10) {
          var r10 = this;
          if (void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
            let e11 = this.headers.get("Accept");
            "application/vnd.pgrst.object+json" === e11 ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : e11 && "application/json" !== e11 || this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
          }
          let s10 = this.fetch, n10 = (async () => {
            let e11 = {};
            r10.headers.forEach((t12, r11) => {
              e11[r11] = t12;
            });
            let t11 = await sa(s10, r10.url.toString(), { method: r10.method, headers: e11, body: JSON.stringify(r10.body, (e12, t12) => "bigint" == typeof t12 ? t12.toString() : t12), signal: r10.signal }, r10.retryEnabled);
            return await r10.processResponse(t11);
          })();
          return this.shouldThrowOnError || (n10 = n10.catch((e11) => {
            var t11, r11, s11, n11, i10, a3;
            let o2 = "", l2 = "", u2 = "", c2 = null == e11 ? void 0 : e11.cause;
            if (c2) {
              let t12 = null != (r11 = null == c2 ? void 0 : c2.message) ? r11 : "", a4 = null != (s11 = null == c2 ? void 0 : c2.code) ? s11 : "";
              o2 = `${null != (n11 = null == e11 ? void 0 : e11.name) ? n11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}

Caused by: ${null != (i10 = null == c2 ? void 0 : c2.name) ? i10 : "Error"}: ${t12}`, a4 && (o2 += ` (${a4})`), (null == c2 ? void 0 : c2.stack) && (o2 += `
${c2.stack}`);
            } else o2 = null != (a3 = null == e11 ? void 0 : e11.stack) ? a3 : "";
            let h2 = this.url.toString().length;
            return (null == e11 ? void 0 : e11.name) === "AbortError" || (null == e11 ? void 0 : e11.code) === "ABORT_ERR" ? (u2 = "", l2 = "Request was aborted (timeout or manual cancellation)", h2 > this.urlLengthLimit && (l2 += `. Note: Your request URL is ${h2} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : ((null == c2 ? void 0 : c2.name) === "HeadersOverflowError" || (null == c2 ? void 0 : c2.code) === "UND_ERR_HEADERS_OVERFLOW") && (u2 = "", l2 = "HTTP headers exceeded server limits (typically 16KB)", h2 > this.urlLengthLimit && (l2 += `. Your request URL is ${h2} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), { success: false, error: { message: `${null != (t11 = null == e11 ? void 0 : e11.name) ? t11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}`, details: o2, hint: l2, code: u2 }, data: null, count: null, status: 0, statusText: "" };
          })), n10.then(e10, t10);
        }
        async processResponse(e10) {
          var t10, r10, s10, n10;
          let i10 = null, a3 = null, o2 = null, l2 = e10.status, u2 = e10.statusText;
          if (e10.ok) {
            if ("HEAD" !== this.method) {
              let t11 = await e10.text();
              if ("" === t11) ;
              else if ("text/csv" === this.headers.get("Accept")) a3 = t11;
              else if (this.headers.get("Accept") && (null == (s10 = this.headers.get("Accept")) ? void 0 : s10.includes("application/vnd.pgrst.plan+text"))) a3 = t11;
              else try {
                a3 = JSON.parse(t11);
              } catch (e11) {
                if (i10 = { message: t11 }, a3 = null, this.shouldThrowOnError) throw new r9({ message: t11, details: "", hint: "", code: "" });
              }
            }
            let c2 = null == (t10 = this.headers.get("Prefer")) ? void 0 : t10.match(/count=(exact|planned|estimated)/), h2 = null == (r10 = e10.headers.get("content-range")) ? void 0 : r10.split("/");
            if (c2 && h2 && h2.length > 1 && (o2 = parseInt(h2[1])), this.isMaybeSingle && Array.isArray(a3)) if (a3.length > 1) {
              if (i10 = { code: "PGRST116", details: `Results contain ${a3.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, a3 = null, o2 = null, l2 = 406, u2 = "Not Acceptable", this.shouldThrowOnError) throw new r9(sn(sn({}, i10), {}, { hint: null != (n10 = i10.hint) ? n10 : "" }));
            } else a3 = 1 === a3.length ? a3[0] : null;
          } else {
            let t11 = await e10.text();
            try {
              i10 = JSON.parse(t11), Array.isArray(i10) && 404 === e10.status && (a3 = [], i10 = null, l2 = 200, u2 = "OK");
            } catch (r11) {
              404 === e10.status && "" === t11 ? (l2 = 204, u2 = "No Content") : i10 = { message: t11 };
            }
            if (i10 && this.shouldThrowOnError) throw new r9(i10);
          }
          return { success: null === i10, error: i10, data: a3, count: o2, status: l2, statusText: u2 };
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }, sl = class extends so {
        throwOnError() {
          return super.throwOnError();
        }
        select(e10) {
          let t10 = false, r10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !t10 ? "" : ('"' === e11 && (t10 = !t10), e11)).join("");
          return this.url.searchParams.set("select", r10), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e10, { ascending: t10 = true, nullsFirst: r10, foreignTable: s10, referencedTable: n10 = s10 } = {}) {
          let i10 = n10 ? `${n10}.order` : "order", a3 = this.url.searchParams.get(i10);
          return this.url.searchParams.set(i10, `${a3 ? `${a3},` : ""}${e10}.${t10 ? "asc" : "desc"}${void 0 === r10 ? "" : r10 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s10 = void 0 === r10 ? "limit" : `${r10}.limit`;
          return this.url.searchParams.set(s10, `${e10}`), this;
        }
        range(e10, t10, { foreignTable: r10, referencedTable: s10 = r10 } = {}) {
          let n10 = void 0 === s10 ? "offset" : `${s10}.offset`, i10 = void 0 === s10 ? "limit" : `${s10}.limit`;
          return this.url.searchParams.set(n10, `${e10}`), this.url.searchParams.set(i10, `${t10 - e10 + 1}`), this;
        }
        abortSignal(e10) {
          return this.signal = e10, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e10 = false, verbose: t10 = false, settings: r10 = false, buffers: s10 = false, wal: n10 = false, format: i10 = "text" } = {}) {
          var a3;
          let o2 = [e10 ? "analyze" : null, t10 ? "verbose" : null, r10 ? "settings" : null, s10 ? "buffers" : null, n10 ? "wal" : null].filter(Boolean).join("|"), l2 = null != (a3 = this.headers.get("Accept")) ? a3 : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${i10}; for="${l2}"; options=${o2};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e10) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e10}`), this;
        }
      };
      let su = RegExp("[,()]");
      var sc = class extends sl {
        throwOnError() {
          return super.throwOnError();
        }
        eq(e10, t10) {
          return this.url.searchParams.append(e10, `eq.${t10}`), this;
        }
        neq(e10, t10) {
          return this.url.searchParams.append(e10, `neq.${t10}`), this;
        }
        gt(e10, t10) {
          return this.url.searchParams.append(e10, `gt.${t10}`), this;
        }
        gte(e10, t10) {
          return this.url.searchParams.append(e10, `gte.${t10}`), this;
        }
        lt(e10, t10) {
          return this.url.searchParams.append(e10, `lt.${t10}`), this;
        }
        lte(e10, t10) {
          return this.url.searchParams.append(e10, `lte.${t10}`), this;
        }
        like(e10, t10) {
          return this.url.searchParams.append(e10, `like.${t10}`), this;
        }
        likeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(all).{${t10.join(",")}}`), this;
        }
        likeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(any).{${t10.join(",")}}`), this;
        }
        ilike(e10, t10) {
          return this.url.searchParams.append(e10, `ilike.${t10}`), this;
        }
        ilikeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(all).{${t10.join(",")}}`), this;
        }
        ilikeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(any).{${t10.join(",")}}`), this;
        }
        regexMatch(e10, t10) {
          return this.url.searchParams.append(e10, `match.${t10}`), this;
        }
        regexIMatch(e10, t10) {
          return this.url.searchParams.append(e10, `imatch.${t10}`), this;
        }
        is(e10, t10) {
          return this.url.searchParams.append(e10, `is.${t10}`), this;
        }
        isDistinct(e10, t10) {
          return this.url.searchParams.append(e10, `isdistinct.${t10}`), this;
        }
        in(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && su.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `in.(${r10})`), this;
        }
        notIn(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && su.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `not.in.(${r10})`), this;
        }
        contains(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cs.${JSON.stringify(t10)}`), this;
        }
        containedBy(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cd.${JSON.stringify(t10)}`), this;
        }
        rangeGt(e10, t10) {
          return this.url.searchParams.append(e10, `sr.${t10}`), this;
        }
        rangeGte(e10, t10) {
          return this.url.searchParams.append(e10, `nxl.${t10}`), this;
        }
        rangeLt(e10, t10) {
          return this.url.searchParams.append(e10, `sl.${t10}`), this;
        }
        rangeLte(e10, t10) {
          return this.url.searchParams.append(e10, `nxr.${t10}`), this;
        }
        rangeAdjacent(e10, t10) {
          return this.url.searchParams.append(e10, `adj.${t10}`), this;
        }
        overlaps(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `ov.${t10}`) : this.url.searchParams.append(e10, `ov.{${t10.join(",")}}`), this;
        }
        textSearch(e10, t10, { config: r10, type: s10 } = {}) {
          let n10 = "";
          "plain" === s10 ? n10 = "pl" : "phrase" === s10 ? n10 = "ph" : "websearch" === s10 && (n10 = "w");
          let i10 = void 0 === r10 ? "" : `(${r10})`;
          return this.url.searchParams.append(e10, `${n10}fts${i10}.${t10}`), this;
        }
        match(e10) {
          return Object.entries(e10).filter(([e11, t10]) => void 0 !== t10).forEach(([e11, t10]) => {
            this.url.searchParams.append(e11, `eq.${t10}`);
          }), this;
        }
        not(e10, t10, r10) {
          return this.url.searchParams.append(e10, `not.${t10}.${r10}`), this;
        }
        or(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s10 = r10 ? `${r10}.or` : "or";
          return this.url.searchParams.append(s10, `(${e10})`), this;
        }
        filter(e10, t10, r10) {
          return this.url.searchParams.append(e10, `${t10}.${r10}`), this;
        }
      }, sh = class {
        constructor(e10, { headers: t10 = {}, schema: r10, fetch: s10, urlLengthLimit: n10 = 8e3, retry: i10 }) {
          this.url = e10, this.headers = new Headers(t10), this.schema = r10, this.fetch = s10, this.urlLengthLimit = n10, this.retry = i10;
        }
        cloneRequestState() {
          return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
        }
        select(e10, t10) {
          let { head: r10 = false, count: s10 } = null != t10 ? t10 : {}, n10 = false, i10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !n10 ? "" : ('"' === e11 && (n10 = !n10), e11)).join(""), { url: a3, headers: o2 } = this.cloneRequestState();
          return a3.searchParams.set("select", i10), s10 && o2.append("Prefer", `count=${s10}`), new sc({ method: r10 ? "HEAD" : "GET", url: a3, headers: o2, schema: this.schema, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        insert(e10, { count: t10, defaultToNull: r10 = true } = {}) {
          var s10;
          let { url: n10, headers: i10 } = this.cloneRequestState();
          if (t10 && i10.append("Prefer", `count=${t10}`), r10 || i10.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              n10.searchParams.set("columns", e11.join(","));
            }
          }
          return new sc({ method: "POST", url: n10, headers: i10, schema: this.schema, body: e10, fetch: null != (s10 = this.fetch) ? s10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        upsert(e10, { onConflict: t10, ignoreDuplicates: r10 = false, count: s10, defaultToNull: n10 = true } = {}) {
          var i10;
          let { url: a3, headers: o2 } = this.cloneRequestState();
          if (o2.append("Prefer", `resolution=${r10 ? "ignore" : "merge"}-duplicates`), void 0 !== t10 && a3.searchParams.set("on_conflict", t10), s10 && o2.append("Prefer", `count=${s10}`), n10 || o2.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              a3.searchParams.set("columns", e11.join(","));
            }
          }
          return new sc({ method: "POST", url: a3, headers: o2, schema: this.schema, body: e10, fetch: null != (i10 = this.fetch) ? i10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        update(e10, { count: t10 } = {}) {
          var r10;
          let { url: s10, headers: n10 } = this.cloneRequestState();
          return t10 && n10.append("Prefer", `count=${t10}`), new sc({ method: "PATCH", url: s10, headers: n10, schema: this.schema, body: e10, fetch: null != (r10 = this.fetch) ? r10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        delete({ count: e10 } = {}) {
          var t10;
          let { url: r10, headers: s10 } = this.cloneRequestState();
          return e10 && s10.append("Prefer", `count=${e10}`), new sc({ method: "DELETE", url: r10, headers: s10, schema: this.schema, fetch: null != (t10 = this.fetch) ? t10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      };
      function sd(e10, t10, r10) {
        var s10;
        return { success: false, error: new r9({ message: `${null != (s10 = null == e10 ? void 0 : e10.name) ? s10 : "FetchError"}: ${null == e10 ? void 0 : e10.message}`, details: "", hint: "", code: "" }), data: null, count: null, status: t10, statusText: r10 };
      }
      var sp = class e10 {
        constructor(e11, { headers: t10 = {}, schema: r10, fetch: s10, timeout: n10, urlLengthLimit: i10 = 8e3, retry: a3, wrapFetch: o2 } = {}) {
          this.url = e11, this.headers = new Headers(t10), this.schemaName = r10, this.urlLengthLimit = i10, this.timeout = n10, this.wrapFetch = o2, this.baseFetch = null != s10 ? s10 : globalThis.fetch, this.fetch = this.baseFetch ? this.decorateFetch(this.baseFetch) : void 0, this.retry = a3;
        }
        decorateFetch(e11) {
          var t10, r10;
          return t10 = this.wrapFetch ? this.wrapFetch(e11) : e11, void 0 === (r10 = this.timeout) || r10 <= 0 ? t10 : (e12, s10) => {
            let n10 = new AbortController(), i10 = setTimeout(() => n10.abort(), r10), a3 = null == s10 ? void 0 : s10.signal;
            if (a3) {
              if (a3.aborted) return clearTimeout(i10), t10(e12, s10);
              let r11 = () => {
                clearTimeout(i10), n10.abort();
              };
              return a3.addEventListener("abort", r11, { once: true }), t10(e12, sn(sn({}, s10), {}, { signal: n10.signal })).finally(() => {
                clearTimeout(i10), a3.removeEventListener("abort", r11);
              });
            }
            return t10(e12, sn(sn({}, s10), {}, { signal: n10.signal })).finally(() => clearTimeout(i10));
          };
        }
        from(e11, t10) {
          var r10, s10;
          if (!e11 || "string" != typeof e11 || "" === e11.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          return new sh(new URL(`${this.url}/${e11}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: (null == t10 ? void 0 : t10.fetch) ? this.decorateFetch(t10.fetch) : this.fetch, urlLengthLimit: null != (r10 = null == t10 ? void 0 : t10.urlLengthLimit) ? r10 : this.urlLengthLimit, retry: null != (s10 = null == t10 ? void 0 : t10.retry) ? s10 : this.retry });
        }
        schema(t10) {
          return new e10(this.url, { headers: this.headers, schema: t10, fetch: this.baseFetch, timeout: this.timeout, wrapFetch: this.wrapFetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        async getOpenApiSpec() {
          var e11, t10;
          let r10, s10, n10 = new Headers(this.headers);
          n10.set("Accept", "application/openapi+json"), this.schemaName && n10.set("Accept-Profile", this.schemaName);
          let i10 = {};
          n10.forEach((e12, t11) => {
            i10[t11] = e12;
          });
          let a3 = null != (e11 = this.fetch) ? e11 : globalThis.fetch;
          try {
            r10 = await sa(a3, `${this.url}/`, { method: "GET", headers: i10 }, null == (t10 = this.retry) || t10);
          } catch (e12) {
            return sd(e12, 0, "");
          }
          try {
            s10 = await r10.text();
          } catch (e12) {
            return sd(e12, r10.status, r10.statusText);
          }
          if (r10.ok) try {
            return { success: true, error: null, data: JSON.parse(s10), count: null, status: r10.status, statusText: r10.statusText };
          } catch (e12) {
          }
          return { success: false, error: (function(e12, t11) {
            try {
              let t12 = JSON.parse(e12);
              if (t12 && "object" == typeof t12 && !Array.isArray(t12)) {
                var r11, s11, n11, i11;
                return new r9({ message: String(null != (r11 = t12.message) ? r11 : e12), details: null != (s11 = t12.details) ? s11 : "", hint: null != (n11 = t12.hint) ? n11 : "", code: null != (i11 = t12.code) ? i11 : "" });
              }
            } catch (e13) {
            }
            return new r9({ message: e12 || t11, details: "", hint: "", code: "" });
          })(s10, r10.statusText), data: null, count: null, status: r10.status, statusText: r10.statusText };
        }
        rpc(e11, t10 = {}, { head: r10 = false, get: s10 = false, count: n10 } = {}) {
          var i10;
          let a3, o2, l2 = new URL(`${this.url}/rpc/${e11}`), u2 = (e12) => null !== e12 && "object" == typeof e12 && (!Array.isArray(e12) || e12.some(u2)), c2 = r10 && Object.values(t10).some(u2);
          c2 ? (a3 = "POST", o2 = t10) : r10 || s10 ? (a3 = r10 ? "HEAD" : "GET", Object.entries(t10).filter(([e12, t11]) => void 0 !== t11).map(([e12, t11]) => [e12, Array.isArray(t11) ? `{${t11.join(",")}}` : `${t11}`]).forEach(([e12, t11]) => {
            l2.searchParams.append(e12, t11);
          })) : (a3 = "POST", o2 = t10);
          let h2 = new Headers(this.headers);
          return c2 ? h2.set("Prefer", n10 ? `count=${n10},return=minimal` : "return=minimal") : n10 && h2.set("Prefer", `count=${n10}`), new sc({ method: a3, url: l2, headers: h2, schema: this.schemaName, body: o2, fetch: null != (i10 = this.fetch) ? i10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      };
      let sf = class {
        static detectEnvironment() {
          var t10;
          if ("u" > typeof WebSocket) return { type: "native", wsConstructor: WebSocket };
          let r10 = globalThis;
          if ("u" > typeof globalThis && void 0 !== r10.WebSocket) return { type: "native", wsConstructor: r10.WebSocket };
          let s10 = e.g;
          if (s10 && void 0 !== s10.WebSocket) return { type: "native", wsConstructor: s10.WebSocket };
          if ("u" > typeof globalThis && void 0 !== r10.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("u" > typeof globalThis && r10.EdgeRuntime || "u" > typeof navigator && (null == (t10 = navigator.userAgent) ? void 0 : t10.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          let n10 = globalThis.process;
          if (n10) {
            let e10 = n10.versions;
            if (e10 && e10.node) return { type: "unsupported", error: "Node.js detected but native WebSocket not found.", workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option." };
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e10 = this.detectEnvironment();
          if (e10.wsConstructor) return e10.wsConstructor;
          let t10 = e10.error || "WebSocket not supported in this environment.";
          throw e10.workaround && (t10 += `

Suggested solution: ${e10.workaround}`), Error(t10);
        }
        static isWebSocketSupported() {
          try {
            let e10 = this.detectEnvironment();
            return "native" === e10.type;
          } catch (e10) {
            return false;
          }
        }
      }, sg = "1.0.0", sm = "2.0.0", sy = "errored", sb = "joined", sv = { close: "phx_close", error: "phx_error", join: "phx_join", reply: "phx_reply", leave: "phx_leave", access_token: "access_token" };
      class sw {
        constructor(e10) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = sw.DEFAULT_METADATA_KEYS, this.allowedMetadataKeys = null != e10 ? e10 : sw.DEFAULT_METADATA_KEYS;
        }
        encode(e10, t10) {
          return e10.event !== this.BROADCAST_EVENT || e10.payload instanceof ArrayBuffer || "string" != typeof e10.payload.event ? t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload])) : t10(this._binaryEncodeUserBroadcastPush(e10));
        }
        _binaryEncodeUserBroadcastPush(e10) {
          var t10;
          return this._isArrayBuffer(null == (t10 = e10.payload) ? void 0 : t10.payload) ? this._encodeBinaryUserBroadcastPush(e10) : this._encodeJsonUserBroadcastPush(e10);
        }
        _encodeBinaryUserBroadcastPush(e10) {
          var t10, r10;
          let s10 = null != (r10 = null == (t10 = e10.payload) ? void 0 : t10.payload) ? r10 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e10, this.BINARY_ENCODING, s10);
        }
        _encodeJsonUserBroadcastPush(e10) {
          var t10, r10;
          let s10 = null != (r10 = null == (t10 = e10.payload) ? void 0 : t10.payload) ? r10 : {}, n10 = new TextEncoder().encode(JSON.stringify(s10)).buffer;
          return this._encodeUserBroadcastPush(e10, this.JSON_ENCODING, n10);
        }
        _encodeUserBroadcastPush(e10, t10, r10) {
          let s10 = new TextEncoder(), n10 = s10.encode(e10.topic), i10 = s10.encode(null != (g2 = e10.ref) ? g2 : ""), a3 = s10.encode(null != (m2 = e10.join_ref) ? m2 : ""), o2 = s10.encode(e10.payload.event), l2 = this.allowedMetadataKeys ? this._pick(e10.payload, this.allowedMetadataKeys) : {}, u2 = s10.encode(0 === Object.keys(l2).length ? "" : JSON.stringify(l2));
          if (a3.length > 255) throw Error(`joinRef length ${a3.length} exceeds maximum of 255`);
          if (i10.length > 255) throw Error(`ref length ${i10.length} exceeds maximum of 255`);
          if (n10.length > 255) throw Error(`topic length ${n10.length} exceeds maximum of 255`);
          if (o2.length > 255) throw Error(`userEvent length ${o2.length} exceeds maximum of 255`);
          if (u2.length > 255) throw Error(`metadata length ${u2.length} exceeds maximum of 255`);
          let c2 = this.USER_BROADCAST_PUSH_META_LENGTH + a3.length + i10.length + n10.length + o2.length + u2.length, h2 = new ArrayBuffer(this.HEADER_LENGTH + c2), d2 = new DataView(h2), p2 = new Uint8Array(h2), f2 = 0;
          d2.setUint8(f2++, this.KINDS.userBroadcastPush), d2.setUint8(f2++, a3.length), d2.setUint8(f2++, i10.length), d2.setUint8(f2++, n10.length), d2.setUint8(f2++, o2.length), d2.setUint8(f2++, u2.length), d2.setUint8(f2++, t10), p2.set(a3, f2), f2 += a3.length, p2.set(i10, f2), f2 += i10.length, p2.set(n10, f2), f2 += n10.length, p2.set(o2, f2), f2 += o2.length, p2.set(u2, f2), f2 += u2.length;
          var g2, m2, y2 = new Uint8Array(h2.byteLength + r10.byteLength);
          return y2.set(new Uint8Array(h2), 0), y2.set(new Uint8Array(r10), h2.byteLength), y2.buffer;
        }
        decode(e10, t10) {
          if (this._isArrayBuffer(e10)) return t10(this._binaryDecode(e10));
          if ("string" == typeof e10) {
            let [r10, s10, n10, i10, a3] = JSON.parse(e10);
            return t10({ join_ref: r10, ref: s10, topic: n10, event: i10, payload: a3 });
          }
          return t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = t10.getUint8(0), s10 = new TextDecoder();
          if (r10 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e10, t10, s10);
        }
        _decodeUserBroadcast(e10, t10, r10) {
          let s10 = t10.getUint8(1), n10 = t10.getUint8(2), i10 = t10.getUint8(3), a3 = t10.getUint8(4), o2 = this.HEADER_LENGTH + 4, l2 = r10.decode(e10.slice(o2, o2 + s10));
          o2 += s10;
          let u2 = r10.decode(e10.slice(o2, o2 + n10));
          o2 += n10;
          let c2 = r10.decode(e10.slice(o2, o2 + i10));
          o2 += i10;
          let h2 = e10.slice(o2, e10.byteLength), d2 = a3 === this.JSON_ENCODING ? JSON.parse(r10.decode(h2)) : h2, p2 = { type: this.BROADCAST_EVENT, event: u2, payload: d2 };
          return i10 > 0 && (p2.meta = JSON.parse(c2)), { join_ref: null, ref: null, topic: l2, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e10) {
          var t10;
          return e10 instanceof ArrayBuffer || (null == (t10 = null == e10 ? void 0 : e10.constructor) ? void 0 : t10.name) === "ArrayBuffer";
        }
        _pick(e10, t10) {
          return e10 && "object" == typeof e10 ? Object.fromEntries(Object.entries(e10).filter(([e11]) => t10.includes(e11))) : {};
        }
      }
      sw.DEFAULT_METADATA_KEYS = ["persist"], (eg = eS || (eS = {})).abstime = "abstime", eg.bool = "bool", eg.date = "date", eg.daterange = "daterange", eg.float4 = "float4", eg.float8 = "float8", eg.int2 = "int2", eg.int4 = "int4", eg.int4range = "int4range", eg.int8 = "int8", eg.int8range = "int8range", eg.json = "json", eg.jsonb = "jsonb", eg.money = "money", eg.numeric = "numeric", eg.oid = "oid", eg.reltime = "reltime", eg.text = "text", eg.time = "time", eg.timestamp = "timestamp", eg.timestamptz = "timestamptz", eg.timetz = "timetz", eg.tsrange = "tsrange", eg.tstzrange = "tstzrange";
      let s_ = (e10, t10, r10 = {}) => {
        var s10;
        let n10 = null != (s10 = r10.skipTypes) ? s10 : [];
        return t10 ? Object.keys(t10).reduce((r11, s11) => (r11[s11] = sS(s11, e10, t10, n10), r11), {}) : {};
      }, sS = (e10, t10, r10, s10) => {
        let n10 = t10.find((t11) => t11.name === e10), i10 = null == n10 ? void 0 : n10.type, a3 = r10[e10];
        return i10 && !s10.includes(i10) ? sk(i10, a3) : sE(a3);
      }, sk = (e10, t10) => {
        if ("_" === e10.charAt(0)) return sC(t10, e10.slice(1, e10.length));
        switch (e10) {
          case eS.bool:
            return sT(t10);
          case eS.float4:
          case eS.float8:
          case eS.int2:
          case eS.int4:
          case eS.int8:
          case eS.numeric:
          case eS.oid:
            return sx(t10);
          case eS.json:
          case eS.jsonb:
            return sR(t10);
          case eS.timestamp:
            return sO(t10);
          case eS.abstime:
          case eS.date:
          case eS.daterange:
          case eS.int4range:
          case eS.int8range:
          case eS.money:
          case eS.reltime:
          case eS.text:
          case eS.time:
          case eS.timestamptz:
          case eS.timetz:
          case eS.tsrange:
          case eS.tstzrange:
          default:
            return sE(t10);
        }
      }, sE = (e10) => e10, sT = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, sx = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10)) return t10;
        }
        return e10;
      }, sR = (e10) => {
        if ("string" == typeof e10) try {
          return JSON.parse(e10);
        } catch (e11) {
        }
        return e10;
      }, sC = (e10, t10) => {
        if ("string" != typeof e10) return e10;
        let r10 = e10.length - 1, s10 = e10[r10];
        if ("{" === e10[0] && "}" === s10) {
          let s11, n10 = e10.slice(1, r10);
          try {
            s11 = JSON.parse("[" + n10 + "]");
          } catch (e11) {
            s11 = n10 ? n10.split(",") : [];
          }
          return s11.map((e11) => sk(t10, e11));
        }
        return e10;
      }, sO = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, sP = (e10) => {
        let t10 = new URL(e10);
        return t10.protocol = t10.protocol.replace(/^ws/i, "http"), t10.pathname = t10.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t10.pathname || "/" === t10.pathname ? t10.pathname = "/api/broadcast" : t10.pathname = t10.pathname + "/api/broadcast", t10.href;
      };
      var sA = (e10) => "function" == typeof e10 ? e10 : function() {
        return e10;
      }, sI = ("u" > typeof self ? self : null) || globalThis, sj = "closed", sN = "errored", s$ = "joined", sL = "joining", sD = "leaving", sU = "phx_close", sM = "phx_error", sq = "phx_reply", sB = "phx_leave", sF = "websocket", sH = "base64url.bearer.phx.", sG = class {
        constructor(e10, t10, r10, s10) {
          this.channel = e10, this.event = t10, this.payload = r10 || function() {
            return {};
          }, this.receivedResp = null, this.timeout = s10, this.timeoutTimer = null, this.recHooks = [], this.sent = false, this.ref = void 0;
        }
        resend(e10) {
          this.timeout = e10, this.reset(), this.send();
        }
        send() {
          this.hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload(), ref: this.ref, join_ref: this.channel.joinRef() }));
        }
        receive(e10, t10) {
          return this.hasReceived(e10) && t10(this.receivedResp.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        reset() {
          this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = false;
        }
        destroy() {
          this.cancelRefEvent(), this.cancelTimeout();
        }
        matchReceive({ status: e10, response: t10, _ref: r10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        cancelRefEvent() {
          this.refEvent && this.channel.off(this.refEvent);
        }
        cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
        }
        startTimeout() {
          this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e10) => {
            this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e10, this.matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
        trigger(e10, t10) {
          this.channel.trigger(this.refEvent, { status: e10, response: t10 });
        }
      }, sz = class {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }, sV = class {
        constructor(e10, t10, r10) {
          this.state = sj, this.topic = e10, this.params = sA(t10 || {}), this.socket = r10, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = false, this.joinPush = new sG(this, "phx_join", this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new sz(() => {
            this.socket.isConnected() && this.rejoin();
          }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
            this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
          })), this.joinPush.receive("ok", () => {
            this.state = s$, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this.joinPush.receive("error", (e11) => {
            this.state = sN, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.onClose(() => {
            this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = sj, this.socket.remove(this);
          }), this.onError((e11) => {
            this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.isJoining() && this.joinPush.reset(), this.state = sN, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.joinPush.receive("timeout", () => {
            this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new sG(this, sB, sA({}), this.timeout).send(), this.state = sN, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.on(sq, (e11, t11) => {
            this.trigger(this.replyEventName(t11), e11);
          });
        }
        join(e10 = this.timeout) {
          if (!this.joinedOnce) return this.timeout = e10, this.joinedOnce = true, this.rejoin(), this.joinPush;
          throw Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        }
        teardown() {
          this.pushBuffer.forEach((e10) => e10.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = sj, this.bindings = [];
        }
        onClose(e10) {
          this.on(sU, e10);
        }
        onError(e10) {
          return this.on(sM, (t10) => e10(t10));
        }
        on(e10, t10) {
          let r10 = this.bindingRef++;
          return this.bindings.push({ event: e10, ref: r10, callback: t10 }), r10;
        }
        off(e10, t10) {
          this.bindings = this.bindings.filter((r10) => r10.event !== e10 || void 0 !== t10 && t10 !== r10.ref);
        }
        canPush() {
          return this.socket.isConnected() && this.isJoined();
        }
        push(e10, t10, r10 = this.timeout) {
          if (t10 = t10 || {}, !this.joinedOnce) throw Error(`tried to push '${e10}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
          let s10 = new sG(this, e10, function() {
            return t10;
          }, r10);
          return this.canPush() ? s10.send() : (s10.startTimeout(), this.pushBuffer.push(s10)), s10;
        }
        leave(e10 = this.timeout) {
          this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = sD;
          let t10 = () => {
            this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(sU, "leave");
          }, r10 = new sG(this, sB, sA({}), e10);
          return r10.receive("ok", () => t10()).receive("timeout", () => t10()), r10.send(), this.canPush() || r10.trigger("ok", {}), r10;
        }
        onMessage(e10, t10, r10) {
          return t10;
        }
        filterBindings(e10, t10, r10) {
          return true;
        }
        isMember(e10, t10, r10, s10) {
          return this.topic === e10 && (!s10 || s10 === this.joinRef() || (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: e10, event: t10, payload: r10, joinRef: s10 }), false));
        }
        joinRef() {
          return this.joinPush.ref;
        }
        rejoin(e10 = this.timeout) {
          this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = sL, this.joinPush.resend(e10));
        }
        trigger(e10, t10, r10, s10) {
          let n10 = this.onMessage(e10, t10, r10, s10);
          if (t10 && !n10) throw Error("channel onMessage callbacks must return the payload, modified or unmodified");
          let i10 = this.bindings.filter((s11) => s11.event === e10 && this.filterBindings(s11, t10, r10));
          for (let e11 = 0; e11 < i10.length; e11++) i10[e11].callback(n10, r10, s10 || this.joinRef());
        }
        replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        isClosed() {
          return this.state === sj;
        }
        isErrored() {
          return this.state === sN;
        }
        isJoined() {
          return this.state === s$;
        }
        isJoining() {
          return this.state === sL;
        }
        isLeaving() {
          return this.state === sD;
        }
      }, sW = class {
        static request(e10, t10, r10, s10, n10, i10, a3) {
          if (sI.XDomainRequest) {
            let r11 = new sI.XDomainRequest();
            return this.xdomainRequest(r11, e10, t10, s10, n10, i10, a3);
          }
          if (sI.XMLHttpRequest) {
            let o2 = new sI.XMLHttpRequest();
            return this.xhrRequest(o2, e10, t10, r10, s10, n10, i10, a3);
          }
          if (sI.fetch && sI.AbortController) return this.fetchRequest(e10, t10, r10, s10, n10, i10, a3);
          throw Error("No suitable XMLHttpRequest implementation found");
        }
        static fetchRequest(e10, t10, r10, s10, n10, i10, a3) {
          let o2 = { method: e10, headers: r10, body: s10 }, l2 = null;
          return n10 && (l2 = new AbortController(), setTimeout(() => l2.abort(), n10), o2.signal = l2.signal), sI.fetch(t10, o2).then((e11) => e11.text()).then((e11) => this.parseJSON(e11)).then((e11) => a3 && a3(e11)).catch((e11) => {
            "AbortError" === e11.name && i10 ? i10() : a3 && a3(null);
          }), l2;
        }
        static xdomainRequest(e10, t10, r10, s10, n10, i10, a3) {
          return e10.timeout = n10, e10.open(t10, r10), e10.onload = () => {
            let t11 = this.parseJSON(e10.responseText);
            a3 && a3(t11);
          }, i10 && (e10.ontimeout = i10), e10.onprogress = () => {
          }, e10.send(s10), e10;
        }
        static xhrRequest(e10, t10, r10, s10, n10, i10, a3, o2) {
          for (let [n11, a4] of (e10.open(t10, r10, true), e10.timeout = i10, Object.entries(s10))) e10.setRequestHeader(n11, a4);
          return e10.onerror = () => o2 && o2(null), e10.onreadystatechange = () => {
            4 === e10.readyState && o2 && o2(this.parseJSON(e10.responseText));
          }, a3 && (e10.ontimeout = a3), e10.send(n10), e10;
        }
        static parseJSON(e10) {
          if (!e10 || "" === e10) return null;
          try {
            return JSON.parse(e10);
          } catch {
            return console && console.log("failed to parse JSON response", e10), null;
          }
        }
        static serialize(e10, t10) {
          let r10 = [];
          for (var s10 in e10) {
            if (!Object.prototype.hasOwnProperty.call(e10, s10)) continue;
            let n10 = t10 ? `${t10}[${s10}]` : s10, i10 = e10[s10];
            "object" == typeof i10 ? r10.push(this.serialize(i10, n10)) : r10.push(encodeURIComponent(n10) + "=" + encodeURIComponent(i10));
          }
          return r10.join("&");
        }
        static appendParams(e10, t10) {
          if (0 === Object.keys(t10).length) return e10;
          let r10 = e10.match(/\?/) ? "&" : "?";
          return `${e10}${r10}${this.serialize(t10)}`;
        }
      }, sK = class {
        constructor(e10, t10) {
          t10 && 2 === t10.length && t10[1].startsWith(sH) && (this.authToken = atob(t10[1].slice(sH.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = true, this.reqs = /* @__PURE__ */ new Set(), this.awaitingBatchAck = false, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {
          }, this.onerror = function() {
          }, this.onmessage = function() {
          }, this.onclose = function() {
          }, this.pollEndpoint = this.normalizeEndpoint(e10), this.readyState = 0, setTimeout(() => this.poll(), 0);
        }
        normalizeEndpoint(e10) {
          return e10.replace("ws://", "http://").replace("wss://", "https://").replace(RegExp("(.*)/" + sF), "$1/longpoll");
        }
        endpointURL() {
          return sW.appendParams(this.pollEndpoint, { token: this.token });
        }
        closeAndRetry(e10, t10, r10) {
          this.close(e10, t10, r10), this.readyState = 0;
        }
        ontimeout() {
          this.onerror("timeout"), this.closeAndRetry(1005, "timeout", false);
        }
        isActive() {
          return 1 === this.readyState || 0 === this.readyState;
        }
        poll() {
          let e10 = { Accept: "application/json" };
          this.authToken && (e10["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e10, null, () => this.ontimeout(), (e11) => {
            if (e11) {
              var { status: t10, token: r10, messages: s10 } = e11;
              if (410 === t10 && null !== this.token) {
                this.onerror(410), this.closeAndRetry(3410, "session_gone", false);
                return;
              }
              this.token = r10;
            } else t10 = 0;
            switch (t10) {
              case 200:
                s10.forEach((e12) => {
                  setTimeout(() => this.onmessage({ data: e12 }), 0);
                }), this.poll();
                break;
              case 204:
                this.poll();
                break;
              case 410:
                this.readyState = 1, this.onopen({}), this.poll();
                break;
              case 403:
                this.onerror(403), this.close(1008, "forbidden", false);
                break;
              case 0:
              case 500:
                this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
                break;
              default:
                throw Error(`unhandled poll status ${t10}`);
            }
          });
        }
        send(e10) {
          "string" != typeof e10 && (e10 = ((e11) => {
            let t10 = "", r10 = new Uint8Array(e11), s10 = r10.byteLength;
            for (let e12 = 0; e12 < s10; e12++) t10 += String.fromCharCode(r10[e12]);
            return btoa(t10);
          })(e10)), this.currentBatch ? this.currentBatch.push(e10) : this.awaitingBatchAck ? this.batchBuffer.push(e10) : (this.currentBatch = [e10], this.currentBatchTimer = setTimeout(() => {
            this.batchSend(this.currentBatch), this.currentBatch = null;
          }, 0));
        }
        batchSend(e10, t10 = 0) {
          this.awaitingBatchAck = true;
          let r10 = t10 + 100, s10 = e10.slice(t10, r10);
          this.ajax("POST", { "Content-Type": "application/x-ndjson" }, s10.join("\n"), () => this.onerror("timeout"), (t11) => {
            t11 && 200 === t11.status ? r10 < e10.length ? this.batchSend(e10, r10) : this.batchBuffer.length > 0 ? (this.batchSend(this.batchBuffer), this.batchBuffer = []) : this.awaitingBatchAck = false : (this.awaitingBatchAck = false, this.onerror(t11 && t11.status), this.closeAndRetry(1011, "internal server error", false));
          });
        }
        close(e10, t10, r10) {
          for (let e11 of this.reqs) e11.abort();
          this.readyState = 3;
          let s10 = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code: e10, reason: t10, wasClean: r10 });
          this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, "u" > typeof CloseEvent ? this.onclose(new CloseEvent("close", s10)) : this.onclose(s10);
        }
        ajax(e10, t10, r10, s10, n10) {
          let i10, a3 = () => {
            this.reqs.delete(i10), s10();
          };
          i10 = sW.request(e10, this.endpointURL(), t10, r10, this.timeout, a3, (e11) => {
            this.reqs.delete(i10), this.isActive() && n10(e11);
          }), this.reqs.add(i10);
        }
      }, sJ = class e10 {
        constructor(t10, r10 = {}) {
          let s10 = r10.events || { state: "presence_state", diff: "presence_diff" };
          this.state = /* @__PURE__ */ Object.create(null), this.pendingDiffs = [], this.channel = t10, this.joinRef = null, this.caller = { onJoin: function() {
          }, onLeave: function() {
          }, onSync: function() {
          } }, this.channel.on(s10.state, (t11) => {
            let { onJoin: r11, onLeave: s11, onSync: n10 } = this.caller;
            this.joinRef = this.channel.joinRef(), this.state = e10.syncState(this.state, t11, r11, s11), this.pendingDiffs.forEach((t12) => {
              this.state = e10.syncDiff(this.state, t12, r11, s11);
            }), this.pendingDiffs = [], n10();
          }), this.channel.on(s10.diff, (t11) => {
            let { onJoin: r11, onLeave: s11, onSync: n10 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(t11) : (this.state = e10.syncDiff(this.state, t11, r11, s11), n10());
          });
        }
        onJoin(e11) {
          this.caller.onJoin = e11;
        }
        onLeave(e11) {
          this.caller.onLeave = e11;
        }
        onSync(e11) {
          this.caller.onSync = e11;
        }
        list(t10) {
          return e10.list(this.state, t10);
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel.joinRef();
        }
        static syncState(e11, t10, r10, s10) {
          let n10 = this.toNullProtoObj(this.clone(e11));
          t10 = this.toNullProtoObj(t10);
          let i10 = /* @__PURE__ */ Object.create(null), a3 = /* @__PURE__ */ Object.create(null);
          return this.map(n10, (e12, r11) => {
            t10[e12] || (a3[e12] = r11);
          }), this.map(t10, (e12, t11) => {
            let r11 = n10[e12];
            if (r11) {
              let s11 = t11.metas.map((e13) => e13.phx_ref), n11 = r11.metas.map((e13) => e13.phx_ref), o2 = t11.metas.filter((e13) => 0 > n11.indexOf(e13.phx_ref)), l2 = r11.metas.filter((e13) => 0 > s11.indexOf(e13.phx_ref));
              o2.length > 0 && (i10[e12] = t11, i10[e12].metas = o2), l2.length > 0 && (a3[e12] = this.clone(r11), a3[e12].metas = l2);
            } else i10[e12] = t11;
          }), this.syncDiff(n10, { joins: i10, leaves: a3 }, r10, s10);
        }
        static syncDiff(e11, t10, r10, s10) {
          e11 = this.toNullProtoObj(e11);
          let { joins: n10, leaves: i10 } = this.clone(t10);
          return r10 || (r10 = function() {
          }), s10 || (s10 = function() {
          }), this.map(n10, (t11, s11) => {
            let n11 = e11[t11];
            if (e11[t11] = this.clone(s11), n11) {
              let r11 = e11[t11].metas.map((e12) => e12.phx_ref), s12 = n11.metas.filter((e12) => 0 > r11.indexOf(e12.phx_ref));
              e11[t11].metas.unshift(...s12);
            }
            r10(t11, n11, s11);
          }), this.map(i10, (t11, r11) => {
            let n11 = e11[t11];
            if (!n11) return;
            let i11 = r11.metas.map((e12) => e12.phx_ref);
            n11.metas = n11.metas.filter((e12) => 0 > i11.indexOf(e12.phx_ref)), s10(t11, n11, r11), 0 === n11.metas.length && delete e11[t11];
          }), e11;
        }
        static list(e11, t10) {
          return t10 || (t10 = function(e12, t11) {
            return t11;
          }), this.map(e11, (e12, r10) => t10(e12, r10));
        }
        static map(e11, t10) {
          return Object.getOwnPropertyNames(e11).map((r10) => t10(r10, e11[r10]));
        }
        static toNullProtoObj(e11) {
          if (null === Object.getPrototypeOf(e11)) return e11;
          let t10 = /* @__PURE__ */ Object.create(null);
          return Object.getOwnPropertyNames(e11).forEach((r10) => {
            t10[r10] = e11[r10];
          }), t10;
        }
        static clone(e11) {
          return JSON.parse(JSON.stringify(e11));
        }
      }, sX = { HEADER_LENGTH: 1, META_LENGTH: 4, KINDS: { push: 0, reply: 1, broadcast: 2 }, encode(e10, t10) {
        return e10.payload.constructor === ArrayBuffer ? t10(this.binaryEncode(e10)) : t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload]));
      }, decode(e10, t10) {
        if (e10.constructor === ArrayBuffer) return t10(this.binaryDecode(e10));
        {
          let [r10, s10, n10, i10, a3] = JSON.parse(e10);
          return t10({ join_ref: r10, ref: s10, topic: n10, event: i10, payload: a3 });
        }
      }, binaryEncode(e10) {
        let { join_ref: t10, ref: r10, event: s10, topic: n10, payload: i10 } = e10, a3 = new TextEncoder(), o2 = a3.encode(t10), l2 = a3.encode(r10), u2 = a3.encode(n10), c2 = a3.encode(s10);
        this.assertFieldSize(o2.byteLength, "join_ref"), this.assertFieldSize(l2.byteLength, "ref"), this.assertFieldSize(u2.byteLength, "topic"), this.assertFieldSize(c2.byteLength, "event");
        let h2 = this.META_LENGTH + o2.byteLength + l2.byteLength + u2.byteLength + c2.byteLength, d2 = new ArrayBuffer(this.HEADER_LENGTH + h2), p2 = new Uint8Array(d2), f2 = new DataView(d2), g2 = 0;
        f2.setUint8(g2++, this.KINDS.push), f2.setUint8(g2++, o2.byteLength), f2.setUint8(g2++, l2.byteLength), f2.setUint8(g2++, u2.byteLength), f2.setUint8(g2++, c2.byteLength), p2.set(o2, g2), g2 += o2.byteLength, p2.set(l2, g2), g2 += l2.byteLength, p2.set(u2, g2), g2 += u2.byteLength, p2.set(c2, g2), g2 += c2.byteLength;
        var m2 = new Uint8Array(d2.byteLength + i10.byteLength);
        return m2.set(p2, 0), m2.set(new Uint8Array(i10), d2.byteLength), m2.buffer;
      }, assertFieldSize(e10, t10) {
        if (e10 > 255) throw Error(`unable to convert ${t10} to binary: must be less than or equal to 255 bytes, but is ${e10} bytes`);
      }, binaryDecode(e10) {
        let t10 = new DataView(e10), r10 = t10.getUint8(0), s10 = new TextDecoder();
        switch (r10) {
          case this.KINDS.push:
            return this.decodePush(e10, t10, s10);
          case this.KINDS.reply:
            return this.decodeReply(e10, t10, s10);
          case this.KINDS.broadcast:
            return this.decodeBroadcast(e10, t10, s10);
        }
      }, decodePush(e10, t10, r10) {
        let s10 = t10.getUint8(1), n10 = t10.getUint8(2), i10 = t10.getUint8(3), a3 = this.HEADER_LENGTH + this.META_LENGTH - 1, o2 = r10.decode(e10.slice(a3, a3 + s10));
        a3 += s10;
        let l2 = r10.decode(e10.slice(a3, a3 + n10));
        a3 += n10;
        let u2 = r10.decode(e10.slice(a3, a3 + i10));
        return a3 += i10, { join_ref: o2, ref: null, topic: l2, event: u2, payload: e10.slice(a3, e10.byteLength) };
      }, decodeReply(e10, t10, r10) {
        let s10 = t10.getUint8(1), n10 = t10.getUint8(2), i10 = t10.getUint8(3), a3 = t10.getUint8(4), o2 = this.HEADER_LENGTH + this.META_LENGTH, l2 = r10.decode(e10.slice(o2, o2 + s10));
        o2 += s10;
        let u2 = r10.decode(e10.slice(o2, o2 + n10));
        o2 += n10;
        let c2 = r10.decode(e10.slice(o2, o2 + i10));
        o2 += i10;
        let h2 = r10.decode(e10.slice(o2, o2 + a3));
        return o2 += a3, { join_ref: l2, ref: u2, topic: c2, event: sq, payload: { status: h2, response: e10.slice(o2, e10.byteLength) } };
      }, decodeBroadcast(e10, t10, r10) {
        let s10 = t10.getUint8(1), n10 = t10.getUint8(2), i10 = this.HEADER_LENGTH + 2, a3 = r10.decode(e10.slice(i10, i10 + s10));
        i10 += s10;
        let o2 = r10.decode(e10.slice(i10, i10 + n10));
        return i10 += n10, { join_ref: null, ref: null, topic: a3, event: o2, payload: e10.slice(i10, e10.byteLength) };
      } }, sY = class {
        constructor(e10, t10 = {}) {
          this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t10.timeout || 1e4, this.transport = t10.transport || sI.WebSocket || sK, this.conn = void 0, this.primaryPassedHealthCheck = false, this.longPollFallbackMs = t10.longPollFallbackMs, this.fallbackTimer = null;
          let r10 = null;
          try {
            r10 = sI && sI.sessionStorage;
          } catch {
          }
          this.sessionStore = t10.sessionStorage || r10, this.establishedConnections = 0, this.defaultEncoder = sX.encode.bind(sX), this.defaultDecoder = sX.decode.bind(sX), this.closeWasClean = true, this.disconnecting = false, this.binaryType = t10.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = false, this.encode = void 0, this.decode = void 0, this.transport !== sK ? (this.encode = t10.encode || this.defaultEncoder, this.decode = t10.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder), this.heartbeatIntervalMs = t10.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = t10.autoSendHeartbeat ?? true, this.heartbeatCallback = t10.heartbeatCallback ?? (() => {
          }), this.rejoinAfterMs = (e11) => t10.rejoinAfterMs ? t10.rejoinAfterMs(e11) : [1e3, 2e3, 5e3][e11 - 1] || 1e4, this.reconnectAfterMs = (e11) => t10.reconnectAfterMs ? t10.reconnectAfterMs(e11) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e11 - 1] || 5e3, this.logger = t10.logger || null, !this.logger && t10.debug && (this.logger = (e11, t11, r11) => {
            console.log(`${e11}: ${t11}`, r11);
          }), this.longpollerTimeout = t10.longpollerTimeout || 2e4, this.params = sA(t10.params || {}), this.endPoint = `${e10}/${sF}`, this.vsn = t10.vsn || "2.0.0", this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new sz(() => {
            if (this.pageHidden) {
              this.log("Not reconnecting as page is hidden!"), this.teardown();
              return;
            }
            this.teardown(async () => {
              t10.beforeReconnect && await t10.beforeReconnect(), this.connect();
            });
          }, this.reconnectAfterMs), this.authToken = t10.authToken && sA(t10.authToken);
        }
        getLongPollTransport() {
          return sK;
        }
        replaceTransport(e10) {
          this.connectClock++, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e10;
        }
        protocol() {
          return location.protocol.match(/^https/) ? "wss" : "ws";
        }
        endPointURL() {
          let e10 = sW.appendParams(sW.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
          return "/" !== e10.charAt(0) ? e10 : "/" === e10.charAt(1) ? `${this.protocol()}:${e10}` : `${this.protocol()}://${location.host}${e10}`;
        }
        disconnect(e10, t10, r10) {
          this.connectClock++, this.disconnecting = true, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
            this.disconnecting = false, e10 && e10();
          }, t10, r10);
        }
        connect(e10) {
          e10 && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = sA(e10)), (!this.conn || this.disconnecting) && (this.longPollFallbackMs && this.transport !== sK ? this.connectWithFallback(sK, this.longPollFallbackMs) : this.transportConnect());
        }
        log(e10, t10, r10) {
          this.logger && this.logger(e10, t10, r10);
        }
        hasLogger() {
          return null !== this.logger;
        }
        onOpen(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.open.push([t10, e10]), t10;
        }
        onClose(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.close.push([t10, e10]), t10;
        }
        onError(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.error.push([t10, e10]), t10;
        }
        onMessage(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.message.push([t10, e10]), t10;
        }
        onHeartbeat(e10) {
          this.heartbeatCallback = e10;
        }
        ping(e10) {
          if (!this.isConnected()) return false;
          let t10 = this.makeRef(), r10 = Date.now();
          this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: t10 });
          let s10 = this.onMessage((n10) => {
            n10.ref === t10 && (this.off([s10]), e10(Date.now() - r10));
          });
          return true;
        }
        transportName(e10) {
          return e10 === sK ? "LongPoll" : e10.name;
        }
        transportConnect() {
          let e10;
          this.connectClock++, this.closeWasClean = false, this.authToken && (e10 = ["phoenix", `${sH}${btoa(this.authToken()).replace(/=/g, "")}`]), this.conn = new this.transport(this.endPointURL(), e10), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (e11) => this.onConnError(e11), this.conn.onmessage = (e11) => this.onConnMessage(e11), this.conn.onclose = (e11) => this.onConnClose(e11);
        }
        getSession(e10) {
          return this.sessionStore && this.sessionStore.getItem(e10);
        }
        storeSession(e10, t10) {
          this.sessionStore && this.sessionStore.setItem(e10, t10);
        }
        connectWithFallback(e10, t10 = 2500) {
          let r10, s10;
          clearTimeout(this.fallbackTimer);
          let n10 = false, i10 = true, a3 = this.transportName(e10), o2 = (t11) => {
            this.log("transport", `falling back to ${a3}...`, t11), this.off([r10, s10]), i10 = false, this.replaceTransport(e10), this.transportConnect();
          };
          if (this.getSession(`phx:fallback:${a3}`)) return o2("memorized");
          this.fallbackTimer = setTimeout(o2, t10), s10 = this.onError((e11) => {
            this.log("transport", "error", e11), i10 && !n10 && (clearTimeout(this.fallbackTimer), o2(e11));
          }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
            if (n10 = true, !i10) {
              let t11 = this.transportName(e10);
              return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${t11}`, "true"), this.log("transport", `established ${t11} fallback`);
            }
            clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(o2, t10), this.ping((e11) => {
              this.log("transport", "connected to primary after", e11), this.primaryPassedHealthCheck = true, clearTimeout(this.fallbackTimer);
            });
          }), this.transportConnect();
        }
        clearHeartbeats() {
          clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
        }
        onConnOpen() {
          this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = false, this.disconnecting = false, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open");
        }
        heartbeatTimeout() {
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            this.triggerChanError(Error("heartbeat timeout")), this.closeWasClean = false, this.teardown(() => this.reconnectTimer.scheduleTimeout(), 1e3, "heartbeat timeout");
          }
        }
        resetHeartbeat() {
          this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
        }
        teardown(e10, t10, r10) {
          if (!this.conn) return e10 && e10();
          let s10 = this.conn;
          this.waitForBufferDone(s10, () => {
            t10 ? s10.close(t10, r10 || "") : s10.close(), this.waitForSocketClosed(s10, () => {
              this.conn === s10 && (this.conn.onopen = function() {
              }, this.conn.onerror = function() {
              }, this.conn.onmessage = function() {
              }, this.conn.onclose = function() {
              }, this.conn = null), e10 && e10();
            });
          });
        }
        waitForBufferDone(e10, t10, r10 = 1) {
          5 !== r10 && e10.bufferedAmount ? setTimeout(() => {
            this.waitForBufferDone(e10, t10, r10 + 1);
          }, 150 * r10) : t10();
        }
        waitForSocketClosed(e10, t10, r10 = 1) {
          5 === r10 || 3 === e10.readyState ? t10() : setTimeout(() => {
            this.waitForSocketClosed(e10, t10, r10 + 1);
          }, 150 * r10);
        }
        onConnClose(e10) {
          this.conn && (this.conn.onclose = () => {
          }), this.hasLogger() && this.log("transport", "close", e10), this.triggerChanError(e10), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", e10);
        }
        onConnError(e10) {
          this.hasLogger() && this.log("transport", "error", e10);
          let t10 = this.transport, r10 = this.establishedConnections;
          this.triggerStateCallbacks("error", e10, t10, r10), (t10 === this.transport || r10 > 0) && this.triggerChanError(e10);
        }
        triggerChanError(e10) {
          this.channels.forEach((t10) => {
            t10.isErrored() || t10.isLeaving() || t10.isClosed() || t10.trigger(sM, e10);
          });
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case 0:
              return "connecting";
            case 1:
              return "open";
            case 2:
              return "closing";
            default:
              return "closed";
          }
        }
        isConnected() {
          return "open" === this.connectionState();
        }
        remove(e10) {
          this.off(e10.stateChangeRefs), this.channels = this.channels.filter((t10) => t10 !== e10);
        }
        off(e10) {
          for (let t10 in this.stateChangeCallbacks) this.stateChangeCallbacks[t10] = this.stateChangeCallbacks[t10].filter(([t11]) => -1 === e10.indexOf(t11));
        }
        channel(e10, t10 = {}) {
          let r10 = new sV(e10, t10, this);
          return this.channels.push(r10), r10;
        }
        push(e10) {
          if (this.hasLogger()) {
            let { topic: t10, event: r10, payload: s10, ref: n10, join_ref: i10 } = e10;
            this.log("push", `${t10} ${r10} (${i10}, ${n10})`, s10);
          }
          this.isConnected() ? this.encode(e10, (e11) => this.conn.send(e11)) : this.sendBuffer.push(() => this.encode(e10, (e11) => this.conn.send(e11)));
        }
        makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        sendHeartbeat() {
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            return;
          }
          if (this.pendingHeartbeatRef) return void this.heartbeatTimeout();
          this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e10) {
            this.log("error", "error in heartbeat callback", e10);
          }
          this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            let { topic: t10, event: r10, payload: s10, ref: n10, join_ref: i10 } = e11;
            if (n10 && n10 === this.pendingHeartbeatRef) {
              let e12 = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
              this.clearHeartbeats();
              try {
                this.heartbeatCallback("ok" === s10.status ? "ok" : "error", e12);
              } catch (e13) {
                this.log("error", "error in heartbeat callback", e13);
              }
              this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
            }
            this.hasLogger() && this.log("receive", `${s10.status || ""} ${t10} ${r10} ${n10 && "(" + n10 + ")" || ""}`.trim(), s10);
            for (let e12 = 0; e12 < this.channels.length; e12++) {
              let a3 = this.channels[e12];
              a3.isMember(t10, r10, s10, i10) && a3.trigger(r10, s10, n10, i10);
            }
            this.triggerStateCallbacks("message", e11);
          });
        }
        triggerStateCallbacks(e10, ...t10) {
          try {
            this.stateChangeCallbacks[e10].forEach(([r10, s10]) => {
              try {
                s10(...t10);
              } catch (t11) {
                this.log("error", `error in ${e10} callback`, t11);
              }
            });
          } catch (t11) {
            this.log("error", `error triggering ${e10} callbacks`, t11);
          }
        }
        leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11.isJoined() || t11.isJoining()));
          t10 && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e10}"`), t10.leave());
        }
      };
      class sQ {
        constructor(e10, t10) {
          var r10;
          let s10 = (null == (r10 = t10) ? void 0 : r10.events) && { events: r10.events };
          this.presence = new sJ(e10.getChannel(), s10), this.presence.onJoin((t11, r11, s11) => {
            let n10 = sQ.onJoinPayload(t11, r11, s11);
            e10.getChannel().trigger("presence", n10);
          }), this.presence.onLeave((t11, r11, s11) => {
            let n10 = sQ.onLeavePayload(t11, r11, s11);
            e10.getChannel().trigger("presence", n10);
          }), this.presence.onSync(() => {
            e10.getChannel().trigger("presence", { event: "sync" });
          });
        }
        get state() {
          return sQ.transformState(this.presence.state);
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = JSON.parse(JSON.stringify(e10))).reduce((t10, r10) => {
            let s10 = e10[r10];
            return t10[r10] = sZ(s10), t10;
          }, {});
        }
        static onJoinPayload(e10, t10, r10) {
          return { event: "join", key: e10, currentPresences: s0(t10), newPresences: sZ(r10) };
        }
        static onLeavePayload(e10, t10, r10) {
          return { event: "leave", key: e10, currentPresences: s0(t10), leftPresences: sZ(r10) };
        }
      }
      function sZ(e10) {
        return e10.metas.map((e11) => {
          let t10 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(e11));
          return t10.presence_ref = t10.phx_ref, delete t10.phx_ref, delete t10.phx_ref_prev, t10;
        });
      }
      function s0(e10) {
        return (null == e10 ? void 0 : e10.metas) ? sZ(e10) : [];
      }
      (em = ek || (ek = {})).SYNC = "sync", em.JOIN = "join", em.LEAVE = "leave";
      class s1 {
        get state() {
          return this.presenceAdapter.state;
        }
        constructor(e10, t10) {
          this.channel = e10, this.presenceAdapter = new sQ(this.channel.channelAdapter, t10);
        }
      }
      class s2 {
        constructor(e10, t10, r10) {
          let s10 = { config: Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, r10.config) };
          this.channel = e10.getSocket().channel(t10, s10), this.socket = e10;
        }
        get state() {
          return this.channel.state;
        }
        set state(e10) {
          this.channel.state = e10;
        }
        get joinedOnce() {
          return this.channel.joinedOnce;
        }
        get joinPush() {
          return this.channel.joinPush;
        }
        get rejoinTimer() {
          return this.channel.rejoinTimer;
        }
        on(e10, t10) {
          return this.channel.on(e10, t10);
        }
        off(e10, t10) {
          this.channel.off(e10, t10);
        }
        subscribe(e10) {
          return this.channel.join(e10);
        }
        unsubscribe(e10) {
          return this.channel.leave(e10);
        }
        teardown() {
          this.channel.teardown();
        }
        onClose(e10) {
          this.channel.onClose(e10);
        }
        onError(e10) {
          return this.channel.onError(e10);
        }
        push(e10, t10, r10) {
          let s10;
          try {
            s10 = this.channel.push(e10, t10, r10);
          } catch (t11) {
            throw Error(`tried to push '${e10}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
          }
          if (this.channel.pushBuffer.length > 100) {
            let e11 = this.channel.pushBuffer.shift();
            e11.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${e11.event}`, e11.payload());
          }
          return s10;
        }
        updateJoinPayload(e10) {
          let t10 = this.channel.joinPush.payload();
          this.channel.joinPush.payload = () => Object.assign(Object.assign({}, t10), e10);
        }
        canPush() {
          return this.socket.isConnected() && this.state === sb;
        }
        isJoined() {
          return this.state === sb;
        }
        isJoining() {
          return "joining" === this.state;
        }
        isClosed() {
          return "closed" === this.state;
        }
        isLeaving() {
          return "leaving" === this.state;
        }
        updateFilterBindings(e10) {
          this.channel.filterBindings = e10;
        }
        updatePayloadTransform(e10) {
          this.channel.onMessage = e10;
        }
        getChannel() {
          return this.channel;
        }
      }
      let s4 = /[,()"\\]/, s3 = (e10) => {
        let t10 = null === e10 ? "null" : String(e10);
        return s4.test(t10) || t10 !== t10.trim() ? `"${t10.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : t10;
      };
      class s5 {
        constructor() {
          this.filters = [];
        }
        add(e10, t10, r10, s10 = false) {
          return this.filters.push(`${e10}=${s10 ? "not." : ""}${((e11, t11) => {
            if ("in" === e11) {
              let e12 = Array.isArray(t11) ? t11 : [t11];
              if (0 === e12.length) throw Error("Realtime `in` filter requires at least one value.");
              let r11 = Array.from(new Set(e12)).map((e13) => s3(e13)).join(",");
              return `in.(${r11})`;
            }
            if ("is" === e11) return `is.${null === t11 ? "null" : String(t11)}`;
            return `${e11}.${s3(t11)}`;
          })(t10, r10)}`), this;
        }
        eq(e10, t10) {
          return this.add(e10, "eq", t10);
        }
        neq(e10, t10) {
          return this.add(e10, "neq", t10);
        }
        gt(e10, t10) {
          return this.add(e10, "gt", t10);
        }
        gte(e10, t10) {
          return this.add(e10, "gte", t10);
        }
        lt(e10, t10) {
          return this.add(e10, "lt", t10);
        }
        lte(e10, t10) {
          return this.add(e10, "lte", t10);
        }
        in(e10, t10) {
          return this.add(e10, "in", t10);
        }
        like(e10, t10) {
          return this.add(e10, "like", t10);
        }
        ilike(e10, t10) {
          return this.add(e10, "ilike", t10);
        }
        match(e10, t10) {
          return this.add(e10, "match", t10);
        }
        imatch(e10, t10) {
          return this.add(e10, "imatch", t10);
        }
        is(e10, t10) {
          return this.add(e10, "is", t10);
        }
        isDistinct(e10, t10) {
          return this.add(e10, "isdistinct", t10);
        }
        not(e10, t10, r10) {
          return this.add(e10, t10, r10, true);
        }
        build() {
          return this.filters.join(",");
        }
        toString() {
          return this.build();
        }
      }
      (ey = eE || (eE = {})).ALL = "*", ey.INSERT = "INSERT", ey.UPDATE = "UPDATE", ey.DELETE = "DELETE", (eb = eT || (eT = {})).BROADCAST = "broadcast", eb.PRESENCE = "presence", eb.POSTGRES_CHANGES = "postgres_changes", eb.SYSTEM = "system", (ev = ex || (ex = {})).SUBSCRIBED = "SUBSCRIBED", ev.TIMED_OUT = "TIMED_OUT", ev.CLOSED = "CLOSED", ev.CHANNEL_ERROR = "CHANNEL_ERROR";
      class s6 {
        get state() {
          return this.channelAdapter.state;
        }
        set state(e10) {
          this.channelAdapter.state = e10;
        }
        get joinedOnce() {
          return this.channelAdapter.joinedOnce;
        }
        get timeout() {
          return this.socket.timeout;
        }
        get joinPush() {
          return this.channelAdapter.joinPush;
        }
        get rejoinTimer() {
          return this.channelAdapter.rejoinTimer;
        }
        constructor(e10, t10 = { config: {} }, r10) {
          var s10, n10;
          if (this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t10.config), this.channelAdapter = new s2(this.socket.socketAdapter, e10, this.params), this.presence = new s1(this), this._onClose(() => {
            this.socket._remove(this);
          }), this._updateFilterTransform(), this.broadcastEndpointURL = sP(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || false, !this.private && (null == (n10 = null == (s10 = this.params.config) ? void 0 : s10.broadcast) ? void 0 : n10.replay)) throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, s10, n10, i10;
          if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
            let { config: { broadcast: a3, presence: o2, private: l2, postgres_changes_options: u2 } } = this.params, c2 = null != (s10 = null == (r10 = this.bindings.postgres_changes) ? void 0 : r10.map((e11) => e11.filter)) ? s10 : [], h2 = !!this.bindings[eT.PRESENCE] && this.bindings[eT.PRESENCE].length > 0 || (null == (n10 = this.params.config.presence) ? void 0 : n10.enabled) === true, d2 = {}, p2 = Object.assign({ broadcast: a3, presence: Object.assign(Object.assign({}, o2), { enabled: h2 }), postgres_changes: c2, private: l2 }, u2 ? { postgres_changes_options: u2 } : {});
            this.socket.accessTokenValue && (d2.access_token = this.socket.accessTokenValue), this._onError((t11) => {
              null == e10 || e10(ex.CHANNEL_ERROR, (function(e11) {
                if (e11 instanceof Error) return e11;
                if ("string" == typeof e11) return Error(e11);
                if (e11 && "object" == typeof e11) {
                  if ("number" == typeof e11.code) {
                    let t12 = "string" == typeof e11.reason && e11.reason ? ` (${e11.reason})` : "";
                    return Error(`socket closed: ${e11.code}${t12}`, { cause: e11 });
                  }
                  return Error("channel error: transport failure", { cause: e11 });
                }
                return Error("channel error: connection lost");
              })(t11));
            }), this._onClose(() => null == e10 ? void 0 : e10(ex.CLOSED)), this.updateJoinPayload(Object.assign({ config: p2 }, d2)), this._updateFilterMessage();
            let f2 = (null == u2 ? void 0 : u2.wait) && c2.length > 0 ? Math.max(t10, (null != (i10 = u2.timeout) ? i10 : 15e3) + 1e4) : t10;
            this.channelAdapter.subscribe(f2).receive("ok", async ({ postgres_changes: t11 }) => {
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(ex.SUBSCRIBED);
                return;
              }
              this._updatePostgresBindings(t11, e10);
            }).receive("error", (t11) => {
              this.state = sy;
              let r11 = Object.values(t11).join(", ") || "error";
              null == e10 || e10(ex.CHANNEL_ERROR, Error(r11, { cause: t11 }));
            }).receive("timeout", () => {
              null == e10 || e10(ex.TIMED_OUT);
            });
          }
          return this;
        }
        _updatePostgresBindings(e10, t10) {
          var r10;
          let s10 = this.bindings.postgres_changes, n10 = null != (r10 = null == s10 ? void 0 : s10.length) ? r10 : 0, i10 = [];
          for (let r11 = 0; r11 < n10; r11++) {
            let n11 = s10[r11], { filter: { event: a3, schema: o2, table: l2, filter: u2 } } = n11, c2 = e10 && e10[r11];
            if (c2 && c2.event === a3 && s6.isFilterValueEqual(c2.schema, o2) && s6.isFilterValueEqual(c2.table, l2) && s6.isFilterValueEqual(c2.filter, u2)) i10.push(Object.assign(Object.assign({}, n11), { id: c2.id }));
            else {
              this.unsubscribe(), this.state = sy, null == t10 || t10(ex.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = i10, this.state != sy && t10 && t10(ex.SUBSCRIBED);
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          let s10 = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(), n10 = e10 === eT.PRESENCE || e10 === eT.POSTGRES_CHANGES;
          if (s10 && n10) throw this.socket.log("channel", `cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`), Error(`cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`);
          return this._on(e10, t10, r10);
        }
        async httpSend(e10, t10, r10 = {}) {
          var s10;
          if (null == t10) return Promise.reject(Error("Payload is required for httpSend()"));
          let n10 = t10 instanceof ArrayBuffer || ArrayBuffer.isView(t10), i10 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": n10 ? "application/octet-stream" : "application/json" };
          this.socket.accessTokenValue && (i10.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          let a3 = new URL(this.broadcastEndpointURL);
          if (a3.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e10)}`, this.private && a3.searchParams.set("private", "true"), r10.persist) {
            if (!this.private) return Promise.reject(Error("Realtime httpSend() cannot store a message on a public channel."));
            let e11 = "object" == typeof r10.persist ? r10.persist.ttl : void 0;
            void 0 === e11 ? a3.searchParams.set("persist", "true") : a3.searchParams.set("persist[ttl]", String(e11));
          }
          let o2 = { method: "POST", headers: i10, body: n10 ? t10 : JSON.stringify(t10) }, l2 = await this._fetchWithTimeout(a3.toString(), o2, null != (s10 = r10.timeout) ? s10 : this.timeout);
          if (202 === l2.status) return { success: true };
          if (404 === l2.status) return Promise.reject(Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
          let u2 = l2.statusText;
          try {
            let e11 = await l2.json();
            u2 = e11.error || e11.message || u2;
          } catch (e11) {
          }
          return Promise.reject(Error(u2));
        }
        async send(e10, t10 = {}) {
          var r10, s10;
          if ("broadcast" === e10.type && e10.persist && (!this.private || this.socket.vsn === sg)) {
            let e11 = this.private ? "Realtime send() cannot store a message with protocol 1.0.0. Use httpSend() or connect with vsn 2.0.0." : "Realtime send() cannot store a message on a public channel.";
            return this.socket.hasLogger() ? this.socket.log("channel", e11) : console.error(e11), "error";
          }
          if (this.channelAdapter.canPush() || "broadcast" !== e10.type) return new Promise((r11) => {
            var s11, n10, i10;
            let a3 = this.channelAdapter.push(e10.type, e10, t10.timeout || this.timeout);
            "broadcast" !== e10.type || (null == (i10 = null == (n10 = null == (s11 = this.params) ? void 0 : s11.config) ? void 0 : n10.broadcast) ? void 0 : i10.ack) || r11("ok"), a3.receive("ok", () => r11("ok")), a3.receive("error", (t11) => r11(e10.persist && "string" == typeof (null == t11 ? void 0 : t11.error) ? t11.error : "error")), a3.receive("timeout", () => r11("timed out"));
          });
          {
            let n10 = "Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.";
            this.socket.hasLogger() ? this.socket.log("channel", n10) : console.warn(n10);
            let { event: i10, payload: a3 } = e10;
            if (e10.persist) {
              let e11 = "Realtime send() fell back to REST and cannot store this message. The batch endpoint does not support persistence. Use httpSend() or send after the channel is connected and subscribed.";
              return this.socket.hasLogger() ? this.socket.log("channel", e11) : console.error(e11), "error";
            }
            let o2 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
            this.socket.accessTokenValue && (o2.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            let l2 = { method: "POST", headers: o2, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: i10, payload: a3, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, l2, null != (r10 = t10.timeout) ? r10 : this.timeout);
              return await (null == (s10 = e11.body) ? void 0 : s10.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if (e11 instanceof Error && "AbortError" === e11.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.channelAdapter.updateJoinPayload(e10);
        }
        async unsubscribe(e10 = this.timeout) {
          return new Promise((t10) => {
            this.channelAdapter.unsubscribe(e10).receive("ok", () => t10("ok")).receive("timeout", () => t10("timed out")).receive("error", () => t10("error"));
          });
        }
        teardown() {
          this.channelAdapter.teardown();
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let s10 = new AbortController(), n10 = setTimeout(() => s10.abort(), r10), i10 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: s10.signal }));
          return clearTimeout(n10), i10;
        }
        _on(e10, t10, r10) {
          var s10;
          let n10 = e10.toLocaleLowerCase(), i10 = null == t10 ? void 0 : t10.filter;
          if ((i10 instanceof s5 || "object" == typeof i10 && null !== i10 && "function" == typeof i10.build) && (t10 = Object.assign(Object.assign({}, t10), { filter: i10.build() })), n10 === eT.POSTGRES_CHANGES && (null == (s10 = this.bindings[n10]) ? void 0 : s10.find((e11) => s6.isSamePostgresFilter(e11.filter, t10)))) return this.socket.log("error", `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, t10), this;
          let a3 = this.channelAdapter.on(e10, r10), o2 = { type: n10, filter: t10, callback: r10, ref: a3 };
          return this.bindings[n10] ? this.bindings[n10].push(o2) : this.bindings[n10] = [o2], this._updateFilterMessage(), this;
        }
        _onClose(e10) {
          this.channelAdapter.onClose(e10);
        }
        _onError(e10) {
          this.channelAdapter.onError(e10);
        }
        _updateFilterMessage() {
          this.channelAdapter.updateFilterBindings((e10, t10, r10) => {
            var s10, n10, i10, a3, o2, l2, u2;
            let c2 = e10.event.toLocaleLowerCase();
            if (this._notThisChannelEvent(c2, r10)) return false;
            let h2 = null == (s10 = this.bindings[c2]) ? void 0 : s10.find((t11) => t11.ref === e10.ref);
            if (!h2) return true;
            if (!["broadcast", "presence", "postgres_changes"].includes(c2)) return h2.type.toLocaleLowerCase() === c2;
            if ("id" in h2) {
              let e11 = h2.id, r11 = null == (n10 = h2.filter) ? void 0 : n10.event;
              return e11 && (null == (i10 = t10.ids) ? void 0 : i10.includes(e11)) && ("*" === r11 || (null == r11 ? void 0 : r11.toLocaleLowerCase()) === (null == (a3 = t10.data) ? void 0 : a3.type.toLocaleLowerCase()));
            }
            {
              let e11 = null == (l2 = null == (o2 = null == h2 ? void 0 : h2.filter) ? void 0 : o2.event) ? void 0 : l2.toLocaleLowerCase();
              return "*" === e11 || e11 === (null == (u2 = null == t10 ? void 0 : t10.event) ? void 0 : u2.toLocaleLowerCase());
            }
          });
        }
        _notThisChannelEvent(e10, t10) {
          let { close: r10, error: s10, leave: n10, join: i10 } = sv;
          return t10 && [r10, s10, n10, i10].includes(e10) && t10 !== this.joinPush.ref;
        }
        _updateFilterTransform() {
          this.channelAdapter.updatePayloadTransform((e10, t10, r10) => {
            if ("object" == typeof t10 && "ids" in t10) {
              let e11 = t10.data, { schema: r11, table: s10, commit_timestamp: n10, type: i10, errors: a3 } = e11;
              return Object.assign(Object.assign({}, { schema: r11, table: s10, commit_timestamp: n10, eventType: i10, new: {}, old: {}, errors: a3 }), this._getPayloadRecords(e11));
            }
            return t10;
          });
        }
        copyBindings(e10) {
          if (this.joinedOnce) throw Error("cannot copy bindings into joined channel");
          for (let t10 in e10.bindings) for (let r10 of e10.bindings[t10]) this._on(r10.type, r10.filter, r10.callback);
        }
        static isFilterValueEqual(e10, t10) {
          return (null != e10 ? e10 : void 0) === (null != t10 ? t10 : void 0);
        }
        static isSamePostgresFilter(e10, t10) {
          var r10, s10, n10, i10;
          let a3 = null != (s10 = null == (r10 = null == e10 ? void 0 : e10.select) ? void 0 : r10.join()) ? s10 : void 0, o2 = null != (i10 = null == (n10 = null == t10 ? void 0 : t10.select) ? void 0 : n10.join()) ? i10 : void 0;
          return (null == e10 ? void 0 : e10.event) === (null == t10 ? void 0 : t10.event) && s6.isFilterValueEqual(null == e10 ? void 0 : e10.schema, null == t10 ? void 0 : t10.schema) && s6.isFilterValueEqual(null == e10 ? void 0 : e10.table, null == t10 ? void 0 : t10.table) && s6.isFilterValueEqual(null == e10 ? void 0 : e10.filter, null == t10 ? void 0 : t10.filter) && a3 === o2;
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = s_(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = s_(e10.columns, e10.old_record)), t10;
        }
      }
      class s8 {
        constructor(e10, t10) {
          this.socket = new sY(e10, t10);
        }
        get timeout() {
          return this.socket.timeout;
        }
        get endPoint() {
          return this.socket.endPoint;
        }
        get transport() {
          return this.socket.transport;
        }
        get heartbeatIntervalMs() {
          return this.socket.heartbeatIntervalMs;
        }
        get heartbeatCallback() {
          return this.socket.heartbeatCallback;
        }
        set heartbeatCallback(e10) {
          this.socket.heartbeatCallback = e10;
        }
        get heartbeatTimer() {
          return this.socket.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.socket.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socket.reconnectTimer;
        }
        get vsn() {
          return this.socket.vsn;
        }
        get encode() {
          return this.socket.encode;
        }
        get decode() {
          return this.socket.decode;
        }
        get reconnectAfterMs() {
          return this.socket.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socket.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socket.stateChangeCallbacks;
        }
        connect() {
          this.socket.connect();
        }
        disconnect(e10, t10, r10, s10 = 1e4) {
          return new Promise((n10) => {
            setTimeout(() => n10("timeout"), s10), this.socket.disconnect(() => {
              e10(), n10("ok");
            }, t10, r10);
          });
        }
        push(e10) {
          this.socket.push(e10);
        }
        log(e10, t10, r10) {
          this.socket.log(e10, t10, r10);
        }
        hasLogger() {
          return this.socket.hasLogger();
        }
        makeRef() {
          return this.socket.makeRef();
        }
        onOpen(e10) {
          this.socket.onOpen(e10);
        }
        onClose(e10) {
          this.socket.onClose(e10);
        }
        onError(e10) {
          this.socket.onError(e10);
        }
        onMessage(e10) {
          this.socket.onMessage(e10);
        }
        isConnected() {
          return this.socket.isConnected();
        }
        isConnecting() {
          return "connecting" == this.socket.connectionState();
        }
        isDisconnecting() {
          return "closing" == this.socket.connectionState();
        }
        connectionState() {
          return this.socket.connectionState();
        }
        endPointURL() {
          return this.socket.endPointURL();
        }
        sendHeartbeat() {
          this.socket.sendHeartbeat();
        }
        getSocket() {
          return this.socket;
        }
      }
      let s9 = [1e3, 2e3, 5e3, 1e4], s7 = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class ne {
        get endPoint() {
          return this.socketAdapter.endPoint;
        }
        get timeout() {
          return this.socketAdapter.timeout;
        }
        get transport() {
          return this.socketAdapter.transport;
        }
        get heartbeatCallback() {
          return this.socketAdapter.heartbeatCallback;
        }
        get heartbeatIntervalMs() {
          return this.socketAdapter.heartbeatIntervalMs;
        }
        get heartbeatTimer() {
          return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socketAdapter.reconnectTimer;
        }
        get vsn() {
          return this.socketAdapter.vsn;
        }
        get encode() {
          return this.socketAdapter.encode;
        }
        get decode() {
          return this.socketAdapter.decode;
        }
        get reconnectAfterMs() {
          return this.socketAdapter.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socketAdapter.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socketAdapter.stateChangeCallbacks;
        }
        constructor(e10, t10) {
          var r10;
          if (this.channels = [], this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new sw(), this._manuallySetToken = false, this._authPromise = null, this._authGeneration = 0, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = (e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12), !(null == (r10 = null == t10 ? void 0 : t10.params) ? void 0 : r10.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t10.params.apikey;
          let s10 = this._initializeOptions(t10);
          this.socketAdapter = new s8(e10, s10), this.httpEndpoint = sP(e10), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
            this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
            try {
              this.socketAdapter.connect();
            } catch (t10) {
              let e10 = t10.message;
              throw Error(`WebSocket not available: ${e10}`);
            }
            this._handleNodeJsRaceCondition();
          }
        }
        endpointURL() {
          return this.socketAdapter.endPointURL();
        }
        async disconnect(e10, t10) {
          return (this._cancelPendingDisconnect(), this.isDisconnecting()) ? "ok" : await this.socketAdapter.disconnect(() => {
            clearInterval(this._workerHeartbeatTimer), this._terminateWorker();
          }, e10, t10);
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return "ok" === t10 && e10.teardown(), t10;
        }
        async removeAllChannels() {
          let e10 = this.channels.map(async (e11) => {
            let t11 = await e11.unsubscribe();
            return e11.teardown(), t11;
          }), t10 = await Promise.all(e10);
          return await this.disconnect(), t10;
        }
        log(e10, t10, r10) {
          this.socketAdapter.log(e10, t10, r10);
        }
        hasLogger() {
          return this.socketAdapter.hasLogger();
        }
        connectionState() {
          return this.socketAdapter.connectionState() || "closed";
        }
        isConnected() {
          return this.socketAdapter.isConnected();
        }
        isConnecting() {
          return this.socketAdapter.isConnecting();
        }
        isDisconnecting() {
          return this.socketAdapter.isDisconnecting();
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = `realtime:${e10}`, s10 = this.getChannels().find((e11) => e11.topic === r10);
          if (s10) return s10;
          {
            let r11 = new s6(`realtime:${e10}`, t10, this);
            return this._cancelPendingDisconnect(), this.channels.push(r11), r11;
          }
        }
        push(e10) {
          this.socketAdapter.push(e10);
        }
        async setAuth(e10 = null) {
          let t10 = ++this._authGeneration, r10 = this._performAuth(e10, t10);
          t10 === this._authGeneration && (this._authPromise = r10);
          try {
            await r10;
          } finally {
            this._authPromise === r10 && (this._authPromise = null);
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          this.socketAdapter.sendHeartbeat();
        }
        onHeartbeat(e10) {
          this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e10);
        }
        _makeRef() {
          return this.socketAdapter.makeRef();
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10.topic !== e10.topic), 0 === this.channels.length && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect());
        }
        _schedulePendingDisconnect() {
          if (this._cancelPendingDisconnect(), 0 === this._disconnectOnEmptyChannelsAfterMs) {
            this.log("transport", "disconnecting immediately - no channels"), this.disconnect();
            return;
          }
          this._pendingDisconnectTimer = setTimeout(() => {
            this._pendingDisconnectTimer = null, 0 === this.channels.length && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect());
          }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
        }
        _cancelPendingDisconnect() {
          null !== this._pendingDisconnectTimer && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null);
        }
        async _performAuth(e10, t10) {
          let r10, s10 = false;
          if (e10) r10 = e10, s10 = true;
          else if (this.accessToken) try {
            r10 = await this.accessToken();
          } catch (e11) {
            this.log("error", "Error fetching access token from callback", e11), r10 = this.accessTokenValue;
          }
          else r10 = this.accessTokenValue;
          t10 === this._authGeneration && (this.accessToken ? this._manuallySetToken = false : s10 && (this._manuallySetToken = true), this.accessTokenValue != r10 && (this.accessTokenValue = r10, this.channels.forEach((e11) => {
            let t11 = { access_token: r10, version: "realtime-js/2.119.0" };
            e11.updateJoinPayload(t11), e11.joinedOnce && e11.channelAdapter.isJoined() && e11.channelAdapter.push(sv.access_token, { access_token: r10 });
          })));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e10 = "general") {
          this._isManualToken() || this.setAuth().catch((t10) => {
            this.log("error", `Error setting auth in ${e10}`, t10);
          });
        }
        _setupConnectionHandlers() {
          this.socketAdapter.onOpen(() => {
            (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e10) => {
              this.log("error", "error waiting for auth on connect", e10);
            }), this.worker && !this.workerRef && this._startWorkerHeartbeat();
          }), this.socketAdapter.onClose(() => {
            this.worker && this.workerRef && this._terminateWorker();
          }), this.socketAdapter.onMessage((e10) => {
            e10.ref && e10.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null);
          });
        }
        _handleNodeJsRaceCondition() {
          this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen();
        }
        _wrapHeartbeatCallback(e10) {
          return (t10, r10) => {
            "disconnected" !== t10 && ("sent" == t10 && this._setAuthSafely(), e10 && e10(t10, r10));
          };
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e10 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
            this.log("worker", "worker error", e11.message), this._terminateWorker(), this.disconnect();
          }, this.workerRef.onmessage = (e11) => {
            "keepAlive" === e11.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _terminateWorker() {
          this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10) t10 = e10;
          else {
            let e11 = new Blob([s7], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
        _initializeOptions(e10) {
          var t10, r10, s10, n10, i10, a3, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          this.worker = null != (t10 = null == e10 ? void 0 : e10.worker) && t10, this.accessToken = null != (r10 = null == e10 ? void 0 : e10.accessToken) ? r10 : null;
          let g2 = {};
          g2.timeout = null != (s10 = null == e10 ? void 0 : e10.timeout) ? s10 : 1e4, g2.heartbeatIntervalMs = null != (n10 = null == e10 ? void 0 : e10.heartbeatIntervalMs) ? n10 : 25e3, this._disconnectOnEmptyChannelsAfterMs = null != (i10 = null == e10 ? void 0 : e10.disconnectOnEmptyChannelsAfterMs) ? i10 : 2 * (null != (a3 = null == e10 ? void 0 : e10.heartbeatIntervalMs) ? a3 : 25e3), g2.transport = null != (o2 = null == e10 ? void 0 : e10.transport) ? o2 : sf.getWebSocketConstructor(), g2.params = null == e10 ? void 0 : e10.params, g2.logger = null == e10 ? void 0 : e10.logger, g2.heartbeatCallback = this._wrapHeartbeatCallback(null == e10 ? void 0 : e10.heartbeatCallback), g2.sessionStorage = null != (l2 = null == e10 ? void 0 : e10.sessionStorage) ? l2 : (function() {
            let e11;
            try {
              if ("u" > typeof globalThis && globalThis.sessionStorage) return globalThis.sessionStorage;
            } catch (e12) {
            }
            return e11 = /* @__PURE__ */ new Map(), { get length() {
              return e11.size;
            }, clear() {
              e11.clear();
            }, getItem: (t11) => e11.has(t11) ? e11.get(t11) : null, key(t11) {
              var r11;
              return null != (r11 = Array.from(e11.keys())[t11]) ? r11 : null;
            }, removeItem(t11) {
              e11.delete(t11);
            }, setItem(t11, r11) {
              e11.set(t11, String(r11));
            } };
          })(), g2.reconnectAfterMs = null != (u2 = null == e10 ? void 0 : e10.reconnectAfterMs) ? u2 : (e11) => s9[e11 - 1] || 1e4;
          let m2 = null != (c2 = null == e10 ? void 0 : e10.vsn) ? c2 : sm;
          switch (m2) {
            case sg:
              p2 = (e11, t11) => t11(JSON.stringify(e11)), f2 = (e11, t11) => t11(JSON.parse(e11));
              break;
            case sm:
              p2 = this.serializer.encode.bind(this.serializer), f2 = this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${m2}`);
          }
          return g2.vsn = m2, g2.encode = null != (h2 = null == e10 ? void 0 : e10.encode) ? h2 : p2, g2.decode = null != (d2 = null == e10 ? void 0 : e10.decode) ? d2 : f2, g2.beforeReconnect = this._reconnectAuth.bind(this), ((null == e10 ? void 0 : e10.logLevel) || (null == e10 ? void 0 : e10.log_level)) && (this.logLevel = e10.logLevel || e10.log_level, g2.params = Object.assign(Object.assign({}, g2.params), { log_level: this.logLevel })), this.worker && (this.workerUrl = null == e10 ? void 0 : e10.workerUrl, g2.autoSendHeartbeat = !this.worker), g2;
        }
        async _reconnectAuth() {
          await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
        }
      }
      var nt = class extends Error {
        constructor(e10, t10) {
          super(e10), this.name = "IcebergError", this.status = t10.status, this.icebergType = t10.icebergType, this.icebergCode = t10.icebergCode, this.details = t10.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t10.icebergType || [500, 502, 504].includes(t10.status) && t10.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function nr(e10) {
        return e10 && "none" !== e10.type ? "bearer" === e10.type ? { Authorization: `Bearer ${e10.token}` } : "header" === e10.type ? { [e10.name]: e10.value } : "custom" === e10.type ? await e10.getHeaders() : {} : {};
      }
      function ns(e10) {
        return e10.join("");
      }
      var nn = class {
        constructor(e10, t10 = "") {
          this.client = e10, this.prefix = t10;
        }
        async listNamespaces(e10) {
          let t10 = e10 ? { parent: ns(e10.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t10 })).data.namespaces.map((e11) => ({ namespace: e11 }));
        }
        async createNamespace(e10, t10) {
          let r10 = { namespace: e10.namespace, properties: t10?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r10 })).data;
        }
        async dropNamespace(e10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${ns(e10.namespace)}` });
        }
        async loadNamespaceMetadata(e10) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${ns(e10.namespace)}` })).data.properties };
        }
        async namespaceExists(e10) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${ns(e10.namespace)}` }), true;
          } catch (e11) {
            if (e11 instanceof nt && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createNamespaceIfNotExists(e10, t10) {
          try {
            return await this.createNamespace(e10, t10);
          } catch (e11) {
            if (e11 instanceof nt && 409 === e11.status) return;
            throw e11;
          }
        }
      };
      function ni(e10) {
        return e10.join("");
      }
      var na = class {
        constructor(e10, t10 = "", r10) {
          this.client = e10, this.prefix = t10, this.accessDelegation = r10;
        }
        async listTables(e10) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e10, t10) {
          let r10 = {};
          return this.accessDelegation && (r10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables`, body: t10, headers: r10 })).data.metadata;
        }
        async updateTable(e10, t10) {
          let r10 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables/${e10.name}`, body: t10 });
          return { "metadata-location": r10.data["metadata-location"], metadata: r10.data.metadata };
        }
        async dropTable(e10, t10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables/${e10.name}`, query: { purgeRequested: String(t10?.purge ?? false) } });
        }
        async loadTable(e10) {
          let t10 = {};
          return this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables/${e10.name}`, headers: t10 })).data.metadata;
        }
        async tableExists(e10) {
          let t10 = {};
          this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${ni(e10.namespace)}/tables/${e10.name}`, headers: t10 }), true;
          } catch (e11) {
            if (e11 instanceof nt && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createTableIfNotExists(e10, t10) {
          try {
            return await this.createTable(e10, t10);
          } catch (r10) {
            if (r10 instanceof nt && 409 === r10.status) return await this.loadTable({ namespace: e10.namespace, name: t10.name });
            throw r10;
          }
        }
      }, no = class {
        constructor(e10) {
          var t10;
          let r10, s10 = "v1";
          e10.catalogName && (s10 += `/${e10.catalogName}`);
          let n10 = e10.baseUrl.endsWith("/") ? e10.baseUrl : `${e10.baseUrl}/`;
          this.client = (r10 = (t10 = { baseUrl: n10, auth: e10.auth, fetchImpl: e10.fetch }).fetchImpl ?? globalThis.fetch, { async request({ method: e11, path: s11, query: n11, body: i10, headers: a3 }) {
            let o2 = (function(e12, t11, r11) {
              let s12 = new URL(t11, e12);
              if (r11) for (let [e13, t12] of Object.entries(r11)) void 0 !== t12 && s12.searchParams.set(e13, t12);
              return s12.toString();
            })(t10.baseUrl, s11, n11), l2 = await nr(t10.auth), u2 = await r10(o2, { method: e11, headers: { ...i10 ? { "Content-Type": "application/json" } : {}, ...l2, ...a3 }, body: i10 ? JSON.stringify(i10) : void 0 }), c2 = await u2.text(), h2 = (u2.headers.get("content-type") || "").includes("application/json"), d2 = h2 && c2 ? JSON.parse(c2) : c2;
            if (!u2.ok) {
              let e12 = h2 ? d2 : void 0, t11 = e12?.error;
              throw new nt(t11?.message ?? `Request failed with status ${u2.status}`, { status: u2.status, icebergType: t11?.type, icebergCode: t11?.code, details: e12 });
            }
            return { status: u2.status, headers: u2.headers, data: d2 };
          } }), this.accessDelegation = e10.accessDelegation?.join(","), this.namespaceOps = new nn(this.client, s10), this.tableOps = new na(this.client, s10, this.accessDelegation);
        }
        async listNamespaces(e10) {
          return this.namespaceOps.listNamespaces(e10);
        }
        async createNamespace(e10, t10) {
          return this.namespaceOps.createNamespace(e10, t10);
        }
        async dropNamespace(e10) {
          await this.namespaceOps.dropNamespace(e10);
        }
        async loadNamespaceMetadata(e10) {
          return this.namespaceOps.loadNamespaceMetadata(e10);
        }
        async listTables(e10) {
          return this.tableOps.listTables(e10);
        }
        async createTable(e10, t10) {
          return this.tableOps.createTable(e10, t10);
        }
        async updateTable(e10, t10) {
          return this.tableOps.updateTable(e10, t10);
        }
        async dropTable(e10, t10) {
          await this.tableOps.dropTable(e10, t10);
        }
        async loadTable(e10) {
          return this.tableOps.loadTable(e10);
        }
        async namespaceExists(e10) {
          return this.namespaceOps.namespaceExists(e10);
        }
        async tableExists(e10) {
          return this.tableOps.tableExists(e10);
        }
        async createNamespaceIfNotExists(e10, t10) {
          return this.namespaceOps.createNamespaceIfNotExists(e10, t10);
        }
        async createTableIfNotExists(e10, t10) {
          return this.tableOps.createTableIfNotExists(e10, t10);
        }
      };
      function nl(e10) {
        return (nl = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function nu(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s10 = Object.getOwnPropertySymbols(e10);
          t10 && (s10 = s10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s10);
        }
        return r10;
      }
      function nc(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? nu(Object(r10), true).forEach(function(t11) {
            !(function(e11, t12, r11) {
              var s10;
              (s10 = (function(e12, t13) {
                if ("object" != nl(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s11 = r12.call(e12, t13 || "default");
                  if ("object" != nl(s11)) return s11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              })(t12, "string"), (t12 = "symbol" == nl(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            })(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : nu(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      var nh = class extends Error {
        constructor(e10, t10 = "storage", r10, s10) {
          super(e10), this.__isStorageError = true, this.namespace = t10, this.name = "vectors" === t10 ? "StorageVectorsError" : "StorageError", this.status = r10, this.statusCode = s10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      };
      function nd(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      var np = class extends nh {
        constructor(e10, t10, r10, s10 = "storage", n10) {
          super(e10, s10, t10, r10), this.name = "vectors" === s10 ? "StorageVectorsApiError" : "StorageApiError", this.status = t10, this.statusCode = r10, this.code = n10;
        }
        toJSON() {
          return nc(nc({}, super.toJSON()), {}, { code: this.code });
        }
      }, nf = class extends nh {
        constructor(e10, t10, r10 = "storage") {
          super(e10, r10), this.name = "vectors" === r10 ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t10;
        }
      };
      function ng(e10, t10, r10) {
        let s10 = nc({}, e10), n10 = t10.toLowerCase();
        for (let e11 of Object.keys(s10)) e11.toLowerCase() === n10 && delete s10[e11];
        return s10[n10] = r10, s10;
      }
      let nm = (e10) => {
        if (Array.isArray(e10)) return e10.map((e11) => nm(e11));
        if ("function" == typeof e10 || e10 !== Object(e10)) return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = nm(r10);
        }), t10;
      }, ny = (e10) => e10.split("/").map(encodeURIComponent).join("/"), nb = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
          if ("object" == typeof e10.error && null !== e10.error) {
            let t10 = e10.error;
            if ("string" == typeof t10.message) return t10.message;
          }
        }
        return JSON.stringify(e10);
      }, nv = async (e10, t10, r10, s10) => {
        if (null !== e10 && "object" == typeof e10 && "json" in e10 && "function" == typeof e10.json) {
          let r11 = parseInt(String(e10.status), 10);
          Number.isFinite(r11) || (r11 = 500), e10.json().then((e11) => {
            let n10 = (null == e11 ? void 0 : e11.statusCode) || (null == e11 ? void 0 : e11.code) || r11 + "";
            t10(new np(nb(e11), r11, n10, s10, null == e11 ? void 0 : e11.code));
          }).catch(() => {
            let n10 = r11 + "";
            t10(new np(e10.statusText || `HTTP ${r11} error`, r11, n10, s10));
          });
        } else t10(new nf(nb(e10), e10, s10));
      };
      async function nw(e10, t10, r10, s10, n10, i10, a3) {
        return new Promise((o2, l2) => {
          e10(r10, ((e11, t11, r11, s11) => {
            let n11 = { method: e11, headers: (null == t11 ? void 0 : t11.headers) || {} };
            if ("GET" === e11 || "HEAD" === e11 || !s11) return nc(nc({}, n11), r11);
            if (((e12) => {
              if ("object" != typeof e12 || null === e12) return false;
              let t12 = Object.getPrototypeOf(e12);
              return (null === t12 || t12 === Object.prototype || null === Object.getPrototypeOf(t12)) && !(Symbol.toStringTag in e12) && !(Symbol.iterator in e12);
            })(s11)) {
              var i11;
              let e12, r12 = (null == t11 ? void 0 : t11.headers) || {};
              for (let [t12, s12] of Object.entries(r12)) "content-type" === t12.toLowerCase() && (e12 = s12);
              n11.headers = ng(r12, "Content-Type", null != (i11 = e12) ? i11 : "application/json"), n11.body = JSON.stringify(s11);
            } else n11.body = s11;
            return (null == t11 ? void 0 : t11.duplex) && (n11.duplex = t11.duplex), nc(nc({}, n11), r11);
          })(t10, s10, n10, i10)).then((e11) => {
            if (!e11.ok) throw e11;
            if (null == s10 ? void 0 : s10.noResolveJson) return e11;
            if ("vectors" === a3) {
              let t11 = e11.headers.get("content-type");
              if ("0" === e11.headers.get("content-length") || 204 === e11.status || !t11 || !t11.includes("application/json")) return {};
            }
            return e11.json();
          }).then((e11) => o2(e11)).catch((e11) => nv(e11, l2, s10, a3));
        });
      }
      function n_(e10 = "storage") {
        return { get: async (t10, r10, s10, n10) => nw(t10, "GET", r10, s10, n10, void 0, e10), post: async (t10, r10, s10, n10, i10) => nw(t10, "POST", r10, n10, i10, s10, e10), put: async (t10, r10, s10, n10, i10) => nw(t10, "PUT", r10, n10, i10, s10, e10), head: async (t10, r10, s10, n10) => nw(t10, "HEAD", r10, nc(nc({}, s10), {}, { noResolveJson: true }), n10, void 0, e10), remove: async (t10, r10, s10, n10, i10) => nw(t10, "DELETE", r10, n10, i10, s10, e10) };
      }
      let { get: nS, post: nk, put: nE, head: nT, remove: nx } = n_("storage"), nR = n_("vectors");
      var nC = class {
        constructor(e10, t10 = {}, r10, s10 = "storage") {
          this.shouldThrowOnError = false, this.url = e10, this.headers = (function(e11) {
            let t11 = {};
            for (let [r11, s11] of Object.entries(e11)) t11[r11.toLowerCase()] = s11;
            return t11;
          })(t10), this.fetch = r10 ? (...e11) => r10(...e11) : (...e11) => fetch(...e11), this.namespace = s10;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = ng(this.headers, e10, t10), this;
        }
        async handleOperation(e10) {
          try {
            return { data: await e10(), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (nd(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      };
      s = Symbol.toStringTag;
      var nO = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[s] = "StreamDownloadBuilder", this.promise = null;
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: (await this.downloadFn()).body, error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (nd(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      n = Symbol.toStringTag;
      var nP = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[n] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new nO(this.downloadFn, this.shouldThrowOnError);
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: await (await this.downloadFn()).blob(), error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (nd(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      let nA = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, nI = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      function nj(e10) {
        let t10 = Object.fromEntries(Object.entries(null != e10 ? e10 : {}).filter(([, e11]) => void 0 !== e11));
        return nc(nc({}, nI), t10);
      }
      var nN = class extends nC {
        constructor(e10, t10 = {}, r10, s10) {
          super(e10, t10, s10, "storage"), this.bucketId = r10;
        }
        async uploadOrUpdate(e10, t10, r10, s10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let i10, a3 = nj(s10), o2 = nc(nc({}, n10.headers), "POST" === e10 && { "x-upsert": String(a3.upsert) }), l2 = a3.metadata;
            if ("u" > typeof Blob && r10 instanceof Blob || "u" > typeof FormData && r10 instanceof FormData ? i10 = n10.prepareUploadFormData(r10, a3) : (i10 = r10, o2["cache-control"] = `max-age=${a3.cacheControl}`, o2["content-type"] = a3.contentType, a3.contentEncoding && (o2["content-encoding"] = a3.contentEncoding), l2 && (o2["x-metadata"] = n10.toBase64(n10.encodeMetadata(l2))), ("u" > typeof ReadableStream && i10 instanceof ReadableStream || i10 && "object" == typeof i10 && "pipe" in i10 && "function" == typeof i10.pipe) && !a3.duplex && (a3.duplex = "half")), null == s10 ? void 0 : s10.headers) for (let [e11, t11] of Object.entries(s10.headers)) o2 = ng(o2, e11, t11);
            let u2 = n10._removeEmptyFolders(t10), c2 = n10._getFinalPath(u2), h2 = await ("PUT" == e10 ? nE : nk)(n10.fetch, `${n10.url}/object/${c2}`, i10, nc({ headers: o2 }, (null == a3 ? void 0 : a3.duplex) ? { duplex: a3.duplex } : {}));
            return { path: u2, id: h2.Id, fullPath: h2.Key };
          });
        }
        async upload(e10, t10, r10) {
          return this.uploadOrUpdate("POST", e10, t10, r10);
        }
        async uploadToSignedUrl(e10, t10, r10, s10) {
          var n10 = this;
          let i10 = n10._removeEmptyFolders(e10), a3 = n10._getFinalPath(i10), o2 = new URL(n10.url + `/object/upload/sign/${a3}`);
          return o2.searchParams.set("token", t10), n10.handleOperation(async () => {
            let e11, t11 = nj(s10), a4 = nc(nc({}, n10.headers), { "x-upsert": String(t11.upsert) }), l2 = t11.metadata;
            if ("u" > typeof Blob && r10 instanceof Blob || "u" > typeof FormData && r10 instanceof FormData ? e11 = n10.prepareUploadFormData(r10, t11) : (e11 = r10, a4["cache-control"] = `max-age=${t11.cacheControl}`, a4["content-type"] = t11.contentType, t11.contentEncoding && (a4["content-encoding"] = t11.contentEncoding), l2 && (a4["x-metadata"] = n10.toBase64(n10.encodeMetadata(l2))), ("u" > typeof ReadableStream && e11 instanceof ReadableStream || e11 && "object" == typeof e11 && "pipe" in e11 && "function" == typeof e11.pipe) && !t11.duplex && (t11.duplex = "half")), null == s10 ? void 0 : s10.headers) for (let [e12, t12] of Object.entries(s10.headers)) a4 = ng(a4, e12, t12);
            return { path: i10, fullPath: (await nE(n10.fetch, o2.toString(), e11, nc({ headers: a4 }, (null == t11 ? void 0 : t11.duplex) ? { duplex: t11.duplex } : {}))).Key };
          });
        }
        async createSignedUploadUrl(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let s10 = r10._getFinalPath(e10), n10 = nc({}, r10.headers);
            (null == t10 ? void 0 : t10.upsert) && (n10["x-upsert"] = "true");
            let i10 = await nk(r10.fetch, `${r10.url}/object/upload/sign/${s10}`, {}, { headers: n10 }), a3 = new URL(r10.url + i10.url), o2 = a3.searchParams.get("token");
            if (!o2) throw new nh("No token returned by API");
            return { signedUrl: a3.toString(), path: e10, token: o2 };
          });
        }
        async update(e10, t10, r10) {
          return this.uploadOrUpdate("PUT", e10, t10, r10);
        }
        async move(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => await nk(s10.fetch, `${s10.url}/object/move`, { bucketId: s10.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket, sourceVersionId: null == r10 ? void 0 : r10.sourceVersionId }, { headers: s10.headers }));
        }
        async copy(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => ({ path: (await nk(s10.fetch, `${s10.url}/object/copy`, { bucketId: s10.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket, sourceVersionId: null == r10 ? void 0 : r10.sourceVersionId, copyMetadata: "boolean" == typeof (null == r10 ? void 0 : r10.copyMetadata) ? r10.copyMetadata : void 0, metadata: (null == r10 ? void 0 : r10.copyMetadata) === false ? r10.metadata : void 0 }, { headers: s10.headers })).Key }));
        }
        async createSignedUrl(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let n10 = s10._getFinalPath(e10), i10 = "object" == typeof (null == r10 ? void 0 : r10.transform) && null !== r10.transform && Object.keys(r10.transform).length > 0, a3 = await nk(s10.fetch, `${s10.url}/object/sign/${n10}`, nc(nc({ expiresIn: t10 }, i10 ? { transform: r10.transform } : {}), (null == r10 ? void 0 : r10.versionId) != null ? { versionId: r10.versionId } : {}), { headers: s10.headers }), o2 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && o2.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && o2.set("cacheNonce", String(r10.cacheNonce));
            let l2 = o2.toString();
            return { signedUrl: encodeURI(`${s10.url}${a3.signedURL}${l2 ? `&${l2}` : ""}`) };
          });
        }
        async createSignedUrls(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let n10 = await nk(s10.fetch, `${s10.url}/object/sign/${s10.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: s10.headers }), i10 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && i10.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && i10.set("cacheNonce", String(r10.cacheNonce));
            let a3 = i10.toString();
            return n10.map((e11) => nc(nc({}, e11), {}, { signedUrl: e11.signedURL ? encodeURI(`${s10.url}${e11.signedURL}${a3 ? `&${a3}` : ""}`) : null }));
          });
        }
        download(e10, t10, r10) {
          let s10 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image/authenticated" : "object", n10 = new URLSearchParams();
          (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(n10, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && n10.set("cacheNonce", String(t10.cacheNonce)), (null == t10 ? void 0 : t10.versionId) != null && n10.set("versionId", String(t10.versionId));
          let i10 = n10.toString(), a3 = this._getFinalPath(e10);
          return new nP(() => nS(this.fetch, `${this.url}/${s10}/${a3}${i10 ? `?${i10}` : ""}`, { headers: this.headers, noResolveJson: true }, r10), this.shouldThrowOnError);
        }
        async info(e10, t10) {
          var r10 = this;
          let s10 = r10._getFinalPath(e10), n10 = new URLSearchParams();
          (null == t10 ? void 0 : t10.versionId) != null && n10.set("versionId", String(t10.versionId));
          let i10 = n10.toString();
          return r10.handleOperation(async () => nm(await nS(r10.fetch, `${r10.url}/object/info/${s10}${i10 ? `?${i10}` : ""}`, { headers: r10.headers })));
        }
        async exists(e10) {
          let { error: t10 } = await this.info(e10);
          if (!t10) return { data: true, error: null };
          if (t10 instanceof np && ("NoSuchKey" === t10.code || 404 === t10.status && void 0 === t10.code)) return { data: false, error: t10 };
          throw t10;
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), s10 = new URLSearchParams();
          (null == t10 ? void 0 : t10.download) && s10.set("download", true === t10.download ? "" : t10.download), (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(s10, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && s10.set("cacheNonce", String(t10.cacheNonce)), (null == t10 ? void 0 : t10.versionId) != null && s10.set("versionId", String(t10.versionId));
          let n10 = s10.toString(), i10 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image" : "object";
          return { data: { publicUrl: encodeURI(`${this.url}/${i10}/public/${r10}`) + (n10 ? `?${n10}` : "") } };
        }
        async remove(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nx(t10.fetch, `${t10.url}/object/${t10.bucketId}`, { prefixes: e10 }, { headers: t10.headers }));
        }
        async purgeCache(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let n10 = ny(s10._getFinalPath(e10)), i10 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && i10.set("transformations", "true");
            let a3 = i10.toString();
            return await nx(s10.fetch, `${s10.url}/cdn/${n10}${a3 ? `?${a3}` : ""}`, {}, { headers: s10.headers }, r10);
          });
        }
        async list(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let n10 = (null == t10 ? void 0 : t10.sortBy) ? nc(nc({}, nA.sortBy), t10.sortBy) : nA.sortBy, i10 = nc(nc(nc({}, nA), t10), {}, { sortBy: n10, prefix: e10 || "" });
            return await nk(s10.fetch, `${s10.url}/object/list/${s10.bucketId}`, i10, { headers: s10.headers }, r10);
          });
        }
        async listV2(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let s10 = nc({}, e10);
            return await nk(r10.fetch, `${r10.url}/object/list-v2/${r10.bucketId}`, s10, { headers: r10.headers }, t10);
          });
        }
        prepareUploadFormData(e10, t10) {
          let r10 = new FormData(), s10 = [];
          for (let [n10, i10] of (e10 instanceof FormData ? e10.forEach((e11, t11) => {
            "string" == typeof e11 ? r10.append(t11, e11) : s10.push([t11, e11]);
          }) : s10.push(["", e10]), r10.has("cacheControl") || r10.append("cacheControl", t10.cacheControl), t10.metadata && !r10.has("metadata") && r10.append("metadata", this.encodeMetadata(t10.metadata)), t10.contentEncoding && !r10.has("contentEncoding") && r10.append("contentEncoding", t10.contentEncoding), s10)) r10.append(n10, i10);
          return r10;
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== tN.Buffer ? tN.Buffer.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        applyTransformOptsToQuery(e10, t10) {
          return t10.width && e10.set("width", t10.width.toString()), t10.height && e10.set("height", t10.height.toString()), t10.resize && e10.set("resize", t10.resize), t10.format && e10.set("format", t10.format), t10.quality && e10.set("quality", t10.quality.toString()), e10;
        }
      };
      let n$ = { "X-Client-Info": "storage-js/2.119.0" };
      var nL = class extends nC {
        constructor(e10, t10 = {}, r10, s10) {
          let n10 = new URL(e10);
          (null == s10 ? void 0 : s10.useNewHostname) && /supabase\.(co|in|red)$/.test(n10.hostname) && !n10.hostname.includes("storage.supabase.") && (n10.hostname = n10.hostname.replace("supabase.", "storage.supabase.")), super(n10.href.replace(/\/$/, ""), nc(nc({}, n$), t10), r10, "storage");
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = t10.listBucketOptionsToQueryString(e10);
            return await nS(t10.fetch, `${t10.url}/bucket${r10}`, { headers: t10.headers });
          });
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nS(t10.fetch, `${t10.url}/bucket/${e10}`, { headers: t10.headers }));
        }
        async createBucket(e10, t10 = { public: false }) {
          var r10 = this;
          return r10.handleOperation(async () => await nk(r10.fetch, `${r10.url}/bucket`, { id: e10, name: e10, type: t10.type, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes, versioning_status: t10.versioningStatus }, { headers: r10.headers }));
        }
        async updateBucket(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await nE(r10.fetch, `${r10.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes, versioning_status: t10.versioningStatus }, { headers: r10.headers }));
        }
        async emptyBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nk(t10.fetch, `${t10.url}/bucket/${e10}/empty`, {}, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nx(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        async getBucketLifecycle(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nS(t10.fetch, t10.bucketLifecycleUrl(e10), { headers: t10.headers }));
        }
        async updateBucketLifecycle(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await nE(r10.fetch, r10.bucketLifecycleUrl(e10), t10, { headers: r10.headers }));
        }
        async deleteBucketLifecycle(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nx(t10.fetch, t10.bucketLifecycleUrl(e10), {}, { headers: t10.headers }));
        }
        async purgeBucketCache(e10, t10, r10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let n10 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && n10.set("transformations", "true");
            let i10 = n10.toString();
            return await nx(s10.fetch, `${s10.url}/cdn/${ny(e10)}${i10 ? `?${i10}` : ""}`, {}, { headers: s10.headers }, r10);
          });
        }
        bucketLifecycleUrl(e10) {
          return `${this.url}/bucket/${ny(e10)}/lifecycle`;
        }
        listBucketOptionsToQueryString(e10) {
          let t10 = {};
          return e10 && ("limit" in e10 && (t10.limit = String(e10.limit)), "offset" in e10 && (t10.offset = String(e10.offset)), e10.search && (t10.search = e10.search), e10.sortColumn && (t10.sortColumn = e10.sortColumn), e10.sortOrder && (t10.sortOrder = e10.sortOrder)), Object.keys(t10).length > 0 ? "?" + new URLSearchParams(t10).toString() : "";
        }
      }, nD = class extends nC {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), nc(nc({}, n$), t10), r10, "storage");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nk(t10.fetch, `${t10.url}/bucket`, { name: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = new URLSearchParams();
            (null == e10 ? void 0 : e10.limit) !== void 0 && r10.set("limit", e10.limit.toString()), (null == e10 ? void 0 : e10.offset) !== void 0 && r10.set("offset", e10.offset.toString()), (null == e10 ? void 0 : e10.sortColumn) && r10.set("sortColumn", e10.sortColumn), (null == e10 ? void 0 : e10.sortOrder) && r10.set("sortOrder", e10.sortOrder), (null == e10 ? void 0 : e10.search) && r10.set("search", e10.search);
            let s10 = r10.toString(), n10 = s10 ? `${t10.url}/bucket?${s10}` : `${t10.url}/bucket`;
            return await nS(t10.fetch, n10, { headers: t10.headers });
          });
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nx(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        from(e10) {
          var t10 = this;
          if (!(!(!e10 || "string" != typeof e10 || 0 === e10.length || e10.length > 100 || e10.trim() !== e10 || e10.includes("/") || e10.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e10))) throw new nh("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let r10 = new no({ baseUrl: this.url, catalogName: e10, auth: { type: "custom", getHeaders: async () => t10.headers }, fetch: this.fetch }), s10 = this.shouldThrowOnError;
          return new Proxy(r10, { get(e11, t11) {
            let r11 = e11[t11];
            return "function" != typeof r11 ? r11 : async (...t12) => {
              try {
                return { data: await r11.apply(e11, t12), error: null };
              } catch (e12) {
                if (s10) throw e12;
                return { data: null, error: e12 };
              }
            };
          } });
        }
      }, nU = class extends nC {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), nc(nc({}, n$), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createIndex(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/CreateIndex`, e10, { headers: t10.headers }) || {});
        }
        async getIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await nR.post(r10.fetch, `${r10.url}/GetIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }));
        }
        async listIndexes(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/ListIndexes`, e10, { headers: t10.headers }));
        }
        async deleteIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await nR.post(r10.fetch, `${r10.url}/DeleteIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }) || {});
        }
      }, nM = class extends nC {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), nc(nc({}, n$), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async putVectors(e10) {
          var t10 = this;
          if (e10.vectors.length < 1 || e10.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/PutVectors`, e10, { headers: t10.headers }) || {});
        }
        async getVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/GetVectors`, e10, { headers: t10.headers }));
        }
        async listVectors(e10) {
          var t10 = this;
          if (void 0 !== e10.segmentCount) {
            if (e10.segmentCount < 1 || e10.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
            if (void 0 !== e10.segmentIndex && (e10.segmentIndex < 0 || e10.segmentIndex >= e10.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e10.segmentCount - 1}`);
          }
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/ListVectors`, e10, { headers: t10.headers }));
        }
        async queryVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/QueryVectors`, e10, { headers: t10.headers }));
        }
        async deleteVectors(e10) {
          var t10 = this;
          if (e10.keys.length < 1 || e10.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/DeleteVectors`, e10, { headers: t10.headers }) || {});
        }
      }, nq = class extends nC {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), nc(nc({}, n$), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/CreateVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/GetVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10 = {}) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/ListVectorBuckets`, e10, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await nR.post(t10.fetch, `${t10.url}/DeleteVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
      }, nB = class extends nq {
        constructor(e10, t10 = {}) {
          super(e10, t10.headers || {}, t10.fetch);
        }
        from(e10) {
          return new nF(this.url, this.headers, e10, this.fetch);
        }
        async createBucket(e10) {
          return super.createBucket.call(this, e10);
        }
        async getBucket(e10) {
          return super.getBucket.call(this, e10);
        }
        async listBuckets(e10 = {}) {
          return super.listBuckets.call(this, e10);
        }
        async deleteBucket(e10) {
          return super.deleteBucket.call(this, e10);
        }
      }, nF = class extends nU {
        constructor(e10, t10, r10, s10) {
          super(e10, t10, s10), this.vectorBucketName = r10;
        }
        async createIndex(e10) {
          return super.createIndex.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async listIndexes(e10 = {}) {
          return super.listIndexes.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async getIndex(e10) {
          return super.getIndex.call(this, this.vectorBucketName, e10);
        }
        async deleteIndex(e10) {
          return super.deleteIndex.call(this, this.vectorBucketName, e10);
        }
        index(e10) {
          return new nH(this.url, this.headers, this.vectorBucketName, e10, this.fetch);
        }
      }, nH = class extends nM {
        constructor(e10, t10, r10, s10, n10) {
          super(e10, t10, n10), this.vectorBucketName = r10, this.indexName = s10;
        }
        async putVectors(e10) {
          return super.putVectors.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async getVectors(e10) {
          return super.getVectors.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async listVectors(e10 = {}) {
          return super.listVectors.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async queryVectors(e10) {
          return super.queryVectors.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async deleteVectors(e10) {
          return super.deleteVectors.call(this, nc(nc({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
      }, nG = class extends nL {
        constructor(e10, t10 = {}, r10, s10) {
          super(e10, t10, r10, s10);
        }
        from(e10) {
          return new nN(this.url, this.headers, e10, this.fetch);
        }
        get vectors() {
          return new nB(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new nD(this.url + "/iceberg", this.headers, this.fetch);
        }
      };
      function nz(e10, t10) {
        var r10 = {};
        for (var s10 in e10) Object.prototype.hasOwnProperty.call(e10, s10) && 0 > t10.indexOf(s10) && (r10[s10] = e10[s10]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols) for (var n10 = 0, s10 = Object.getOwnPropertySymbols(e10); n10 < s10.length; n10++) 0 > t10.indexOf(s10[n10]) && Object.prototype.propertyIsEnumerable.call(e10, s10[n10]) && (r10[s10[n10]] = e10[s10[n10]]);
        return r10;
      }
      "function" == typeof SuppressedError && SuppressedError;
      let nV = "2.119.0", nW = { "X-Client-Info": `gotrue-js/${nV}` }, nK = "X-Supabase-Api-Version", nJ = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, nX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, nY = "sb_flow_id";
      class nQ extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, code: this.code };
        }
      }
      function nZ(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class n0 extends nQ {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      function n1(e10) {
        return nZ(e10) && "AuthApiError" === e10.name;
      }
      class n2 extends nQ {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class n4 extends nQ {
        constructor(e10, t10, r10, s10) {
          super(e10, r10, s10), this.name = t10, this.status = r10;
        }
      }
      class n3 extends n4 {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      function n5(e10) {
        return nZ(e10) && "AuthSessionMissingError" === e10.name;
      }
      class n6 extends n4 {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class n8 extends n4 {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class n9 extends n4 {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
        }
      }
      class n7 extends n4 {
        constructor() {
          super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
        }
      }
      class ie extends n4 {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function it(e10) {
        return nZ(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class ir extends n4 {
        constructor(e10 = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
          super(e10, "AuthRefreshDiscardedError", 409, void 0);
        }
      }
      function is(e10) {
        return nZ(e10) && "AuthRefreshDiscardedError" === e10.name;
      }
      class ii extends n4 {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
        }
      }
      class ia extends n4 {
        constructor(e10) {
          super(e10, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let io = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), il = " 	\n\r=".split(""), iu = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < il.length; t10 += 1) e10[il[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < io.length; t10 += 1) e10[io[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function ic(e10, t10, r10) {
        if (null !== e10) for (t10.queue = t10.queue << 8 | e10, t10.queuedBits += 8; t10.queuedBits >= 6; ) r10(io[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
        else if (t10.queuedBits > 0) for (t10.queue = t10.queue << 6 - t10.queuedBits, t10.queuedBits = 6; t10.queuedBits >= 6; ) r10(io[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
      }
      function ih(e10, t10, r10) {
        let s10 = iu[e10];
        if (s10 > -1) for (t10.queue = t10.queue << 6 | s10, t10.queuedBits += 6; t10.queuedBits >= 8; ) r10(t10.queue >> t10.queuedBits - 8 & 255), t10.queuedBits -= 8;
        else if (-2 === s10) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e10)}"`);
      }
      function id(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, s10 = { utf8seq: 0, codepoint: 0 }, n10 = { queue: 0, queuedBits: 0 }, i10 = (e11) => {
          !(function(e12, t11, r11) {
            if (0 === t11.utf8seq) {
              if (e12 <= 127) return r11(e12);
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                t11.utf8seq = r12;
                break;
              }
              if (2 === t11.utf8seq) t11.codepoint = 31 & e12;
              else if (3 === t11.utf8seq) t11.codepoint = 15 & e12;
              else if (4 === t11.utf8seq) t11.codepoint = 7 & e12;
              else throw Error("Invalid UTF-8 sequence");
              t11.utf8seq -= 1;
            } else if (t11.utf8seq > 0) {
              if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
              t11.codepoint = t11.codepoint << 6 | 63 & e12, t11.utf8seq -= 1, 0 === t11.utf8seq && r11(t11.codepoint);
            }
          })(e11, s10, r10);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) ih(e10.charCodeAt(t11), n10, i10);
        return t10.join("");
      }
      function ip(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s10 = (e11) => {
          t10.push(e11);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) ih(e10.charCodeAt(t11), r10, s10);
        return new Uint8Array(t10);
      }
      function ig(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s10 = (e11) => {
          t10.push(e11);
        };
        return e10.forEach((e11) => ic(e11, r10, s10)), ic(null, r10, s10), t10.join("");
      }
      function im(e10) {
        return Math.round(Date.now() / 1e3) + e10;
      }
      let iy = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), ib = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, iv = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10) return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return null;
        }
      }, iw = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class i_ {
        constructor() {
          this.promise = new i_.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function iS(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length) throw new ia("Invalid JWT structure");
        for (let e11 = 0; e11 < t10.length; e11++) if (!nX.test(t10[e11])) throw new ia("JWT not in base64url format");
        return { header: JSON.parse(id(t10[0])), payload: JSON.parse(id(t10[1])), signature: ip(t10[2]), raw: { header: t10[0], payload: t10[1] } };
      }
      async function ik(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function iE(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function iT(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function ix(e10) {
        return "u" > typeof crypto && void 0 !== crypto.subtle && "u" > typeof TextEncoder ? btoa(await iT(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      i_.promiseConstructor = Promise;
      let iR = /^[a-zA-Z0-9_-]{8,64}$/;
      function iC(e10) {
        return "string" == typeof e10 && iR.test(e10) ? e10 : null;
      }
      let iO = (e10, t10) => `${e10}-flow-${t10}-code-verifier`, iP = (e10) => `${e10}-flows-code-verifier`;
      async function iA(e10, t10) {
        let r10 = await iv(e10, iP(t10));
        return Array.isArray(r10) ? r10.filter((e11) => null !== iC(e11)) : [];
      }
      async function iI(e10, t10, r10, s10, n10) {
        await ib(e10, iO(t10, r10), s10);
        let i10 = (await iA(e10, t10)).filter((e11) => e11 !== r10);
        for (i10.push(r10); i10.length > 5; ) {
          let r11 = i10.shift();
          await iw(e10, iO(t10, r11)), null == n10 || n10(r11);
        }
        await ib(e10, iP(t10), i10), await ib(e10, `${t10}-code-verifier`, s10);
      }
      async function ij(e10, t10, r10) {
        if (r10) {
          let s11 = await iv(e10, iO(t10, r10));
          return { verifier: "string" == typeof s11 ? s11 : null, flowId: r10 };
        }
        let s10 = await iv(e10, `${t10}-code-verifier`);
        return { verifier: "string" == typeof s10 ? s10 : null, flowId: null };
      }
      async function iN(e10, t10, r10) {
        let s10 = `${t10}-code-verifier`;
        if (!r10) return void await iw(e10, s10);
        let n10 = iO(t10, r10), i10 = await iv(e10, n10);
        await iw(e10, n10);
        let a3 = await iA(e10, t10), o2 = a3.filter((e11) => e11 !== r10);
        o2.length !== a3.length && (o2.length > 0 ? await ib(e10, iP(t10), o2) : await iw(e10, iP(t10))), null != i10 && i10 === await iv(e10, s10) && await iw(e10, s10);
      }
      async function i$(e10, t10) {
        for (let r10 of await iA(e10, t10)) await iw(e10, iO(t10, r10));
        await iw(e10, iP(t10)), await iw(e10, `${t10}-code-verifier`);
      }
      async function iL(e10, t10, r10 = false, s10) {
        let n10 = (function() {
          let e11 = new Uint32Array(56);
          if ("u" < typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let s11 = 0; s11 < 56; s11++) r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, iE).join("");
        })(), i10 = n10;
        r10 && (i10 += "/recovery");
        let a3 = (function() {
          if ("u" > typeof crypto && "function" == typeof crypto.getRandomValues) {
            let e12 = new Uint8Array(16);
            return crypto.getRandomValues(e12), Array.from(e12, iE).join("");
          }
          let e11 = "";
          for (let t11 = 0; t11 < 32; t11++) e11 += Math.floor(16 * Math.random()).toString(16);
          return e11;
        })();
        await iI(e10, t10, a3, i10, s10);
        let o2 = await ix(n10), l2 = n10 === o2 ? "plain" : "s256";
        return [o2, l2, a3];
      }
      let iD = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, iU = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      function iM(e10) {
        if (!iU.test(e10)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function iq(e10) {
        if (!e10.recoveryCodes) throw Error("@supabase/auth-js: the MFA recovery codes API is experimental and disabled by default. Enable it by passing `auth: { experimental: { recoveryCodes: true } }` to createClient (or to the GoTrueClient constructor).");
      }
      function iB() {
        return new Proxy({}, { get: (e10, t10) => {
          if ("__isUserNotAvailableProxy" === t10) return true;
          if ("symbol" == typeof t10) {
            let e11 = t10.toString();
            if ("Symbol(Symbol.toPrimitive)" === e11 || "Symbol(Symbol.toStringTag)" === e11 || "Symbol(util.inspect.custom)" === e11) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function iF(e10) {
        return JSON.parse(JSON.stringify(e10));
      }
      let iH = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
        }
        return JSON.stringify(e10);
      }, iG = [500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530];
      async function iz(e10) {
        var t10;
        let r10, s10;
        if (!("object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json)) throw new ie(iH(e10), 0);
        try {
          r10 = await e10.json();
        } catch (t11) {
          if (iG.includes(e10.status)) throw new ie(e10.statusText || `HTTP ${e10.status}`, e10.status);
          throw new n2(iH(t11), t11);
        }
        if (iG.includes(e10.status)) throw new ie(iH(r10), e10.status);
        let n10 = (function(e11) {
          let t11 = e11.headers.get(nK);
          if (!t11 || !t11.match(iD)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        })(e10);
        if (n10 && n10.getTime() >= nJ["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? s10 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (s10 = r10.error_code), s10) {
          if ("weak_password" === s10) throw new ii(iH(r10), e10.status, (null == (t10 = r10.weak_password) ? void 0 : t10.reasons) || []);
          else if ("session_not_found" === s10) throw new n3();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true)) throw new ii(iH(r10), e10.status, r10.weak_password.reasons);
        throw new n0(iH(r10), e10.status || 500, s10);
      }
      async function iV(e10, t10, r10, s10) {
        var n10;
        let i10 = Object.assign({}, null == s10 ? void 0 : s10.headers);
        i10[nK] || (i10[nK] = nJ["2024-01-01"].name), (null == s10 ? void 0 : s10.jwt) && (i10.Authorization = `Bearer ${s10.jwt}`);
        let a3 = null != (n10 = null == s10 ? void 0 : s10.query) ? n10 : {};
        (null == s10 ? void 0 : s10.redirectTo) && (a3.redirect_to = s10.redirectTo);
        let o2 = Object.keys(a3).length ? "?" + new URLSearchParams(a3).toString() : "", l2 = await iW(e10, t10, r10 + o2, { headers: i10, noResolveJson: null == s10 ? void 0 : s10.noResolveJson }, {}, null == s10 ? void 0 : s10.body);
        return (null == s10 ? void 0 : s10.xform) ? null == s10 ? void 0 : s10.xform(l2) : { data: Object.assign({}, l2), error: null };
      }
      async function iW(e10, t10, r10, s10, n10, i10) {
        let a3, o2, l2 = (o2 = { method: t10, headers: (null == s10 ? void 0 : s10.headers) || {} }, "GET" === t10 ? o2 : (o2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == s10 ? void 0 : s10.headers), o2.body = JSON.stringify(i10), Object.assign(Object.assign({}, o2), n10)));
        try {
          a3 = await e10(r10, Object.assign({}, l2));
        } catch (e11) {
          throw new ie(iH(e11), 0);
        }
        if (a3.ok || await iz(a3), null == s10 ? void 0 : s10.noResolveJson) return a3;
        try {
          return await a3.json();
        } catch (e11) {
          await iz(e11);
        }
      }
      function iK(e10) {
        var t10, r10;
        let s10 = null;
        return (r10 = e10).access_token && r10.refresh_token && r10.expires_in && (s10 = Object.assign({}, e10), e10.expires_at || (s10.expires_at = im(e10.expires_in))), { data: { session: s10, user: null != (t10 = e10.user) ? t10 : "string" == typeof (null == e10 ? void 0 : e10.id) ? e10 : null }, error: null };
      }
      function iJ(e10) {
        let t10 = iK(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function iX(e10) {
        var t10;
        return { data: { user: null != (t10 = e10.user) ? t10 : e10 }, error: null };
      }
      function iY(e10) {
        return { data: e10, error: null };
      }
      function iQ(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: s10, redirect_to: n10, verification_type: i10 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: s10, redirect_to: n10, verification_type: i10 }, user: Object.assign({}, nz(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function iZ(e10) {
        return e10;
      }
      let i0 = ["global", "local", "others"];
      class i1 {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10, experimental: s10 }) {
          this.url = e10, this.headers = t10, this.fetch = iy(r10), this.experimental = null != s10 ? s10 : {}, this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) }, this.customProviders = { listProviders: this._listCustomProviders.bind(this), createProvider: this._createCustomProvider.bind(this), getProvider: this._getCustomProvider.bind(this), updateProvider: this._updateCustomProvider.bind(this), deleteProvider: this._deleteCustomProvider.bind(this) }, this.passkey = { listPasskeys: this._adminListPasskeys.bind(this), deletePasskey: this._adminDeletePasskey.bind(this) };
        }
        async signOut(e10, t10 = i0[0]) {
          if (0 > i0.indexOf(t10)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${i0.join(", ")}`);
          try {
            return await iV(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await iV(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: iX });
          } catch (e11) {
            if (nZ(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = nz(e10, ["options"]), s10 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (s10.new_email = null == r10 ? void 0 : r10.newEmail, delete s10.newEmail), await iV(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: s10, headers: this.headers, xform: iQ, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (nZ(e11)) return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await iV(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: iX });
          } catch (e11) {
            if (nZ(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, s10, n10, i10, a3, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await iV(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.page) ? void 0 : t10.toString()) ? r10 : "", per_page: null != (n10 = null == (s10 = null == e10 ? void 0 : e10.perPage) ? void 0 : s10.toString()) ? n10 : "" }, xform: iZ });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null != (i10 = u2.headers.get("x-total-count")) ? i10 : 0, d2 = null != (o2 = null == (a3 = u2.headers.get("link")) ? void 0 : a3.split(",")) ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          iM(e10);
          try {
            return await iV(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: iX });
          } catch (e11) {
            if (nZ(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          iM(e10);
          try {
            return await iV(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: iX });
          } catch (e11) {
            if (nZ(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          iM(e10);
          try {
            let { data: r10, error: s10 } = await this.getUserById(e10);
            if (s10) return { data: { user: null }, error: s10 };
            return await iV(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, noResolveJson: true }), { data: r10, error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          iM(e10.userId);
          try {
            let { data: t10, error: r10 } = await iV(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          iM(e10.userId), iM(e10.id);
          try {
            return { data: await iV(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listOAuthClients(e10) {
          var t10, r10, s10, n10, i10, a3, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await iV(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.page) ? void 0 : t10.toString()) ? r10 : "", per_page: null != (n10 = null == (s10 = null == e10 ? void 0 : e10.perPage) ? void 0 : s10.toString()) ? n10 : "" }, xform: iZ });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null != (i10 = u2.headers.get("x-total-count")) ? i10 : 0, d2 = null != (o2 = null == (a3 = u2.headers.get("link")) ? void 0 : a3.split(",")) ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: { clients: [] }, error: e11 };
            throw e11;
          }
        }
        async _createOAuthClient(e10) {
          try {
            return await iV(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getOAuthClient(e10) {
          try {
            return await iV(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateOAuthClient(e10, t10) {
          try {
            return await iV(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteOAuthClient(e10) {
          try {
            return await iV(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _regenerateOAuthClientSecret(e10) {
          try {
            return await iV(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e10}/regenerate_secret`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listCustomProviders(e10) {
          try {
            let t10 = {};
            return (null == e10 ? void 0 : e10.type) && (t10.type = e10.type), await iV(this.fetch, "GET", `${this.url}/admin/custom-providers`, { headers: this.headers, query: t10, xform: (e11) => {
              var t11;
              return { data: { providers: null != (t11 = null == e11 ? void 0 : e11.providers) ? t11 : [] }, error: null };
            } });
          } catch (e11) {
            if (nZ(e11)) return { data: { providers: [] }, error: e11 };
            throw e11;
          }
        }
        async _createCustomProvider(e10) {
          try {
            return await iV(this.fetch, "POST", `${this.url}/admin/custom-providers`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getCustomProvider(e10) {
          try {
            return await iV(this.fetch, "GET", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateCustomProvider(e10, t10) {
          try {
            return await iV(this.fetch, "PUT", `${this.url}/admin/custom-providers/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteCustomProvider(e10) {
          try {
            return await iV(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminListPasskeys(e10) {
          iM(e10.userId);
          try {
            return await iV(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/passkeys`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminDeletePasskey(e10) {
          iM(e10.userId), iM(e10.passkeyId);
          try {
            return await iV(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/passkeys/${e10.passkeyId}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      function i2(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      class i4 extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      function i3(e10) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e10)) throw Error(`@supabase/auth-js: Address "${e10}" is invalid.`);
        return e10.toLowerCase();
      }
      class i5 extends Error {
        constructor({ message: e10, code: t10, cause: r10, name: s10 }) {
          var n10;
          super(e10, { cause: r10 }), this.__isWebAuthnError = true, this.name = null != (n10 = null != s10 ? s10 : r10 instanceof Error ? r10.name : void 0) ? n10 : "Unknown Error", this.code = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, code: this.code };
        }
      }
      class i6 extends i5 {
        constructor(e10, t10) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e10 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
        }
      }
      let i8 = new class {
        createNewAbortSignal() {
          if (this.controller) {
            let e11 = Error("Cancelling existing WebAuthn API call for new one");
            e11.name = "AbortError", this.controller.abort(e11);
          }
          let e10 = new AbortController();
          return this.controller = e10, e10.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e10 = Error("Manually cancelling existing WebAuthn API call");
            e10.name = "AbortError", this.controller.abort(e10), this.controller = void 0;
          }
        }
      }();
      function i9(e10) {
        if (!e10) throw Error("Credential creation options are required");
        if ("u" > typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e10);
        let { challenge: t10, user: r10, excludeCredentials: s10 } = e10, n10 = nz(e10, ["challenge", "user", "excludeCredentials"]), i10 = ip(t10).buffer, a3 = Object.assign(Object.assign({}, r10), { id: ip(r10.id).buffer }), o2 = Object.assign(Object.assign({}, n10), { challenge: i10, user: a3 });
        if (s10 && s10.length > 0) {
          o2.excludeCredentials = Array(s10.length);
          for (let e11 = 0; e11 < s10.length; e11++) {
            let t11 = s10[e11];
            o2.excludeCredentials[e11] = Object.assign(Object.assign({}, t11), { id: ip(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return o2;
      }
      function i7(e10) {
        if (!e10) throw Error("Credential request options are required");
        if ("u" > typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e10);
        let { challenge: t10, allowCredentials: r10 } = e10, s10 = nz(e10, ["challenge", "allowCredentials"]), n10 = ip(t10).buffer, i10 = Object.assign(Object.assign({}, s10), { challenge: n10 });
        if (r10 && r10.length > 0) {
          i10.allowCredentials = Array(r10.length);
          for (let e11 = 0; e11 < r10.length; e11++) {
            let t11 = r10[e11];
            i10.allowCredentials[e11] = Object.assign(Object.assign({}, t11), { id: ip(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return i10;
      }
      function ae(e10) {
        var t10;
        return "toJSON" in e10 && "function" == typeof e10.toJSON ? e10.toJSON() : { id: e10.id, rawId: e10.id, response: { attestationObject: ig(new Uint8Array(e10.response.attestationObject)), clientDataJSON: ig(new Uint8Array(e10.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: e10.getClientExtensionResults(), authenticatorAttachment: null != (t10 = e10.authenticatorAttachment) ? t10 : void 0 };
      }
      function at(e10) {
        var t10;
        if ("toJSON" in e10 && "function" == typeof e10.toJSON) return e10.toJSON();
        let r10 = e10.getClientExtensionResults(), s10 = e10.response;
        return { id: e10.id, rawId: e10.id, response: { authenticatorData: ig(new Uint8Array(s10.authenticatorData)), clientDataJSON: ig(new Uint8Array(s10.clientDataJSON)), signature: ig(new Uint8Array(s10.signature)), userHandle: s10.userHandle ? ig(new Uint8Array(s10.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r10, authenticatorAttachment: null != (t10 = e10.authenticatorAttachment) ? t10 : void 0 };
      }
      function ar(e10) {
        return "localhost" === e10 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e10);
      }
      async function as(e10) {
        try {
          let t10 = await navigator.credentials.create(e10);
          if (!t10) return { data: null, error: new i6("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new i6("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: (function({ error: e11, options: t11 }) {
            var r10, s10, n10;
            let { publicKey: i10 } = t11;
            if (!i10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new i5({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("ConstraintError" === e11.name) {
              if ((null == (r10 = i10.authenticatorSelection) ? void 0 : r10.requireResidentKey) === true) return new i5({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e11 });
              else if ("conditional" === t11.mediation && (null == (s10 = i10.authenticatorSelection) ? void 0 : s10.userVerification) === "required") return new i5({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e11 });
              else if ((null == (n10 = i10.authenticatorSelection) ? void 0 : n10.userVerification) === "required") return new i5({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e11 });
            } else if ("InvalidStateError" === e11.name) return new i5({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e11 });
            else if ("NotAllowedError" === e11.name) return new i5({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("NotSupportedError" === e11.name) return new i5(0 === i10.pubKeyCredParams.filter((e12) => "public-key" === e12.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e11 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!ar(t12)) return new i5({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (i10.rp.id !== t12) return new i5({ message: `The RP ID "${i10.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("TypeError" === e11.name) {
              if (i10.user.id.byteLength < 1 || i10.user.id.byteLength > 64) return new i5({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e11 });
            } else if ("UnknownError" === e11.name) return new i5({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new i5({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          })({ error: t10, options: e10 }) };
        }
      }
      async function an(e10) {
        try {
          let t10 = await navigator.credentials.get(e10);
          if (!t10) return { data: null, error: new i6("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new i6("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: (function({ error: e11, options: t11 }) {
            let { publicKey: r10 } = t11;
            if (!r10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new i5({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("NotAllowedError" === e11.name) return new i5({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!ar(t12)) return new i5({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (r10.rpId !== t12) return new i5({ message: `The RP ID "${r10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("UnknownError" === e11.name) return new i5({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new i5({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          })({ error: t10, options: e10 }) };
        }
      }
      let ai = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, aa = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function ao(...e10) {
        let t10 = (e11) => null !== e11 && "object" == typeof e11 && !Array.isArray(e11), r10 = (e11) => e11 instanceof ArrayBuffer || ArrayBuffer.isView(e11), s10 = {};
        for (let n10 of e10) if (n10) for (let e11 in n10) {
          let i10 = n10[e11];
          if (void 0 !== i10) if (Array.isArray(i10)) s10[e11] = i10;
          else if (r10(i10)) s10[e11] = i10;
          else if (t10(i10)) {
            let r11 = s10[e11];
            t10(r11) ? s10[e11] = ao(r11, i10) : s10[e11] = ao(i10);
          } else s10[e11] = i10;
        }
        return s10;
      }
      class al {
        constructor(e10) {
          this.client = e10, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e10) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e10), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e10, webauthn: t10, friendlyName: r10, signal: s10 }, n10) {
          var i10, a3, o2, l2, u2;
          try {
            let { data: c2, error: h2 } = await this.client.mfa.challenge({ factorId: e10, webauthn: t10 });
            if (!c2) return { data: null, error: h2 };
            let d2 = null != s10 ? s10 : i8.createNewAbortSignal();
            if ("create" === c2.webauthn.type) {
              let { user: e11 } = c2.webauthn.credential_options.publicKey;
              if (!e11.name) if (r10) e11.name = `${e11.id}:${r10}`;
              else {
                let t11 = (await this.client.getUser()).data.user, r11 = (null == (i10 = null == t11 ? void 0 : t11.user_metadata) ? void 0 : i10.name) || (null == t11 ? void 0 : t11.email) || (null == t11 ? void 0 : t11.id) || "User";
                e11.name = `${e11.id}:${r11}`;
              }
              e11.displayName || (e11.displayName = e11.name);
            }
            switch (c2.webauthn.type) {
              case "create": {
                let t11 = (a3 = c2.webauthn.credential_options.publicKey, o2 = null == n10 ? void 0 : n10.create, ao(ai, a3, o2 || {})), { data: r11, error: s11 } = await as({ publicKey: t11, signal: d2 });
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s11 };
              }
              case "request": {
                let t11 = (l2 = c2.webauthn.credential_options.publicKey, u2 = null == n10 ? void 0 : n10.request, ao(aa, l2, u2 || {})), { data: r11, error: s11 } = await an(Object.assign(Object.assign({}, c2.webauthn.credential_options), { publicKey: t11, signal: d2 }));
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s11 };
              }
            }
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            return { data: null, error: new n2("Unexpected error in challenge", e11) };
          }
        }
        async _verify({ challengeId: e10, factorId: t10, webauthn: r10 }) {
          return this.client.mfa.verify({ factorId: t10, challengeId: e10, webauthn: r10 });
        }
        async _authenticate({ factorId: e10, webauthn: { rpId: t10, rpOrigins: r10, signal: s10 } = {} }, n10) {
          if (!t10) return { data: null, error: new nQ("rpId is required for WebAuthn authentication") };
          try {
            1;
            return { data: null, error: new n2("Browser does not support WebAuthn", null) };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            return { data: null, error: new n2("Unexpected error in authenticate", e11) };
          }
        }
        async _register({ friendlyName: e10, webauthn: { rpId: t10, rpOrigins: r10, signal: s10 } = {} }, n10) {
          if (!t10) return { data: null, error: new nQ("rpId is required for WebAuthn registration") };
          try {
            1;
            return { data: null, error: new n2("Browser does not support WebAuthn", null) };
          } catch (e11) {
            if (nZ(e11)) return { data: null, error: e11 };
            return { data: null, error: new n2("Unexpected error in register", e11) };
          }
        }
      }
      if ("object" != typeof globalThis) try {
        Object.defineProperty(Object.prototype, "__magic__", { get: function() {
          return this;
        }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
      } catch (e10) {
        "u" > typeof self && (self.globalThis = self);
      }
      let au = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: nW, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false, lockAcquireTimeout: 5e3, skipAutoInitialize: false, experimental: {} }, ac = {}, ah = false;
      class ad {
        get jwks() {
          var e10, t10;
          return null != (t10 = null == (e10 = ac[this.storageKey]) ? void 0 : e10.jwks) ? t10 : { keys: [] };
        }
        set jwks(e10) {
          ac[this.storageKey] = Object.assign(Object.assign({}, ac[this.storageKey]), { jwks: e10 });
        }
        get jwks_cached_at() {
          var e10, t10;
          return null != (t10 = null == (e10 = ac[this.storageKey]) ? void 0 : e10.cachedAt) ? t10 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e10) {
          ac[this.storageKey] = Object.assign(Object.assign({}, ac[this.storageKey]), { cachedAt: e10 });
        }
        constructor(e10) {
          var t10, r10;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.lastRefreshFailure = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this._pendingInitNotifications = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lock = null, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          let s10 = Object.assign(Object.assign({}, au), e10);
          this.storageKey = s10.storageKey, this.instanceID = null != (t10 = ad.nextInstanceID[this.storageKey]) ? t10 : 0, ad.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!s10.debug, "function" == typeof s10.debug && (this.logger = s10.debug), this.instanceID, this.persistSession = s10.persistSession, this.autoRefreshToken = s10.autoRefreshToken, this.experimental = null != (r10 = s10.experimental) ? r10 : {}, this.admin = new i1({ url: s10.url, headers: s10.headers, fetch: s10.fetch, experimental: this.experimental }), this.url = s10.url, this.headers = s10.headers, this.fetch = iy(s10.fetch), this.detectSessionInUrl = s10.detectSessionInUrl, this.flowType = s10.flowType, this.hasCustomAuthorizationHeader = s10.hasCustomAuthorizationHeader, this.throwOnError = s10.throwOnError, this.lockAcquireTimeout = s10.lockAcquireTimeout, null != s10.lock && (this.lock = s10.lock, ah || (ah = true, console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))), this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new al(this), recoveryCodes: { getStatus: this._getRecoveryCodesStatus.bind(this), generate: this._generateRecoveryCodes.bind(this), verify: this._verifyRecoveryCode.bind(this), regenerate: this._regenerateRecoveryCodes.bind(this), unenroll: this._unenrollRecoveryCodes.bind(this) } }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.passkey = { startRegistration: this._startPasskeyRegistration.bind(this), verifyRegistration: this._verifyPasskeyRegistration.bind(this), startAuthentication: this._startPasskeyAuthentication.bind(this), verifyAuthentication: this._verifyPasskeyAuthentication.bind(this), list: this._listPasskeys.bind(this), update: this._updatePasskey.bind(this), delete: this._deletePasskey.bind(this) }, this.persistSession ? (s10.storage ? this.storage = s10.storage : (this.memoryStorage = {}, this.storage = i2(this.memoryStorage)), s10.userStorage && (this.userStorage = s10.userStorage)) : (this.memoryStorage = {}, this.storage = i2(this.memoryStorage)), s10.skipAutoInitialize || this.initialize().catch((e11) => {
            this._debug("#initialize()", "error", e11);
          });
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e10) {
          if (this.throwOnError && e10 && e10.error) throw e10.error;
          return e10;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${nV}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e10), this;
        }
        async initialize() {
          var e10;
          if (this.initializePromise) return await this.initializePromise;
          this._pendingInitNotifications = [], this.initializePromise = (async () => null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())();
          let t10 = await this.initializePromise, r10 = null != (e10 = this._pendingInitNotifications) ? e10 : [];
          for (let e11 of (this._pendingInitNotifications = null, r10)) await this._notifyAllSubscribers(e11.event, e11.session, e11.broadcast);
          return t10;
        }
        async _initialize() {
          try {
            return await this._recoverAndRefresh(), { error: null };
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ error: e10 });
            return this._returnResult({ error: new n2("Unexpected error during initialization", e10) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, s10;
          try {
            let { data: n10, error: i10 } = await iV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.options) ? void 0 : t10.data) ? r10 : {}, gotrue_meta_security: { captcha_token: null == (s10 = null == e10 ? void 0 : e10.options) ? void 0 : s10.captchaToken } }, xform: iK });
            if (i10 || !n10) return this._returnResult({ data: { user: null, session: null }, error: i10 });
            let a3 = n10.session, o2 = n10.user;
            return n10.session && (await this._saveSession(n10.session), await this._notifyAllSubscribers("SIGNED_IN", a3)), this._returnResult({ data: { user: o2, session: a3 }, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, s10;
          let n10 = null;
          try {
            let i10;
            if ("email" in e10) {
              let { email: r11, password: s11, options: a4 } = e10, o3 = null, l3 = null;
              "pkce" === this.flowType && ([o3, l3, n10] = await this._getCodeChallengeAndMethod()), i10 = await iV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == a4 ? void 0 : a4.emailRedirectTo, n10), body: { email: r11, password: s11, data: null != (t10 = null == a4 ? void 0 : a4.data) ? t10 : {}, gotrue_meta_security: { captcha_token: null == a4 ? void 0 : a4.captchaToken }, code_challenge: o3, code_challenge_method: l3 }, xform: iK });
            } else if ("phone" in e10) {
              let { phone: t11, password: n11, options: a4 } = e10;
              i10 = await iV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: n11, data: null != (r10 = null == a4 ? void 0 : a4.data) ? r10 : {}, channel: null != (s10 = null == a4 ? void 0 : a4.channel) ? s10 : "sms", gotrue_meta_security: { captcha_token: null == a4 ? void 0 : a4.captchaToken } }, xform: iK });
            } else throw new n8("You must provide either an email or phone number and a password");
            let { data: a3, error: o2 } = i10;
            if (o2 || !a3) return await iN(this.storage, this.storageKey, n10), this._returnResult({ data: { user: null, session: null }, error: o2 });
            let l2 = a3.session, u2 = a3.user;
            return a3.session && (await this._saveSession(a3.session), await this._notifyAllSubscribers("SIGNED_IN", l2)), this._returnResult({ data: { user: u2, session: l2 }, error: null });
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, n10), nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: s11, options: n10 } = e10;
              t10 = await iV(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: s11, gotrue_meta_security: { captcha_token: null == n10 ? void 0 : n10.captchaToken } }, xform: iJ });
            } else if ("phone" in e10) {
              let { phone: r11, password: s11, options: n10 } = e10;
              t10 = await iV(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: s11, gotrue_meta_security: { captcha_token: null == n10 ? void 0 : n10.captchaToken } }, xform: iJ });
            } else throw new n8("You must provide either an email or phone number and a password");
            let { data: r10, error: s10 } = t10;
            if (s10) return this._returnResult({ data: { user: null, session: null }, error: s10 });
            if (!r10 || !r10.session || !r10.user) {
              let e11 = new n6();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), this._returnResult({ data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: s10 });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, s10, n10;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null == (t10 = e10.options) ? void 0 : t10.redirectTo, scopes: null == (r10 = e10.options) ? void 0 : r10.scopes, queryParams: null == (s10 = e10.options) ? void 0 : s10.queryParams, skipBrowserRedirect: null == (n10 = e10.options) ? void 0 : n10.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10, t10) {
          return (await this.initializePromise, null != this.lock) ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(e10, t10)) : this._exchangeCodeForSession(e10, t10);
        }
        async signInWithWeb3(e10) {
          let { chain: t10 } = e10;
          switch (t10) {
            case "ethereum":
              return await this.signInWithEthereum(e10);
            case "solana":
              return await this.signInWithSolana(e10);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
          }
        }
        async signInWithEthereum(e10) {
          var t10, r10, s10, n10, i10, a3, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let { chain: c3, wallet: h3, statement: g2, options: m2 } = e10;
            if ("object" != typeof h3 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let y2 = new URL(null != (t10 = null == m2 ? void 0 : m2.url) ? t10 : window.location.href), b2 = await h3.request({ method: "eth_requestAccounts" }).then((e11) => e11).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!b2 || 0 === b2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let v2 = i3(b2[0]), w2 = null == (r10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : r10.chainId;
            w2 || (w2 = parseInt(await h3.request({ method: "eth_chainId" }), 16)), p2 = (function(e11) {
              var t11;
              let { chainId: r11, domain: s11, expirationTime: n11, issuedAt: i11 = /* @__PURE__ */ new Date(), nonce: a4, notBefore: o3, requestId: l3, resources: u3, scheme: c4, uri: h4, version: d3 } = e11;
              if (!Number.isInteger(r11)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r11}`);
              if (!s11) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a4 && a4.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a4}`);
              if (!h4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== d3) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d3}`);
              if (null == (t11 = e11.statement) ? void 0 : t11.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e11.statement}`);
              let p3 = i3(e11.address), f3 = c4 ? `${c4}://${s11}` : s11, g3 = e11.statement ? `${e11.statement}
` : "", m3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, y3 = `URI: ${h4}
Version: ${d3}
Chain ID: ${r11}${a4 ? `
Nonce: ${a4}` : ""}
Issued At: ${i11.toISOString()}`;
              if (n11 && (y3 += `
Expiration Time: ${n11.toISOString()}`), o3 && (y3 += `
Not Before: ${o3.toISOString()}`), l3 && (y3 += `
Request ID: ${l3}`), u3) {
                let e12 = "\nResources:";
                for (let t12 of u3) {
                  if (!t12 || "string" != typeof t12) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t12}`);
                  e12 += `
- ${t12}`;
                }
                y3 += e12;
              }
              return `${m3}
${y3}`;
            })({ domain: y2.host, address: v2, statement: g2, uri: y2.href, version: "1", chainId: w2, nonce: null == (s10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : s10.nonce, issuedAt: null != (i10 = null == (n10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : n10.issuedAt) ? i10 : /* @__PURE__ */ new Date(), expirationTime: null == (a3 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : a3.expirationTime, notBefore: null == (o2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : o2.notBefore, requestId: null == (l2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : l2.requestId, resources: null == (u2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : u2.resources }), f2 = await h3.request({ method: "personal_sign", params: [(d2 = p2, "0x" + Array.from(new TextEncoder().encode(d2), (e11) => e11.toString(16).padStart(2, "0")).join("")), v2] });
          }
          try {
            let { data: t11, error: r11 } = await iV(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p2, signature: f2 }, (null == (c2 = e10.options) ? void 0 : c2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (h2 = e10.options) ? void 0 : h2.captchaToken } } : null), xform: iK });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new n6();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSolana(e10) {
          var t10, r10, s10, n10, i10, a3, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let { chain: h3, wallet: d3, statement: g2, options: m2 } = e10;
            if ("object" != typeof d3 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let y2 = new URL(null != (t10 = null == m2 ? void 0 : m2.url) ? t10 : window.location.href);
            if ("signIn" in d3 && d3.signIn) {
              let e11, t11 = await d3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == m2 ? void 0 : m2.signInWithSolana), { version: "1", domain: y2.host, uri: y2.href }), g2 ? { statement: g2 } : null));
              if (Array.isArray(t11) && t11[0] && "object" == typeof t11[0]) e11 = t11[0];
              else if (t11 && "object" == typeof t11 && "signedMessage" in t11 && "signature" in t11) e11 = t11;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e11 && "signature" in e11 && ("string" == typeof e11.signedMessage || e11.signedMessage instanceof Uint8Array) && e11.signature instanceof Uint8Array) p2 = "string" == typeof e11.signedMessage ? e11.signedMessage : new TextDecoder().decode(e11.signedMessage), f2 = e11.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in d3) || "function" != typeof d3.signMessage || !("publicKey" in d3) || "object" != typeof d3 || !d3.publicKey || !("toBase58" in d3.publicKey) || "function" != typeof d3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              p2 = [`${y2.host} wants you to sign in with your Solana account:`, d3.publicKey.toBase58(), ...g2 ? ["", g2, ""] : [""], "Version: 1", `URI: ${y2.href}`, `Issued At: ${null != (s10 = null == (r10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : r10.issuedAt) ? s10 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null == (n10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : n10.notBefore) ? [`Not Before: ${m2.signInWithSolana.notBefore}`] : [], ...(null == (i10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : i10.expirationTime) ? [`Expiration Time: ${m2.signInWithSolana.expirationTime}`] : [], ...(null == (a3 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : a3.chainId) ? [`Chain ID: ${m2.signInWithSolana.chainId}`] : [], ...(null == (o2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : o2.nonce) ? [`Nonce: ${m2.signInWithSolana.nonce}`] : [], ...(null == (l2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : l2.requestId) ? [`Request ID: ${m2.signInWithSolana.requestId}`] : [], ...(null == (c2 = null == (u2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : u2.resources) ? void 0 : c2.length) ? ["Resources", ...m2.signInWithSolana.resources.map((e12) => `- ${e12}`)] : []].join("\n");
              let e11 = await d3.signMessage(new TextEncoder().encode(p2), "utf8");
              if (!e11 || !(e11 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              f2 = e11;
            }
          }
          try {
            let { data: t11, error: r11 } = await iV(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: p2, signature: ig(f2) }, (null == (h2 = e10.options) ? void 0 : h2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (d2 = e10.options) ? void 0 : d2.captchaToken } } : null), xform: iK });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new n6();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _exchangeCodeForSession(e10, t10) {
          let r10 = (null == t10 ? void 0 : t10.flowId) != null, s10 = r10 ? iC(null == t10 ? void 0 : t10.flowId) : null;
          r10 && !s10 && this._debug("#_exchangeCodeForSession()", "provided flowId is not a valid flow id", null == t10 ? void 0 : t10.flowId);
          let { verifier: n10, flowId: i10 } = r10 && !s10 ? { verifier: null, flowId: null } : await ij(this.storage, this.storageKey, s10), [a3, o2] = (null != n10 ? n10 : "").split("/");
          try {
            if (!a3 && "pkce" === this.flowType) throw new n7();
            let { data: t11, error: r11 } = await iV(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: a3 }, xform: iK });
            if (await iN(this.storage, this.storageKey, i10), r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new n6();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("recovery" === o2 ? "PASSWORD_RECOVERY" : "SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign(Object.assign({}, t11), { redirectType: null != o2 ? o2 : null }), error: r11 });
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, i10), nZ(e11)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: s10, access_token: n10, nonce: i10 } = e10, { data: a3, error: o2 } = await iV(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: s10, access_token: n10, nonce: i10, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: iK });
            if (o2) return this._returnResult({ data: { user: null, session: null }, error: o2 });
            if (!a3 || !a3.session || !a3.user) {
              let e11 = new n6();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return a3.session && (await this._saveSession(a3.session), await this._notifyAllSubscribers("SIGNED_IN", a3.session)), this._returnResult({ data: a3, error: o2 });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, s10, n10, i10;
          let a3 = null;
          try {
            if ("email" in e10) {
              let { email: s11, options: n11 } = e10, i11 = null, o2 = null;
              "pkce" === this.flowType && ([i11, o2, a3] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await iV(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: s11, data: null != (t10 = null == n11 ? void 0 : n11.data) ? t10 : {}, create_user: null == (r10 = null == n11 ? void 0 : n11.shouldCreateUser) || r10, gotrue_meta_security: { captcha_token: null == n11 ? void 0 : n11.captchaToken }, code_challenge: i11, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == n11 ? void 0 : n11.emailRedirectTo, a3) });
              return this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a4, error: o2 } = await iV(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null != (s10 = null == r11 ? void 0 : r11.data) ? s10 : {}, create_user: null == (n10 = null == r11 ? void 0 : r11.shouldCreateUser) || n10, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null != (i10 = null == r11 ? void 0 : r11.channel) ? i10 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a4 ? void 0 : a4.message_id }, error: o2 });
            }
            throw new n8("You must provide either an email or phone number.");
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, a3), nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let s10, n10;
            "options" in e10 && (s10 = null == (t10 = e10.options) ? void 0 : t10.redirectTo, n10 = null == (r10 = e10.options) ? void 0 : r10.captchaToken);
            let { data: i10, error: a3 } = await iV(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: n10 } }), redirectTo: s10, xform: iK });
            if (a3) throw a3;
            if (!i10) throw Error("An error occurred on token verification.");
            let o2 = i10.session, l2 = i10.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, s10;
          let n10 = null;
          try {
            let i10 = null, a3 = null;
            "pkce" === this.flowType && ([i10, a3, n10] = await this._getCodeChallengeAndMethod());
            let o2 = await iV(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: this._maybeAppendFlowIdToRedirect(null == (t10 = e10.options) ? void 0 : t10.redirectTo, n10) }), (null == (r10 = null == e10 ? void 0 : e10.options) ? void 0 : r10.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: i10, code_challenge_method: a3 }), headers: this.headers, xform: iY });
            return null == (s10 = o2.data) || s10.url, this._returnResult(o2);
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, n10), nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async reauthenticate() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate();
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) throw r10;
              if (!t10) throw new n3();
              let { error: s10 } = await iV(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: s10 });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: { user: null, session: null }, error: e10 });
            throw e10;
          }
        }
        async resend(e10) {
          let t10 = null;
          try {
            let r10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: s10, type: n10, options: i10 } = e10, a3 = null, o2 = null;
              "pkce" === this.flowType && ([a3, o2, t10] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await iV(this.fetch, "POST", r10, { headers: this.headers, body: { email: s10, type: n10, gotrue_meta_security: { captcha_token: null == i10 ? void 0 : i10.captchaToken }, code_challenge: a3, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == i10 ? void 0 : i10.emailRedirectTo, t10) });
              return l2 && await iN(this.storage, this.storageKey, t10), this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, type: s10, options: n10 } = e10, { data: i10, error: a3 } = await iV(this.fetch, "POST", r10, { headers: this.headers, body: { phone: t11, type: s10, gotrue_meta_security: { captcha_token: null == n10 ? void 0 : n10.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == i10 ? void 0 : i10.message_id }, error: a3 });
            }
            throw new n8("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, t10), nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async getSession() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async (e10) => e10)) : await this._useSession(async (e10) => e10);
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), null == this.lock || this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let e10 = null, t10 = await iv(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", t10), null !== t10 && (this._isValidSession(t10) ? e10 = t10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e10) return { data: { session: null }, error: null };
            let r10 = !!e10.expires_at && 1e3 * e10.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${r10 ? "" : " not"} expired`, "expires_at", e10.expires_at), !r10) return { data: { session: await this._hydrateSessionUser(e10) }, error: null };
            let { data: s10, error: n10 } = await this._callRefreshToken(e10.refresh_token);
            if (n10) {
              let e11 = await iv(this.storage, this.storageKey);
              if (e11 && this._isValidSession(e11) && e11.expires_at && 1e3 * e11.expires_at > Date.now()) return this._returnResult({ data: { session: await this._hydrateSessionUser(e11) }, error: null });
              return this._returnResult({ data: { session: null }, error: n10 });
            }
            return this._returnResult({ data: { session: s10 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async _hydrateSessionUser(e10) {
          if (this.userStorage) {
            let t11 = await iv(this.userStorage, this.storageKey + "-user");
            e10.user = (null == t11 ? void 0 : t11.user) ? t11.user : iB();
          }
          if (this.storage.isServer && e10.user && !e10.user.__isUserNotAvailableProxy) {
            var t10;
            let r10 = { value: this.suppressGetSessionWarning };
            t10 = e10.user, e10.user = new Proxy(t10, { get: (e11, t11, s10) => {
              if ("__isInsecureUserWarningProxy" === t11) return true;
              if ("symbol" == typeof t11) {
                let r11 = t11.toString();
                if ("Symbol(Symbol.toPrimitive)" === r11 || "Symbol(Symbol.toStringTag)" === r11 || "Symbol(util.inspect.custom)" === r11 || "Symbol(nodejs.util.inspect.custom)" === r11) return Reflect.get(e11, t11, s10);
              }
              return r10.value || "string" != typeof t11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r10.value = true), Reflect.get(e11, t11, s10);
            } }), r10.value && (this.suppressGetSessionWarning = true);
          }
          return e10;
        }
        async getUser(e10) {
          let t10;
          return e10 ? await this._getUser(e10) : (await this.initializePromise, (t10 = null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : await this._getUser()).data.user && (this.suppressGetSessionWarning = true), t10);
        }
        async _getUser(e10) {
          try {
            if (e10) return await iV(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: iX });
            return await this._useSession(async (e11) => {
              var t10, r10, s10;
              let { data: n10, error: i10 } = e11;
              if (i10) throw i10;
              return (null == (t10 = n10.session) ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await iV(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null != (s10 = null == (r10 = n10.session) ? void 0 : r10.access_token) ? s10 : void 0, xform: iX }) : { data: { user: null }, error: new n3() };
            });
          } catch (e11) {
            if (nZ(e11)) return n5(e11) && await this._removeSession(), this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(e10, t10)) : await this._updateUser(e10, t10);
        }
        async _updateUser(e10, t10 = {}) {
          let r10 = null;
          try {
            return await this._useSession(async (s10) => {
              let { data: n10, error: i10 } = s10;
              if (i10) throw i10;
              if (!n10.session) throw new n3();
              let a3 = n10.session, o2 = null, l2 = null;
              "pkce" === this.flowType && null != e10.email && ([o2, l2, r10] = await this._getCodeChallengeAndMethod());
              let { data: u2, error: c2 } = await iV(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == t10 ? void 0 : t10.emailRedirectTo, r10), body: Object.assign(Object.assign({}, e10), { code_challenge: o2, code_challenge_method: l2 }), jwt: a3.access_token, xform: iX });
              if (c2) throw c2;
              return a3.user = u2.user, await this._saveSession(a3), await this._notifyAllSubscribers("USER_UPDATED", a3), this._returnResult({ data: { user: a3.user }, error: null });
            });
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, r10), nZ(e11)) return this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async setSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(e10)) : await this._setSession(e10);
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token) throw new n3();
            let t10 = Date.now() / 1e3, r10 = t10, s10 = true, n10 = null, { payload: i10 } = iS(e10.access_token);
            if (i10.exp && (s10 = (r10 = i10.exp) <= t10), s10) {
              let { data: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11) return this._returnResult({ data: { user: null, session: null }, error: r11 });
              if (!t11) return { data: { user: null, session: null }, error: null };
              n10 = t11;
            } else {
              let { data: s11, error: i11 } = await this._getUser(e10.access_token);
              if (i11) return this._returnResult({ data: { user: null, session: null }, error: i11 });
              n10 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: s11.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(n10), await this._notifyAllSubscribers("SIGNED_IN", n10);
            }
            return this._returnResult({ data: { user: n10.user, session: n10 }, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          }
        }
        async refreshSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(e10)) : await this._refreshSession(e10);
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: s11, error: n11 } = t10;
                if (n11) throw n11;
                e10 = null != (r10 = s11.session) ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token)) throw new n3();
              let { data: s10, error: n10 } = await this._callRefreshToken(e10.refresh_token);
              return n10 ? this._returnResult({ data: { user: null, session: null }, error: n10 }) : s10 ? this._returnResult({ data: { user: s10.user, session: s10 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          try {
            throw new n9("No browser detected.");
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: { session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e10) : !!(e10.access_token || e10.error || e10.error_description || e10.error_code);
        }
        async _isPKCECallback(e10) {
          if (!e10.code) return false;
          let t10 = iC(e10[nY]);
          return !!(t10 && await iv(this.storage, iO(this.storageKey, t10))) || !!await iv(this.storage, `${this.storageKey}-code-verifier`);
        }
        async signOut(e10 = { scope: "global" }) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e10)) : await this._signOut(e10);
        }
        async _signOut({ scope: e10 = "global" } = {}) {
          return await this._useSession(async (t10) => {
            var r10;
            let s10 = async () => {
              await this._removeSession();
            }, { data: n10, error: i10 } = t10;
            if (i10 && !n5(i10)) return "local" === e10 && it(i10) && await s10(), this._returnResult({ error: i10 });
            let a3 = null == (r10 = n10.session) ? void 0 : r10.access_token, o2 = null, l2 = (e11) => {
              if (o2) throw o2.thrown;
              return e11;
            };
            if ("local" === e10) try {
              await s10();
            } catch (e11) {
              o2 = { thrown: e11 };
            }
            if (a3) {
              let { error: t11 } = await this.admin.signOut(a3, e10);
              if (t11 && !(n1(t11) && (404 === t11.status || 401 === t11.status || 403 === t11.status) || n5(t11))) return l2(this._returnResult({ error: t11 }));
            }
            return "global" === e10 && await s10(), l2(this._returnResult({ error: null }));
          });
        }
        onAuthStateChange(e10) {
          let t10 = /* @__PURE__ */ Symbol("auth-callback"), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => {
              this._emitInitialSession(t10);
            }) : await this._emitInitialSession(t10);
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, s10;
            try {
              let { data: { session: s11 }, error: n10 } = t10;
              if (n10) throw n10;
              await (null == (r10 = this.stateChangeEmitters.get(e10)) ? void 0 : r10.callback("INITIAL_SESSION", s11)), this._debug("INITIAL_SESSION", "callback id", e10, "session", s11);
            } catch (t11) {
              if (await (null == (s10 = this.stateChangeEmitters.get(e10)) ? void 0 : s10.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), is(t11)) return;
              n5(t11) || it(t11) || n1(t11) && ("refresh_token_not_found" === t11.code || "refresh_token_already_used" === t11.code || "session_expired" === t11.code) ? console.warn(t11) : console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, s10 = null, n10 = null;
          "pkce" === this.flowType && ([r10, s10, n10] = await this._getCodeChallengeAndMethod(true));
          try {
            return await iV(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: s10, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(t10.redirectTo, n10) });
          } catch (e11) {
            if (await iN(this.storage, this.storageKey, n10), nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10) throw r10;
            return this._returnResult({ data: { identities: null != (e10 = t10.user.identities) ? e10 : [] }, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async linkIdentity(e10) {
          return "token" in e10 ? this.linkIdentityIdToken(e10) : this.linkIdentityOAuth(e10);
        }
        async linkIdentityOAuth(e10) {
          let t10 = null;
          try {
            let { data: r10, error: s10 } = await this._useSession(async (r11) => {
              var s11, n10, i10, a3, o2;
              let { data: l2, error: u2 } = r11;
              if (u2) throw u2;
              let { url: c2, flowId: h2 } = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null == (s11 = e10.options) ? void 0 : s11.redirectTo, scopes: null == (n10 = e10.options) ? void 0 : n10.scopes, queryParams: null == (i10 = e10.options) ? void 0 : i10.queryParams, skipBrowserRedirect: true });
              return t10 = h2, await iV(this.fetch, "GET", c2, { headers: this.headers, jwt: null != (o2 = null == (a3 = l2.session) ? void 0 : a3.access_token) ? o2 : void 0 });
            });
            if (s10) throw s10;
            return this._returnResult({ data: { provider: e10.provider, url: null == r10 ? void 0 : r10.url, flowId: t10 }, error: null });
          } catch (r10) {
            if (nZ(r10)) return this._returnResult({ data: { provider: e10.provider, url: null, flowId: t10 }, error: r10 });
            throw r10;
          }
        }
        async linkIdentityIdToken(e10) {
          return await this._useSession(async (t10) => {
            var r10;
            try {
              let { error: s10, data: { session: n10 } } = t10;
              if (s10) throw s10;
              let { options: i10, provider: a3, token: o2, access_token: l2, nonce: u2 } = e10, { data: c2, error: h2 } = await iV(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null != (r10 = null == n10 ? void 0 : n10.access_token) ? r10 : void 0, body: { provider: a3, id_token: o2, access_token: l2, nonce: u2, link_identity: true, gotrue_meta_security: { captcha_token: null == i10 ? void 0 : i10.captchaToken } }, xform: iK });
              if (h2) return this._returnResult({ data: { user: null, session: null }, error: h2 });
              if (!c2 || !c2.session || !c2.user) return this._returnResult({ data: { user: null, session: null }, error: new n6() });
              return c2.session && (await this._saveSession(c2.session), await this._notifyAllSubscribers("USER_UPDATED", c2.session)), this._returnResult({ data: c2, error: h2 });
            } catch (e11) {
              if (await iN(this.storage, this.storageKey, null), nZ(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
              throw e11;
            }
          });
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s10;
              let { data: n10, error: i10 } = t10;
              if (i10) throw i10;
              return await iV(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null != (s10 = null == (r10 = n10.session) ? void 0 : r10.access_token) ? s10 : void 0 });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = "#_refreshAccessToken()";
          this._debug(t10, "begin");
          try {
            var r10, s10;
            let n10 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await ik(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await iV(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: iK })), s10 = (e11, t11) => {
              let r11 = 200 * Math.pow(2, e11);
              return t11 && it(t11) && Date.now() + r11 - n10 < 3e4;
            }, new Promise((e11, t11) => {
              (async () => {
                for (let n11 = 0; n11 < 1 / 0; n11++) try {
                  let t12 = await r10(n11);
                  if (!s10(n11, null)) return void e11(t12);
                } catch (e12) {
                  if (!s10(n11, e12)) return void t11(e12);
                }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), nZ(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let { url: r10, flowId: s10 } = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), { data: { provider: e10, url: r10, flowId: s10 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10, t10;
          let r10 = "#_recoverAndRefresh()";
          this._debug(r10, "begin");
          try {
            let s10 = await iv(this.storage, this.storageKey);
            if (s10 && this.userStorage) {
              let t11 = await iv(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t11 && (t11 = { user: s10.user }, await ib(this.userStorage, this.storageKey + "-user", t11)), s10.user = null != (e10 = null == t11 ? void 0 : t11.user) ? e10 : iB();
            } else if (s10 && !s10.user && !s10.user) {
              let e11 = await iv(this.storage, this.storageKey + "-user");
              e11 && (null == e11 ? void 0 : e11.user) ? (s10.user = e11.user, await iw(this.storage, this.storageKey + "-user"), await ib(this.storage, this.storageKey, s10)) : s10.user = iB();
            }
            if (this._debug(r10, "session from storage", s10), !this._isValidSession(s10)) {
              this._debug(r10, "session is not valid"), null !== s10 && await this._removeSession();
              return;
            }
            let n10 = (null != (t10 = s10.expires_at) ? t10 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r10, `session has${n10 ? "" : " not"} expired with margin of 90000s`), n10) {
              if (this.autoRefreshToken && s10.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(s10.refresh_token);
                e11 && (is(e11) ? this._debug(r10, "refresh discarded by commit guard", e11) : this._debug(r10, "refresh failed", e11));
              }
            } else if (s10.user && true === s10.user.__isUserNotAvailableProxy) try {
              let { data: e11, error: t11 } = await this._getUser(s10.access_token);
              !t11 && (null == e11 ? void 0 : e11.user) ? (s10.user = e11.user, await this._saveSession(s10), await this._notifyAllSubscribers("SIGNED_IN", s10)) : this._debug(r10, "could not get user data, skipping SIGNED_IN notification");
            } catch (e11) {
              console.error("Error getting user data:", e11), this._debug(r10, "error getting user data, skipping SIGNED_IN notification", e11);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", s10);
          } catch (e11) {
            this._debug(r10, "error", e11), it(e11) ? console.warn(e11) : console.error(e11);
            return;
          } finally {
            this._debug(r10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10) throw new n3();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === e10 && Date.now() < this.lastRefreshFailure.expiresAt) return this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)"), this.lastRefreshFailure.result;
          let s10 = "#_callRefreshToken()";
          this._debug(s10, "begin");
          try {
            this.refreshingDeferred = new i_(), this.refreshingDeferred.promise.then(void 0, () => {
            });
            let t11 = await iv(this.storage, this.storageKey), { data: r11, error: n10 } = await this._refreshAccessToken(e10);
            if (n10) throw n10;
            if (!r11.session) throw new n3();
            let i10 = await iv(this.storage, this.storageKey);
            if (null !== t11 && (null === i10 || i10.refresh_token !== t11.refresh_token)) {
              this._debug(s10, "commit guard: storage changed since refresh started, discarding rotated tokens", { startedWith: "present", nowHolds: i10 ? "replaced" : "cleared" });
              let e11 = { data: null, error: new ir() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            let a3 = this._sessionRemovalEpoch;
            if (await this._saveSession(r11.session), this._sessionRemovalEpoch !== a3) {
              this._debug(s10, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await iw(this.storage, this.storageKey), this.userStorage && await iw(this.userStorage, this.storageKey + "-user");
              let e11 = { data: null, error: new ir() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            await this._notifyAllSubscribers("TOKEN_REFRESHED", r11.session);
            let o2 = { data: r11.session, error: null };
            return this.lastRefreshFailure = null, this.refreshingDeferred.resolve(o2), o2;
          } catch (n10) {
            if (this._debug(s10, "error", n10), nZ(n10)) {
              let r11 = { data: null, error: n10 };
              if (!it(n10)) {
                let e11 = await iv(this.storage, this.storageKey);
                (null == e11 ? void 0 : e11.expires_at) && 1e3 * e11.expires_at > Date.now() ? this._debug(s10, "proactive refresh failed, access token still valid \u2014 preserving session") : await this._removeSession();
              }
              return this.lastRefreshFailure = { refreshToken: e10, result: r11, expiresAt: Date.now() + 6e4 }, null == (t10 = this.refreshingDeferred) || t10.resolve(r11), r11;
            }
            throw null == (r10 = this.refreshingDeferred) || r10.reject(n10), n10;
          } finally {
            this.refreshingDeferred = null, this._debug(s10, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          if (null !== this._pendingInitNotifications && r10) return void this._pendingInitNotifications.push({ event: e10, session: t10, broadcast: r10 });
          let s10 = `#_notifyAllSubscribers(${e10})`;
          this._debug(s10, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let s11 = [], n10 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                s11.push(e11);
              }
            });
            if (await Promise.all(n10), s11.length > 0) {
              for (let e11 = 0; e11 < s11.length; e11 += 1) console.error(s11[e11]);
              throw s11[0];
            }
          } finally {
            this._debug(s10, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true;
          let t10 = Object.assign({}, e10), r10 = t10.user && true === t10.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r10 && t10.user && await ib(this.userStorage, this.storageKey + "-user", { user: t10.user });
            let e11 = Object.assign({}, t10);
            delete e11.user;
            let s10 = iF(e11);
            await ib(this.storage, this.storageKey, s10);
          } else {
            let e11 = iF(t10);
            await ib(this.storage, this.storageKey, e11);
          }
        }
        async _removeSession() {
          this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.lastRefreshFailure = null, this.suppressGetSessionWarning = false, await iw(this.storage, this.storageKey), await i$(this.storage, this.storageKey), await iw(this.storage, this.storageKey + "-user"), this.userStorage && await iw(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()"), this.visibilityChangedCallback, this.visibilityChangedCallback = null;
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "u" > typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10);
          let t10 = setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
          this.autoRefreshTickTimeout = t10, t10 && "object" == typeof t10 && "function" == typeof t10.unref ? t10.unref() : "u" > typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(t10);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
          let t10 = this.autoRefreshTickTimeout;
          this.autoRefreshTickTimeout = null, t10 && clearTimeout(t10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async dispose() {
          var e10;
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), null == (e10 = this.broadcastChannel) || e10.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear();
        }
        async _autoRefreshTokenTick() {
          if (this._debug("#_autoRefreshTokenTick()", "begin"), null != this.lock) {
            try {
              await this._acquireLock(0, async () => {
                try {
                  let e10 = Date.now();
                  try {
                    return await this._useSession(async (t10) => {
                      let { data: { session: r10 } } = t10;
                      if (!r10 || !r10.refresh_token || !r10.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                      let s10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                      this._debug("#_autoRefreshTokenTick()", `access token expires in ${s10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s10 <= 3 && await this._callRefreshToken(r10.refresh_token);
                    });
                  } catch (e11) {
                    console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                  }
                } finally {
                  this._debug("#_autoRefreshTokenTick()", "end");
                }
              });
            } catch (e10) {
              if (e10 instanceof i4) this._debug("auto refresh token tick lock not available");
              else throw e10;
            }
            return;
          }
          if (null !== this.refreshingDeferred) return void this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
          try {
            let e10 = Date.now();
            try {
              await this._useSession(async (t10) => {
                let { data: { session: r10 } } = t10;
                if (!r10 || !r10.refresh_token || !r10.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                let s10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${s10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s10 <= 3 && await this._callRefreshToken(r10.refresh_token);
              });
            } catch (e11) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        }
        async _handleVisibilityChange() {
          return this._debug("#_handleVisibilityChange()"), this.autoRefreshToken && this.startAutoRefresh(), false;
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          if (this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState) {
            if (this.autoRefreshToken && this._startAutoRefresh(), !e10) if (await this.initializePromise, null != this.lock) await this._acquireLock(this.lockAcquireTimeout, async () => {
              "visible" !== document.visibilityState ? this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting") : await this._recoverAndRefresh();
            });
            else {
              if ("visible" !== document.visibilityState) return void this._debug(t10, "visibilityState is no longer visible, skipping recovery");
              await this._recoverAndRefresh();
            }
          } else "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let s10 = null == r10 ? void 0 : r10.redirectTo, n10 = null, i10 = null, a3 = null;
          "pkce" === this.flowType && ([n10, i10, a3] = await this._getCodeChallengeAndMethod(), s10 = this._maybeAppendFlowIdToRedirect(s10, a3));
          let o2 = [`provider=${encodeURIComponent(t10)}`];
          if (s10 && o2.push(`redirect_to=${encodeURIComponent(s10)}`), (null == r10 ? void 0 : r10.scopes) && o2.push(`scopes=${encodeURIComponent(r10.scopes)}`), null != n10 && null != i10) {
            let e11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(n10)}`, code_challenge_method: `${encodeURIComponent(i10)}` });
            o2.push(e11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            o2.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && o2.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), { url: `${e10}?${o2.join("&")}`, flowId: a3 };
        }
        _maybeAppendFlowIdToRedirect(e10, t10) {
          return e10 && t10 && this.experimental.appendPkceFlowIdToRedirects ? (function(e11, t11) {
            let r10 = e11.indexOf("#"), s10 = -1 === r10 ? e11 : e11.slice(0, r10), n10 = -1 === r10 ? "" : e11.slice(r10), i10 = s10.indexOf("?");
            if (-1 !== i10) {
              let e12 = s10.slice(0, i10), t12 = s10.slice(i10 + 1).split("&").filter((e13) => "" !== e13 && e13 !== nY && !e13.startsWith(`${nY}=`));
              s10 = t12.length > 0 ? `${e12}?${t12.join("&")}` : e12;
            }
            let a3 = s10.includes("?") ? "&" : "?";
            return `${s10}${a3}${nY}=${encodeURIComponent(t11)}${n10}`;
          })(e10, t10) : null != e10 ? e10 : void 0;
        }
        async _getCodeChallengeAndMethod(e10 = false) {
          return iL(this.storage, this.storageKey, e10, (e11) => this._debug("#_getCodeChallengeAndMethod()", "evicted oldest pending PKCE verifier slot", e11));
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: s10, error: n10 } = t10;
              return n10 ? this._returnResult({ data: null, error: n10 }) : await iV(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s10;
              let { data: n10, error: i10 } = t10;
              if (i10) return this._returnResult({ data: null, error: i10 });
              let a3 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : "totp" === e10.factorType ? { issuer: e10.issuer } : {}), { data: o2, error: l2 } = await iV(this.fetch, "POST", `${this.url}/factors`, { body: a3, headers: this.headers, jwt: null == (r10 = null == n10 ? void 0 : n10.session) ? void 0 : r10.access_token });
              return l2 ? this._returnResult({ data: null, error: l2 }) : ("totp" === e10.factorType && "totp" === o2.type && (null == (s10 = null == o2 ? void 0 : o2.totp) ? void 0 : s10.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), this._returnResult({ data: o2, error: null }));
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verify(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: s10, error: n10 } = t11;
                if (n10) return this._returnResult({ data: null, error: n10 });
                let i10 = Object.assign({ challenge_id: e10.challengeId }, "webauthn" in e10 ? { webauthn: Object.assign(Object.assign({}, e10.webauthn), { credential_response: "create" === e10.webauthn.type ? ae(e10.webauthn.credential_response) : at(e10.webauthn.credential_response) }) } : { code: e10.code }), { data: a3, error: o2 } = await iV(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: i10, headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
                return o2 ? this._returnResult({ data: null, error: o2 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a3.expires_in }, a3)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a3), this._returnResult({ data: a3, error: o2 }));
              });
            } catch (e11) {
              if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challenge(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: s10, error: n10 } = t11;
                if (n10) return this._returnResult({ data: null, error: n10 });
                let i10 = await iV(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: e10, headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
                if (i10.error) return i10;
                let { data: a3 } = i10;
                if ("webauthn" !== a3.type) return { data: a3, error: null };
                switch (a3.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, a3), { webauthn: Object.assign(Object.assign({}, a3.webauthn), { credential_options: Object.assign(Object.assign({}, a3.webauthn.credential_options), { publicKey: i9(a3.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, a3), { webauthn: Object.assign(Object.assign({}, a3.webauthn), { credential_options: Object.assign(Object.assign({}, a3.webauthn.credential_options), { publicKey: i7(a3.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e11) {
              if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? this._returnResult({ data: null, error: r10 }) : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          var e10;
          let { data: { user: t10 }, error: r10 } = await this.getUser();
          if (r10) return { data: null, error: r10 };
          let s10 = { all: [], phone: [], totp: [], webauthn: [], recovery_code: [] };
          for (let r11 of null != (e10 = null == t10 ? void 0 : t10.factors) ? e10 : []) s10.all.push(r11), "verified" === r11.status && r11.factor_type in s10 && Array.isArray(s10[r11.factor_type]) && s10[r11.factor_type].push(r11);
          return { data: s10, error: null };
        }
        async _getAuthenticatorAssuranceLevel(e10) {
          var t10, r10, s10, n10;
          if (e10) try {
            let { payload: s11 } = iS(e10), n11 = null;
            s11.aal && (n11 = s11.aal);
            let i11 = n11, { data: { user: a4 }, error: o3 } = await this.getUser(e10);
            if (o3) return this._returnResult({ data: null, error: o3 });
            (null != (r10 = null == (t10 = null == a4 ? void 0 : a4.factors) ? void 0 : t10.filter((e11) => "verified" === e11.status)) ? r10 : []).length > 0 && (i11 = "aal2");
            let l3 = s11.amr || [];
            return { data: { currentLevel: n11, nextLevel: i11, currentAuthenticationMethods: l3 }, error: null };
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
          let { data: { session: i10 }, error: a3 } = await this.getSession();
          if (a3) return this._returnResult({ data: null, error: a3 });
          if (!i10) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: o2 } = iS(i10.access_token), l2 = null;
          o2.aal && (l2 = o2.aal);
          let u2 = l2;
          return (null != (n10 = null == (s10 = i10.user.factors) ? void 0 : s10.filter((e11) => "verified" === e11.status)) ? n10 : []).length > 0 && (u2 = "aal2"), { data: { currentLevel: l2, nextLevel: u2, currentAuthenticationMethods: o2.amr || [] }, error: null };
        }
        async _getRecoveryCodesStatus() {
          iq(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              var t10;
              let { data: r10, error: s10 } = e10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              let { data: n10, error: i10 } = await iV(this.fetch, "GET", `${this.url}/factors/recovery-codes`, { headers: this.headers, jwt: null == (t10 = null == r10 ? void 0 : r10.session) ? void 0 : t10.access_token });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _generateRecoveryCodes(e10) {
          iq(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: s10, error: n10 } = t10;
              if (n10) return this._returnResult({ data: null, error: n10 });
              let { data: i10, error: a3 } = await iV(this.fetch, "POST", `${this.url}/factors/recovery-codes`, { body: (null == e10 ? void 0 : e10.friendlyName) ? { friendly_name: e10.friendlyName } : void 0, headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
              return a3 ? this._returnResult({ data: null, error: a3 }) : this._returnResult({ data: i10, error: null });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verifyRecoveryCode(e10) {
          iq(this.experimental);
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: s10, error: n10 } = t11;
                if (n10) return this._returnResult({ data: null, error: n10 });
                let { data: i10, error: a3 } = await iV(this.fetch, "POST", `${this.url}/factors/recovery-codes/verify`, { body: { code: e10.code }, headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
                if (a3) return this._returnResult({ data: null, error: a3 });
                let o2 = Object.assign({ expires_at: im(i10.expires_in) }, i10);
                return await this._saveSession(o2), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o2), this._returnResult({ data: i10, error: null });
              });
            } catch (e11) {
              if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _regenerateRecoveryCodes() {
          iq(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              var t10;
              let { data: r10, error: s10 } = e10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              let { data: n10, error: i10 } = await iV(this.fetch, "POST", `${this.url}/factors/recovery-codes/regenerate`, { headers: this.headers, jwt: null == (t10 = null == r10 ? void 0 : r10.session) ? void 0 : t10.access_token });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _unenrollRecoveryCodes() {
          iq(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              var t10;
              let { data: r10, error: s10 } = e10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              let { data: n10, error: i10 } = await iV(this.fetch, "DELETE", `${this.url}/factors/recovery-codes`, { headers: this.headers, jwt: null == (t10 = null == r10 ? void 0 : r10.session) ? void 0 : t10.access_token });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _getAuthorizationDetails(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : r10 ? await iV(this.fetch, "GET", `${this.url}/oauth/authorizations/${e10}`, { headers: this.headers, jwt: r10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new n3() });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _approveAuthorization(e10, t10) {
          try {
            return await this._useSession(async (t11) => {
              let { data: { session: r10 }, error: s10 } = t11;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!r10) return this._returnResult({ data: null, error: new n3() });
              let n10 = await iV(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: r10.access_token, body: { action: "approve" }, xform: (e11) => ({ data: e11, error: null }) });
              return n10.data && n10.data.redirect_url, n10;
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _denyAuthorization(e10, t10) {
          try {
            return await this._useSession(async (t11) => {
              let { data: { session: r10 }, error: s10 } = t11;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!r10) return this._returnResult({ data: null, error: new n3() });
              let n10 = await iV(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: r10.access_token, body: { action: "deny" }, xform: (e11) => ({ data: e11, error: null }) });
              return n10.data && n10.data.redirect_url, n10;
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              return r10 ? this._returnResult({ data: null, error: r10 }) : t10 ? await iV(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new n3() });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _revokeOAuthGrant(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : r10 ? (await iV(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r10.access_token, query: { client_id: e10.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new n3() });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async fetchJwk(e10, t10 = { keys: [] }) {
          let r10 = t10.keys.find((t11) => t11.kid === e10);
          if (r10) return r10;
          let s10 = Date.now();
          if ((r10 = this.jwks.keys.find((t11) => t11.kid === e10)) && this.jwks_cached_at + 6e5 > s10) return r10;
          let { data: n10, error: i10 } = await iV(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (i10) throw i10;
          return n10.keys && 0 !== n10.keys.length && (this.jwks = n10, this.jwks_cached_at = s10, r10 = n10.keys.find((t11) => t11.kid === e10)) ? r10 : null;
        }
        async getClaims(e10, t10 = {}) {
          try {
            let n10, i10 = e10;
            if (!i10) {
              let { data: e11, error: t11 } = await this.getSession();
              if (t11 || !e11.session) return this._returnResult({ data: null, error: t11 });
              i10 = e11.session.access_token;
            }
            let { header: a3, payload: o2, signature: l2, raw: { header: u2, payload: c2 } } = iS(i10);
            if (!(null == t10 ? void 0 : t10.allowExpired)) try {
              var r10, s10 = o2.exp;
              if (!s10) throw Error("Missing exp claim");
              if (s10 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
            } catch (e11) {
              throw new ia(e11 instanceof Error ? e11.message : "JWT validation failed");
            }
            let h2 = !a3.alg || a3.alg.startsWith("HS") || !a3.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(a3.kid, (null == t10 ? void 0 : t10.keys) ? { keys: t10.keys } : null == t10 ? void 0 : t10.jwks);
            if (!h2) {
              let { error: e11 } = await this.getUser(i10);
              if (e11) throw e11;
              return { data: { claims: o2, header: a3, signature: l2 }, error: null };
            }
            let d2 = (function(e11) {
              switch (e11) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            })(a3.alg), p2 = await crypto.subtle.importKey("jwk", h2, d2, true, ["verify"]);
            if (!await crypto.subtle.verify(d2, p2, l2, (r10 = `${u2}.${c2}`, n10 = [], !(function(e11, t11) {
              for (let r11 = 0; r11 < e11.length; r11 += 1) {
                let s11 = e11.charCodeAt(r11);
                if (s11 > 55295 && s11 <= 56319) {
                  let t12 = (s11 - 55296) * 1024 & 65535;
                  s11 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
                }
                !(function(e12, t12) {
                  if (e12 <= 127) return t12(e12);
                  if (e12 <= 2047) {
                    t12(192 | e12 >> 6), t12(128 | 63 & e12);
                    return;
                  }
                  if (e12 <= 65535) {
                    t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                    return;
                  }
                  if (e12 <= 1114111) {
                    t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                    return;
                  }
                  throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
                })(s11, t11);
              }
            })(r10, (e11) => n10.push(e11)), new Uint8Array(n10)))) throw new ia("Invalid JWT signature");
            return { data: { claims: o2, header: a3, signature: l2 }, error: null };
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async signInWithPasskey(e10) {
          var t10, r10, s10, n10;
          try {
            1;
            return this._returnResult({ data: null, error: new n2("Browser does not support WebAuthn", null) });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async registerPasskey(e10) {
          var t10, r10;
          try {
            1;
            return this._returnResult({ data: null, error: new n2("Browser does not support WebAuthn", null) });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyRegistration() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new n3() });
              let { data: s10, error: n10 } = await iV(this.fetch, "POST", `${this.url}/passkeys/registration/options`, { headers: this.headers, jwt: t10.access_token, body: {} });
              return n10 ? this._returnResult({ data: null, error: n10 }) : this._returnResult({ data: s10, error: null });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _verifyPasskeyRegistration(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!r10) return this._returnResult({ data: null, error: new n3() });
              let { data: n10, error: i10 } = await iV(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, { headers: this.headers, jwt: r10.access_token, body: { challenge_id: e10.challengeId, credential: e10.credential } });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyAuthentication(e10) {
          var t10;
          try {
            let { data: r10, error: s10 } = await iV(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, { headers: this.headers, body: { gotrue_meta_security: { captcha_token: null == (t10 = null == e10 ? void 0 : e10.options) ? void 0 : t10.captchaToken } } });
            if (s10) return this._returnResult({ data: null, error: s10 });
            return this._returnResult({ data: r10, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verifyPasskeyAuthentication(e10) {
          try {
            let { data: t10, error: r10 } = await iV(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, { headers: this.headers, body: { challenge_id: e10.challengeId, credential: e10.credential }, xform: iK });
            if (r10) return this._returnResult({ data: null, error: r10 });
            return t10.session && (await this._saveSession(t10.session), await this._notifyAllSubscribers("SIGNED_IN", t10.session)), this._returnResult({ data: t10, error: null });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listPasskeys() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new n3() });
              let { data: s10, error: n10 } = await iV(this.fetch, "GET", `${this.url}/passkeys`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) });
              return n10 ? this._returnResult({ data: null, error: n10 }) : this._returnResult({ data: s10, error: null });
            });
          } catch (e10) {
            if (nZ(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _updatePasskey(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!r10) return this._returnResult({ data: null, error: new n3() });
              let { data: n10, error: i10 } = await iV(this.fetch, "PATCH", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, body: { friendly_name: e10.friendlyName } });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _deletePasskey(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!r10) return this._returnResult({ data: null, error: new n3() });
              let { error: n10 } = await iV(this.fetch, "DELETE", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, noResolveJson: true });
              return n10 ? this._returnResult({ data: null, error: n10 }) : this._returnResult({ data: null, error: null });
            });
          } catch (e11) {
            if (nZ(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
      }
      ad.nextInstanceID = {};
      let ap = ad, af = "";
      if ("u" > typeof Deno) af = "deno", i = null == (eR = Deno.version) ? void 0 : eR.deno;
      else if ("u" > typeof document) af = "web";
      else if ("u" > typeof navigator && "ReactNative" === navigator.product) af = "react-native";
      else {
        af = "node";
        let e10 = globalThis.process;
        i = null == e10 || null == (eC = e10.version) ? void 0 : eC.replace(/^v/, "");
      }
      let ag = [`runtime=${af}`];
      i && ag.push(`runtime-version=${i}`);
      let am = { headers: { "X-Client-Info": `supabase-js/2.119.0; ${ag.join("; ")}` } }, ay = { schema: "public" }, ab = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, av = {}, aw = { enabled: false, respectSamplingDecision: true };
      function a_(e10) {
        return (a_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function aS(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s10 = Object.getOwnPropertySymbols(e10);
          t10 && (s10 = s10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s10);
        }
        return r10;
      }
      function ak(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? aS(Object(r10), true).forEach(function(t11) {
            !(function(e11, t12, r11) {
              var s10;
              (s10 = (function(e12, t13) {
                if ("object" != a_(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s11 = r12.call(e12, t13 || "default");
                  if ("object" != a_(s11)) return s11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              })(t12, "string"), (t12 = "symbol" == a_(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            })(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : aS(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let aE = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), aT = (e10) => e10.startsWith("sb_publishable_") || e10.startsWith("sb_secret_"), ax = /* @__PURE__ */ new Set(), aR = (e10, t10, r10, s10, n10, i10) => {
        let a3 = aE(s10), o2 = Headers, l2 = (null == n10 ? void 0 : n10.enabled) === true, u2 = (null == n10 ? void 0 : n10.respectSamplingDecision) !== false, c2 = l2 ? (function(e11) {
          let t11 = [];
          try {
            let r11 = new URL(e11);
            t11.push(r11.hostname);
          } catch (e12) {
          }
          return t11.push("*.supabase.co", "*.supabase.in"), t11.push("localhost", "127.0.0.1", "[::1]"), t11;
        })(t10) : null, h2 = !((null == i10 ? void 0 : i10.omitApiKeyAsBearer) && aT(e10));
        return async (t11, s11) => {
          let n11 = await r10(), i11 = new o2(null == s11 ? void 0 : s11.headers);
          if (i11.has("apikey") || i11.set("apikey", e10), !i11.has("Authorization")) {
            let t12 = null != n11 ? n11 : h2 ? e10 : null;
            t12 && i11.set("Authorization", `Bearer ${t12}`);
          }
          if (c2) {
            let e11 = (function(e12, t12, r11) {
              let s12 = globalThis[r2];
              if (!s12) return aC || (aC = true, console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")), null;
              if (!(function(e13, t13) {
                let r12;
                if (!e13 || !t13 || 0 === t13.length) return false;
                if (e13 instanceof URL) r12 = e13;
                else try {
                  r12 = new URL(e13);
                } catch (e14) {
                  return false;
                }
                for (let e14 of t13) try {
                  if ("string" == typeof e14) {
                    if ((function(e15, t14) {
                      if (t14 === e15) return true;
                      if (t14.startsWith("*.")) {
                        let r13 = t14.slice(2);
                        if (e15.endsWith(r13) && (e15 === r13 || e15.endsWith("." + r13))) return true;
                      }
                      return false;
                    })(r12.hostname, e14)) return true;
                  } else if (e14 instanceof RegExp) {
                    if (e14.test(r12.hostname)) return true;
                  } else if ("function" == typeof e14 && e14(r12)) return true;
                } catch (e15) {
                  continue;
                }
                return false;
              })("string" == typeof e12 || e12 instanceof URL ? e12 : e12.url, t12)) return null;
              let n12 = s12();
              if (!n12 || !n12.traceparent) {
                var i12;
                if ((null == n12 || null == (i12 = n12.carrierKeys) ? void 0 : i12.length) && !aO) {
                  aO = true;
                  let e13 = n12.carrierKeys.includes("sentry-trace") ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it." : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
                  console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${n12.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.` + e13);
                }
                return null;
              }
              if (r11) {
                let e13 = (function(e14) {
                  if (!e14 || "string" != typeof e14) return null;
                  let t13 = e14.split("-");
                  if (4 !== t13.length) return null;
                  let [r12, s13, n13, i13] = t13;
                  if (2 !== r12.length || 32 !== s13.length || 16 !== n13.length || 2 !== i13.length) return null;
                  let a4 = /^[0-9a-f]+$/i;
                  return a4.test(r12) && a4.test(s13) && a4.test(n13) && a4.test(i13) && "00000000000000000000000000000000" !== s13 && "0000000000000000" !== n13 ? { version: r12, traceId: s13, parentId: n13, traceFlags: i13, isSampled: (1 & parseInt(i13, 16)) == 1 } : null;
                })(n12.traceparent);
                if (e13 && !e13.isSampled) return { traceparent: n12.traceparent };
              }
              return n12;
            })(t11, c2, u2);
            e11 && (e11.traceparent && !i11.has("traceparent") && i11.set("traceparent", e11.traceparent), e11.tracestate && !i11.has("tracestate") && i11.set("tracestate", e11.tracestate), e11.baggage && !i11.has("baggage") && i11.set("baggage", e11.baggage));
          }
          return a3(t11, ak(ak({}, s11), {}, { headers: i11 }));
        };
      }, aC = false, aO = false;
      function aP(e10) {
        return "boolean" == typeof e10 ? { enabled: e10 } : e10;
      }
      let aA = false;
      var aI = class extends ap {
        constructor(e10) {
          super(e10);
        }
      }, aj = class {
        constructor(e10, t10, r10) {
          var s10, n10, i10;
          this.supabaseUrl = e10, this.supabaseKey = t10;
          let a3 = (function(e11) {
            let t11 = null == e11 ? void 0 : e11.trim();
            if (!t11) throw Error("supabaseUrl is required.");
            if (!t11.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
            try {
              return new URL(t11.endsWith("/") ? t11 : t11 + "/");
            } catch (e12) {
              throw Error("Invalid supabaseUrl: Provided URL is malformed.");
            }
          })(e10);
          if (!t10) throw Error("supabaseKey is required.");
          ((e11) => {
            var t11, r11;
            if (!e11.startsWith("sb_") || aT(e11) || e11.startsWith("sb_temp_")) return;
            let s11 = null != (t11 = null == (r11 = e11.match(/^sb_[a-zA-Z0-9]+_/)) ? void 0 : r11[0]) ? t11 : "unknown";
            ax.has(s11) || (ax.add(s11), console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."));
          })(t10), aA || "object" == typeof r10 && null !== r10 && "schema" in r10 && void 0 !== r10.schema && (aA = true, console.warn(`@supabase/supabase-js: The "schema" option must be nested under "db", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level "schema" is ignored and queries go to the default schema.`)), this.realtimeUrl = new URL("realtime/v1", a3), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a3), this.storageUrl = new URL("storage/v1", a3), this.functionsUrl = new URL("functions/v1", a3);
          let o2 = `sb-${a3.hostname.split(".")[0]}-auth-token`, l2 = (function(e11, t11) {
            var r11, s11, n11, i11, a4, o3;
            let { db: l3, auth: u2, realtime: c2, global: h2 } = e11, { db: d2, auth: p2, realtime: f2, global: g2 } = t11, m2 = aP(e11.tracePropagation), y2 = aP(t11.tracePropagation), b2 = { db: ak(ak({}, d2), l3), auth: ak(ak({}, p2), u2), realtime: ak(ak({}, f2), c2), storage: {}, global: ak(ak(ak({}, g2), h2), {}, { headers: ak(ak({}, null != (r11 = null == g2 ? void 0 : g2.headers) ? r11 : {}), null != (s11 = null == h2 ? void 0 : h2.headers) ? s11 : {}) }), tracePropagation: { enabled: null != (n11 = null != (i11 = null == m2 ? void 0 : m2.enabled) ? i11 : null == y2 ? void 0 : y2.enabled) && n11, respectSamplingDecision: null == (a4 = null != (o3 = null == m2 ? void 0 : m2.respectSamplingDecision) ? o3 : null == y2 ? void 0 : y2.respectSamplingDecision) || a4 }, accessToken: async () => "" };
            return e11.accessToken ? b2.accessToken = e11.accessToken : delete b2.accessToken, b2;
          })(null != r10 ? r10 : {}, { db: ay, realtime: av, auth: ak(ak({}, ab), {}, { storageKey: o2 }), global: am, tracePropagation: aw });
          this.settings = l2, this.storageKey = null != (s10 = l2.auth.storageKey) ? s10 : "", this.headers = null != (n10 = l2.global.headers) ? n10 : {}, l2.accessToken ? (this.accessToken = l2.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null != (i10 = l2.auth) ? i10 : {}, this.headers, l2.global.fetch), this.fetch = aR(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation), this.functionsFetch = aR(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation, { omitApiKeyAsBearer: true }), this.realtime = this._initRealtimeClient(ak({ headers: this.headers, accessToken: this._getAccessToken.bind(this), fetch: this.fetch }, l2.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then((e11) => this.realtime.setAuth(e11)).catch((e11) => console.warn("Failed to set initial Realtime auth token:", e11)), this.rest = new sp(new URL("rest/v1", a3).href, { headers: this.headers, schema: l2.db.schema, fetch: aE(l2.global.fetch), wrapFetch: (r11) => aR(t10, e10, this._getSessionToken.bind(this), r11, l2.tracePropagation), timeout: l2.db.timeout, urlLengthLimit: l2.db.urlLengthLimit, retry: l2.db.retry }), this.storage = new nG(this.storageUrl.href, this.headers, this.fetch, null == r10 ? void 0 : r10.storage), l2.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new r8(this.functionsUrl.href, { headers: this.headers, customFetch: this.functionsFetch });
        }
        from(e10, t10) {
          return this.rest.from(e10, t10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        getOpenApiSpec() {
          return this.rest.getOpenApiSpec();
        }
        rpc(e10, t10 = {}, r10 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getSessionToken() {
          var e10, t10;
          if (this.accessToken) return await this.accessToken();
          let { data: r10 } = await this.auth.getSession();
          return null != (e10 = null == (t10 = r10.session) ? void 0 : t10.access_token) ? e10 : null;
        }
        async _getAccessToken() {
          var e10;
          return null != (e10 = await this._getSessionToken()) ? e10 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s10, userStorage: n10, storageKey: i10, flowType: a3, lock: o2, debug: l2, throwOnError: u2, experimental: c2, lockAcquireTimeout: h2, skipAutoInitialize: d2 }, p2, f2) {
          let g2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new aI({ url: this.authUrl.href, headers: ak(ak({}, g2), p2), storageKey: i10, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s10, userStorage: n10, flowType: a3, lock: o2, debug: l2, throwOnError: u2, experimental: c2, fetch: f2, lockAcquireTimeout: h2, skipAutoInitialize: d2, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e11) => "authorization" === e11.toLowerCase()) });
        }
        _initRealtimeClient(e10) {
          return new ne(this.realtimeUrl.href, ak(ak({}, e10), {}, { params: ak(ak({}, { apikey: this.supabaseKey }), null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10 || "INITIAL_SESSION" === e10) && this.changedAccessToken !== r10 ? (this.changedAccessToken = r10, this.realtime.setAuth(r10)) : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
      (function() {
        if (void 0 !== globalThis.Deno) return false;
        let e10 = globalThis.process;
        if (!e10) return false;
        let t10 = e10.version;
        if (null == t10) return false;
        let r10 = t10.match(/^v(\d+)\./);
        return !!r10 && 20 >= parseInt(r10[1], 10);
      })() && console.warn("\u26A0\uFE0F  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
      var aN = e.i(99929);
      let a$ = { path: "/", sameSite: "lax", httpOnly: false, maxAge: 3456e4 }, aL = /^(.*)[.](0|[1-9][0-9]*)$/;
      function aD(e10, t10) {
        if (e10 === t10) return true;
        let r10 = e10.match(aL);
        return !!r10 && r10[1] === t10;
      }
      function aU(e10, t10, r10) {
        let s10 = r10 ?? 3180, n10 = encodeURIComponent(t10);
        if (n10.length <= s10) return [{ name: e10, value: t10 }];
        let i10 = [];
        for (; n10.length > 0; ) {
          let e11 = n10.slice(0, s10), t11 = e11.lastIndexOf("%");
          t11 > s10 - 3 && (e11 = e11.slice(0, t11));
          let r11 = "";
          for (; e11.length > 0; ) try {
            r11 = decodeURIComponent(e11);
            break;
          } catch (t12) {
            if (t12 instanceof URIError && "%" === e11.at(-3) && e11.length > 3) e11 = e11.slice(0, e11.length - 3);
            else throw t12;
          }
          i10.push(r11), n10 = n10.slice(e11.length);
        }
        return i10.map((t11, r11) => ({ name: `${e10}.${r11}`, value: t11 }));
      }
      async function aM(e10, t10) {
        let r10 = await t10(e10);
        if (r10) return r10;
        let s10 = [];
        for (let r11 = 0; ; r11++) {
          let n10 = `${e10}.${r11}`, i10 = await t10(n10);
          if (!i10) break;
          s10.push(i10);
        }
        return s10.length > 0 ? s10.join("") : null;
      }
      aN.parse, aN.serialize;
      let aq = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), aB = " 	\n\r=".split(""), aF = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < aB.length; t10 += 1) e10[aB[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < aq.length; t10 += 1) e10[aq[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function aH(e10) {
        let t10 = [], r10 = 0, s10 = 0;
        if ((function(e11, t11) {
          for (let r11 = 0; r11 < e11.length; r11 += 1) {
            let s11 = e11.charCodeAt(r11);
            if (s11 > 55295 && s11 <= 56319) {
              let t12 = (s11 - 55296) * 1024 & 65535;
              s11 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
            }
            !(function(e12, t12) {
              if (e12 <= 127) return t12(e12);
              if (e12 <= 2047) {
                t12(192 | e12 >> 6), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 65535) {
                t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 1114111) {
                t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
            })(s11, t11);
          }
        })(e10, (e11) => {
          for (r10 = r10 << 8 | e11, s10 += 8; s10 >= 6; ) {
            let e12 = r10 >> s10 - 6 & 63;
            t10.push(aq[e12]), s10 -= 6;
          }
        }), s10 > 0) for (r10 <<= 6 - s10, s10 = 6; s10 >= 6; ) {
          let e11 = r10 >> s10 - 6 & 63;
          t10.push(aq[e11]), s10 -= 6;
        }
        return t10.join("");
      }
      let aG = "base64-", az = /-flow-[A-Za-z0-9_-]{8,64}-code-verifier$/;
      function aV(e10) {
        let t10;
        if (!e10.startsWith(aG)) return e10;
        try {
          t10 = (function(e11) {
            let t11 = [], r10 = (e12) => {
              t11.push(String.fromCodePoint(e12));
            }, s10 = { utf8seq: 0, codepoint: 0 }, n10 = 0, i10 = 0;
            for (let t12 = 0; t12 < e11.length; t12 += 1) {
              let a3 = aF[e11.charCodeAt(t12)];
              if (a3 > -1) for (n10 = n10 << 6 | a3, i10 += 6; i10 >= 8; ) (function(e12, t13, r11) {
                if (0 === t13.utf8seq) {
                  if (e12 <= 127) return r11(e12);
                  for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                    t13.utf8seq = r12;
                    break;
                  }
                  if (2 === t13.utf8seq) t13.codepoint = 31 & e12;
                  else if (3 === t13.utf8seq) t13.codepoint = 15 & e12;
                  else if (4 === t13.utf8seq) t13.codepoint = 7 & e12;
                  else throw Error("Invalid UTF-8 sequence");
                  t13.utf8seq -= 1;
                } else if (t13.utf8seq > 0) {
                  if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
                  t13.codepoint = t13.codepoint << 6 | 63 & e12, t13.utf8seq -= 1, 0 === t13.utf8seq && r11(t13.codepoint);
                }
              })(n10 >> i10 - 8 & 255, s10, r10), i10 -= 8;
              else if (-2 === a3) continue;
              else throw Error(`Invalid Base64-URL character "${e11.at(t12)}" at position ${t12}`);
            }
            return t11.join("");
          })(e10.substring(aG.length));
        } catch (e11) {
          return console.warn("@supabase/ssr: could not base64url-decode chunked cookie value, treating as absent. Cookie chunks may have been written partially across responses.", e11), null;
        }
        try {
          JSON.parse(t10);
        } catch {
          return console.warn("@supabase/ssr: chunked cookie decoded to invalid JSON, treating as absent. This usually indicates that cookie chunks from different writes were combined (e.g. response committed before all Set-Cookie headers were sent)."), null;
        }
        return t10;
      }
      async function aW({ getAll: e10, setAll: t10, setItems: r10, removedItems: s10 }, n10) {
        let i10 = n10.cookieEncoding, a3 = n10.cookieOptions ?? null, o2 = await e10([...r10 ? Object.keys(r10) : [], ...s10 ? Object.keys(s10) : []]), l2 = o2?.map(({ name: e11 }) => e11) || [], u2 = new Map(o2?.map(({ name: e11, value: t11 }) => [e11, t11]) || []), c2 = Object.keys(s10).flatMap((e11) => l2.filter((t11) => aD(t11, e11))), h2 = Object.keys(r10).flatMap((e11) => {
          let t11 = new Set(l2.filter((t12) => aD(t12, e11))), s11 = r10[e11];
          "base64url" === i10 && (s11 = aG + aH(s11));
          let n11 = aU(e11, s11);
          return n11.forEach((e12) => {
            t11.delete(e12.name);
          }), c2.push(...t11), n11;
        }).filter(({ name: e11, value: t11 }) => u2.get(e11) !== t11), d2 = c2.filter((e11) => u2.has(e11)), p2 = { ...a$, ...a3, maxAge: 0 }, f2 = { ...a$, ...a3, maxAge: a$.maxAge };
        delete p2.name, delete f2.name;
        let g2 = p2.domain && d2.length > 0 ? (() => {
          let { domain: e11, ...t11 } = p2;
          return t11;
        })() : null;
        (0 !== d2.length || 0 !== h2.length) && await t10([...g2 ? d2.map((e11) => ({ name: e11, value: "", options: g2 })) : [], ...d2.map((e11) => ({ name: e11, value: "", options: p2 })), ...h2.map(({ name: e11, value: t11 }) => ({ name: e11, value: t11, options: f2 }))], { "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0", Expires: "0", Pragma: "no-cache" });
      }
      let aK = /* @__PURE__ */ new Set(), aJ = false, aX = ["@supabase/auth-helpers-nextjs", "@supabase/auth-helpers-react", "@supabase/auth-helpers-remix", "@supabase/auth-helpers-sveltekit"];
      async function aY(e10) {
        let t10 = eL.next({ request: { headers: e10.headers } }), r10 = (function(e11, t11, r11) {
          var s11;
          if (!(function() {
            if (aJ || "u" < typeof process || !process.env?.npm_package_name) return;
            let e12 = process.env.npm_package_name;
            aX.includes(e12) && (aJ = true, console.warn(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551 \u26A0\uFE0F  IMPORTANT: Package Consolidation Notice                                \u2551
\u2551                                                                            \u2551
\u2551 The ${e12.padEnd(35)} package name is deprecated.  \u2551
\u2551                                                                            \u2551
\u2551 You are now using @supabase/ssr - a unified solution for all frameworks.  \u2551
\u2551                                                                            \u2551
\u2551 The auth-helpers packages have been consolidated into @supabase/ssr       \u2551
\u2551 to provide better maintenance and consistent APIs across frameworks.      \u2551
\u2551                                                                            \u2551
\u2551 Please update your package.json to use @supabase/ssr directly:            \u2551
\u2551   npm uninstall ${e12.padEnd(42)} \u2551
\u2551   npm install @supabase/ssr                                               \u2551
\u2551                                                                            \u2551
\u2551 For more information, visit:                                              \u2551
\u2551 https://supabase.com/docs/guides/auth/server-side                         \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
    `));
          })(), !e11 || !t11) throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
          r11?.auth?.storage && (s11 = "@supabase/ssr: createServerClient always manages the session via cookies, so the `auth.storage` option you passed is ignored. If you want to source the session from somewhere other than the request cookies, use @supabase/supabase-js's createClient directly with your own `storage` instead.", aK.has(s11) || (aK.add(s11), console.warn(s11)));
          let { storage: n11, getAll: i10, setAll: a3, setItems: o2, removedItems: l2 } = (function(e12, t12) {
            let r12, s12, n12 = e12.cookies && ("get" in e12.cookies || "getAll" in e12.cookies) ? e12.cookies : null, i11 = e12.cookieEncoding, a4 = {}, o3 = {};
            if (n12) if ("get" in n12) {
              let e13 = async (e14) => {
                let t13 = e14.flatMap((e15) => [e15, ...Array.from({ length: 5 }).map((t14, r14) => `${e15}.${r14}`)]), r13 = [];
                for (let e15 = 0; e15 < t13.length; e15 += 1) {
                  let s13 = await n12.get(t13[e15]);
                  (s13 || "string" == typeof s13) && r13.push({ name: t13[e15], value: s13 });
                }
                return r13;
              };
              if (r12 = async (t13) => await e13(t13), "set" in n12 && "remove" in n12) s12 = async (e14) => {
                for (let t13 = 0; t13 < e14.length; t13 += 1) {
                  let { name: r13, value: s13, options: i12 } = e14[t13];
                  s13 ? await n12.set(r13, s13, i12) : await n12.remove(r13, i12);
                }
              };
              else if (t12) s12 = async () => {
                console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
              };
              else throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
            } else if ("getAll" in n12) if (r12 = async () => await n12.getAll(), "setAll" in n12) s12 = n12.setAll;
            else if (t12) s12 = async () => {
              console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
            };
            else throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            else throw Error(`@supabase/ssr: ${t12 ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).`);
            else if (t12 || 1) if (t12) throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else r12 = () => [], s12 = () => {
              throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
            };
            else r12 = () => {
              let e13;
              return Object.keys(e13 = (0, aN.parse)(document.cookie)).map((t13) => ({ name: t13, value: e13[t13] ?? "" }));
            }, s12 = (e13) => {
              e13.forEach(({ name: e14, value: t13, options: r13 }) => {
                document.cookie = (0, aN.serialize)(e14, t13, r13);
              });
            };
            if (!t12) return { getAll: r12, setAll: s12, setItems: a4, removedItems: o3, storage: { isServer: false, getItem: async (e13) => {
              let t13 = await r12([e13]), s13 = await aM(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              return s13 ? aV(s13) : null;
            }, setItem: async (t13, n13) => {
              let a5 = await r12([t13]), o4 = new Set((a5?.map(({ name: e13 }) => e13) || []).filter((e13) => aD(e13, t13))), l4 = n13;
              "base64url" === i11 && (l4 = aG + aH(n13));
              let u4 = aU(t13, l4);
              u4.forEach(({ name: e13 }) => {
                o4.delete(e13);
              });
              let c2 = { ...a$, ...e12?.cookieOptions, maxAge: 0 }, h2 = { ...a$, ...e12?.cookieOptions, maxAge: a$.maxAge };
              delete c2.name, delete h2.name;
              let d2 = c2.domain ? (() => {
                let { domain: e13, ...t14 } = c2;
                return t14;
              })() : null, p2 = [...d2 ? [...o4].map((e13) => ({ name: e13, value: "", options: d2 })) : [], ...[...o4].map((e13) => ({ name: e13, value: "", options: c2 })), ...u4.map(({ name: e13, value: t14 }) => ({ name: e13, value: t14, options: h2 }))];
              p2.length > 0 && await s12(p2, {});
            }, removeItem: async (t13) => {
              let n13 = await r12([t13]), i12 = (n13?.map(({ name: e13 }) => e13) || []).filter((e13) => aD(e13, t13));
              if (0 === i12.length) return;
              let a5 = { ...a$, ...e12?.cookieOptions, maxAge: 0 };
              delete a5.name;
              let o4 = a5.domain ? (() => {
                let { domain: e13, ...t14 } = a5;
                return t14;
              })() : null, l4 = [...o4 ? i12.map((e13) => ({ name: e13, value: "", options: o4 })) : [], ...i12.map((e13) => ({ name: e13, value: "", options: a5 }))];
              await s12(l4, {});
            } } };
            let l3 = s12, u3 = false;
            return { getAll: r12, setAll: s12 = async (e13, t13) => {
              let r13 = !u3 && Object.keys(t13).length > 0;
              await l3(e13, r13 ? t13 : {}), r13 && (u3 = true);
            }, setItems: a4, removedItems: o3, storage: { isServer: true, getItem: async (e13) => {
              if ("string" == typeof a4[e13]) return a4[e13];
              if (o3[e13]) return null;
              let t13 = await r12([e13]), s13 = await aM(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              return s13 ? "string" != typeof s13 ? s13 : aV(s13) : null;
            }, setItem: async (t13, n13) => {
              t13.endsWith("-code-verifier") && await aW({ getAll: r12, setAll: s12, setItems: { [t13]: n13 }, removedItems: {} }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: i11 }), a4[t13] = n13, delete o3[t13];
            }, removeItem: async (t13) => {
              (az.test(t13) || t13.endsWith("-flows-code-verifier")) && await aW({ getAll: r12, setAll: s12, setItems: {}, removedItems: { [t13]: true } }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: i11 }), delete a4[t13], o3[t13] = true;
            } } };
          })({ ...r11, cookieEncoding: r11?.cookieEncoding ?? "base64url" }, true), u2 = new aj(e11, t11, { ...r11, global: { ...r11?.global, headers: { ...r11?.global?.headers, "X-Client-Info": "supabase-ssr/0.12.7 createServerClient" } }, auth: { ...r11?.cookieOptions?.name ? { storageKey: r11.cookieOptions.name } : null, ...r11?.auth, flowType: "pkce", autoRefreshToken: false, detectSessionInUrl: false, persistSession: true, skipAutoInitialize: true, storage: n11, ...r11?.cookies && "encode" in r11.cookies && "tokens-only" === r11.cookies.encode ? { userStorage: r11?.auth?.userStorage ?? /* @__PURE__ */ (function(e12 = {}) {
            return { getItem: (t12) => e12[t12] || null, setItem: (t12, r12) => {
              e12[t12] = r12;
            }, removeItem: (t12) => {
              delete e12[t12];
            } };
          })() } : null } });
          return u2.auth.onAuthStateChange(async (e12) => {
            (Object.keys(o2).length > 0 || Object.keys(l2).length > 0) && ("SIGNED_IN" === e12 || "TOKEN_REFRESHED" === e12 || "USER_UPDATED" === e12 || "PASSWORD_RECOVERY" === e12 || "SIGNED_OUT" === e12 || "MFA_CHALLENGE_VERIFIED" === e12) && await aW({ getAll: i10, setAll: a3, setItems: o2, removedItems: l2 }, { cookieOptions: r11?.cookieOptions ?? null, cookieEncoding: r11?.cookieEncoding ?? "base64url" });
          }), u2;
        })("https://bgwjlhoyzwzwavftromg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnd2psaG95end6d2F2ZnRyb21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjUwMjAsImV4cCI6MjEwNTEwMTAyMH0.sL0HYfM-lX5CF1YPB771e79M0hzwYv90_SrpAt1BfCg", { cookies: { getAll: () => e10.cookies.getAll(), setAll(r11) {
          r11.forEach(({ name: t11, value: r12 }) => e10.cookies.set(t11, r12)), t10 = eL.next({ request: e10 }), r11.forEach(({ name: e11, value: r12, options: s11 }) => t10.cookies.set(e11, r12, s11));
        } } }), { data: { user: s10 } } = await r10.auth.getUser(), n10 = e10.nextUrl.pathname;
        return "/admin" === n10 || n10.startsWith("/admin/") && "/admin/dashboard" !== n10 && !s10 ? eL.redirect(new URL("/admin/dashboard", e10.url)) : t10;
      }
      e.s(["config", 0, { matcher: ["/admin", "/admin/:path*"] }, "middleware", 0, aY], 99446);
      let aQ = { ...e.i(99446) }, aZ = "/middleware", a0 = aQ.middleware || aQ.default;
      if ("function" != typeof a0) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${aZ}" must export a function named \`middleware\` or a default function.`);
      let a1 = async (e10) => {
        let t10, r10;
        try {
          return await ri({ ...e10, IncrementalCache: rQ, incrementalCacheHandler: null, page: aZ, handler: async (...e11) => {
            try {
              return await a0(...e11);
            } catch (n10) {
              let t11 = e11[0], r11 = new URL(t11.url), s10 = r11.pathname + r11.search;
              throw await c(n10, { path: s10, method: t11.method, headers: Object.fromEntries(t11.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n10;
            }
          }, emitInstrumentationSpans: t10, requestStartTime: r10 });
        } catch (e11) {
          try {
            null == t10 || t10();
          } catch {
          }
          throw e11;
        }
      };
      async function a2(e10, t10) {
        let r10 = await a1({ request: { url: e10.url, method: e10.method, headers: O(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: aZ }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, a1, "handler", 0, a2], 42738);
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return o;
      } };
      for (var n in s) Object.defineProperty(r, n, { enumerable: true, get: s[n] });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let s2 = t2.url(e2);
        return { url: s2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let s2 = a(e2, t2);
        return s2 ? i.run(s2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var s = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return h;
      }, reader: function() {
        return o;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: i2, body: a2, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: h2, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(i2), ["next-test-stack", (function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        })()]], body: a2 ? s.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: h2, referrer: d, referrerPolicy: p } };
      }
      function u(e2, t2) {
        return t2.headers.set("next-test-internal", "1"), e2(t2);
      }
      async function c(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, o);
        if (!r2) return u(e2, t2);
        let { testData: n2, proxyPort: i2 } = r2, c2 = await l(n2, t2), h2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(c2), headers: { "next-test-internal": "1" }, next: { internal: true } });
        if (!h2.ok) throw Error(`Proxy request failed: ${h2.status}`);
        let d = await h2.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return u(e2, t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
          case "fetch":
            return (function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? s.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            })(d);
          default:
            return p;
        }
      }
      function h(t2) {
        return e.g.fetch = function(e2, r2) {
          var s2;
          return (null == r2 || null == (s2 = r2.next) ? void 0 : s2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var n in s) Object.defineProperty(r, n, { enumerable: true, get: s[n] });
      let i = e.r(25085), a = e.r(28325);
      function o() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1p2ih1cc12rzs.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1p2ih1cc12rzs = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1p2ih1cc12rzs.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1p2ih1cc12rzs.js", { otherChunks: ["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0h-u1c1sve-7_.js", "chunks/[root-of-the-server]__218ianxd1r9q_._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      var t, r = globalThis.TURBOPACK;
      if (void 0 === r) r = [];
      else if (!Array.isArray(r)) return;
      var n = ((t = n || {})[t.Runtime = 0] = "Runtime", t[t.Parent = 1] = "Parent", t[t.Update = 2] = "Update", t);
      let o = /* @__PURE__ */ new WeakMap();
      function l(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let i = l.prototype, u = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        u.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function f(e2, t2) {
        let r2 = e2.get(t2);
        return void 0 === r2 && (r2 = c(t2), e2.set(t2, r2)), r2;
      }
      function c(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function d(e2, t2, r2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let n2 = 0;
        for (; n2 < t2.length; ) {
          let r3 = t2[n2++], o2 = t2[n2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, r3, { value: t2[n2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[n2] ? s(e2, r3, { get: o2, set: t2[n2++], enumerable: true }) : s(e2, r3, { get: o2, enumerable: true });
        }
        r2 || Object.seal(e2);
      }
      function p(e2, t2, r2) {
        let n2, o2;
        null != t2 ? o2 = (n2 = f(this.c, t2)).exports : (n2 = this.m, o2 = this.e), n2.namespaceObject = o2, d(o2, e2, r2);
      }
      function h(e2, t2, r2, n2) {
        let o2 = Reflect.getOwnPropertyDescriptor(r2, n2);
        if (o2) {
          if ("value" in o2) return void e2.push(t2, 0, o2.value);
          if (o2.get) return void e2.push(t2, o2.get);
        }
        e2.push(t2, () => r2[n2]);
      }
      function m(e2, t2) {
        (null != t2 ? f(this.c, t2) : this.m).exports = e2;
      }
      i.s = p, i.S = function(e2, t2) {
        let r2 = [], n2 = 0;
        for (; n2 < e2.length; ) {
          let t3 = e2[n2++], o2 = n2;
          for (; n2 < e2.length && 0 !== e2[n2]; ) n2++;
          let l2 = n2;
          n2++;
          let i2 = "string" == typeof t3 || "number" == typeof t3 ? w.call(this, t3) : t3;
          if (l2 - o2 == 1) {
            let t4 = e2[o2].split(",");
            for (let e3 = 0; e3 < t4.length; e3 += 2) h(r2, t4[e3], i2, t4[e3 + 1]);
          } else for (let t4 = o2; t4 < l2; t4 += 2) h(r2, e2[t4], i2, e2[t4 + 1]);
        }
        p.call(this, r2, t2);
      }, i.j = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = f(this.c, t2)).exports : (r2 = this.m, n2 = this.e);
        let l2 = (function(e3, t3) {
          let r3 = o.get(e3);
          if (!r3) {
            o.set(e3, r3 = []);
            let n3 = (e4) => {
              if ("default" !== e4) {
                for (let t4 of r3) if (u.call(t4, e4)) return t4;
              }
            };
            e3.exports = e3.namespaceObject = new Proxy(t3, { get(e4, t4) {
              if (u.call(e4, t4) || "default" === t4 || "__esModule" === t4) return Reflect.get(e4, t4);
              let r4 = n3(t4);
              return r4 && Reflect.get(r4, t4);
            }, set: () => false, defineProperty: () => false, deleteProperty: () => false, has: (e4, t4) => !!Reflect.has(e4, t4) || "default" !== t4 && "__esModule" !== t4 && void 0 !== n3(t4), ownKeys(e4) {
              let t4 = Reflect.ownKeys(e4);
              for (let e5 of r3) for (let r4 of Reflect.ownKeys(e5)) "default" === r4 || t4.includes(r4) || t4.push(r4);
              return t4;
            }, getOwnPropertyDescriptor(e4, t4) {
              let r4 = Reflect.getOwnPropertyDescriptor(e4, t4);
              if (r4 || "default" === t4 || "__esModule" === t4) return r4;
              let o2 = n3(t4);
              if (o2) return { enumerable: true, configurable: true, get: () => Reflect.get(o2, t4) };
            } });
          }
          return r3;
        })(r2, n2);
        "object" == typeof e2 && null !== e2 && l2.push(e2);
      }, i.v = m, i.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? f(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let g = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, y = [null, g({}), g([]), g(g)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !y.includes(t3); t3 = g(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ (function(e3, t4) {
          return () => e3[t4];
        })(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), d(t2, n2), t2;
      }
      function _(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function w(e2) {
        let t2 = q(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, _(r2), r2 && r2.__esModule);
      }
      function O(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function k(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      i.i = w, i.A = function(e2) {
        return this.r(e2)(w.bind(this));
      }, i.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, i.r = function(e2) {
        return q(e2, this.m).exports;
      }, i.f = function(e2) {
        function t2(t3) {
          if (t3 = O(t3), u.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = O(t3), u.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function P(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, i.U = v, i.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, i.g = globalThis;
      let R = l.prototype, C = "string" == typeof TURBOPACK_CHUNK_BASE_PATH ? TURBOPACK_CHUNK_BASE_PATH : "", U = /* @__PURE__ */ new Map();
      i.M = U;
      let j = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
      async function x(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return (function(e3, t3, r3) {
          return A(e3, t3, r3);
        })(e2, t2, S(r2));
        let o2 = r2.included || [], l2 = o2.map((e3) => !!U.has(e3) || j.get(e3));
        if (l2.length > 0 && l2.every((e3) => e3)) return void await Promise.all(l2);
        for (let l3 of (n2 = A(e2, t2, S(r2.path)), o2)) j.has(l3) || j.set(l3, n2);
        await n2;
      }
      R.l = function(e2) {
        return x(n.Parent, this.m.id, e2);
      };
      let E = Promise.resolve(void 0), T = /* @__PURE__ */ new WeakMap();
      function A(t2, r2, o2) {
        let l2 = e.loadChunkCached(t2, o2), i2 = T.get(l2);
        if (void 0 === i2) {
          let e2 = T.set.bind(T, l2, E);
          i2 = l2.then(e2).catch((e3) => {
            let l3;
            switch (t2) {
              case n.Runtime:
                l3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                l3 = `from module ${r2}`;
                break;
              case n.Update:
                l3 = "from an HMR update";
                break;
              default:
                P(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let i3 = Error(`Failed to load chunk ${o2} ${l3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw i3.name = "ChunkLoadError", i3;
          }), T.set(l2, i2);
        }
        return i2;
      }
      R.L = function(e2) {
        var t2, r2;
        return t2 = n.Parent, r2 = this.m.id, A(t2, r2, e2);
      };
      R.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, R.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, R.F = function(e2, t2) {
        return `file:///${encodeURIComponent(t2 ?? "ROOT")}/${e2.split("/").map(encodeURIComponent).join("/")}`;
      }, R.q = function(e2, t2) {
        m.call(this, `${e2}`, t2);
      };
      let K = /[^A-Za-z0-9\-_.!~*'()/]/;
      function S(e2, t2 = C) {
        let r2 = K.test(e2) ? e2.split("/").map(encodeURIComponent).join("/") : e2;
        return `${t2}${r2}`;
      }
      R.b = C, R.X = "", R.h = S;
      let N = /* @__PURE__ */ new Map();
      i.c = N;
      let q = (e2, t2) => {
        let r2 = N.get(e2);
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return B(e2, n.Parent, t2.id);
      };
      function B(e2, t2, r2) {
        let n2 = U.get(e2);
        if ("function" != typeof n2) throw Error((function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              P(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        })(e2, t2, r2));
        let o2 = c(e2), i2 = o2.exports;
        N.set(e2, o2);
        let u2 = new l(o2, i2);
        try {
          n2(u2, o2, i2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function I(t2) {
        let r2;
        if (!Array.isArray(t2)) return e.registerChunk(void 0, t2);
        let n2 = (function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        })(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !(function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let l2 = e2[o2];
            for (let l3 = r3; l3 < o2; l3++) {
              let r4 = e2[l3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let i2 = n3 ?? l2, u2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (u2 || (i2 === l2 && Object.defineProperty(l2, "name", { value: "module evaluation" }), u2 = true), t3.set(r4, i2));
            }
            r3 = o2 + 1;
          }
        })(t2, U)), e.registerChunk(n2, r2);
      }
      function H(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, _(n2), true);
      }
      i.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, _(t2), true) : t2;
      }, H.resolve = (e2, t2) => __require.resolve(e2, t2), i.x = H, e = { registerChunk(e2, t2) {
        if (null == e2) throw Error("inline entry registration is not supported");
        let r2 = (function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith(C) ? t3.slice(C.length) : t3;
        })(e2);
        L.add(r2), (function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && F(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        })(r2), null != t2 && (0 === t2.otherChunks.length ? F(t2.runtimeModuleIds, r2) : (function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = k(e4);
            if (L.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && F(o2.runtimeModuleIds, o2.chunkPath);
        })(r2, t2.otherChunks.filter((e3) => (function(e4) {
          let t3, r3 = e4.indexOf("?");
          if (-1 !== r3) t3 = r3;
          else {
            let r4 = e4.indexOf("#");
            t3 = -1 !== r4 ? r4 : e4.length;
          }
          return t3 >= 3 && e4.startsWith(".js", t3 - 3);
        })(k(e3))), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      } };
      let L = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function F(e2, t2) {
        for (let r2 of e2) !(function(e3, t3) {
          let r3 = N.get(t3);
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          B(t3, n.Runtime, e3);
        })(t2, r2);
      }
      globalThis.TURBOPACK = { push: I }, r.forEach(I);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_node_modules_next_dist_esm_build_templates_edge_wrapper_0h_u1c1sve_7();
    require_root_of_the_server_218ianxd1r9q();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1p2ih1cc12rzs();
  }
});

// node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  /**
   * Create a deferred promise tracked by this runner.
   *
   * @returns The tracked promise and its resolve/reject functions.
   */
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.add(detachedPromise.promise);
    return detachedPromise;
  }
  /**
   * Track background work and handle failures immediately.
   *
   * @param promise Work to await, including work registered during an active drain.
   * @returns Nothing; failures are logged rather than propagated.
   */
  add(promise) {
    this.promises.push(promise.then(() => {
    }, error));
  }
  /**
   * Drain tracked work, including additions made while earlier work is pending.
   *
   * Work started after the drain has settled still needs a new runtime waitUntil.
   * @returns Resolves when all work registered during this drain has settled.
   */
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    let awaited = 0;
    while (awaited < this.promises.length) {
      const batch = this.promises.slice(awaited);
      awaited = this.promises.length;
      await Promise.all(batch);
    }
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@vercel/request-context");
  const nextAfterContext = {
    get: () => {
      const store = globalThis.__openNextAls.getStore();
      return {
        waitUntil: store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise))
      };
    }
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "bgwjlhoyzwzwavftromg.supabase.co", "port": "", "pathname": "/storage/v1/object/public/**" }], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\MiqdadJifri\\Jalaliyya\\iritaq", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "deprecated": {}, "experimental": { "agentUpgrade": "security", "agentFeedback": false, "coldCacheBadge": false, "collapseAdapterRoutes": true, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "parallelRouteMetadata": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "reactBrowserBailout": true, "useOffline": false, "varyParams": true, "optimisticRouting": true, "concurrentRouterQueue": false, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptMozjpeg": true, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "useCacheStaticRootParamTracking": false, "globalNotFound": false, "explicitParallelRouteChildren": true, "strictRouteMatching": true, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "disableResumeDataCacheCompression": false, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "exposeRuntimeErrorsToHMR": false, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackStaleOutputMaxAge": 6048e5, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackSharedRuntime": true, "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "repoRoot": "C:\\MiqdadJifri\\Jalaliyya\\iritaq", "turbopack": { "root": "C:\\MiqdadJifri\\Jalaliyya\\iritaq" }, "distDirRoot": ".next" };
var BuildId = "cRhvmlJYPJtgL_rahyKWJ";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/academic-programs", "regex": "^/academic\\-programs(?:/)?$", "routeKeys": {}, "namedRegex": "^/academic\\-programs(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/about", "regex": "^/admin/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/about(?:/)?$" }, { "page": "/admin/academic-programs", "regex": "^/admin/academic\\-programs(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/academic\\-programs(?:/)?$" }, { "page": "/admin/admission", "regex": "^/admin/admission(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/admission(?:/)?$" }, { "page": "/admin/conference", "regex": "^/admin/conference(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/conference(?:/)?$" }, { "page": "/admin/contact", "regex": "^/admin/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/contact(?:/)?$" }, { "page": "/admin/dashboard", "regex": "^/admin/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/dashboard(?:/)?$" }, { "page": "/admin/departments", "regex": "^/admin/departments(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/departments(?:/)?$" }, { "page": "/admin/digital-library", "regex": "^/admin/digital\\-library(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/digital\\-library(?:/)?$" }, { "page": "/admin/governance", "regex": "^/admin/governance(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/governance(?:/)?$" }, { "page": "/admin/home", "regex": "^/admin/home(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/home(?:/)?$" }, { "page": "/admin/international-partnerships", "regex": "^/admin/international\\-partnerships(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/international\\-partnerships(?:/)?$" }, { "page": "/admin/journal", "regex": "^/admin/journal(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/journal(?:/)?$" }, { "page": "/admin/media-center", "regex": "^/admin/media\\-center(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/media\\-center(?:/)?$" }, { "page": "/admin/news", "regex": "^/admin/news(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/news(?:/)?$" }, { "page": "/admin/publications", "regex": "^/admin/publications(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/publications(?:/)?$" }, { "page": "/admin/research", "regex": "^/admin/research(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/research(?:/)?$" }, { "page": "/admission", "regex": "^/admission(?:/)?$", "routeKeys": {}, "namedRegex": "^/admission(?:/)?$" }, { "page": "/api/admin/homepage", "regex": "^/api/admin/homepage(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/homepage(?:/)?$" }, { "page": "/conference", "regex": "^/conference(?:/)?$", "routeKeys": {}, "namedRegex": "^/conference(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/departments", "regex": "^/departments(?:/)?$", "routeKeys": {}, "namedRegex": "^/departments(?:/)?$" }, { "page": "/digital-library", "regex": "^/digital\\-library(?:/)?$", "routeKeys": {}, "namedRegex": "^/digital\\-library(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/governance", "regex": "^/governance(?:/)?$", "routeKeys": {}, "namedRegex": "^/governance(?:/)?$" }, { "page": "/international-partnerships", "regex": "^/international\\-partnerships(?:/)?$", "routeKeys": {}, "namedRegex": "^/international\\-partnerships(?:/)?$" }, { "page": "/journal", "regex": "^/journal(?:/)?$", "routeKeys": {}, "namedRegex": "^/journal(?:/)?$" }, { "page": "/media-center", "regex": "^/media\\-center(?:/)?$", "routeKeys": {}, "namedRegex": "^/media\\-center(?:/)?$" }, { "page": "/news", "regex": "^/news(?:/)?$", "routeKeys": {}, "namedRegex": "^/news(?:/)?$" }, { "page": "/publications", "regex": "^/publications(?:/)?$", "routeKeys": {}, "namedRegex": "^/publications(?:/)?$" }, { "page": "/research", "regex": "^/research(?:/)?$", "routeKeys": {}, "namedRegex": "^/research(?:/)?$" }], "dynamic": [{ "page": "/admin/digital-library/resource/[id]", "regex": "^/admin/digital\\-library/resource/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/digital\\-library/resource/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/admin/digital-library/[slug]", "regex": "^/admin/digital\\-library/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/admin/digital\\-library/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/digital-library/resource/[id]", "regex": "^/digital\\-library/resource/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/digital\\-library/resource/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/digital-library/[slug]", "regex": "^/digital\\-library/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/digital\\-library/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 83708, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 9297, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27039, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 75476, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/academic-programs": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 114824, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/academic-programs", "dataRoute": "/academic-programs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 7257, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/about": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27711, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/about", "dataRoute": "/admin/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/academic-programs": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27742, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/academic-programs", "dataRoute": "/admin/academic-programs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/admission": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27719, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/admission", "dataRoute": "/admin/admission.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/conference": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27720, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/conference", "dataRoute": "/admin/conference.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/contact": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27714, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/contact", "dataRoute": "/admin/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/dashboard": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27756, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/dashboard", "dataRoute": "/admin/dashboard.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/departments": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27728, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/departments", "dataRoute": "/admin/departments.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/digital-library": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27740, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/digital-library", "dataRoute": "/admin/digital-library.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/governance": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27720, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/governance", "dataRoute": "/admin/governance.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/home": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27708, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/home", "dataRoute": "/admin/home.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/international-partnerships": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27754, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/international-partnerships", "dataRoute": "/admin/international-partnerships.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/journal": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27614, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/journal", "dataRoute": "/admin/journal.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/media-center": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27719, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/media-center", "dataRoute": "/admin/media-center.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/news": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27702, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/news", "dataRoute": "/admin/news.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/publications": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27726, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/publications", "dataRoute": "/admin/publications.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/research": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 27714, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/research", "dataRoute": "/admin/research.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admission": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 68066, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/admission", "dataRoute": "/admission.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/conference": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 70496, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/conference", "dataRoute": "/conference.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/contact": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 53484, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/contact", "dataRoute": "/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/departments": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 45077, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/departments", "dataRoute": "/departments.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/digital-library": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 77254, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/digital-library", "dataRoute": "/digital-library.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/governance": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 159981, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/governance", "dataRoute": "/governance.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/international-partnerships": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 59729, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/international-partnerships", "dataRoute": "/international-partnerships.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/journal": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 39138, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/journal", "dataRoute": "/journal.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/media-center": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 143524, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/media-center", "dataRoute": "/media-center.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/news": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 73671, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/news", "dataRoute": "/news.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/publications": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 63993, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/publications", "dataRoute": "/publications.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "a824a24a712bdbaf43e21662c54ee632", "previewModeSigningKey": "6dacaa5e95cbbcd32a8a1ea0ae25bd5dfb8190cbde2b33b63aed4926616ecdbd", "previewModeEncryptionKey": "4ef19ec061341ca358d3460299780c10f20bd32e0064323c7058596622f35ae9" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0h-u1c1sve-7_.js", "server/edge/chunks/[root-of-the-server]__218ianxd1r9q_._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1p2ih1cc12rzs.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1p2ih1cc12rzs.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "cRhvmlJYPJtgL_rahyKWJ", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "pKQ4j3NSxCNqNQtqH/XvCkuE0BZ+hPWdv5CcnOfXFq4=", "__NEXT_PREVIEW_MODE_ID": "a824a24a712bdbaf43e21662c54ee632", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "4ef19ec061341ca358d3460299780c10f20bd32e0064323c7058596622f35ae9", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "6dacaa5e95cbbcd32a8a1ea0ae25bd5dfb8190cbde2b33b63aed4926616ecdbd" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathsManifest = { "/_global-error/page": "app/_global-error/page.js", "/_not-found/page": "app/_not-found/page.js", "/about/page": "app/about/page.js", "/academic-programs/page": "app/academic-programs/page.js", "/admin/about/page": "app/admin/about/page.js", "/admin/academic-programs/page": "app/admin/academic-programs/page.js", "/admin/admission/page": "app/admin/admission/page.js", "/admin/conference/page": "app/admin/conference/page.js", "/admin/contact/page": "app/admin/contact/page.js", "/admin/dashboard/page": "app/admin/dashboard/page.js", "/admin/departments/page": "app/admin/departments/page.js", "/admin/digital-library/[slug]/page": "app/admin/digital-library/[slug]/page.js", "/admin/digital-library/page": "app/admin/digital-library/page.js", "/admin/digital-library/resource/[id]/page": "app/admin/digital-library/resource/[id]/page.js", "/admin/governance/page": "app/admin/governance/page.js", "/admin/home/page": "app/admin/home/page.js", "/admin/international-partnerships/page": "app/admin/international-partnerships/page.js", "/admin/journal/page": "app/admin/journal/page.js", "/admin/media-center/page": "app/admin/media-center/page.js", "/admin/news/page": "app/admin/news/page.js", "/admin/page": "app/admin/page.js", "/admin/publications/page": "app/admin/publications/page.js", "/admin/research/page": "app/admin/research/page.js", "/admission/page": "app/admission/page.js", "/api/admin/homepage/route": "app/api/admin/homepage/route.js", "/api/auth/[...nextauth]/route": "app/api/auth/[...nextauth]/route.js", "/conference/page": "app/conference/page.js", "/contact/page": "app/contact/page.js", "/departments/page": "app/departments/page.js", "/digital-library/[slug]/page": "app/digital-library/[slug]/page.js", "/digital-library/page": "app/digital-library/page.js", "/digital-library/resource/[id]/page": "app/digital-library/resource/[id]/page.js", "/favicon.ico/route": "app/favicon.ico/route.js", "/governance/page": "app/governance/page.js", "/international-partnerships/page": "app/international-partnerships/page.js", "/journal/page": "app/journal/page.js", "/media-center/page": "app/media-center/page.js", "/news/page": "app/news/page.js", "/page": "app/page.js", "/publications/page": "app/publications/page.js", "/research/page": "app/research/page.js" };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/academic-programs/page": "/academic-programs", "/admin/about/page": "/admin/about", "/admin/academic-programs/page": "/admin/academic-programs", "/admin/admission/page": "/admin/admission", "/admin/conference/page": "/admin/conference", "/admin/contact/page": "/admin/contact", "/admin/dashboard/page": "/admin/dashboard", "/admin/departments/page": "/admin/departments", "/admin/digital-library/[slug]/page": "/admin/digital-library/[slug]", "/admin/digital-library/page": "/admin/digital-library", "/admin/digital-library/resource/[id]/page": "/admin/digital-library/resource/[id]", "/admin/governance/page": "/admin/governance", "/admin/home/page": "/admin/home", "/admin/international-partnerships/page": "/admin/international-partnerships", "/admin/journal/page": "/admin/journal", "/admin/media-center/page": "/admin/media-center", "/admin/news/page": "/admin/news", "/admin/page": "/admin", "/admin/publications/page": "/admin/publications", "/admin/research/page": "/admin/research", "/admission/page": "/admission", "/api/admin/homepage/route": "/api/admin/homepage", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/conference/page": "/conference", "/contact/page": "/contact", "/departments/page": "/departments", "/digital-library/[slug]/page": "/digital-library/[slug]", "/digital-library/page": "/digital-library", "/digital-library/resource/[id]/page": "/digital-library/resource/[id]", "/favicon.ico/route": "/favicon.ico", "/governance/page": "/governance", "/international-partnerships/page": "/international-partnerships", "/journal/page": "/journal", "/media-center/page": "/media-center", "/news/page": "/news", "/page": "/", "/publications/page": "/publications", "/research/page": "/research" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = "cRhvmlJYPJtgL_rahyKWJ";
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  return getQueryFromIterator(new URLSearchParams(query).entries());
}
function getUrlParts(url, isExternal2) {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex === -1 ? "" : url.slice(hashIndex);
  const urlWithoutHash = hashIndex === -1 ? url : url.slice(0, hashIndex);
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = urlWithoutHash.match(regex2);
    return {
      hostname: "",
      pathname: urlWithoutHash.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? "",
      hash
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = urlWithoutHash.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? "",
    hash
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => searchParams.append(key, entry));
    } else {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash as createHash3 } from "node:crypto";

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
import { Buffer as Buffer3 } from "node:buffer";
import { createHash } from "node:crypto";

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    delete value.meta?.headers?.[CACHE_TAGS_HEADER];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/utils/routeCacheKey.js
import { createHash as createHash2 } from "node:crypto";
var ROUTE_CACHE_DIRECTORY = "route-cache";
var DYNAMIC_ROUTE_REGEX = /\/\[[^/]+?\](?=\/|$)/;
function useRouteCacheKeys(nextVersion) {
  return compareSemver(nextVersion, ">=", "15.5.27") && compareSemver(nextVersion, "<", "16.0.0") || compareSemver(nextVersion, ">=", "16.3.8");
}
function normalizePagePath(page) {
  if (/^\/index(\/|$)/.test(page) && !DYNAMIC_ROUTE_REGEX.test(page)) {
    return `/index${page}`;
  }
  if (page === "/") {
    return "/index";
  }
  return page.startsWith("/") ? page : `/${page}`;
}
function normalizeAppPath(entry) {
  const pathname = entry.split("/").reduce((acc, segment, index, segments) => {
    if (!segment)
      return acc;
    if (segment.startsWith("(") && segment.endsWith(")"))
      return acc;
    if (segment.startsWith("@"))
      return acc;
    if ((segment === "page" || segment === "route") && index === segments.length - 1) {
      return acc;
    }
    return `${acc}/${segment}`;
  }, "");
  return pathname === "" ? "/" : pathname;
}
function compareAppPaths(a, b) {
  const aHasSlot = a.includes("/@");
  const bHasSlot = b.includes("/@");
  if (aHasSlot && !bHasSlot)
    return -1;
  if (!aHasSlot && bHasSlot)
    return 1;
  return a.localeCompare(b);
}
function selectAppPageEntry(route, appPaths) {
  let entry;
  for (const appPath of appPaths) {
    if (normalizeAppPath(appPath).replace(/%5F/g, "_") !== route)
      continue;
    if (entry === void 0 || compareAppPaths(entry, appPath) < 0) {
      entry = appPath;
    }
  }
  return entry;
}
function getRouteCacheOwner(sourceRoute, { appPaths, pagesManifest }) {
  const appEntry = selectAppPageEntry(sourceRoute, appPaths);
  if (appEntry) {
    return {
      kind: appEntry.endsWith("/route") ? "APP_ROUTE" : "APP_PAGE",
      sourceRoute: appEntry
    };
  }
  if (Object.hasOwn(pagesManifest, sourceRoute)) {
    return { kind: "PAGES", sourceRoute };
  }
  return void 0;
}
function normalizeLocalePath(pathname, locales) {
  const segment = pathname.split("/", 2)[1]?.toLowerCase();
  const locale = locales?.find((l) => l.toLowerCase() === segment);
  if (!locale) {
    return pathname;
  }
  return pathname.slice(locale.length + 1) || "/";
}
function getDynamicRouteCachePathname(pathname, locales) {
  if (normalizeLocalePath(pathname, locales) !== "/index") {
    return pathname;
  }
  return pathname.slice(0, -"/index".length) || "/";
}
function getPrerenderRouteCacheKey(pathname, manifests) {
  const { routes, dynamicRoutes } = manifests.prerenderManifest;
  const prerender = Object.hasOwn(routes, pathname) ? routes[pathname] : void 0;
  const fallback = !prerender && Object.hasOwn(dynamicRoutes, pathname) ? dynamicRoutes[pathname] : void 0;
  if (!prerender && !fallback) {
    return void 0;
  }
  const sourceRoute = prerender ? prerender.srcRoute : fallback?.fallbackSourceRoute ?? pathname;
  let owner;
  if (sourceRoute) {
    owner = getRouteCacheOwner(sourceRoute, manifests);
  } else {
    owner = getRouteCacheOwner(pathname, manifests);
    if (!owner && manifests.locales?.length) {
      const pagesOwner = getRouteCacheOwner(normalizeLocalePath(pathname, manifests.locales), manifests);
      owner = pagesOwner?.kind === "PAGES" ? pagesOwner : void 0;
    }
  }
  return owner ? getRouteCacheKey(pathname, owner) : void 0;
}
function getRouteCacheKey(pathname, owner) {
  const source = createHash2("sha256").update(owner.sourceRoute).digest("hex");
  return `/${ROUTE_CACHE_DIRECTORY}/${owner.kind}/${source}/$${normalizePagePath(pathname)}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
var MIDDLEWARE_SET_COOKIE_HEADER = "x-middleware-set-cookie";
function getCachedResponseHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (value === void 0 || key.toLowerCase() === MIDDLEWARE_SET_COOKIE_HEADER) {
      continue;
    }
    result[key] = value;
  }
  return result;
}
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false, revalidationPath = path3, revalidationKey = path3) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash3("md5").update(str).digest("hex");
  const etag = `"${hash(body)}"`;
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash && revalidationPath !== "/" ? `${revalidationPath}/` : revalidationPath;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${revalidationKey}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(revalidationKey)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = event.headers[NEXT_SEGMENT_PREFETCH_HEADER];
  if (typeof segmentHeader === "string" && cachedValue.segmentData) {
    if (Object.hasOwn(cachedValue.segmentData, segmentHeader)) {
      return {
        body: cachedValue.segmentData[segmentHeader],
        additionalHeaders: {
          [NEXT_PRERENDER_HEADER]: "1",
          [NEXT_POSTPONED_HEADER]: "2"
        }
      };
    }
    return void 0;
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false, cacheKey = localizedPath, revalidationPath = localizedPath) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache, revalidationPath, cacheKey);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...getCachedResponseHeaders(cachedValue.meta?.headers),
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
var routeCacheManifests;
function getRouteCacheManifests() {
  routeCacheManifests ??= {
    prerenderManifest: {
      routes: PrerenderManifest?.routes ?? {},
      dynamicRoutes: PrerenderManifest?.dynamicRoutes ?? {}
    },
    appPaths: Object.keys(AppPathsManifest ?? {}),
    pagesManifest: PagesManifest ?? {},
    locales: NextConfig.i18n?.locales
  };
  return routeCacheManifests;
}
function getCacheKey(event, localizedPath, resolvedRoutes) {
  if (!useRouteCacheKeys(globalThis.nextVersion)) {
    const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
    if (!isISR)
      return void 0;
    return localizedPath === "/" ? "/index" : localizedPath;
  }
  const manifests = getRouteCacheManifests();
  if (Object.hasOwn(manifests.prerenderManifest.routes, localizedPath)) {
    const manifestKey = getPrerenderRouteCacheKey(localizedPath, manifests);
    const selectedRoute = resolvedRoutes?.[0];
    if (resolvedRoutes && !selectedRoute)
      return void 0;
    if (!selectedRoute)
      return manifestKey;
    const selectedOwner = getRouteCacheOwner(selectedRoute.route, manifests);
    if (!selectedOwner)
      return void 0;
    const selectedKey = getRouteCacheKey(localizedPath, selectedOwner);
    return selectedKey === manifestKey ? manifestKey : void 0;
  }
  const dynamicRoute = resolvedRoutes ? resolvedRoutes[0] : dynamicRouteMatcher(event.rawPath)[0];
  const dynamicPrerender = dynamicRoute ? manifests.prerenderManifest.dynamicRoutes[dynamicRoute.route] : void 0;
  if (!dynamicRoute || !dynamicPrerender || dynamicPrerender.fallback !== null) {
    return void 0;
  }
  const owner = getRouteCacheOwner(dynamicRoute.route, manifests);
  return owner ? getRouteCacheKey(getDynamicRouteCachePathname(localizedPath, manifests.locales), owner) : void 0;
}
async function cacheInterceptor(event, resolvedRoutes) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  if (event.method !== "GET" && event.method !== "HEAD")
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  const basePath = NextConfig.basePath;
  const pathWithoutBasePath = !basePath ? event.rawPath : event.rawPath === basePath ? "/" : event.rawPath.startsWith(`${basePath}/`) ? event.rawPath.slice(basePath.length) : event.rawPath;
  let localizedPath = localizePath({ ...event, rawPath: pathWithoutBasePath });
  localizedPath = localizedPath.replace(/\/$/, "");
  const revalidationPath = localizedPath || "/";
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const cacheKey = getCacheKey(event, localizedPath, resolvedRoutes);
  debug("cacheKey", cacheKey);
  if (cacheKey) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale, cacheKey, revalidationPath);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale, revalidationPath, cacheKey);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...getCachedResponseHeaders(cachedData.value.meta?.headers),
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale, revalidationPath, cacheKey);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...getCachedResponseHeaders(cachedData.value.meta?.headers),
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();
var compiledRegExps = /* @__PURE__ */ new Map();
function getCompiledRegExp(pattern, flags2 = "") {
  const key = `/${pattern}/${flags2}`;
  let regExp = compiledRegExps.get(key);
  if (!regExp) {
    regExp = new RegExp(pattern, flags2);
    compiledRegExps.set(key, regExp);
  }
  regExp.lastIndex = 0;
  return regExp;
}
function matchHasValue(value, pattern) {
  if (!value)
    return false;
  if (!pattern)
    return true;
  const candidate = Array.isArray(value) ? value.at(-1) : value;
  return candidate !== void 0 && getCompiledRegExp(`^${pattern}$`).test(candidate);
}
function getHostname(headers) {
  return headers.host?.split(":", 1)[0].toLowerCase();
}
function getSafeParamName(name) {
  return name.replaceAll(/[^a-zA-Z]/g, "");
}
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return matchHasValue(headers[redirect.key.toLowerCase()], redirect.value);
    case "cookie":
      return matchHasValue(cookies[redirect.key], redirect.value);
    case "query":
      return matchHasValue(query[redirect.key], redirect.value);
    case "host":
      return matchHasValue(getHostname(headers), redirect.value);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value) {
    let key;
    let value;
    switch (has.type) {
      case "header":
        key = has.key.toLowerCase();
        value = headers[key];
        break;
      case "cookie":
        key = has.key;
        value = cookies[key];
        break;
      case "query":
        key = has.key;
        value = query[key];
        break;
      case "host":
        return {};
    }
    return value ? { [getSafeParamName(key)]: value } : {};
  }
  const matcher = getCompiledRegExp(`^${has.value}$`);
  const fromSource = (value, implicitKey) => {
    const matches = value.match(matcher);
    if (matches?.groups)
      return matches.groups;
    return implicitKey && matches?.[0] ? { [implicitKey]: matches[0] } : {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return fromSource(Array.isArray(query[has.key]) ? query[has.key].at(-1) ?? "" : query[has.key] ?? "");
    case "host":
      return fromSource(getHostname(headers) ?? "", "host");
  }
};
function compileNonPath(value, params) {
  if (!value.includes(":"))
    return value;
  let compiledValue = value;
  for (const key of Object.keys(params)) {
    if (!compiledValue.includes(`:${key}`))
      continue;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    compiledValue = compiledValue.replace(getCompiledRegExp(`:${escapedKey}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(getCompiledRegExp(`:${escapedKey}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(getCompiledRegExp(`:${escapedKey}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(getCompiledRegExp(`:${escapedKey}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
  }
  compiledValue = compiledValue.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replaceAll("--ESCAPED_PARAM_PLUS", "+").replaceAll("--ESCAPED_PARAM_COLON", ":").replaceAll("--ESCAPED_PARAM_QUESTION", "?").replaceAll("--ESCAPED_PARAM_ASTERISKS", "*");
  return compile(`/${compiledValue}`, { validate: false })(params).slice(1);
}
function compileQueryString(queryString, params) {
  return queryString.split("&").map((part) => {
    const separator = part.indexOf("=");
    if (separator === -1)
      return part;
    const key = part.slice(0, separator + 1);
    return `${key}${compileNonPath(part.slice(separator + 1), params)}`;
  }).join("&");
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const computeHas = computeParamHas(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (getCompiledRegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      const params = {
        ..._match ? _match.params : {},
        ...has?.reduce((acc, cur) => {
          return Object.assign(acc, computeHas(cur));
        }, {})
      };
      const hasParams = Object.keys(params).length > 0;
      headers.forEach((h) => {
        try {
          const key = hasParams ? compileNonPath(h.key, params) : h.key;
          const value = hasParams ? compileNonPath(h.value, params) : h.value;
          requestHeaders[key.toLowerCase()] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key.toLowerCase()] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites, appendParamsToQuery = true) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return getCompiledRegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString, hash } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString, hash });
    const compileOptions = { validate: false };
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }), compileOptions);
    const toDestinationHost = compile(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1"), { ...compileOptions, encode: encodeURIComponent });
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    const queryParams = Object.fromEntries(Object.entries(params).filter(([key]) => key !== "nextInternalLocale"));
    const destinationParams = [
      ...parse2(escapeRegex(`${pathname}${hash}`, { isPath: true })),
      ...hostname ? parse2(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1")) : []
    ].flatMap((token) => typeof token === "string" ? [] : [String(token.name)]);
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenHash = hash;
    let rewrittenPath = unescapeRegex(toDestinationPath(params));
    if (pathname.startsWith("/") && !rewrittenPath.startsWith("/")) {
      rewrittenPath = `/${rewrittenPath}`;
    }
    if (isUsingParams) {
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = compileQueryString(queryString, params);
      rewrittenHash = compileNonPath(hash, params);
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(getCompiledRegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    const destinationQuery = convertFromQueryString(rewrittenQuery);
    finalQuery = {
      ...query,
      ...!appendParamsToQuery || Object.keys(queryParams).some((key) => destinationParams.includes(key)) ? {} : queryParams,
      ...destinationQuery
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    rewrittenUrl += rewrittenHash;
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleBeforeFilesRewrites(event, rewrites) {
  let result = {
    internalEvent: event,
    __rewrite: void 0,
    isExternalRewrite: false
  };
  for (const rewrite of rewrites) {
    const rewriteResult = handleRewrites(result.internalEvent, [rewrite]);
    if (!rewriteResult.__rewrite)
      continue;
    result = rewriteResult;
    if (result.isExternalRewrite)
      break;
  }
  return result;
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && // Data requests (`/_next/data/<buildId>/*.json`) are never redirected, as with Next.js.
  // The header is set by `fixDataPage`, a client supplied value is removed by the routing handler.
  // The `__nextDataReq` query parameter can not be used as it is set by the client.
  event.headers["x-nextjs-data"] !== "1" && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal), false);
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => getCompiledRegExp(routeRegex).test(rawPath));
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  let isPregenerated = false;
  try {
    isPregenerated = Object.hasOwn(routes, decodePathParams(localizedPath));
  } catch {
  }
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_util();
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var MIDDLEWARE_SET_COOKIE_HEADER2 = "x-middleware-set-cookie";
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  let middlewareSetCookie;
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    "x-middleware-redirect",
    "x-middleware-refresh",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey.startsWith(xMiddlewareKey)) {
      const k = normalizedKey.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(normalizedKey))
        return;
      if (normalizedKey === MIDDLEWARE_SET_COOKIE_HEADER2) {
        middlewareSetCookie = value;
        return;
      }
      if (normalizedKey === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && normalizedKey === "location") {
        resHeaders[normalizedKey] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[normalizedKey] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie().flatMap((maybeCompoundCookie) => parseSetCookieHeader(maybeCompoundCookie));
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const overrideHeaders = responseHeaders.get("x-middleware-override-headers");
  const overriddenHeaders = overrideHeaders === null ? void 0 : new Set(overrideHeaders.split(",").map((key) => key.trim().toLowerCase()));
  const newHeaders = Object.fromEntries([...Object.entries(internalEvent.headers), ...Object.entries(reqHeaders)].map(([key, value]) => [key.toLowerCase(), value]).filter(([key]) => !overriddenHeaders || overriddenHeaders.has(key)));
  if (middlewareSetCookie !== void 0) {
    newHeaders[MIDDLEWARE_SET_COOKIE_HEADER2] = middlewareSetCookie;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: newHeaders,
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/routeParamPlaceholder.js
var PLACEHOLDER_REGEX = /\[\[\.\.\.[^\]]+\]\]|\[(?:\.\.\.)?[^\]]+\]/g;
var OPENING_BRACKET_REGEX = /\[|%5b/i;
function hasRouteParamPlaceholder(pathname) {
  if (!OPENING_BRACKET_REGEX.test(pathname)) {
    return false;
  }
  const placeholders = new Set(dynamicRouteMatcher(pathname).filter(({ type }) => type === "app").flatMap(({ route }) => route.match(PLACEHOLDER_REGEX) ?? []));
  return placeholders.size > 0 && pathname.split("/").some((segment) => placeholders.has(safeDecode(segment)));
}
function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var NEXT_CONFIG_HEADER_PREFIX = `${INTERNAL_HEADER_PREFIX}next-config-response-`;
var NEXT_CONFIG_HEADER_PREFIX_LEN = NEXT_CONFIG_HEADER_PREFIX.length;
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length",
  "next-resume"
];
function applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const addHeaders = (source, keyPrefix) => {
    for (const [key, value] of Object.entries(source)) {
      if (value) {
        headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
      }
    }
  };
  addHeaders(middlewareHeaders, isResult ? "" : MIDDLEWARE_HEADER_PREFIX);
  addHeaders(nextConfigHeaders, isResult ? "" : NEXT_CONFIG_HEADER_PREFIX);
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let nextConfigHeaders = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    const middlewareHeaders = middlewareEventOrResult.responseHeaders ?? {};
    if (middlewareHeadersPrioritized) {
      nextConfigHeaders = Object.fromEntries(Object.entries(nextConfigHeaders).filter(([key]) => !Object.hasOwn(middlewareHeaders, key)));
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleBeforeFilesRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyResponseHeaders(assetResult, nextConfigHeaders, middlewareHeaders);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    let resolvedRoutes = [
      ...staticRouteMatcher(eventOrResult.rawPath),
      ...dynamicRouteMatcher(eventOrResult.rawPath)
    ];
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0) || // Next.js versions before 16.4.5 treat a param whose value is its placeholder (e.g. `[slug]`) as unresolved.
    // Next.js receives both the rawPath and the URL pathname, which is normalized (e.g. dot segments).
    !isExternalRewrite && [eventOrResult.rawPath, new URL(eventOrResult.url).pathname].some(hasRouteParamPlaceholder)) {
      resolvedRoutes = [];
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isExternalRewrite && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult, resolvedRoutes);
      if (isInternalResult(eventOrResult)) {
        applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders);
        return eventOrResult;
      }
    }
    applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders);
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};

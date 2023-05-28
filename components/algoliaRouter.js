/* eslint-disable no-void */
import qs from 'qs'

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

const setWindowTitle = function setWindowTitle(title) {
  if (title) {
    window.document.title = title
  }
}

const BrowserHistory = /* #__PURE__ */ (function () {
  /**
   * Initializes a new storage provider that syncs the search state to the URL
   * using web APIs (`window.location.pushState` and `onpopstate` event).
   */
  function BrowserHistory(_ref) {
    const windowTitle = _ref.windowTitle
    const _ref$writeDelay = _ref.writeDelay
    const writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay
    const createURL = _ref.createURL
    const parseURL = _ref.parseURL

    _classCallCheck(this, BrowserHistory)

    _defineProperty(this, 'windowTitle', void 0)

    _defineProperty(this, 'writeDelay', void 0)

    _defineProperty(this, '_createURL', void 0)

    _defineProperty(this, 'parseURL', void 0)

    _defineProperty(this, 'writeTimer', void 0)

    this.windowTitle = windowTitle
    this.writeTimer = undefined
    this.writeDelay = writeDelay
    this._createURL = createURL
    this.parseURL = parseURL
    const title = this.windowTitle && this.windowTitle(this.read())
    setWindowTitle(title)
  }
  /**
   * Reads the URL and returns a syncable UI search state.
   */

  _createClass(BrowserHistory, [
    {
      key: 'read',
      value: function read() {
        return this.parseURL({
          qsModule: qs,
          location: window.location,
        })
      },
      /**
       * Pushes a search state into the URL.
       */
    },
    {
      key: 'write',
      value: function write(routeState) {
        const _this = this

        const url = this.createURL(routeState)
        const title = this.windowTitle && this.windowTitle(routeState)

        if (this.writeTimer) {
          window.clearTimeout(this.writeTimer)
        }

        if (
          (window.location.href.includes('?') || url.substr(-1) !== '?') &&
          window.location.href !== url
        ) {
          this.writeTimer = window.setTimeout(function () {
            setWindowTitle(title)
            window.history.pushState(routeState, title || '', url)
            _this.writeTimer = undefined
          }, this.writeDelay)
        }

        // this.writeTimer = window.setTimeout(function () {
        //   setWindowTitle(title);
        //   window.history.pushState(routeState, title || '', url);
        //   _this.writeTimer = undefined;
        // }, this.writeDelay);
      },
      /**
       * Sets a callback on the `onpopstate` event of the history API of the current page.
       * It enables the URL sync to keep track of the changes.
       */
    },
    {
      key: 'onUpdate',
      value: function onUpdate(callback) {
        const _this2 = this

        this._onPopState = function (event) {
          if (_this2.writeTimer) {
            window.clearTimeout(_this2.writeTimer)
            _this2.writeTimer = undefined
          }

          const routeState = event.state // At initial load, the state is read from the URL without update.
          // Therefore the state object is not available.
          // In this case, we fallback and read the URL.

          if (!routeState) {
            callback(_this2.read())
          } else {
            callback(routeState)
          }
        }

        window.addEventListener('popstate', this._onPopState)
      },
      /**
       * Creates a complete URL from a given syncable UI state.
       *
       * It always generates the full URL, not a relative one.
       * This allows to handle cases like using a <base href>.
       * See: https://github.com/algolia/instantsearch.js/issues/790
       */
    },
    {
      key: 'createURL',
      value: function createURL(routeState) {
        return this._createURL({
          qsModule: qs,
          routeState,
          location: window.location,
        })
      },
      /**
       * Removes the event listener and cleans up the URL.
       */
    },
    {
      key: 'dispose',
      value: function dispose() {
        if (this._onPopState) {
          window.removeEventListener('popstate', this._onPopState)
        }

        if (this.writeTimer) {
          window.clearTimeout(this.writeTimer)
        }

        this.write({})
      },
    },
  ])

  return BrowserHistory
})()

export default function historyRouter() {
  const _ref2 =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  const _ref2$createURL = _ref2.createURL
  const createURL =
    _ref2$createURL === void 0
      ? function (_ref3) {
          const qsModule = _ref3.qsModule
          const routeState = _ref3.routeState
          const location = _ref3.location
          const protocol = location.protocol
          const hostname = location.hostname
          const _location$port = location.port
          const port = _location$port === void 0 ? '' : _location$port
          const pathname = location.pathname
          const hash = location.hash
          const queryString = qsModule.stringify(routeState)
          const portWithPrefix = port === '' ? '' : ':'.concat(port) // IE <= 11 has no proper `location.origin` so we cannot rely on it.

          // IE <= 11 has no proper `location.origin` so we cannot rely on it.
          if (!queryString) {
            return ''
              .concat(protocol, '//')
              .concat(hostname)
              .concat(portWithPrefix)
              .concat(pathname)
              .concat(hash)
          }

          return ''
            .concat(protocol, '//')
            .concat(hostname)
            .concat(portWithPrefix)
            .concat(pathname, '?')
            .concat(queryString)
            .concat(hash)
        }
      : _ref2$createURL
  const _ref2$parseURL = _ref2.parseURL
  const parseURL =
    _ref2$parseURL === void 0
      ? function (_ref4) {
          const qsModule = _ref4.qsModule
          const location = _ref4.location
          // `qs` by default converts arrays with more than 20 items to an object.
          // We want to avoid this because the data structure manipulated can therefore vary.
          // Setting the limit to `100` seems a good number because the engine's default is 100
          // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
          //
          // Using an `arrayLimit` of `n` allows `n + 1` items.
          //
          // See:
          //   - https://github.com/ljharb/qs#parsing-arrays
          //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
          return qsModule.parse(location.search.slice(1), {
            arrayLimit: 99,
          })
        }
      : _ref2$parseURL
  const _ref2$writeDelay = _ref2.writeDelay
  const writeDelay = _ref2$writeDelay === void 0 ? 400 : _ref2$writeDelay
  const windowTitle = _ref2.windowTitle

  return new BrowserHistory({
    createURL,
    parseURL,
    writeDelay,
    windowTitle,
  })
}

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 1000;

  /**
   * устраняет дребезг
   * @param {Callback} cb
   * @return {Function}
   */
  window.debounce = function (cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };
})();

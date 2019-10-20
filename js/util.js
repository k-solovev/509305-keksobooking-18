'use strict';

(function () {
  var mainElem = document.querySelector('main');

  /**
  * показ сообщения ошибки загрузки данных с сервера
  */
  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElem = errorTemplate.cloneNode(true);
    var errBtn = errorElem.querySelector('.error__button');
    mainElem.appendChild(errorElem);

    errBtn.addEventListener('click', function () {
      mainElem.removeChild(errorElem);
      window.map.loadServerData();
    });

    document.addEventListener('click', function () {
      if (mainElem.contains(errorElem)) {
        mainElem.removeChild(errorElem);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEY_CODE && mainElem.contains(errorElem)) {
        mainElem.removeChild(errorElem);
      }
    });
  };

  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElem = successTemplate.cloneNode(true);
    mainElem.appendChild(successElem);

    document.addEventListener('click', function () {
      if (mainElem.contains(successElem)) {
        mainElem.removeChild(successElem);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEY_CODE && mainElem.contains(successElem)) {
        mainElem.removeChild(successElem);
      }
    });
  };

  window.util = {
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();

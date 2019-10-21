'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var pinHandler = map.querySelector('.map__pin--main');

  /**
   * отрисовка не более 5 пинов на карте по заданному массиву
   * @param {Array} data
   */
  var renderPins = function (data) {
    var MAX_PINS_COUNT = 5;
    var fragment = document.createDocumentFragment();
    var pinsCount = (data.length > MAX_PINS_COUNT) ? MAX_PINS_COUNT : data.length;

    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(window.pin.createPinElem(data[i]));
    }

    mapPins.appendChild(fragment);
  };

  /**
   * удаление отрисованных пинов
   */
  var deletePins = function () {
    var pin = window.map.map.querySelector('.map__pin[type=button]');

    while (mapPins.contains(pin)) {
      mapPins.removeChild(pin);
      pin = window.map.map.querySelector('.map__pin[type=button]');
    }
  };

  /**
   * обработчик успеха для загрузки данных с сервера
   * @param {*} data - загруженные данные с сервера
   */
  var successLoadHandler = function (data) {
    window.dataLoad = data;
    renderPins(data);
  };

  /**
   * загрузка данных с сервера
   */
  var loadServerData = function () {
    window.backend.load(successLoadHandler, window.util.errorHandler);
  };

  /**
   * обработчики активации формы нажатия и клика на главный пин
   */
  mainPin.addEventListener('mousedown', function () {
    if (map.classList.contains('map--faded')) {
      window.form.activeState();
      window.form.setCoordinatePin();
      loadServerData();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE && map.classList.contains('map--faded')) {
      window.form.activeState();
      window.form.setCoordinatePin();
      loadServerData();
    }
  });

  /**
   * обработчик закрытия модалки объявления
   */
  var closeModalAd = function () {
    var modal = map.querySelector('.map__card');
    if (map.contains(modal)) {
      map.removeChild(modal);
    }
  };

  /**
  * закрытие модального окна объявления по клику
  */
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      closeModalAd();
    }
  });

  /**
  * закрытие модального окна объявления по esc
  */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeModalAd();
    }
  });


  /**
   * обработчик перетаскивания пина
   */
  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
      window.form.setCoordinatePin();

      var LOCATION_X_MIN = Math.floor(window.data.LOCATION_X_MIN - window.form.MAIN_PIN_WIDTH / 2);
      var LOCATION_X_MAX = Math.floor(window.data.LOCATION_X_MAX - window.form.MAIN_PIN_WIDTH / 2);
      var LOCATION_Y_MAX = Math.floor(window.data.LOCATION_Y_MAX - window.form.MAIN_PIN_HEIGHT - window.form.PIN_TAIL_HEIGHT);
      var LOCATION_Y_MIN = Math.floor(window.data.LOCATION_Y_MIN - window.form.MAIN_PIN_HEIGHT - window.form.PIN_TAIL_HEIGHT);

      if (pinHandler.offsetTop - shift.y > LOCATION_Y_MAX) {
        pinHandler.style.top = LOCATION_Y_MAX + 'px';
      } if (pinHandler.offsetTop - shift.y < LOCATION_Y_MIN) {
        pinHandler.style.top = LOCATION_Y_MIN + 'px';
      } if (pinHandler.offsetLeft > LOCATION_X_MAX) {
        pinHandler.style.left = LOCATION_X_MAX + 'px';
      } if (pinHandler.offsetLeft < LOCATION_X_MIN) {
        pinHandler.style.left = LOCATION_X_MIN + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map,
    mainPin: mainPin,
    loadServerData: loadServerData,
    closeModalAd: closeModalAd,
    ESC_KEY_CODE: ESC_KEY_CODE,
    renderPins: renderPins,
    deletePins: deletePins
  };
})();

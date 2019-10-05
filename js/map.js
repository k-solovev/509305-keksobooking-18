'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  /**
   * функция заполнения DOM-элементами на основе массива JS-объектов
   * @description отрисовываем пины на карте
   */
  var renderAds = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.ads.length; i++) {
      fragment.appendChild(window.pin.createPinElem(window.data.ads[i]));
    }

    mapPins.appendChild(fragment);
  };

  renderAds();

  /**
   * обработчики активации формы нажатия и клика на главный пин
   */
  mainPin.addEventListener('mousedown', function () {
    window.form.activeState();
    window.form.setCoordinatePin();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      window.form.activeState();
      window.form.setCoordinatePin();
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
   *
   * @param {Object} elem - индекс объекта в массиве объектов объявлений
   */
  var openModalAd = function (elem) {
    map.appendChild(window.card.createAdCard(window.data.ads[elem]));
  };

  /**
   * показ модальных окон объявлений при нажатии
   */
  var pinButtonsArray = Array.from(mapPins.querySelectorAll('.map__pin[type="button"]'));
  var pinImgArray = Array.from(mapPins.querySelectorAll('.map__pin[type="button"] img'));

  mapPins.addEventListener('click', function (evt) {
    if (evt.target.matches('.map__pin[type=button]')) {
      closeModalAd();
      openModalAd(pinButtonsArray.indexOf(evt.target));
    }
    if (evt.target.matches('.map__pin[type=button] img')) {
      closeModalAd();
      openModalAd(pinImgArray.indexOf(evt.target));
    }
  });

  /**
  * закрытие модального окна объявления по клику
  */
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      closeModalAd();
    }
  });

  /**
   * показ модальных окон объявлений при enter
   */
  var adBtn = map.querySelector('.map__pin[type="button"]');

  adBtn.addEventListener('keydown', function (evt) {
    if (evt.keydown === ENTER_KEY_CODE) {
      closeModalAd();
      openModalAd(pinButtonsArray.indexOf(evt.target));
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

  window.map = {
    map: map,
    mainPin: mainPin
  };
})();

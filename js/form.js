'use strict';

(function () {
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TAIL_HEIGHT = 22;
  var inpCapacity = adForm.querySelector('#capacity');
  var capacityOptions = inpCapacity.querySelectorAll('option');
  var inpRooms = adForm.querySelector('#room_number');
  var inpPrice = adForm.querySelector('#price');
  var inpTypeOfHouses = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  /**
   * добавление атрибута disabled полям input/select
   * @param {Array} collInp - коллекция инпутов
   * @param {Array} collSel - коллекция селектов
  */
  var addDisabled = function (collInp, collSel) {
    for (var i = 0; i < collInp.length; i++) {
      collInp[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < collSel.length; i++) {
      collSel[i].setAttribute('disabled', 'disabled');
    }
  };

  addDisabled(inputs, selects);

  /**
   * удаление атрибута disabled полям input/select
   * @param {Array} collInp - коллекция инпутов
   * @param {Array} collSel - коллекция селектов
   */
  var removeDisabled = function (collInp, collSel) {
    for (var i = 0; i < collInp.length; i++) {
      collInp[i].removeAttribute('disabled', 'disabled');
    }
    for (i = 0; i < collSel.length; i++) {
      collSel[i].removeAttribute('disabled', 'disabled');
    }
  };

  /**
   * функция обработчик для активации состояний полей форм
   */
  var activeState = function () {
    removeDisabled(inputs, selects);
    window.map.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  // стартовое значение пина
  addressInput.setAttribute('value', Math.floor(MAIN_PIN_START_X + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(MAIN_PIN_START_Y + MAIN_PIN_HEIGHT / 2));

  /**
 * @property {string} x - содержит св-во left исключая "px"
 * @property {string} y - содержит св-во top исключая "px"
 * @description обновляет строку с координатами главного пина и записывает ее в инпут адрес
 */
  var setCoordinatePin = function () {
    var x = window.map.mainPin.style.left.slice(0, -2);
    var y = window.map.mainPin.style.top.slice(0, -2);
    x = Math.floor(+x + MAIN_PIN_WIDTH / 2);
    y = Math.floor(+y + MAIN_PIN_HEIGHT + PIN_TAIL_HEIGHT);

    if (y > window.data.LOCATION_Y_MAX) {
      y = window.data.LOCATION_Y_MAX;
    } if (y < window.data.LOCATION_Y_MIN) {
      y = window.data.LOCATION_Y_MIN;
    } if (x > window.data.LOCATION_X_MAX) {
      x = window.data.LOCATION_X_MAX;
    } if (x < window.data.LOCATION_X_MIN) {
      x = window.data.LOCATION_X_MIN;
    }

    addressInput.value = x + ', ' + y;
  };

  /**
   * проверка валидности поля гостей к полю комнаты
   * @description доступные поля:
   * 1 комната — «для 1 гостя»;
   * 2 комнаты — «для 2 гостей» или «для 1 гостя»;
   * 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
   * 100 комнат — «не для гостей».
   * проходит по коллекции опции гостей и переключает атрибуты disable
   */
  var selectGuestsChangeValidator = function () {
    switch (+inpRooms.value) {
      case 1:
        for (var i = 0; i < capacityOptions.length; i++) {
          capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '2' || capacityOptions[i].value === '3' || capacityOptions[i].value === '0');
        }
        break;
      case 2:
        for (i = 0; i < capacityOptions.length; i++) {
          capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '3' || capacityOptions[i].value === '0');
        }
        break;
      case 3:
        for (i = 0; i < capacityOptions.length; i++) {
          capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '0');
        }
        break;
      case 100:
        for (i = 0; i < capacityOptions.length; i++) {
          capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '1' || capacityOptions[i].value === '2' || capacityOptions[i].value === '3');
        }
        break;
    }
  };

  /**
   *событие на селекте поля комнат
  */
  inpRooms.addEventListener('change', function () {
    selectGuestsChangeValidator();
  });

  /**
   * проверка валидности поля типа жилья и минимальной цены
   * @description доступные поля:
   *«Бунгало» — минимальная цена за ночь 0;
  *«Квартира» — минимальная цена за ночь 1000;
  *«Дом» — минимальная цена 5000;
  *«Дворец» — минимальная цена 10000.
  */
  var selectTypeOfHousesChangeValidator = function () {
    switch (inpTypeOfHouses.value) {
      case 'bungalo':
        inpPrice.setAttribute('min', 0);
        inpPrice.setAttribute('placeholder', '0');
        break;
      case 'flat':
        inpPrice.setAttribute('min', 1000);
        inpPrice.setAttribute('placeholder', '1000');
        break;
      case 'house':
        inpPrice.setAttribute('min', 5000);
        inpPrice.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        inpPrice.setAttribute('min', 10000);
        inpPrice.setAttribute('placeholder', '10000');
        break;
    }
  };

  /**
   * событие на селекте типа жилья
   */
  inpTypeOfHouses.addEventListener('change', function () {
    selectTypeOfHousesChangeValidator();
  });

  /**
   * обработчик валидации
   * @param {Object} timeX - проверяемое время
   * @param {Object} timeY - время которое синхронизируется с проверяемым
   */
  var selectChangeTimeValidation = function (timeX, timeY) {
    switch (timeX.value) {
      case '12:00':
        timeY.value = '12:00';
        break;
      case '13:00':
        timeY.value = '13:00';
        break;
      case '14:00':
        timeY.value = '14:00';
        break;
    }
  };

  timeIn.addEventListener('change', function () {
    selectChangeTimeValidation(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    selectChangeTimeValidation(timeOut, timeIn);
  });

  window.form = {
    activeState: activeState,
    setCoordinatePin: setCoordinatePin
  };
})();

'use strict';

(function () {
  var mapFilters = window.map.map.querySelector('.map__filters');
  var housingTypeSelector = mapFilters.querySelector('#housing-type');
  var filteredArr = [];
  var mapPins = window.map.map.querySelector('.map__pins');

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
   * сортировка исходного массива по select типа жилья
   * @param {Object} elem
   */
  var housingTypeSort = function (elem) {
    if (elem.offer.type === housingTypeSelector.value) {
      filteredArr.push(elem);
    }
  };

  /**
   * обработчик события изменения фильтра типа жилья
   * копируем полученный с сервера массив, фильтруем его, удаляем пины, отрисовываем по отфильтрованному массиву
   */
  var onHousingTypeSelectorChange = function () {
    var arr = window.dataLoad;
    var fragment = document.createDocumentFragment();
    arr.forEach(housingTypeSort);
    deletePins();

    for (var i = 0; i < filteredArr.length && i <= window.map.PINS_COUNT; i++) {
      fragment.appendChild(window.pin.createPinElem(filteredArr[i]));
    }

    mapPins.appendChild(fragment);
    filteredArr = [];
  };

  housingTypeSelector.addEventListener('change', onHousingTypeSelectorChange);
})();

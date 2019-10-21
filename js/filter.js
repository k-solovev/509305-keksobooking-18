'use strict';

(function () {
  var mapFilters = window.map.map.querySelector('.map__filters');
  var housingTypeSelector = mapFilters.querySelector('#housing-type');
  var housingPriceSelector = mapFilters.querySelector('#housing-price');
  var housingRoomsSelector = mapFilters.querySelector('#housing-rooms');
  var housingGuestsSelector = mapFilters.querySelector('#housing-guests');
  var housingFeaturesField = mapFilters.querySelector('#housing-features');
  var filtersCheckboxes = mapFilters.querySelectorAll('input[type=checkbox]');
  var filteredElems = [];
  var filterPrice = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var adPrice = {
    LOW: 10000,
    HIGH: 50000
  };

  /**
   * @param {*} where - массив 1
   * @param {*} what - массив 2
   * @return {Boolean} возвращает true если все элементы массива 1 содержаться в массиве 2
   */
  var containArrays = function (where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) < 0) {
        return false;
      }
    }
    return true;
  };

  /**
   * сортировка исходного массива по select типа жилья
   * @param {Object} elem
   * @return {Object} возвращает элемент если true
   */
  var housingTypeSort = function (elem) {
    return (
      housingTypeSelector.value === elem.offer.type ||
      housingTypeSelector.value === 'any'
    );
  };

  /**
   * сортировка массива по select стоимости жилья
   * @param {Object} elem
   * @return {Object} возвращает элемент если true
   */
  var housingPriceSort = function (elem) {
    return (
      housingPriceSelector.value === 'any' ||
      (housingPriceSelector.value === filterPrice.LOW &&
        elem.offer.price < adPrice.LOW) ||
      (housingPriceSelector.value === filterPrice.MIDDLE &&
        (elem.offer.price >= adPrice.LOW &&
          elem.offer.price <= adPrice.HIGH)) ||
      (housingPriceSelector.value === filterPrice.HIGH &&
        elem.offer.price > adPrice.HIGH)
    );
  };

  /**
   * сортировка массива по select стоимости жилья
   * @param {Object} elem
   * @return {Object} возвращает элемент если true
   */
  var housingRoomsSort = function (elem) {
    return (housingRoomsSelector.value === 'any' || housingRoomsSelector.value === String(elem.offer.rooms));
  };

  /**
   * сортировка массива по select стоимости жилья
   * @param {Object} elem
   * @return {Object} возвращает элемент если true
   */
  var housingGuestsSort = function (elem) {
    return (housingGuestsSelector.value === 'any' || housingGuestsSelector.value === String(elem.offer.rooms));
  };

  /**
   * @param {Object} elem
   * @return {Object} возвращает элемент если true
   */
  var housingFeaturesSort = function (elem) {
    var checkedFeatures = Array.from(housingFeaturesField.querySelectorAll('input:checked'));
    checkedFeatures.forEach(function (el, index, array) {
      array[index] = el.value;
      return array;
    });
    return containArrays(elem.offer.features, checkedFeatures);
  };

  /**
   * обработчик события изменения фильтров
   * копируем полученный с сервера массив, фильтруем его, удаляем пины, отрисовываем по отфильтрованному массиву
   */
  var onFilterChange = window.debounce(function () {
    var arr = window.dataLoad.slice();
    filteredElems = arr.filter(housingTypeSort)
    .filter(housingPriceSort)
    .filter(housingRoomsSort)
    .filter(housingGuestsSort)
    .filter(housingFeaturesSort);

    window.map.deletePins();
    window.map.closeModalAd();
    window.map.renderPins(filteredElems);
  });

  mapFilters.addEventListener('change', onFilterChange);

  /**
   * сброс фильтров
   */
  var filterReset = function () {
    housingTypeSelector.value = 'any';
    housingPriceSelector.value = 'any';
    housingRoomsSelector.value = 'any';
    housingGuestsSelector.value = 'any';
    filtersCheckboxes.forEach(function (elem) {
      if (elem.checked === true) {
        elem.checked = false;
      }
    });
  };

  window.filter = {
    filterReset: filterReset
  };
})();

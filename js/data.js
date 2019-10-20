'use strict';

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MAX = 1200;
  var LOCATION_X_MIN = 0;

  /**
 * перевод типа жилья на русский язык
 * @param {string} type - строка соответствующая типу жилья
 * @return {string} перевод на русский
 */
  var getTranslateType = function (type) {
    var translate;

    switch (type) {
      case 'palace':
        translate = 'Дворец';
        break;
      case 'flat':
        translate = 'Квартира';
        break;
      case 'house':
        translate = 'Дом';
        break;
      case 'bungalo':
        translate = 'Бунгало';
        break;
    }

    return translate;
  };

  /**
 * получаем иконки features и встраиваем в разметку
 * @param {Array} arr - Массив с фичами
 * @return {string} строка для разметки
 */
  var getFeatureIcon = function (arr) {
    var htmlFeatures = '';

    for (var i = 0; i < arr.length; i++) {
      htmlFeatures += '<li class="popup__feature popup__feature--' + arr[i] + '"></li>';
    }

    return htmlFeatures;
  };

  /**
 * получаем картинки объявлений и встраиваем в разметку
 * @param {Array} arr - Массив с картинками
 * @return {string} строка для разметки
 */
  var getImages = function (arr) {
    var htmlImg = '';

    for (var i = 0; i < arr.length; i++) {
      htmlImg += '<img src="' + arr[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    return htmlImg;
  };

  window.data = {
    getTranslateType: getTranslateType,
    getFeatureIcon: getFeatureIcon,
    getImages: getImages,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN
  };
})();

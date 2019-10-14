'use strict';

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MAX = 1200;
  var LOCATION_X_MIN = 0;
  var ADS_COUNT = 8;
  var TYPES_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_AND_GUESTS_AMOUNT = [1, 2, 3];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var ADDRESS_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  /**
 * функция для расчета локации объявления
 * @return {Object} объект с двумя свойствами осей координат
 */
  var getLocation = function () {
    var location = {};

    location.x = window.util.getRandomInteger(0, LOCATION_X_MAX);
    location.y = window.util.getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return location;
  };

  /**
   * словарь для сопоставления типов жилья
   */
  // var TYPES_HOUSES_DICT = {
  //   'palace': 'Дворец',
  //   'flat': 'Квартира',
  //   'house': 'Дом',
  //   'bungalo': 'Бунгало'
  // };

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

  /**
 * функция создания одного объявления
 * @param {Number} i - порядковый индекс объявления
 * @return {Object} объявление со всеми данными
 */
  var generateAd = function (i) {
    var ad = {};
    ad.author = {avatar: 'img/avatars/user0' + i + '.png'};
    ad.offer = {
      title: 'Уютное гнездышко для молодоженов',
      address: '600, 350',
      price: 5200,
      type: window.util.getRandomValue(TYPES_HOUSES),
      rooms: window.util.getRandomValue(ROOMS_AND_GUESTS_AMOUNT),
      guests: window.util.getRandomValue(ROOMS_AND_GUESTS_AMOUNT),
      checkin: window.util.getRandomValue(CHECK_TIMES),
      checkout: window.util.getRandomValue(CHECK_TIMES),
      features: window.util.getRandomArr(FEATURES),
      description:
        'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      photos: window.util.getRandomArr(ADDRESS_PHOTOS)
    };
    ad.location = getLocation();

    return ad;
  };

  /**
 * функция создания массива объявлений объектов
 * @return {Array} массив с объектами объявлений
 */
  var createArrayAds = function () {
    var adsArray = [];

    for (var i = 1; i <= ADS_COUNT; i++) {
      adsArray.push(generateAd(i));
    }

    return adsArray;
  };

  var ads = createArrayAds();

  window.data = {
    getLocation: getLocation,
    getTranslateType: getTranslateType,
    getFeatureIcon: getFeatureIcon,
    getImages: getImages,
    generateAd: generateAd,
    ads: ads,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN
  };
})();

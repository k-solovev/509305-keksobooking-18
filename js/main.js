'use strict';

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
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var map = document.querySelector('.map').classList.remove('map--faded'); // временно активируем карту

/**
 * функция вывода случайных данных из массива
 * @param {Array} arr - массив из которого выбираются данные
 * @return {string | number} элемент массива
 */
var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * функция рандомного числа от min до max
 * @param {Number} min - минимальное значение диапазона
 * @param {Number} max - максимальное значение диапазона
 * @return {Number} - возвращает рандомное число
 */
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/**
 * функция перемешивания массива
 * @param {Array} arr - массив для перемешивания
 * @return {Array} перемешанный массив
 */
var getShuffleArr = function (arr) {
  var copyArr = arr.slice();
  var newArr = [];
  var j;

  for (var i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * copyArr.length);
    newArr.push(copyArr[j]);
    copyArr.splice(j, 1);
  }

  return newArr;
};

/**
 * функция выдающая случайное кол-во элементов из массива
 * @param {Array} arr - исходный массив
 * @return {Array} новый массив со случайными элементами от исходного
 */
var getRandomArr = function (arr) {
  var newArr = getShuffleArr(arr);

  newArr.splice(0, Math.floor(Math.random() * newArr.length));

  return newArr;
};

/**
 * функция для расчета локации объявления
 * @return {Object} объект с двумя свойствами осей координат
 */
var getLocation = function () {
  var location = {};
  map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  location.x = getRandomInteger(0, mapWidth);
  location.y = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return location;
};

/**
 * перевод типа жилья на русский язык
 * @param {string} type - строка соответствующая типу жилья
 * @return {string} перевод на русский
 */
var getTranslateType = function (type) {
  var translate;

  if (type === 'palace') {
    translate = 'Дворец';
  } else if (type === 'flat') {
    translate = 'Квартира';
  } else if (type === 'house') {
    translate = 'Дом';
  } else {
    translate = 'Бунгало';
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
    type: getRandomValue(TYPES_HOUSES),
    rooms: getRandomValue(ROOMS_AND_GUESTS_AMOUNT),
    guests: getRandomValue(ROOMS_AND_GUESTS_AMOUNT),
    checkin: getRandomValue(CHECK_TIMES),
    checkout: getRandomValue(CHECK_TIMES),
    features: getRandomArr(FEATURES),
    description:
      'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
    photos: getRandomArr(ADDRESS_PHOTOS)
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

/**
 * функция создания DOM-элемента пина на основе объекта объявления
 * @param {Object} obj - объект объявления
 * @return {Object} DOM элемент пина с координатами из свойств location
 */
var createDomElem = function (obj) {
  var similarAdTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var adElement = similarAdTemplate.cloneNode(true);
  adElement.style =
    'left: ' +
    (obj.location.x - PIN_WIDTH / 2) +
    'px; top: ' +
    (obj.location.y - PIN_HEIGHT) +
    'px';
  adElement.querySelector('img').src = obj.author.avatar;
  adElement.querySelector('img').alt = obj.offer.title;
  return adElement;
};

/**
 * функция заполнения блока DOM-элементами на основе массива JS-объектов
 * @description отрисовываем пины на карте
 */
var renderAds = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createDomElem(ads[i]));
  }

  mapPins.appendChild(fragment);
};

renderAds();

/**
 * создание DOM-элемента объявления
 * @param {Object} obj - объект объявления из массива
 * @return {Object} DOM элемент карточки объявления
 */
var createAdCard = function (obj) {
  var adCard = document.querySelector('#card').content.querySelector('.map__card');
  var adElement = adCard.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = obj.offer.title;
  adElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  adElement.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = getTranslateType(obj.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  adElement.querySelector('.popup__features').innerHTML = getFeatureIcon(obj.offer.features);
  adElement.querySelector('.popup__description').textContent = obj.offer.description;
  adElement.querySelector('.popup__photos').innerHTML = getImages(obj.offer.photos);

  return adElement;
};

map.appendChild(createAdCard(ads[0]));

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

// функция генерации случайных данных
var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// функция рандомного числа от min до max
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// функция перемешивания массива
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

// функция выдающая случайное кол-во элементов из массива
var getRandomArr = function (arr) {
  var newArr = getShuffleArr(arr);

  newArr.splice(0, Math.floor(Math.random() * newArr.length));

  return newArr;
};

// функция возвращающая локацию
var getLocation = function () {
  var location = {};
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  location.x = getRandomInteger(0, mapWidth);
  location.y = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return location;
};

// функция генерации объявления
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

// функция генерации массива сгенерированных JS объектов
var createArrayAds = function () {
  var adsArray = [];

  for (var i = 1; i <= ADS_COUNT; i++) {
    adsArray.push(generateAd(i));
  }

  return adsArray;
};

var ads = createArrayAds();

// временно активируем карту
document.querySelector('.map').classList.remove('map--faded');

// функция создания DOM-элемента на основе JS-объекта
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

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var renderAds = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createDomElem(ads[i]));
  }

  mapPins.appendChild(fragment);
};

renderAds();

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
var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var LOCATION_X_MAX = map.offsetWidth;
var LOCATION_X_MIN = 0;

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

  location.x = getRandomInteger(0, LOCATION_X_MAX);
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
 * функция заполнения DOM-элементами на основе массива JS-объектов
 * @description отрисовываем пины на карте
 */
var mapPins = document.querySelector('.map__pins');
var renderAds = function () {
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


  adElement.querySelector('.popup__avatar').src = obj.author.avatar;
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

var inputs = document.querySelectorAll('input');
var selects = document.querySelectorAll('select');

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
 *
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
 * функция для активации состояний полей форм
 */
var activeState = function () {
  removeDisabled(inputs, selects);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

var mainPin = map.querySelector('.map__pin--main');

/**
 * обработчики активации форм нажатия и клика на главный пин
 */
mainPin.addEventListener('mousedown', function () {
  activeState();
  getCoordinatePin();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    activeState();
    getCoordinatePin();
  }
});

/**
 * блок расчета координат для поля адрес
 */
var addressInput = document.querySelector('#address');
var MAIN_PIN_START_X = 570;
var MAIN_PIN_START_Y = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_TAIL_HEIGHT = 22;

// стартовое значение пина
addressInput.setAttribute('value', Math.floor(MAIN_PIN_START_X + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(MAIN_PIN_START_Y + MAIN_PIN_HEIGHT / 2));

/**
 * @property {string} x - содержит св-во left исключая "px"
 * @property {string} y - содержит св-во top исключая "px"
 * @description обновляет строку с координатами и записывает ее в инпут адрес
 */
var getCoordinatePin = function () {
  var x = mainPin.style.left.slice(0, -2);
  var y = mainPin.style.top.slice(0, -2);
  x = Math.floor(+x + MAIN_PIN_WIDTH / 2);
  y = Math.floor(+y + MAIN_PIN_HEIGHT + PIN_TAIL_HEIGHT);

  if (y > LOCATION_Y_MAX) {
    y = LOCATION_Y_MAX;
  } if (y < LOCATION_Y_MIN) {
    y = LOCATION_Y_MIN;
  } if (x > LOCATION_X_MAX) {
    x = LOCATION_X_MAX;
  } if (x < LOCATION_X_MIN) {
    x = LOCATION_X_MIN;
  }

  addressInput.value = x + ', ' + y;
};

var inpCapacity = adForm.querySelector('#capacity');
var capacityOptions = inpCapacity.querySelectorAll('option');
var inpRooms = adForm.querySelector('#room_number');

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
 * закрытие модалки объявления
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
  map.appendChild(createAdCard(ads[elem]));
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

/**
 * проверка валидности поля типа жилья и минимальной цены
 * @description доступные поля:
 *«Бунгало» — минимальная цена за ночь 0;
 *«Квартира» — минимальная цена за ночь 1000;
 *«Дом» — минимальная цена 5000;
 *«Дворец» — минимальная цена 10000.
 */
var inpPrice = adForm.querySelector('#price');

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
var inpTypeOfHouses = adForm.querySelector('#type');

inpTypeOfHouses.addEventListener('change', function () {
  selectTypeOfHousesChangeValidator();
});

/**
 * синхронизация полей времени заезда/выезда
 */
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

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

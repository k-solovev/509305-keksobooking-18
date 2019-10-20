'use strict';

(function () {
  var adCard = document.querySelector('#card').content.querySelector('.map__card');
  var adElement = adCard.cloneNode(true);

  /**
   * создание DOM-элемента объявления
   * @param {Object} obj - объект объявления из массива
   * @return {Object} DOM элемент карточки объявления
   */
  var createAdCard = function (obj) {
    adElement.querySelector('.popup__avatar').src = obj.author.avatar;
    adElement.querySelector('.popup__title').textContent = obj.offer.title;
    adElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    adElement.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь';
    adElement.querySelector('.popup__type').textContent = window.data.getTranslateType(obj.offer.type);
    adElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    adElement.querySelector('.popup__features').innerHTML = window.data.getFeatureIcon(obj.offer.features);
    adElement.querySelector('.popup__description').textContent = obj.offer.description;
    adElement.querySelector('.popup__photos').innerHTML = window.data.getImages(obj.offer.photos);

    return adElement;
  };

  window.card = {
    createAdCard: createAdCard
  };
})();

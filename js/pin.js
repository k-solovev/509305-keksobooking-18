'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  /**
 * функция создания DOM-элемента пина на основе объекта объявления
 * @param {Object} obj - объект объявления
 * @return {Object} DOM элемент пина с координатами из свойств location
 */
  var createPinElem = function (obj) {
    var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var adElement = similarAdTemplate.cloneNode(true);

    adElement.style = 'left: ' + (obj.location.x - PIN_WIDTH / 2) + 'px; top: ' + (obj.location.y - PIN_HEIGHT) + 'px';
    adElement.querySelector('img').src = obj.author.avatar;
    adElement.querySelector('img').alt = obj.offer.title;

    adElement.addEventListener('click', function () {
      var modal = window.map.map.querySelector('.map__card');
      if (window.map.map.contains(modal)) {
        window.map.map.removeChild(modal);
      }
      window.map.map.appendChild(window.card.createAdCard(obj));
    });

    return adElement;
  };

  window.pin = {
    createPinElem: createPinElem
  };
})();

'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var STATUS_SUCCESS = 200;

  /**
   * загрузка данных с сервера
   * @param {cb} loadSucces - при успешном обращении к серверу
   * @param {cb} loadError - при ошибочном обращении
   */
  var load = function (loadSucces, loadError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        loadSucces(xhr.response);
      } else {
        loadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();

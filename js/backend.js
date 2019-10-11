'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
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
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var upload = function (data, loadSucces, loadError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        loadSucces(xhr.response);
      } else {
        loadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();

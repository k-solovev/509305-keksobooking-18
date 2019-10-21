'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var inpImgHandler = function (inpFile, outImage) {
    var file = inpFile.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      if (outImage.classList.contains('visually-hidden')) {
        outImage.classList.remove('visually-hidden');
      }

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          outImage.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  window.inputFiles = {
    inpImgHandler: inpImgHandler
  };
})();

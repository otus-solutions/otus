(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.utils.HtmlBuilderService', HtmlBuilderService);

  function HtmlBuilderService() {
    let self = this;

    self.generateTagName = generateTagName;

    function generateTagName(stringToFormat) {
      let chars = stringToFormat.split('');
      let tagName = '';

      chars.forEach(function (character, index) {
        let lowerChar = '';

        if (character === character.toUpperCase()) {
          lowerChar = character.toLowerCase();
          if (index !== 0) {
            lowerChar = '-' + lowerChar;
          }
        } else {
          lowerChar = character;
        }

        tagName = tagName + lowerChar;
      });

      return tagName;
    }
  }
})();

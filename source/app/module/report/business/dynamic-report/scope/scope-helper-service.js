(function () {
  'use strict';

  angular
    .module('otusjs.report.business.dynamicReport.scope')
    .service('otusjs.report.business.dynamicReport.scope.ScopeHelperService', Service);

  Service.$inject = [
    '$filter'
  ];

  function Service($filter) {
    var _compiledImages = false;
    var responseImages = [];
    var self = this;

    self.helper = {};
    self.helper.formatDate = formatDate;
    self.helper.getObjectByArray = getObjectByArray;
    self.helper.parseToRetinographyImage = parseToRetinographyImage;
    self.fillScopeHelper = fillScopeHelper;

    function _propertiesIsEqual(item, json) {
      let keysArray = Object.keys(json);
      let isEqual = false;
      for (let i = 0; i < keysArray.length; i++) {
        const property = keysArray[i];
        isEqual = item.hasOwnProperty(property) && item[property] === json[property];
        if (!isEqual) break;
      }
      return isEqual;
    }

    function _find(array, property, value) {
      return array.find(item => item.hasOwnProperty(property) && item[property] == value);
    }

    function formatDate(value, format = 'dd/MM/yyyy') {
      return $filter('date')(new Date(value), format);
    }

    function getObjectByArray(array, propertyOrJson, value) {
      if (!array || !array.length || propertyOrJson === undefined) return undefined;
      if (typeof propertyOrJson === "object") {
        let itemFound = undefined;
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          if (_propertiesIsEqual(item, propertyOrJson)) {
            itemFound = item;
            break;
          }
        }
        return itemFound;
      }
      return _find(array, propertyOrJson, value);
    }

    function parseToRetinographyImage(images) {
      if (!_compiledImages) {
        images.forEach(image => {
          var arrayBufferView = new Uint8Array(JSON.parse(image.result).data);
          var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
          var urlCreator = window.URL || window.webkitURL;
          responseImages.push({
            date: formatDate(image.date),
            eye: _translateEye(image.eye),
            url: urlCreator.createObjectURL(blob)
          });
        });
        _compiledImages = true;
      }
      return responseImages;
    }

    function fillScopeHelper(scope) {
      scope.helper = self.helper;
    }

    function _translateEye(eye) {
      switch (eye.toUpperCase()) {
        case 'LEFT':
          return 'Esquerdo';
        case 'RIGHT':
          return 'Direito';
        default:
          return;
      }
    }
  }
}());
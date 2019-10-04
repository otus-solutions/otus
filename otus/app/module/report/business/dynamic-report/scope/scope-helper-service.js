(function () {
  'use strict';

  angular
    .module('otusjs.report.business.dynamicReport.scope')
    .service('otusjs.report.business.dynamicReport.scope.ScopeHelperService', Service);

  Service.$inject = [
    '$filter'
  ];

  function Service($filter) {
    var _document = {};
    var self = this;

    self.helper = {};
    self.helper.formatDate = formatDate;
    self.helper.getObjectByArray = getObjectByArray;
    self.helper.parseToImage = parseToImage;
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

    function parseToImage(json, id) {
      var img = _document.body.querySelector("#" + id);
      if (img) {
        var arrayBufferView = new Uint8Array(JSON.parse(json).data);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        img.src = imageUrl;
      }
    }

    function fillScopeHelper(scope, document) {
      scope.helper = self.helper;
      _document = document;
    }
  }
}());

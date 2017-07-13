(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.AliquotValidationService', Service);

  Service.$inject = [

  ];

  function Service() {
    var self = this;

    self.valid = valid;

    _init();

    function _init() {

    }

    function valid() {
      return true;
    }

  }

}());

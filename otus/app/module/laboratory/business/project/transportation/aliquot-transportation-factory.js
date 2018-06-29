(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .factory(
      'otusjs.laboratory.business.project.transportation.AliquotTransportationFactory',
      Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    self.create = create;

    function create(code,initialDate,finalDate,fieldCenter, aliquotList, role) {
      return new LotAliquot(code,initialDate,finalDate,fieldCenter, aliquotList, role);
    }


    return self;
  }

  function LotAliquot(code,initialDate,finalDate,fieldCenter, aliquotList, role) {
    var self = this;

    self.objectType = 'LotAliquot';
    self.code = code || '';
    self.initialDate = initialDate || '';
    self.finalDate = finalDate || '';
    self.fieldCenter = fieldCenter || '';
    self.aliquotList = aliquotList || '';
    self.role = role ? 'STORAGE' : 'EXAM';

    self.toJSON = toJSON;

    function toJSON() {
      var json = {
        objectType: self.objectType,
        code: self.code,
        initialDate: self.initialDate,
        finalDate: self.finalDate,
        fieldCenter: self.fieldCenter,
        aliquotList: self.aliquotList,
        role: self.role
      };
      return json;
    }

  }

}());

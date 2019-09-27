(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .factory(
      'otusjs.laboratory.business.project.transportation.AliquotTransportationQueryFactory',
      Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    self.create = create;

    function create(code,initialDate,finalDate,fieldCenter, aliquotList, includeStorage) {
      return new AliquotQuery(code,initialDate,finalDate,fieldCenter, aliquotList, includeStorage);
    }


    return self;
  }

  function AliquotQuery(code,initialDate,finalDate,fieldCenter, aliquotList, includeStorage) {
    var self = this;

    self.objectType = 'AliquotQuery';
    self.code = code || '';
    self.initialDate = initialDate || '';
    self.finalDate = finalDate || '';
    self.fieldCenter = fieldCenter || '';
    self.aliquotList = aliquotList || [];
    self.role = includeStorage ? 'STORAGE' : 'EXAM';

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

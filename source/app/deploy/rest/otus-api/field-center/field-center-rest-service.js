(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.FieldCenterRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'

  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.loadCenters = loadCenters;

    function initialize() {
      _rest = OtusRestResourceService.getOtusFieldCenterResource();
    }

    function loadCenters() {
      var request = $q.defer();
      _rest.getAll(function(response) {
        if (response.data && response.data.length) {
          request.resolve(response.data);
        } else {
          request.resolve([]);
        }
      });
      return request.promise;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LocationPointRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getUserLocationPoint = getUserLocationPoint;
    self.getLocationPoints = getLocationPoints;

    function initialize() {
      _rest = OtusRestResourceService.getLocationPointResource();
    }

    function getUserLocationPoint() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getUserLocationPoint().$promise;
    }

    function getLocationPoints() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getLocationPoints().$promise;
    }

  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.StaticVariableRestService', Service);

  Service.$inject = [
    'OtusRestResourceService',
    '$q'
  ];

  function Service(OtusRestResourceService, $q) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getParticipantStaticVariable = getParticipantStaticVariable;

    function initialize() {
      // _rest = OtusRestResourceService.getStaticVariableResource();
    }

    function getParticipantStaticVariable(variableRequest) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var defer = $q.defer();
      return defer.promise;

      // return _rest
      //   .getVariableList(variableRequest)
      //   .then(function (response) {
      //     if (response.data && response.data.length) {
      //       return response.data;
      //     }
      //   });

    }
  }
}());

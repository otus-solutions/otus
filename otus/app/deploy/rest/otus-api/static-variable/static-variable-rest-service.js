(function () {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.StaticVariableRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getParticipantStaticVariable = getParticipantStaticVariable;

    function initialize() {
      _rest = OtusRestResourceService.getStaticVariableResource();

      // fakeInitialize();
    }

    function fakeInitialize() {
      _rest = {
        getStaticVariableList: {
          $promise: function () {
            // throw new Error("error");
            return Promise.resolve({
              data: {
                "identification": "4107",
                // "variables": [
                //   {"name":"var1","sending":"onda 1","value":"40 kg"},
                //   {"name":"var2","sending":"onda 2","value":1}
                // ]
                "variables": [
                  {"name": "var1", "sending": "onda 1", "value": "40 kg"},
                  // {"name":"var2","sending":"onda 2","value":"1"}
                ]
              }
            });
          }
        }
      }
    };

    function getParticipantStaticVariable(variableRequest) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest
        .getStaticVariableList(variableRequest)
        .$promise
        .then(function (response) {
          if (response.data) {
            return response.data;
          }
        });

    }
  }
}());

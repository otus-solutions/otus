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

      fakeInitialize();
    }

    function fakeInitialize() {
      _rest = {
        getStaticVariableList: function () {
          return Promise.resolve({
            data: {
              variables:[
                {
                  name: "var1",
                  sending: "onda 1",
                  value: 0
                },
                {
                  name: "var2",
                  sending: "onda 2",
                  value: "30Kg"
                }
              ]
            }
          });
        }
      }
    }

    function getParticipantStaticVariable(variableRequest) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest
        .getStaticVariableList({request:variableRequest})
        // .$promise
        .then(function (response) {
          if (response.data) {
            return response.data;
          }
        });

    }
  }
}());

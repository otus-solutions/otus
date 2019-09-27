(function () {
  'use strict';

  angular
    .module('otusjs.deploy.staticVariable')
    .factory('otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public Interface */
    self.create = create;

    function create(recruitmentNumber, variableList) {
      return new VariableRequest(recruitmentNumber, variableList);
    }

    return self;
  }

  function VariableRequest(recruitmentNumber, variableList) {
    var self = this;

    self.identification = recruitmentNumber;
    self.variables = buildVariables();

    function buildVariables() {
      return variableList.map(variable => {
        return {
            name: variable.name,
            sending: variable.sending

        }
      });
    }

    return self;
  }
}());

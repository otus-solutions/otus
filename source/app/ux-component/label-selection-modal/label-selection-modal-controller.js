
(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelSelectionModalCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    function activateMaterialLabelDashboard() {
      ApplicationStateService.activateMaterialLabelDashboard()
    }
  }
}());
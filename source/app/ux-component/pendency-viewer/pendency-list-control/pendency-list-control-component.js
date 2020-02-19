(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyListControl', {
      controller:'pendencyListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-control-template.html',
      bindings: {
      }
    }).controller('pendencyListControlCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    self.pendencyAttributes = [
      "account_circle",
      "description",
      "fingerprint",
      "record_voice_over",
      "assignment_turned_in",
      "hourglass_empty"
    ];

    self.selected = [];
    self.checkStates = {};
    self.infoFilter = [];

    self.exists = (item) => {
      self.checkStates[item] = true;
    };

    self.clear = (item) => {
      console.log(self.checkStates)
      console.log(self.checkStates[item]);
      console.log(item);
      self.checkStates[item] = false;
      console.log(self.checkStates)

    }

    self.orderingPreference = {};

    self.requiredPendencies = (infoFilter) => {
      console.log(infoFilter);

    }
  }

}());
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

    self.clear = clear;
    self.getPendencyList = getPendencyList;

    self.pendencyAttributes = [
      "account_circle",
      "description",
      "fingerprint",
      "record_voice_over",
      "assignment_turned_in",
      "hourglass_empty"
    ];

    self.infoFilter = [];

    function clear(item){
      self.checkStates[item] = false;
    }

    function getPendencyList(infoFilter){
      console.log(infoFilter);
    }
  }

}());
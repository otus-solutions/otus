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

    self.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    self.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };





    self.orderingPreference = {};
  }

}());
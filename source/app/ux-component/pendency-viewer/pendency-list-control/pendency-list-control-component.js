(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyListControl', {
      controller:'pendencyListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-control-template.html',
      bindings: {
      }
    }).controller('pendencyListControlCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;
  }

}());
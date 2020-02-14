(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyViewComponent', {
      controller:'pendencyViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-viewer-template.html',
      bindings: {}
    }).controller('pendencyViewCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

  }

}());
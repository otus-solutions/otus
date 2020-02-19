(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyList', {
      controller: 'pendencyListCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list/pendency-list-template.html',
      bindings: {
        pendencies: '<'
      }
    }).controller('pendencyListCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;
  }





}());


(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyListComponent', {
      controller: 'pendencyListCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list/pendency-list-template.html',
      bindings: {}
    }).controller('pendencyListCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    //TODO: (OTUS-645) service for get List of Pendencies
    self.pendencies = [
      {item: "abc"},
      {item: "def"},
      {item: "ghi"}
    ];

  }

}());
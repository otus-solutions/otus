(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusCheckerSearch', {
      controller: Controller,
      templateUrl: 'app/ux-component/checker-search/checker-search-template.html',
      bindings: {
        searchSettings: '='
      }
    });

  Controller.$inject = [
    'STATE',
    '$q',
    'otusjs.otus.uxComponent.CheckerItemFactory'



  ];

  function Controller(STATE, $q, CheckerItemFactory) {
    const self = this;

    self.$onInit = onInit;
    self.selectChecker = selectChecker;

    function onInit() {}

    function selectChecker() {

    }
  }


}());
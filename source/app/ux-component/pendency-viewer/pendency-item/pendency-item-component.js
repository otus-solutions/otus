(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyItem', {
      controller:'pendencyItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-item/pendency-item-template.html',
      bindings: {
        item: '<'
      }
    }).controller('pendencyItemCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

  }

}());
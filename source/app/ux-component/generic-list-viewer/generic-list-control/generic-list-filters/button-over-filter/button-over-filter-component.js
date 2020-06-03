(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusButtonOverFilter', {
      controller: 'buttonOverFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/button-over-filter/button-over-filter-template.html',
      bindings: {
        filterItem: '<',
        changeInputViewState: '='
      }
    }).controller('buttonOverFilterCtrl', Controller);

  function Controller() {
    const self = this;
  }

}());

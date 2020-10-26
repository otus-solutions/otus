(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelMaterialDashboardCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
  ];

  function Controller(
    $scope,
    $element) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      //
      // Publisher.unsubscribe('aliquots-data');
      // Publisher.subscribe('aliquots-data', _subscribeAliquots);
    }
  }
}());
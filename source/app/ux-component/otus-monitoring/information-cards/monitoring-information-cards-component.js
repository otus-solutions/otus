(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringInformationCardsComponent', {
      controller: "monitoringInformationCardsCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/information-cards/monitoring-information-cards-template.html',
      bindings: {
        createInformationCards: '=',
        centers: '='
      }
    });

}());

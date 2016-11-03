(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/dashboard-display/dashboard-display-template.html'
    });

  Controller.$inject = [
    '$mdDialog',
    'ParticipantSearchResultService'
  ];

  function Controller($mdDialog, ParticipantSearchResultService) {
    var self = this;

    /* Public methods */
    self.openCustomSearch = openCustomSearch;
    self.quickFilter = quickFilter;
    self.selectSearch = selectSearch;

    function quickFilter() {
      ParticipantSearchResultService.addFilter({
        'participantQuick': self.query
      });
      ParticipantSearchResultService.applyFilters();
    }

    function selectSearch() {
      if (ParticipantSearchResultService.hasClose()) {
        ParticipantSearchResultService.toggle();
      }
    }

    function openCustomSearch($event) {
      $mdDialog.show({
        controller: 'SearchCustomController',
        controllerAs: 'searchCustom',
        templateUrl: 'app/session/participant/search/dialog/search-custom-dialog.html',
        targetEvent: $event,
        clickOutsideToClose: true
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantFilter', {
      controller: 'participantFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/participant-filter/participant-filter-template.html',
      bindings: {
        item: '<',
        searchSettings: '=',
        clear: '=',
        changePaginationViewState: '='
      }
    }).controller('participantFilterCtrl', Controller);

  Controller.$inject = [
    'otusjs.pendencyViewer.PendencyViewerService'
  ];

  function Controller(PendencyViewerService) {
    const self = this;
    self.CANCEL_BUTTON_LABEL = PendencyViewerService.LABELS.CONTROL_PANEL.CANCEL_BUTTON;

  }
}());

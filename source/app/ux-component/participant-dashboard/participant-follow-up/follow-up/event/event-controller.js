(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpEventCtrl', Controller);

  Controller.$inject = [
    '$document',
    '$compile',
    '$scope',
    'otusjs.participant.business.ParticipantFollowUpService'
  ];

  function Controller($document, $compile, $scope, ParticipantFollowUpService) {
    var self = this;


    self.$onInit = onInit;
    self.changeHistoryState = changeHistoryState;

    self.translatedStatus = {
      ACCOMPLISHED: "Realizado",
      PENDING: "Pendente"
    };

    let htmlComponents = {
      ActivityAutoFillEvent: "<activity-auto-fill-event></activity-auto-fill-event>"
    };

    function onInit() {
      self.historyIsOpen = false;
      angular.element(document).ready(function () {
        let html = htmlComponents[self.eventData.objectType];
        let template = angular.element(html);
        let linkFn = $compile(template);
        let element = linkFn($scope);
        let parent = $document.find('#event-body-'+self.eventData._id);
        parent[0].appendChild(element[0]);
      });
    }

    function changeHistoryState() {
      self.historyIsOpen = !self.historyIsOpen;
    }
  }
}());
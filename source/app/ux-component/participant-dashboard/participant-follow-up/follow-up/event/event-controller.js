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
      ActivityAutoFillEvent: "<activity-auto-fill-event event-component='$ctrl'></activity-auto-fill-event>"
    };

    function onInit() {
      self.historyIsOpen = false;
      if(self.eventData.participantEvents.length > 0) {
        let pendingEvent = self.eventData.participantEvents.find((event)=>{
          return event.status === "PENDING";
        });

        if(pendingEvent) {
          self.eventData.status = "PENDING"
        } else {
          self.eventData.status = "ACCOMPLISHED"
        }
      }

      self.status =
      angular.element(document).ready(function () {
        let html = htmlComponents[self.eventData.objectType];
        let template = angular.element(html);
        let linkFn = $compile(template);
        let element = linkFn($scope);
        let parent = $document.find('#event-body-'+self.eventData._id+'-'+self.selectedParticipant.recruitmentNumber);
        parent[0].appendChild(element[0]);
      });
    }

    function changeHistoryState() {
      self.historyIsOpen = !self.historyIsOpen;
    }
  }
}());
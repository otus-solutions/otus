(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantsList', {
      controller: 'otusParticipantsListCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/list/participants-manager-list-template.html',
      bindings:{
        participantsList: "<"
      }
    });
}());

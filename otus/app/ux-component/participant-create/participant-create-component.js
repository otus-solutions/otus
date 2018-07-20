(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantCreate', {
      controller: 'otusParticipantCreateCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-create/participant-create-template.html',
      bindings: {
        loggedUser: '='
      }
    });
}());

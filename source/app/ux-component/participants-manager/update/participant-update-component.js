(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantUpdate', {
      controller: 'otusParticipantUpdateCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/update/participant-update-template.html',
      bindings:{
        permissions: '='
      }
    });
}());

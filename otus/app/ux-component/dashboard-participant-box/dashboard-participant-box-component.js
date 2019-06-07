(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantBox', {
      controller: 'otusParticipantBoxCtrl as $ctrl',
      templateUrl: 'app/ux-component/dashboard-participant-box/dashboard-participant-box-template.html',
      bindings: {
        onClose: '&'
      }
    });
})();

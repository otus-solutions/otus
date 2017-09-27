(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-toolbar/dashboard-toolbar-template.html',
      bindings: {
        onParticipantSelect: '&'
      },
      transclude: true
    });

  Controller.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService',
    '$mdToast'
  ];

  function Controller(ContextService, EventService, $mdToast) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    self.copyToClipboard = copyToClipboard;
    self.getKey = getKey;
    self.key = true;
    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      self.onParticipantSelect({
        participant: selectedParticipant
      });
    }

    function onInit() {
      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
    }

    function _loadLoggedUser(userData) {
      if (userData) {
        self.loggedUser = userData;
      } else {
        ContextService
          .getLoggedUser()
          .then(function(userData) {
            self.loggedUser = userData;
          });
      }
    }

    function copyToClipboard() {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val("1bbd70dc1b6fc84e5617ca8703c72c744b3b4fc1").select();
      document.execCommand("copy");
      $temp.remove();
      showToast("Token copiado!", 3000);

    }

    function getKey() {
      self.key = true;
    }

    function showToast(msg, delay) {
      $mdToast.show(
        $mdToast.simple()
        .position("bottom right")
        .textContent(msg)
        .hideDelay(delay)
      );
    }
  }
}());

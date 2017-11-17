(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('laboratoryRefreshButton', {
      templateUrl: 'app/ux-component/laboratory/control-panel/refresh-button/laboratory-refresh-button-template.html',
      bindings: {
        state: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.otus.dashboard.core.ContextService'
  ];

  function Controller($mdToast, $mdDialog, ParticipantLaboratoryService, Publisher, dashboardContextService) {
    var self = this;

    var confirmRefresh;

    self.$onInit = onInit;

    self.refreshClick = refreshClick;
    self.rotateClass;

    function onInit() {
      self.rotateClass = "reverse-rotate-180-deg";
      _buildDialogs();
    }

    function refreshClick() {
      var showMsg = false;
      var currentState = 'main';

      if (self.state === "coleta") {
        currentState = "coleta";

        Publisher.publish('have-tubes-changed', function (result) {
          showMsg = result;
        });
      } else if (self.state === "aliquots") {
        currentState = "aliquots";

        Publisher.publish('have-aliquots-changed', function (result) {
          showMsg = result;
        });
      }

      if (showMsg) {
        $mdDialog.show(confirmRefresh).then(function () {
          _refreshPage(currentState);
        });
      } else {
        _refreshPage(currentState);
      }
    }

    function _refreshPage(currentState) {
      Publisher.publish('refresh-laboratory-participant', currentState);
    }

    function _buildDialogs() {
      confirmRefresh = $mdDialog.confirm()
        .title('Confirmar a atualização do Laboratório:')
        .textContent('Existem alterações não finalizadas que serão descartadas.')
        .ariaLabel('Confirmar atualização do Laboratório')
        .ok('Ok')
        .cancel('Cancelar');
    }

    return self;
  }
}());

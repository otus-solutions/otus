(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('laboratoryRefreshButton', {
      templateUrl: 'app/ux-component/laboratory/control-panel/refresh-button/laboratory-refresh-button-template.html',
      bindings: {
        state: '=',
        labParticipant: '=',
        labels: '=',
        callbackFunctions: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.dashboard.core.ContextService'
  ];

  function Controller($mdToast, $mdDialog, ParticipantLaboratoryService, EventService, dashboardContextService) {
    var self = this;
    
    var PubSub = EventService.pubSub;
    var confirmRefresh;
    
    self.$onInit = onInit;
    
    self.refreshClick = refreshClick;
    self.rotateClass;
    
    
    var confirmCancel;
    var confirmFinish;
    self.changeState = changeState;
    self.finish = finish;
    self.cancelCollect = cancelCollect;
    self.cancelAndReturn = cancelAndReturn;


    self.saveAliquots = saveAliquots;
    self.cancelAliquots = cancelAliquots;


    function onInit() {
      self.rotateClass = "reverse-rotate-180-deg";
      //self.collectedTubes = [];
      _buildDialogs();
    }

    function refreshClick(){
      $mdDialog.show(confirmRefresh).then(function () {
        _refreshPage();
      });
    }

    
    function _refreshPage(){
      PubSub.publish('refresh-laboratory-participant');
    }


    function saveAliquots() {
      self.callbackFunctions.saveAliquots();
    }

    function cancelAliquots() {
      if (self.callbackFunctions.cancelAliquots()) {
        self.cancelAndReturn();
      } else {
        self.labParticipant.reloadTubeList();
        changeState('main');
      }
    }


    function changeState(moment) {
      if (moment != 'main') {
        dashboardContextService.setChangedState(moment);
      } else {
        dashboardContextService.setChangedState();
      }
      self.state = moment;
    }

    function finish() {
      $mdDialog.show(confirmFinish).then(function () {
        ParticipantLaboratoryService.updateLaboratoryParticipant().then(function () {
          self.labParticipant.updateTubeList();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Registrado com sucesso!')
              .hideDelay(1000)
          );
        }, function (e) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Falha ao registrar coleta')
              .hideDelay(1000)
          );
        });
      });
    }

    function cancelAndReturn() {
      $mdDialog.show(confirmCancel).then(function () {
        self.labParticipant.reloadTubeList();
        changeState('main');
      });
    }

    function cancelCollect() {
      $mdDialog.show(confirmCancel).then(function () {
        self.labParticipant.reloadTubeList();
      });
    }

    function _buildDialogs() {
      confirmRefresh = $mdDialog.confirm()
      .title('Confirmar a atualização do Laboratório:')
      .textContent('Existem alterações não finalizadas que serão descartadas.')
      .ariaLabel('Confirmar atualização do Laboratório')
      .ok('Ok')
      .cancel('Cancelar');
      
      // confirmCancel = $mdDialog.confirm()
      //   .title('Confirmar cancelamento:')
      //   .textContent('Alterações não finalizadas serão descartadas')
      //   .ariaLabel('Confirmação de cancelamento')
      //   .ok('Ok')
      //   .cancel('Voltar');

      // confirmFinish = $mdDialog.confirm()
      //   .title('Confirmar finalização')
      //   .textContent('Deseja salvar as alterações?')
      //   .ariaLabel('Confirmação de finalização')
      //   .ok('Ok')
      //   .cancel('Voltar');
    }

    return self;
  }
}());

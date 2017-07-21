(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labControlPanel', {
      templateUrl: 'app/ux-component/laboratory/control-panel/control-panel-template.html',
      bindings: {
        state: '=',
        labParticipant: '=',
        labels: '='
        callbackFunctions: '='
      },
      transclude: true,
      controller: controller
    });

  controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.ParticipantLaboratoryService'
  ];

  function controller($mdToast, $mdDialog, ParticipantLaboratoryService) {
    var self = this;
    var confirmCancel;
    var confirmFinish;

    self.$onInit = onInit;
    self.changeState = changeState;
    self.finish = finish;
    self.cancelCollect = cancelCollect;
    self.cancelAndReturn = cancelAndReturn;


    self.saveAliquots = saveAliquots;
    self.cancelAliquots = cancelAliquots;

    function saveAliquots(){
      self.callbackFunctions.saveAliquots();
    }

    function cancelAliquots(){
      if(self.callbackFunctions.cancelAliquots()){
        self.cancelAndReturn();
      } else {
        self.labParticipant.reloadTubeList();
        changeState('main');
      }
    }

    function onInit() {
      self.collectedTubes = [];
      _buildDialogs();
    }

    function changeState(moment) {
      self.state = moment;
    }

    function finish() {
      $mdDialog.show(confirmFinish).then(function() {
        ParticipantLaboratoryService.updateLaboratoryParticipant().then(function() {
          self.labParticipant.updateTubeList();
          $mdToast.show(
             $mdToast.simple()
             .textContent('Registrado com sucesso!')
             .hideDelay(1000)
          );
        }, function(e) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Falha ao registrar coleta')
            .hideDelay(1000)
          );
        });
      });
    }

    function cancelAndReturn() {
      $mdDialog.show(confirmCancel).then(function() {
        self.labParticipant.reloadTubeList();
        changeState('main');
      });
    }

    function cancelCollect() {
      $mdDialog.show(confirmCancel).then(function() {
        self.labParticipant.reloadTubeList();
      });
    }

    function _buildDialogs() {
      confirmCancel = $mdDialog.confirm()
        .title('Confirmar cancelamento:')
        .textContent('Alterações não finalizadas serão descartadas')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok')
        .cancel('Voltar');

      confirmFinish = $mdDialog.confirm()
        .title('Confirmar finalização')
        .textContent('Deseja salvar as alterações?')
        .ariaLabel('Confirmação de finalização')
        .ok('Ok')
        .cancel('Voltar');
    }

    return self;
  }
}());

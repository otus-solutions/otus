(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labControlPanel', {
      templateUrl: 'app/ux-component/laboratory/control-panel/control-panel-template.html',
      bindings: {
        state: '=',
        labParticipant: '=',
        labels: '=',
        callbackFunctions: '='
      },
      transclude: true,
      controller: controller
    });

  controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.otus.dashboard.core.ContextService'
  ];

  function controller($mdToast, $mdDialog, ParticipantLaboratoryService, dashboardContextService) {
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
      _buildDialogs();
    }

    function changeState(moment) {
      if(moment != 'main'){
        dashboardContextService.setChangedState(moment);
      } else {
        dashboardContextService.setChangedState();
      }
      self.state = moment;
    }

    function finish() {
      self.collectedTubes = ParticipantLaboratoryService.getListTubes();
      var _array = {};
      _array.tubes = []
      self.collectedTubes.forEach(function(tube) {
        _array.tubes.push(tube);
      });
      $mdDialog.show(confirmFinish).then(function() {
          ParticipantLaboratoryService.updateTubeCollectionData(_array).then(function() {
          self.labParticipant.updateTubeList();
          ParticipantLaboratoryService.setOlderTubeList();
          $mdToast.show(
             $mdToast.simple()
             .textContent('Registrado com sucesso!')
             .hideDelay(3000)
          );
        }, function(e) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Falha ao registrar coleta')
            .hideDelay(3000)
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

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
      },
      transclude: true,
      controller: controller
    });

  controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function controller($mdToast, $mdDialog, ParticipantLaboratoryService, dashboardContextService, LoadingScreenService, Publisher) {
    var self = this;
    var confirmCancel;
    var confirmAliquotingExitDialog;
    var confirmFinish;
    var hideDelayTime = 3000;

    self.$onInit = onInit;
    self.changeState = changeState;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelCollect = cancelCollect;
    self.cancelTubeCollectionAndReturn = cancelTubeCollectionAndReturn;


    self.saveAliquots = saveAliquots;
    self.cancelAliquots = cancelAliquots;

    function saveAliquots(){
      Publisher.publish('save-changed-aliquots');
    }

    function cancelAliquots(){
      var changedAliquots;
      
      Publisher.publish('have-aliquots-changed', function(result){
        changedAliquots = result;
      });
      
      if(changedAliquots){
        $mdDialog.show(confirmAliquotingExitDialog).then(function() {
          _returnMain();
        });
      } else {
        _returnMain();
      }
    }

    function onInit() {
      _buildDialogs();
    }

    function changeState(moment) {
      Publisher.publish('refresh-laboratory-participant', moment);
      self.state = moment;
    }
    
    function saveChangedTubes() {
      var haveTubesChanged;
      
      Publisher.publish('have-tubes-changed', function(result){
        haveTubesChanged = result;
      });

      if(haveTubesChanged){
        _updateChangedTubes();
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Não existem alterações a serem salvas.')
          .hideDelay(hideDelayTime)
        );
      }
    }

    function _updateChangedTubes() {
      var changedTubes;
      var updateChangedTubesStructure = {
        tubes: []
      };
      
      Publisher.publish('get-changed-tubes', function(result){
        changedTubes = result;
      });

      changedTubes.forEach(function(tube) {
        updateChangedTubesStructure.tubes.push(tube);
      });

      $mdDialog.show(confirmFinish).then(function() {
        ParticipantLaboratoryService.updateTubeCollectionData(updateChangedTubesStructure).then(function() {
          self.labParticipant.updateTubeList();
          Publisher.publish('fill-original-tube-list',self.labParticipant.tubes);
          Publisher.publish('refresh-laboratory-participant', 'coleta');
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
    }


    function cancelTubeCollectionAndReturn() {
      var changedTubes;
      
      Publisher.publish('have-tubes-changed', function(result){
        changedTubes = result;
      });

      if(changedTubes){
        $mdDialog.show(confirmCancel).then(function() {
          _returnMain();
        });
      } else {
        _returnMain();
      }
    }
    
    function _returnMain(){
      LoadingScreenService.start();
      _reloadTubeList();
      changeState('main');
      LoadingScreenService.finish();
    }


    function cancelCollect() {
      var changedTubes;

      Publisher.publish('have-tubes-changed', function(result){
        changedTubes = result;
      });

      if(changedTubes){
        $mdDialog.show(confirmCancel).then(function() {
          _reloadTubeList();
          Publisher.publish('refresh-laboratory-participant', 'coleta');
          _showToastMsg('As alterações foram desfeitas.');
        });
      } else {
        _showToastMsg('As alterações foram desfeitas.');
      }
    }

    function _reloadTubeList(){
      self.labParticipant.reloadTubeList();
      Publisher.publish('fill-original-tube-list',self.labParticipant.tubes);
    }

    function _showToastMsg(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .hideDelay(hideDelayTime)
     );
    }

    function _buildDialogs() {
      confirmCancel = $mdDialog.confirm()
        .title('Confirmar cancelamento:')
        .textContent('Alterações não finalizadas serão descartadas')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok')
        .cancel('Voltar');

      confirmAliquotingExitDialog = $mdDialog.confirm()
        .title('Descartar Alterações?')
        .textContent('Alíquotas alteradas serão descartadas.')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Continuar')
        .cancel('Cancelar');

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

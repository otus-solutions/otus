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
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function controller($mdToast, $mdDialog, ParticipantLaboratoryService, dashboardContextService, LoadingScreenService, Publisher) {
    var self = this;
    var confirmCancel;
    var confirmFinish;
    var hideDelayTime = 3000;

    self.$onInit = onInit;
    self.changeState = changeState;
    self.finish = finish;
    self.cancelCollect = cancelCollect;
    self.cancelAndReturn = cancelAndReturn;

    // Publisher.publish('have-tubes-changed', function(result){
    //   showMsg = result;
    // });

    self.saveAliquots = saveAliquots;
    self.cancelAliquots = cancelAliquots;

    function saveAliquots(){
      self.callbackFunctions.saveAliquots();
    }

    function cancelAliquots(){
      if(self.callbackFunctions.haveAliquotsChanged()){
        self.cancelAndReturn();
      } else {
        _returnMain();
      }
    }

    function onInit() {
      self.collectedTubes = [];
      _buildDialogs();
    }

    function changeState(moment) {
      // if(moment != 'main'){
      //   dashboardContextService.setChangedState(moment);
      // } else {
      //   dashboardContextService.setChangedState();
      // }
      Publisher.publish('refresh-laboratory-participant', moment);
      self.state = moment;
    }

    function finish() {
      var changedTubes;
      
      Publisher.publish('have-tubes-changed', function(result){
        changedTubes = result;
      });

      if(changedTubes){
        _finish();
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Não existem alterações a serem salvas.')
          .hideDelay(hideDelayTime)
        );
      }
    }

    function _finish() {
      var changedTubes;
      
      Publisher.publish('get-changed-tubes', function(result){
        changedTubes = result;
      });

      console.log('changedTubes',changedTubes);

      $mdDialog.show(confirmFinish).then(function() {
        ParticipantLaboratoryService.updateLaboratoryParticipant().then(function() {
          self.labParticipant.updateTubeList();
          $mdToast.show(
             $mdToast.simple()
             .textContent('Registrado com sucesso!')
             .hideDelay(hideDelayTime)
          );
          Publisher.publish('fill-original-tube-list',self.labParticipant.tubes);
        }, function(e) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Falha ao registrar coleta')
            .hideDelay(hideDelayTime)
          );
        });
      });
    }


    function cancelAndReturn() {
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
          _undoneChangesMsg();
        });
      } else {
        _undoneChangesMsg();
      }
    }

    function _reloadTubeList(){
      self.labParticipant.reloadTubeList();
      Publisher.publish('fill-original-tube-list',self.labParticipant.tubes);
    }

    function _undoneChangesMsg(){
      $mdToast.show(
        $mdToast.simple()
        .textContent('As alterações foram desfeitas.')
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

(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labControlPanel', {
      templateUrl: 'app/ux-component/laboratory/control-panel/control-panel-template.html',
      bindings: {
        state: '=',
        labParticipant: '='
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

    function onInit() {
      self.collectedTubes = [];
      _buildDialogs();
      self.labels = ParticipantLaboratoryService.generateLabels();
      self.labels.tubes = _orderTubesWithLabelNullAlphabetically(self.labels.tubes);
      console.log(self.labels.tubes);
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
          console.log(e);
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

    function _orderTubesWithLabelNullAlphabetically(tubeList) {
      var sortedArrayOfNulls = _removeTubesWithOrderNull(tubeList).sort(_sortByTubeLabel);
      return _concatArrays(tubeList, sortedArrayOfNulls);
    }

    function _concatArrays(array1, array2) {
      return array1.concat(array2);
    }

    function _sortByTubeLabel(a, b) {
      // if label are equals
      if(a.label.toLowerCase() ===  b.label.toLowerCase()) {
        // sort by code
        return a.code > b.code;
      }
      return a.label.toLowerCase() >  b.label.toLowerCase();
    }

    function _removeTubesWithOrderNull(tubeList) {
      var firstIndexOfOrderNull = tubeList.findIndex(function(tube) {
        return tube.order === null;
      });
      return tubeList.splice(firstIndexOfOrderNull, tubeList.length);
    }

  }
}());

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
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory'
  ];

  function controller($mdToast, $mdDialog, ParticipantLaboratoryService, dashboardContextService, LoadingScreenService,
                      Publisher, DialogService, LocationPointRestService, LocationPointFactory) {
    var self = this;
    var confirmCancel;
    var confirmAliquotingExitDialog;
    var confirmFinish;
    var invalidDate;
    var _time;
    var hideDelayTime = 3000;
    var changedTubes = false;

    self.selectedTubes = []
    self.selectedLocationPoint = {}
    self.newLabels = {}

    self.userLocationPoints = []

    self.$onInit = onInit;
    self.changeState = changeState;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelCollect = cancelCollect;
    self.cancelTubeCollectionAndReturn = cancelTubeCollectionAndReturn;
    self.verifyDate = verifyDate;
    self.saveAliquots = saveAliquots;
    self.cancelAliquots = cancelAliquots;
    self.removeDuplicatedMoments = removeDuplicatedMoments;
    self.filterTubesByMoment = filterTubesByMoment;
    self.fetchLocationPoints = fetchLocationPoints;
    self.fetchUserLocationPoints = fetchUserLocationPoints;
    self.saveLocationPoint = saveLocationPoint;
    self.changeAliquotsLocationPoints = changeAliquotsLocationPoints
    self.changeAliquotsProcessingDate = changeAliquotsProcessingDate

    function onInit() {
      _buildDialogs();
      removeDuplicatedMoments();
      fetchLocationPoints();
      self.processingDate = new Date();
      self.now = new Date();
      verifyDate();
    }

    function changeAliquotsLocationPoints() {
      Publisher.publish('aliquots-data', (aliquots) => {
        aliquots.forEach(aliquot => {
          if(!aliquot.isSaved) {
            aliquot.locationPoint = self.selectedLocationPoint
          }
        })
      })
    }

    function changeAliquotsProcessingDate() {
      Publisher.publish('aliquots-data', (aliquots) => {
        console.info(aliquots)
        aliquots.forEach(aliquot => {
          if(!aliquot.isSaved) {
            aliquot.processing = self.processingDate
          }
        })
      })
    }

    function _getLocationPoints(callback) {
      callback(
        self.locationPoints
      )
    }

    function _getSelectedLocationPoint(callback) {
      callback(
        self.selectedLocationPoint
      )
    }
    function _getUserLocationPoints(callback){
      callback(
        self.userLocationPoints
      )
    }

    function saveLocationPoint() {
      Publisher.unsubscribe('selected-location-point')
      Publisher.subscribe('selected-location-point', _getSelectedLocationPoint)
    }

    function filterByParticipantLocationPoint() {
      const laboratoryParticipantLocationPoint = ParticipantLaboratoryService.participant.fieldCenter.locationPoint
      self.participantLocationPoint = self.locationPoints.filter( locationPoint =>
        locationPoint._id == laboratoryParticipantLocationPoint
      )
    }

    function fetchLocationPoints() {
      LocationPointRestService.getLocationPoints().then((response) => {
        self.locationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
        Publisher.unsubscribe('location-points');
        Publisher.subscribe('location-points', _getLocationPoints)
      }).then(() => {
        filterByParticipantLocationPoint();
      }).then (() => {
        fetchUserLocationPoints();
        saveLocationPoint();
      })
    }

    function fetchUserLocationPoints() {
      LocationPointRestService.getUserLocationPoint().then(function (response) {
        self.userLocationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
        Publisher.unsubscribe('user-location-points');
        Publisher.subscribe('user-location-points', _getUserLocationPoints);
      }).then(() => {
        self.userLocationPointsFiltered = self.userLocationPoints.filter(userLocationPoint =>
          userLocationPoint._id != self.participantLocationPoint[0]._id)
      });
    }

    function filterTubesByMoment() {
      if(self.selectedTubes.includes("TODOS")){
        self.selectedTubes = self.moments
        return self.newLabels = angular.copy(self.labels)
      }
      if(self.selectedTubes.length > 0) {
        const filteredTubes = self.labels.tubes.filter(tube => {
          return self.selectedTubes.includes(tube.momentLabel);
        })
        self.newLabels = angular.copy(self.labels)
        self.newLabels.tubes = filteredTubes
      }
    }

    function removeDuplicatedMoments(){
      const tubesMoments = self.labels.tubes.map((tube)=>
        tube.momentLabel
      )
      self.moments = ["TODOS", ...new Set(tubesMoments)]
    }

    function saveAliquots() {
      Publisher.publish('save-changed-aliquots');
    }

    function cancelAliquots() {
      var changedAliquots;

      Publisher.publish('have-aliquots-changed', function(result) {
        changedAliquots = result;
      });

      if (changedAliquots) {
        DialogService.showDialog(confirmAliquotingExitDialog).then(function() {
          _returnMain();
        });
      } else {
        _returnMain();
      }
    }

    function _getDateTimeProcessing(callback) {
      callback({
        date: self.processingDate
      })
    }

    function changeState(moment) {
      Publisher.publish('refresh-laboratory-participant', moment);
      self.state = moment;
    }

    function saveChangedTubes() {
      var haveTubesChanged;

      Publisher.publish('have-tubes-changed', function(result) {
        haveTubesChanged = result;
      });

      if (haveTubesChanged) {
        _updateChangedTubes();
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Não existem alterações a serem salvas.')
            .hideDelay(hideDelayTime)
        );
      }
    }

    self.fetchChanges = fetchChanges;
    function fetchChanges() {
      Publisher.publish('have-aliquots-changed', function(result) {
        changedTubes = result;
      });

      return !changedTubes;
    }

    function _updateChangedTubes() {
      var changedTubes;
      var updateChangedTubesStructure = {
        tubes: []
      };

      Publisher.publish('get-changed-tubes', function(result) {
        changedTubes = result;
      });

      changedTubes.forEach(function(tube) {
        updateChangedTubesStructure.tubes.push(tube);
      });

      DialogService.showDialog(confirmFinish).then(function() {
        ParticipantLaboratoryService.updateTubeCollectionData(updateChangedTubesStructure).then(function() {
          self.labParticipant.updateTubeList();
          Publisher.publish('fill-original-tube-list', self.labParticipant.tubes);
          Publisher.publish('refresh-laboratory-participant', 'coleta');
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
    }

    function cancelTubeCollectionAndReturn() {
      var changedTubes;

      Publisher.publish('have-tubes-changed', function(result) {
        changedTubes = result;
      });

      if (changedTubes) {
        DialogService.showDialog(confirmCancel).then(function() {
          _returnMain();
        });
      } else {
        _returnMain();
      }
    }

    function _returnMain() {
      LoadingScreenService.start();
      _reloadTubeList();
      changeState('main');
      LoadingScreenService.finish();
    }


    function cancelCollect() {
      var changedTubes;

      Publisher.publish('have-tubes-changed', function(result) {
        changedTubes = result;
      });

      if (changedTubes) {
        DialogService.showDialog(confirmCancel).then(function() {
          _reloadTubeList();
          Publisher.publish('refresh-laboratory-participant', 'coleta');
          _showToastMsg('As alterações foram desfeitas.');
        });

      } else {
        _showToastMsg('As alterações foram desfeitas.');
      }
    }

    function _reloadTubeList() {
      self.labParticipant.reloadTubeList();
      Publisher.publish('fill-original-tube-list', self.labParticipant.tubes);
    }

    function _showToastMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(hideDelayTime)
      );
    }


    function _buildDialogs() {
      self.getButtons = getButtons;

      self.buttons = [
        {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        },
        {
          message:'Voltar',
          action:function(){$mdDialog.cancel()},
          class:'md-raised md-no-focus'
        }
      ];

      function getButtons(){
        return self.buttons;
      }

      confirmCancel = {
        dialogToTitle:'Cancelamento',
        titleToText:'Confirmar cancelamento:',
        textDialog:'Alterações não finalizadas serão descartadas.',
        ariaLabel:'Confirmação de cancelamento',
        buttons: getButtons()
      };

      confirmAliquotingExitDialog = {
        dialogToTitle:'Cancelamento',
        titleToText:'Descartar Alterações?',
        textDialog:'Alíquotas alteradas serão descartadas.',
        ariaLabel:'Confirmação de cancelamento',
        buttons: [
          {
            message:'Continuar',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Cancelar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      confirmFinish = {
        dialogToTitle:'Salvar',
        titleToText:'Confirmar alteração:',
        textDialog:'Deseja salvar as alterações?',
        ariaLabel:'Confirmação de finalização',
        buttons: getButtons()
      };

      invalidDate = {
        dialogToTitle:'Obrigatório',
        titleToText:'Atenção',
        textDialog:'Campo obrigatório!',
        ariaLabel:'Confirmação de data',
        buttons: [
          {
            message:'ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };
    }

    function verifyDate() {
      if (!self.processingDate) {
        DialogService.showDialog(invalidDate);
        self.processingDate = new Date();
      }
      Publisher.unsubscribe('datetime-processing');
      Publisher.subscribe('datetime-processing', _getDateTimeProcessing);
    }

    return self;
  }
}());
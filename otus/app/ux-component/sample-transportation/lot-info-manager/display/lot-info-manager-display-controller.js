(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLotInfoManagerDisplayCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    '$filter',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationMesssagesService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$q',
    'otusjs.deploy.LoadingScreenService',
    '$scope'
  ];

  function Controller($mdDialog, $mdToast, $filter, AliquotTransportationService, AliquotTransportationMessagesService, DynamicTableSettingsFactory, $q, LoadingScreenService, $scope) {
    var self = this;


    var messageLoading =
      'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';

    self.$onInit = onInit;
    $scope.render = false;


    self.dynamicTableSettings;
    self.currentNavItem = "insertionByPeriod";
    self.changeNavItem = changeNavItem;

    self.AliquotTransportationService = AliquotTransportationService;

    self.aliquotInputkeydown = aliquotInputkeydown;
    self.insertAliquotsByPeriod = insertAliquotsByPeriod;
    self.periodInputkeydown = periodInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;
    self.removeElement = removeElement;

    var _confirmAliquotsInsertionByPeriod;


    function changeNavItem(newNavItem) {
      self.currentNavItem = newNavItem;
    }

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      self.storage = false;
      _updateContainerLabel();
      self.aliquotCode = "";
      self.initialDate = new Date();
      self.finalDate = new Date();
      _buildDialogs();
      _buildDynamicTableSettings();
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Código', '15', 'left', 4)
        //property, formatType
        .addColumnProperty('code')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Tipo', '25', '', 1)
        //property, formatType
        .addColumnProperty('label')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Recipiente', '15', '', 3)
        //property, formatType
        .addColumnProperty('containerLabel')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Processamento', '15', '', 2)
        //property, formatType
        .addColumnProperty('aliquotCollectionData.processing', 'DATE')
        .addHeader('Função', '15', '', 5)
        .addColumnProperty('roleLabel')
        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'delete_forever', 'Remover Alíquota', '', 'A Alíquota foi removida',
          self.removeElement, false, false, true, false, false
        )

        .setElementsArray(self.lot.aliquotList)
        .setTitle('Lista de Arquivos')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(AliquotTransportationService.dynamicDataTableFunction.updateDataTable)
        /*
          //Optional Config's
          .setFormatData("'Dia - 'dd/MM/yy")
          .setCheckbox(false)
          .setFilter(true)
          .setReorder(true)
          .setPagination(true)
          .setSelectedColor()
          .setHoverColor()

        */
        .getSettings();
    }

    function removeElement(element) {
      _unselectedAllAliquot();
      var aliquotIndex = self.lot.aliquotList.indexOf(element);
      self.lot.removeAliquotByIndex(aliquotIndex);
    }

    function _buildDialogs() {
      _confirmAliquotsInsertionByPeriod = $mdDialog.confirm()
        .title('Confirmar inclusão de Alíquotas:')
        .textContent('Serão incluídas no lote as Alíquotas realizadas no perído selecionado.')
        .ariaLabel('Confirmar inclusão de Alíquotas por Período')
        .ok('Confirmar')
        .cancel('Cancelar');
    }

    function _dynamicDataTableUpdate() {
      AliquotTransportationService.dynamicDataTableFunction.updateDataTable();
      self.selectedAliquots = [];
    }

    function _updateContainerLabel() {
      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = AliquotTransportationService.getContainerLabelToAliquot(aliquot);
      }, this);
    }

    function insertAliquotsByPeriod() {
      if (self.initialDate instanceof Date && self.finalDate instanceof Date) {
        self.initialDate = new Date(self.initialDate.toISOString());
        self.finalDate = new Date(self.finalDate.toISOString());



        if (self.initialDate <= self.finalDate) {
          _confirmAliquotsInsertionByPeriod.textContent('Serão incluídas no lote as Alíquotas realizadas no período' +
            ' entre ' + $filter('date')(self.initialDate, 'dd/MM/yyyy') + ' a ' + $filter('date')(self.finalDate, 'dd/MM/yyyy') + '.');

          $mdDialog.show(_confirmAliquotsInsertionByPeriod).then(function() {
            var successInsertion = false;
            _findAliquotByPeriod(self.initialDate, self.finalDate)
              .then(function(response) {
                successInsertion = response;
                self.onLotAlteration({
                  newData: self.lot.toJSON()
                });
                self.setChartData();
                _updateContainerLabel();
                if (successInsertion) {
                  _dynamicDataTableUpdate();
                  AliquotTransportationMessagesService.successInAliquotInsertion();
                  LoadingScreenService.finish();

                } else {
                  AliquotTransportationMessagesService.notAliquotsInserted();
                }

              });
          });
        } else {
          AliquotTransportationMessagesService.invalidPeriodInterval();
        }
      } else {
        AliquotTransportationMessagesService.unselectedPeriod();
      }
    }

    function _findAliquotByPeriod(initialDate, finalDate) {
      var deferred = $q.defer();
      var _storage = self.storage ? 'Storage' : null;
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      AliquotTransportationService.getAliquotsByPeriod(initialDate.toISOString(), finalDate.toISOString(), self.lot.fieldCenter.acronym, _storage)
        .then(function(response) {

          self.fullAliquotsList = angular.copy(response);
          self.lot.insertAliquotList(angular.copy(self.fullAliquotsList));
          // self.lot.aliquotList = self.lot.aliquotList.concat(angular.copy(self.fullAliquotsList));
          setTimeout(function() {
            deferred.resolve(true);
          }, 10000);

        });
      return deferred.promise;
    }

    function periodInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if (charCode == '13') {
        self.insertAliquotsByPeriod();
      }
    }

    function aliquotInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if (charCode == '13' && self.aliquotCode.length > 0) {
        self.fastInsertion(self.aliquotCode);
      }
    }


    function fastInsertion(newAliquotCode, hideMsgErrors) {
      var foundAliquot = _findAliquot(newAliquotCode);
      var successInsertion = false;

      if (foundAliquot) {
        if (foundAliquot.fieldCenter.acronym !== self.lot.fieldCenter.acronym) {
          if (!hideMsgErrors) AliquotTransportationMessagesService.toastWrongFieldCenter(newAliquotCode);
        } else if (_findAliquotInLot(newAliquotCode)) {
          if (!hideMsgErrors) AliquotTransportationMessagesService.toastDuplicated(newAliquotCode);
        } else if (_findAliquotsInOtherLots(newAliquotCode)) {
          if (!hideMsgErrors) AliquotTransportationMessagesService.toastOtherLot(newAliquotCode);
        } else {
          self.lot.insertAliquot(foundAliquot);
          self.onLotAlteration({
            newData: self.lot.toJSON()
          });
          self.setChartData();
          _updateContainerLabel();
          successInsertion = true;
          if (!hideMsgErrors) _dynamicDataTableUpdate();
        }
      } else {
        if (!hideMsgErrors) AliquotTransportationMessagesService.toastError(newAliquotCode);
      }
      self.aliquotCode = "";
      return successInsertion;
    }

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectAliquot(change.element);
      }
    }

    function _unselectedAllAliquot() {
      self.selectedAliquots = [];

      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.isSelected = false;
      });
    }

    function selectAliquot(aliquot) {
      var aliquotIndex = self.selectedAliquots.indexOf(aliquot);
      if (aliquotIndex > -1) {
        self.selectedAliquots.splice(aliquotIndex, 1);
        aliquot.isSelected = false;
      } else {
        self.selectedAliquots.push(aliquot);
        aliquot.isSelected = true;
      }
    }

    function _findAliquotInLot(code) {
      return self.lot.getAliquotCodeList().find(function(aliquotsInLot) {
        return aliquotsInLot.code == code;
      });
    }

    function _getWorkAliquot() {
      var _storage = self.storage ? 'Storage' : null;
      AliquotTransportationService.validateAliquot(code, self.lot.fieldCenter.acronym, _storage)
        .then(function(availableAliquot) {
          return availableAliquot == code;
        });
    }

  }
}());

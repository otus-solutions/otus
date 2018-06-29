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
    'otusjs.laboratory.business.project.transportation.AliquotTransportationFactory',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$q',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(
    $mdDialog,
    $mdToast,
    $filter,
    AliquotTransportationService,
    AliquotTransportationMessagesService,
    AliquotTransportationFactory,
    DynamicTableSettingsFactory,
    $q,
    LoadingScreenService) {
    var self = this;

    var messageLoading =
      'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';

    self.$onInit = onInit;

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

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectAliquot(change.element);
      }
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

    function _unselectedAllAliquot() {
      self.selectedAliquots = [];
      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.isSelected = false;
      });
    }

    function _updateDynamicTable() {
      self.onLotAlteration({
        newData: self.lot.toJSON()
      });
      self.setChartData();
      _updateContainerLabel();
      _dynamicDataTableUpdate();
    }

    function removeElement(element) {
      _unselectedAllAliquot();
      var aliquotIndex = self.lot.aliquotList.indexOf(element);
      self.lot.removeAliquotByIndex(aliquotIndex);
      _updateDynamicTable();
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

    function insertAliquotsByPeriod() {
      if (self.initialDate instanceof Date && self.finalDate instanceof Date) {
        self.initialDate = new Date(self.initialDate.toISOString());
        self.finalDate = new Date(self.finalDate.toISOString());

        if (self.initialDate <= self.finalDate) {
          _confirmAliquotsInsertionByPeriod.textContent('Serão incluídas no lote as Alíquotas realizadas no período' +
            ' entre ' + $filter('date')(self.initialDate, 'dd/MM/yyyy') + ' a ' + $filter('date')(self.finalDate, 'dd/MM/yyyy') + '.');

          $mdDialog.show(_confirmAliquotsInsertionByPeriod).then(function() {
            LoadingScreenService.changeMessage(messageLoading);
            LoadingScreenService.start();
            _findAliquotByPeriod(self.initialDate.toISOString(), self.finalDate.toISOString())
              .then(function(response) {
                if (response) {
                  _updateDynamicTable();
                  AliquotTransportationMessagesService.successInAliquotInsertion();
                } else {
                  AliquotTransportationMessagesService.notAliquotsInserted();
                }
                LoadingScreenService.finish();
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
      var _query = AliquotTransportationFactory.create(null, initialDate, finalDate, self.lot.fieldCenter.acronym, self.lot.getAliquotCodeList(), self.storage);
      AliquotTransportationService.getAliquots(_query.toJSON())
        .then(function(response) {
          if(response.length){
            self.fullAliquotsList = angular.copy(response);
            self.lot.insertAliquotList(self.fullAliquotsList);
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
        }).catch(function(err) {
          deferred.resolve(false);
        });
      return deferred.promise;
    }

    function fastInsertion(newAliquotCode) {
      if (newAliquotCode) {
        if (_findAliquotsInOtherLots(newAliquotCode)) {
          AliquotTransportationMessagesService.toastOtherLot(newAliquotCode);
        } else {
          _findAliquot(newAliquotCode).then(function(foundAliquot) {
            var successInsertion = false;
            if (foundAliquot) {
              if (newAliquotCode == foundAliquot.code) {
                self.lot.insertAliquot(availableAliquot);
                _updateDynamicTable();
                AliquotTransportationMessagesService.successInAliquotInsertion();
                successInsertion = true;
              }
            } else {
              AliquotTransportationMessagesService.toastError(newAliquotCode);
            }
          });
        }
        self.aliquotCode = "";
        return successInsertion;
      }
    }

    function _findAliquot(code) {
      var deferred = $q.defer();
      if (_isDuplicated(code)) {
        AliquotTransportationMessagesService.toastDuplicated(code);
        deferred.reject();
      } else {
        var _query = AliquotTransportationFactory.create(code, null, null, self.lot.fieldCenter.acronym, self.lot.getAliquotCodeList(), self.storage);
        AliquotTransportationService.getAliquots(_query.toJSON())
          .then(function(availableAliquot) {
            deferred.resolve(availableAliquot);
          }).catch(function() {
            AliquotTransportationMessagesService.toastError(code);
            deferred.reject();
          });
      }
      return deferred.promise;
    }

    function _isDuplicated(code) {
      return self.lot.getAliquotCodeList().find(function(aliquotCode) { return aliquotCode == code; });
    }

    function _findAliquotsInOtherLots(code) {
      return self.aliquotsInOtherLotsList.find(function(aliquotCode) { return aliquotCode == code;  });
    }
  }
}());

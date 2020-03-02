(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLotInfoManagerDisplayCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    '$filter',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationMessagesService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationQueryFactory',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory',
    '$scope'
  ];

  function Controller(
    $mdDialog,
    $filter,
    AliquotTransportationService,
    AliquotTransportationMessagesService,
    AliquotTransportationQueryFactory,
    DynamicTableSettingsFactory,
    LoadingScreenService,
    DialogService,
    LocationPointRestService,
    LocationPointFactory,
    $scope) {
    var self = this;

    var messageLoading =
      'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';

    self.$onInit = onInit;

    self.dynamicTableSettings;
    self.currentNavItem = "insertionByPeriod";
    self.changeNavItem = changeNavItem;

    self.AliquotTransportationService = AliquotTransportationService;
    self.clearLot = clearLot;
    self.aliquotInputkeydown = aliquotInputkeydown;
    self.insertAliquotsByPeriod = insertAliquotsByPeriod;
    self.periodInputkeydown = periodInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;
    self.removeElement = removeElement;

    var _confirmAliquotsInsertionByPeriod, _confirmAlterOriginLocation;

    $scope.$watch('$ctrl.lot.originLocationPoint', function (newValue, oldValue) {
      if (oldValue){
        if (self.lot.aliquotList.length && !self.lot.code){
          self.clearLot(oldValue);
        }
      }
    });


    function changeNavItem(newNavItem) {
      self.currentNavItem = newNavItem;
    }

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      LocationPointRestService.getLocationPoints().then(function (response) {
        if (response.data) {
          var result = response.data;
          if (result.transportLocationPoints){
            self.destinationLocationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
          }
        }
      });

      LocationPointRestService.getUserLocationPoint().then(function (response) {
        self.originLocationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
        self.selectedOriginLocationPoint = angular.copy(self.originLocationPoints[0]._id);
      });
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
      self.lot.aliquotList.forEach(function (aliquot) {
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

    function clearLot(oldValue) {
      if (self.lot.originLocationPoint != self.selectedOriginLocationPoint) {

        DialogService.showDialog(_confirmAlterOriginLocation).then(function () {
          LoadingScreenService.changeMessage(messageLoading);
          LoadingScreenService.start();
          self.selectedOriginLocationPoint = angular.copy(self.lot.originLocationPoint);
          for (var i = 0; i < self.lot.aliquotList.length; i++) {
            self.lot.removeAliquotByIndex(i);
          }
          _updateDynamicTable();
          LoadingScreenService.finish();

        }).catch(function () {
          self.lot.originLocationPoint = oldValue;
        });
      }

    }

    function _buildDialogs() {
      _confirmAliquotsInsertionByPeriod = {
        dialogToTitle: 'Inclusão',
        titleToText: 'Confirmar inclusão de Alíquotas:',
        textDialog: 'Serão incluídas no lote as Alíquotas realizadas no perído selecionado.',
        ariaLabel: 'Confirmar inclusão de Alíquotas por Período',
        buttons: [
          {
            message: 'Confirmar',
            action: function () {
              $mdDialog.hide()
            },
            class: 'md-raised md-primary'
          },
          {
            message: 'Cancelar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          }
        ]
      };

      _confirmAlterOriginLocation = {
        dialogToTitle: 'ATENÇÃO',
        titleToText: 'Confirmar alteração de origem do material:',
        textDialog: 'Ao confirmar essa ação, todo o material existente será removido do lote.',
        ariaLabel: 'Confirmar alteração de origem',
        buttons: [
          {
            message: 'Confirmar',
            action: function () {
              $mdDialog.hide()
            },
            class: 'md-raised md-primary'
          },
          {
            message: 'Cancelar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          }
        ]
      };
    }

    function _dynamicDataTableUpdate() {
      self.AliquotTransportationService.dynamicDataTableFunction.updateDataTable();
      self.selectedAliquots = [];
    }

    function _updateContainerLabel() {
      self.lot.aliquotList.forEach(function (aliquot) {
        aliquot.containerLabel = self.AliquotTransportationService.getContainerLabelToAliquot(aliquot);
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
        event.preventDefault();
        self.fastInsertion(self.aliquotCode);
      }
    }

    function insertAliquotsByPeriod() {
      var successInsertion = false;
      if (self.initialDate instanceof Date && self.finalDate instanceof Date) {
        self.initialDate = new Date(self.initialDate.toISOString());
        self.finalDate = new Date(self.finalDate.toISOString());

        if (self.initialDate <= self.finalDate) {
          _confirmAliquotsInsertionByPeriod.textDialog = 'Serão incluídas no lote as Alíquotas disponíveis realizadas no período' +
            ' entre ' + $filter('date')(self.initialDate, 'dd/MM/yyyy') + ' a ' + $filter('date')(self.finalDate, 'dd/MM/yyyy') + '.';

          DialogService.showDialog(_confirmAliquotsInsertionByPeriod).then(function () {
            LoadingScreenService.changeMessage(messageLoading);
            LoadingScreenService.start();
            _findAliquotByPeriod()
              .then(function (response) {
                if (response) {
                  _updateDynamicTable();
                  successInsertion = true;
                }
                LoadingScreenService.finish();
              }).catch(function () {
              LoadingScreenService.finish();
            });
          }).catch(function () {
          });
        } else {
          AliquotTransportationMessagesService.invalidPeriodInterval();
        }
      } else {
        AliquotTransportationMessagesService.unselectedPeriod();
      }

      return successInsertion;
    }

    function _ajustHours() {
      self.initialDate.setHours(0, 0, 0, 0);
      self.finalDate.setHours(23, 59, 59, 999);
    }

    function _findAliquotByPeriod() {
      _ajustHours();
      var _query = AliquotTransportationQueryFactory.create(null, self.initialDate.toISOString(), self.finalDate.toISOString(),
        self.lot.originLocationPoint, self.lot.getAliquotCodeList(), self.storage);
      return self.AliquotTransportationService.getAliquots(_query.toJSON(), false)
        .then(function (response) {
          if (response.length) {
            self.lot.insertAliquotList(response);
            AliquotTransportationMessagesService.successInAliquotInsertion();
            return response;
          } else {
            AliquotTransportationMessagesService.notAliquotsInserted();
            return false;
          }
        }).catch(function (err) {
          AliquotTransportationMessagesService.notAliquotsInserted();
          return false;
        });

    }

    function fastInsertion(newAliquotCode) {
      var successInsertion = false;
      if (newAliquotCode) {
        _findAliquot(newAliquotCode).then(function (foundAliquot) {
          if (foundAliquot) {
            if (newAliquotCode == foundAliquot.code) {
              _updateDynamicTable();
              successInsertion = true;
            }
          }
        }).catch(function (err) {
        });

        self.aliquotCode = "";
        return successInsertion;
      }
    }

    function _findAliquot(code) {
      var _query = AliquotTransportationQueryFactory.create(code, null, null,
        self.lot.originLocationPoint, self.lot.getAliquotCodeList(), self.storage);
      return self.AliquotTransportationService.getAliquots(_query.toJSON(), true)
        .then(function (availableAliquot) {
          if (availableAliquot) {
            if (_isDuplicated(code)) {
              AliquotTransportationMessagesService.toastDuplicated(code);
              return;
            } else {
              self.lot.insertAliquot(availableAliquot);
              AliquotTransportationMessagesService.successInAliquotInsertion();
              return availableAliquot;
            }
          } else {
            AliquotTransportationMessagesService.toastNotFoundError(code);
            return availableAliquot;
          }
        }).catch(function () {
          AliquotTransportationMessagesService.toastOtherLot(code);
          return;
        });


    }

    function _isDuplicated(code) {
      return self.lot.getAliquotCodeList().find(function (aliquotCode) {
        return aliquotCode == code;
      });
    }
  }
}());

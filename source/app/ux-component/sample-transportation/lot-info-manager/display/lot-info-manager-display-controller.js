(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLotInfoManagerDisplayCtrl', Controller);

  Controller.$inject = [
    '$filter',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationMessagesService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationQueryFactory',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory',
    '$scope'
  ];

  function Controller(
    $filter,
    MaterialTransportationService,
    MaterialTransportationMessagesService,
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
    self.receivedList = [];

    self.changeNavItem = changeNavItem;

    self.MaterialTransportationService = MaterialTransportationService;
    self.clearLot = clearLot;
    self.aliquotInputkeydown = aliquotInputkeydown;
    self.tubeInputkeydown = tubeInputkeydown;
    self.insertAliquotsByPeriod = insertAliquotsByPeriod;
    self.periodInputkeydown = periodInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;
    self.removeElement = removeElement;


    $scope.$watch('$ctrl.lot.originLocationPoint', function (newValue, oldValue) {
      if (oldValue && newValue != oldValue) {
        if ((self.lot.aliquotList.length || self.lot.tubeList.length) && !self.lot.code) {
          self.clearLot(oldValue);
        }
      }
    });


    function changeNavItem(newNavItem) {
      self.currentNavItem = newNavItem;
    }

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.insertionTube = insertionTube;
    self.selectAliquot = selectAliquot;

    function onInit() {
      self.selectedOriginLocationPoint = "";
      self.destinationLocationPoints = [];
      LocationPointRestService.getLocationPoints().then(function (response) {
        if (response.data) {
          var result = response.data;
          if (result.transportLocationPoints) {
            self.destinationLocationPoints = angular.copy(LocationPointFactory.fromArray(response.data.transportLocationPoints));
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
      _buildDynamicTableSettings();
      _receivedMaterialInfo();
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Código', '15', 'left', 4)
        //property, formatType
        .addColumnProperty('code')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Tipo', '20', '', 1)
        //property, formatType
        .addColumnProperty('label')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Recipiente', '15', '', 3)
        //property, formatType
        .addColumnProperty('containerLabel')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Processado/Coletado', '20', '', 2)
        //property, formatType
        .addColumnProperty('aliquotCollectionData.processing', 'DATE')
        .addHeader('Função', '15', '', 5)
        .addColumnProperty('roleLabel')
        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'delete_forever', 'Remover Material', '', 'O material foi removido',
          self.removeElement, false, false, true, false, false
        )

        .setElementsArray(_getMaterialList())
        .setTitle('Lista de Arquivos')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(MaterialTransportationService.dynamicDataTableFunction.updateDataTable)
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

    function _receivedMaterialInfo() {
      if(self.lot.receivedMaterials){
        if(self.lot.receivedMaterials.length){
          const receivedTube = self.lot.receivedMaterials.map((material) => {
            return self.lot.tubeList.find(tube => tube.code === material.materialCode)
          })
          const receivedAliquots = self.lot.receivedMaterials.map((material) => {
            return self.lot.aliquotList.find(aliquot => aliquot.code === material.materialCode)
          })
          self.receivedTubes = self.receivedList.concat(receivedTube[0] ? receivedTube : []);
          self.receivedAliquots = self.receivedList.concat(receivedAliquots[0] ? receivedAliquots : []);
        }
      }
    }

    function _getMaterialList() {
      return self.lot.aliquotList.concat(self.lot.getTubeForDynamicTable());
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
      var elements = _getMaterialList();
      _updateContainerLabel();
      _dynamicDataTableUpdate(elements);
    }

    function removeElement(element) {
      _unselectedAllAliquot();
      var aliquotIndex = self.lot.aliquotList.indexOf(element);
      if (aliquotIndex < 0) {
        var tube = self.lot.tubeList.find(function (tube) {
          if (tube.code == element.code) return tube;
        });
        var tubeIndex = self.lot.tubeList.indexOf(tube);

        if (tubeIndex > -1) self.lot.removeTubeByIndex(tubeIndex);
      } else {

        self.lot.removeAliquotByIndex(aliquotIndex);
      }
      _updateDynamicTable();
    }

    function clearLot(oldValue) {
      if (self.lot.originLocationPoint != self.selectedOriginLocationPoint) {
        DialogService.showConfirmationDialog(
          'Confirmar alteração de origem do material:',
          'Ao confirmar essa ação, todo o material existente será removido do lote.',
          'Confirmar alteração de origem')
          .then(function () {
            LoadingScreenService.changeMessage(messageLoading);
            LoadingScreenService.start();
            self.selectedOriginLocationPoint = angular.copy(self.lot.originLocationPoint);
            for (var i = 0; i < self.lot.aliquotList.length; i++) {
              self.lot.removeAliquotByIndex(i);
            }
            for (var i = 0; i < self.lot.tubeList.length; i++) {
              self.lot.removeTubeByIndex(i);
            }
            _updateDynamicTable();
            LoadingScreenService.finish();
          })
          .catch(function () {
          self.lot.originLocationPoint = oldValue;
          self.selectedOriginLocationPoint = oldValue;
        });
      }
    }

    function _dynamicDataTableUpdate(newArrayElements) {
      self.MaterialTransportationService.dynamicDataTableFunction.updateDataTable(newArrayElements);
      self.selectedAliquots = [];
    }

    function _updateContainerLabel() {
      self.lot.aliquotList.forEach(function (aliquot) {
        aliquot.containerLabel = self.MaterialTransportationService.getContainerLabelToAliquot(aliquot);
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

    function tubeInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if (charCode == '13' && self.tubeCode.length > 0) {
        event.preventDefault();
        self.insertionTube(self.tubeCode);
      }
    }

    function insertAliquotsByPeriod() {
      var successInsertion = false;
      if (self.initialDate instanceof Date && self.finalDate instanceof Date) {
        self.initialDate = new Date(self.initialDate.toISOString());
        self.finalDate = new Date(self.finalDate.toISOString());

        if (self.initialDate <= self.finalDate) {
          const textDialog = 'Serão incluídas no lote as Alíquotas disponíveis realizadas no período' +
            ' entre ' + $filter('date')(self.initialDate, 'dd/MM/yyyy') + ' a ' + $filter('date')(self.finalDate, 'dd/MM/yyyy') + '.';

          DialogService.showConfirmationDialog(
            'Confirmar inclusão de Alíquotas:',
            textDialog,
            'Confirmar inclusão de Alíquotas por Período')
            .then(function () {
              LoadingScreenService.changeMessage(messageLoading);
              LoadingScreenService.start();
              _findAliquotByPeriod()
                .then(function (response) {
                  if (response) {
                    _updateDynamicTable();
                    successInsertion = true;
                  }
                  LoadingScreenService.finish();
                })
                .catch(function () {
                  LoadingScreenService.finish();
                });
            })
            .catch(function () {});
        } else {
          MaterialTransportationMessagesService.invalidPeriodInterval();
        }
      } else {
        MaterialTransportationMessagesService.unselectedPeriod();
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
      return self.MaterialTransportationService.getAliquots(_query.toJSON(), false)
        .then(function (response) {
          if (response.length) {
            self.lot.insertAliquotList(response);
            MaterialTransportationMessagesService.successInAliquotInsertion();
            return response;
          } else {
            MaterialTransportationMessagesService.notMaterialInsert();
            return false;
          }
        }).catch(function (err) {
          MaterialTransportationMessagesService.notMaterialInsert();
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

    function insertionTube(tubeCode) {
      var successInsertion = false;
      if (tubeCode) {
        _findTube(tubeCode).then(function (foundTube) {
          if (foundTube) {
            if (tubeCode == foundTube.code) {
              _updateDynamicTable();
              successInsertion = true;
            }
          }
        }).catch(function (err) {
        });

        self.tubeCode = "";
        return successInsertion;
      }
    }

    function _findTube(tubeCode) {
      return self.MaterialTransportationService.getTube(self.lot.originLocationPoint, tubeCode)
        .then(function (availableTube) {
          if (availableTube) {
            if (_isDuplicatedTube(tubeCode)) {
              MaterialTransportationMessagesService.toastDuplicated(tubeCode);
              return;
            } else {
              self.lot.insertTube(availableTube);
              MaterialTransportationMessagesService.successInTubeInsertion();
              return availableTube;
            }
          } else {
            MaterialTransportationMessagesService.toastNotFoundError(tubeCode);
            return availableTube;
          }
        }).catch(function (err) {
          var _msg = err.data ? err.data['MESSAGE'] : "Não foi possível localizar o material";
          MaterialTransportationMessagesService.messageError(_msg);
          return;
        });


    }


    function _findAliquot(code) {
      var _query = AliquotTransportationQueryFactory.create(code, null, null,
        self.lot.originLocationPoint, self.lot.getAliquotCodeList(), self.storage);
      return self.MaterialTransportationService.getAliquots(_query.toJSON(), true)
        .then(function (availableAliquot) {
          if (availableAliquot) {
            if (_isDuplicated(code)) {
              MaterialTransportationMessagesService.toastDuplicated(code);
              return;
            } else {
              self.lot.insertAliquot(availableAliquot);
              MaterialTransportationMessagesService.successInAliquotInsertion();
              return availableAliquot;
            }
          } else {
            MaterialTransportationMessagesService.toastNotFoundError(code);
            return availableAliquot;
          }
        }).catch(function (err) {
          var _msg = err.data ? err.data['MESSAGE'] : "Não foi possível localizar o material";
          MaterialTransportationMessagesService.messageError(_msg);
          return;
        });

    }

    function _isDuplicated(code) {
      return self.lot.getAliquotCodeList().find(function (aliquotCode) {
        return aliquotCode == code;
      });
    }

    function _isDuplicatedTube(code) {
      return self.lot.getTubeCodeList().find(function (tubeCode) {
        return tubeCode == code;
      });
    }
  }
}());

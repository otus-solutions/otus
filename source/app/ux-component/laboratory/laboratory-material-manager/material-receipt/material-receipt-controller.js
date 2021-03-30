(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('materialReceiptCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$scope',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.application.dialog.DialogShowService',
  ];

  function Controller($mdToast,
                      $scope,
                      MaterialTransportationService,
                      DialogShowService) {
    var self = this;

    /*text constants*/
    self.CONFIRM_RECEIPT = "Confirmar recebimento";
    self.CONFIRM_RECEIPT_BODY = "Deseja confirmar o recebimento?";
    self.CONFIRM_RECEIPT_OBS = "Ao confirmar, não poderá fazer alterações";

    /*public variables*/
    self.metadataList = [];
    self.selectedMetadatas = [];
    self.otherMetadata = "";
    self.materialTrackingList = [];
    self.currLot = {};

    /*var*/
    self.expanded = false;

    /*D.I objects*/
    self.transportationService = MaterialTransportationService;
    self.dialogService = DialogShowService;

    /*lifecycle methods*/
    self.$onInit = onInit;

    /*public methods*/
    self.selectMetadata = selectMetadata;
    self.receiveMaterial = receiveMaterial;
    self.expandTab = expandTab;
    self.isMetadataChecked = isMetadataChecked;
    self.hasCurrLot = hasCurrLot;
    self.hasMaterialTrackingList = hasMaterialTrackingList;

    $scope.$watch("$ctrl.material", function(value) {
      _findMaterialTrackingList();
    })

    function onInit() {
      _findMetadataOptions();
    }

    function receiveMaterial() {
      const receiveMaterialStruct = {
        materialCode: self.material.code,
        receiptMetadata: self.selectedMetadatas,
        otherMetadata: self.otherMetadata
      }

      self.dialogService.showConfirmationDialog(
        self.CONFIRM_RECEIPT,
        self.CONFIRM_RECEIPT_BODY,
        self.CONFIRM_RECEIPT_OBS).then(res => {
          self.transportationService.receiveMaterial(self.currLot.lotId, receiveMaterialStruct)
          .then(value => {
            _findMaterialTrackingList();
            _showToastMsg("Material recebido com sucesso");
          }).catch(err => {
            _showToastMsg("Ocorreu algum erro, tente novamente");
        });
      })
    }

    function _findMaterialTrackingList() {
      self.transportationService.getMaterialTrackingList(self.material.code)
        .then(res => {
          self.materialTrackingList = res;
          _detachCurrLotFromMaterialList();
        })
    }

    function _detachCurrLotFromMaterialList() {
      if (hasMaterialTrackingList()) {
        _selectCurrLot(self.materialTrackingList);
        if ( hasCurrLot() ) {
          _removeCurrMatFromList(self.currLot.lotId);
        }
      }
    }

    function _selectCurrLot(materials) {
      self.currLot = materials.find(material => {
        return material.receipted === false;
      })
    }

    function _removeCurrMatFromList(lotId) {
      const index = self.materialTrackingList.indexOf(lotId);
      self.materialTrackingList.splice(index, 1);
    }

    function _findMetadataOptions() {
      self.transportationService.getMaterialMetadataOptions(self.material.type)
        .then((metadataList) => {
          self.metadataList = metadataList;
        })
    }

    function isMetadataChecked(material, metadata) {
      return material.receiptMetadata.includes(metadata._id)
    }

    function selectMetadata(id) {
      if(self.selectedMetadatas.indexOf(id) === -1) {
        self.selectedMetadatas.push(id);
      } else {
        const index = self.selectedMetadatas.indexOf(id);
        self.selectedMetadatas.splice(index, 1);
      }
    }

    function hasCurrLot() {
      if(self.currLot !== undefined){
        return self.currLot.hasOwnProperty("lotId");
      } else {
        return false;
      }
    }

    function hasMaterialTrackingList() {
      return self.materialTrackingList.length > 0;
    }

    function expandTab() {
      self.expanded = !self.expanded;
    }

    function _showToastMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(1000)
      );
    }
  }
}());

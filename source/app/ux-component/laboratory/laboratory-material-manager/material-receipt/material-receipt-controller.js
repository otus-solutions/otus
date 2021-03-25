(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('materialReceiptCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.application.dialog.DialogShowService',
  ];

  function Controller($mdToast,
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

    /*D.I objects*/
    self.transportationService = MaterialTransportationService;
    self.dialogService = DialogShowService;

    /*lifecycle methods*/
    self.$onInit = onInit;

    /*public methods*/
    self.selectMetadata = selectMetadata;
    self.receiveMaterial = receiveMaterial;

    function onInit() {
      _findMetadataOptions();
    }

    function receiveMaterial() {
      const receiveMaterialStruct = {
        materialCode: self.materialCode,
        receiptMetadata: self.selectedMetadatas
      }

      self.dialogService.showConfirmationDialog(
        self.CONFIRM_RECEIPT,
        self.CONFIRM_RECEIPT_BODY,
        self.CONFIRM_RECEIPT_OBS).then(res => {

          self.transportationService.receiveMaterial(receiveMaterialStruct)
          .then(value => {
            _showToastMsg("Material recebido com sucesso");
          }).catch(err => {
          _showToastMsg("Ocorreu algum erro, tente novamente");
        });
      })

    }

    function _findMetadataOptions() {
      self.metadataList = [
        {
          "_id": "123456",
          "objectType" : "MaterialReceiptCustomMetadata",
          "type" : "DBS",
          "value" : "Adequada",
          "extractionValue" : "Adequada"
        },
        {
          "_id": "1245",
          "objectType" : "MaterialReceiptCustomMetadata",
          "type" : "DBS",
          "value" : "Inadequada",
          "extractionValue" : "Inadequada"
        }
      ];

      //TODO remove comments

      // self.transportationService.getMaterialMetadataOptions()
      //   .then((metadataList) => {
      //     self.metadataList = metadataList;
      //   })
    }

    function selectMetadata(id) {
      if(self.selectedMetadatas.indexOf(id) === -1) {
        self.selectedMetadatas.push(id);
      }else {
        const index = self.selectedMetadatas.indexOf(id);
        self.selectedMetadatas.splice(index, 1);
      }
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

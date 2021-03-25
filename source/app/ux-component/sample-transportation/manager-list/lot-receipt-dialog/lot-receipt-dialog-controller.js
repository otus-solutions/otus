(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .controller('lotReceiptDialogController', DialogController);

    DialogController.$inject = [
        'data',
        '$mdToast',
        '$mdDialog',
        'otusjs.laboratory.core.ContextService',
        'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
        'otusjs.laboratory.business.configuration.LaboratoryConfigurationService'
    ];

    function DialogController(data, $mdToast, $mdDialog, LaboratoryContextService, MaterialTransportationService, LaboratoryConfigurationService) {
        const self = this;

        self.$onInit = onInit;

        self.handleMetadataChange = handleMetadataChange;
        self.closeDialog = closeDialog;
        self.updateLotReceipt = updateLotReceipt;

        self.now = new Date();
        self.code = data.code;

        function onInit() {
            _getLotReceiptMetadata();
        }

        function closeDialog() {
            $mdDialog.cancel();
        }

        function _replaceReceiptMetadataLabelWithId(metadata) {
            return metadata.map((label) => self.lotReceiptMetadata.find(o => o.extractionValue === label)._id);
        }

        function _replaceReceiptMetadataIdWithLabel(metadata) {
            return metadata.map((label) => self.lotReceiptMetadata.find(o => o._id === label.$oid).extractionValue);
        }

        function handleMetadataChange(metadata) {
            self.metadataOptions[metadata] 
                ? self.receiptData.transportationMetadata.push(metadata)
                : self.receiptData.transportationMetadata.splice(self.receiptData.transportationMetadata.indexOf(metadata), 1)
        }

        function updateLotReceipt() {
            const receiptData = angular.copy(self.receiptData);
            receiptData.transportationMetadata = _replaceReceiptMetadataLabelWithId(receiptData.transportationMetadata)

            MaterialTransportationService
                .updateLotReceipt(self.code, receiptData)
                .then(res => {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Recebimento registrado para o lote " + self.code)
                            .hideDelay(4000)
                    );

                    receiptData.transportationMetadata = receiptData.transportationMetadata.map(val => ({$oid: val}))
                    data.updateReceipt(receiptData)

                    // TODO: Atualizar dados do lote selecionado, pra ter os dados corretos quando abrir o diálogo novamente
                    //LaboratoryContextService.selectLot(self.code);
                })
                .catch(e => $mdToast.show(
                    $mdToast.simple()
                        .textContent("Não foi possível atualizar o lote " + self.code)
                        .hideDelay(4000)
                    )
                );

            $mdDialog.hide();
        }

        function _getLotReceiptMetadata() {
            LaboratoryConfigurationService.getLotReceiptMetadata().then(lotReceiptMetadata => {
                self.lotReceiptMetadata = lotReceiptMetadata;
                self.metadataArray = lotReceiptMetadata.map(o => o.value);
                _getInitialReceiptData();
                self.metadataOptions = self.metadataArray.reduce((o, key) => ({ ...o, [key]: self.receiptData.transportationMetadata.includes(key) }), {});
            
                console.log("_getLotReceiptMetadata")
                console.log(self.metadataArray)
                console.log(self.metadataOptions)
            });
        }

        function _getInitialReceiptData() {
            self.receiptData = {
                temperature: data.receiptData ? data.receiptData.temperature : undefined,
                transportationMetadata: data.receiptData ? _replaceReceiptMetadataIdWithLabel(data.receiptData.transportationMetadata) : [],
                receiptDate: data.receiptData ? new Date(data.receiptData.receiptDate) : self.now,
                lastUpdateDate: data.receiptData ? new Date(data.receiptData.lastUpdateDate) : self.now
            }
        }
    }
}());
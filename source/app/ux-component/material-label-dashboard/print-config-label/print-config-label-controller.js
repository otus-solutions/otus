(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('printConfigLabelCtrl', Controller);

  Controller.$inject = [
    '$q',
    "otusjs.otus.uxComponent.Publisher"
  ];

  function Controller(
    $q,
    Publisher) {

    var self = this;

    self.userState = '';

    self.printStructure = {
      labelSize: "",
      identified: "",
      columns: 0,
      type: "",
    }

    self.sizes = [{'value': 'small', 'name': "Pequeno"}, {"value": "bigger", "name": "Grande"}, {"value": "default", "name": "Padrao"}];
    self.types = [{'value': "qrcode", 'name': "Qrcode"}, {"value": "barcode", "name": "Código de barras"}];
    self.identified = [{'value': true, "name": "Sim"}, {"value": false, "name": "Não"}];
    self.columns = Array.from(Array(5).keys()).filter(array => array !== 0);

    self.$onInit = onInit;
    self.changeLabelToPrint = changeLabelToPrint;

    function onInit() {
      _subscribePrintStructure();
    };

    function _printStrucutre(callback) {
      callback(
        self.printStructure
      )
    }

    function _subscribePrintStructure() {
      Publisher.unsubscribe("default-print-structure")
      Publisher.subscribe("default-print-structure", _printStrucutre)
    }

    function changeLabelToPrint(){
      _subscribePrintStructure()
      Publisher.publish('label-to-print', (label) => {
        if(label) {
          label.printStructure = self.printStructure
        }
      })
      Publisher.publish("labelsTubes-to-print", (tubeLabel) => {
        if(tubeLabel){
          tubeLabel.printStructure = self.printStructure
        }
      });
      Publisher.publish("labelsAliquots-to-print", (aliquotLabel) => {
        if(aliquotLabel){
          self.aliquotLabel = aliquotLabel
        }
      });
    }
  }
}());
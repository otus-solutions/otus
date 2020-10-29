(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelPrintConfigCtrl', Controller);

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
    self.sizes = [{'value': 'small', 'name': "pequeno"}, {"value": "bigger", "name": "Grande"}];
    self.types = [{'value': "qrcode", 'name': "Qrcode"}, {"value": "barcode", "name": "Código de barra"}];
    self.identified = [{'value': true, "name": "Sim"}, {"value": false, "name": "Não"}];
    self.columns = Array.from(Array(11).keys()).filter(array => array !== 0);

    self.$onInit = onInit;
    self.changeLabelToPrint = changeLabelToPrint;

    function onInit() {
      _publishLabels();
    };

    function _publishLabels() {
      Publisher.publish("labelTube-to-print", (tubeLabel) => self.tubeLabel = tubeLabel);
      Publisher.publish("labelAliquot-to-print", (aliquotLabel) => self.aliquotLabel = aliquotLabel);
    }

    function changeLabelToPrint(){
      if(self.tubeLabel) {
        self.tubeLabel.printStructure = self.printStructure
      }
      if(self.aliquotLabel) {
        self.aliquotLabel.printStructure = self.printStructure
      }
    }

  }
}());
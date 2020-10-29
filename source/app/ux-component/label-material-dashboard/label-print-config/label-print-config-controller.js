(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelPrintConfigCtrl', Controller);

  Controller.$inject = [
    '$q'
  ];

  function Controller(
    $q) {

    var self = this;
    self.changeState = changeState;
    self.userState = '';


    self.printConfig = [
      {
        labelSize: "",
        identified: "",
        columns: 0,
        type: "",
      }
    ];

    self.tamanhos = ['Pequena', 'Grande'];
    self.tipos = ['QRcode', 'Código de Barras'];
    self.identificada = ['Sim', 'Não'];
    self.colunas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {


    };

    function changeState() {
      console.log(self.printConfig.labelSize);
      console.log(self.printConfig.identified);
      console.log(self.printConfig.columns);
      console.log(self.printConfig.type);
    }

  }
}());
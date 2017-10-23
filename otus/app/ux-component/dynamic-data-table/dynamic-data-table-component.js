(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDataTable', {
      templateUrl: 'app/ux-component/dynamic-data-table/dynamic-data-table-template.html',
      bindings: {
        dataSet: '=',
        dataSetProperties: '=',
        orderIndex: '=',
        checkBox: '=',
        changeOrdenation: '=',
        callBack: '=',
        headers: '=',
      },
      controller: Controller
    });

  Controller.$inject = [
    '$scope',
    '$element'
  ];

  function Controller($scope, $element) {
    var self = this;

    

    self.headerTable;
    self.bodyTable;
    self.error;
    self.orderQuery;

    self.$onInit = onInit;

    self.myFunction = myFunction;

    function onInit() {
      self.myFunction();

      self.headerTable = self.headers;
      self.orderQuery = [];

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };

      self.header = ['Aqui','Ali','Lá'];
    }

    _getValueToObject(object,property){
      return object
    }

    function _createRow(element){
      var row = {
        type:"dynamicDataTableRow",
        ref: element,
        columns: []
      };



      return row;
    }

    function _createColumn(row, value, index){
      var column = {
        type:"dynamicDataTableColumn",
        row: row,
        value: value,
        index: index
      };

      return structure
    }

    function myFunction() {
      console.log('Run myFunction');
    }

  }
}());

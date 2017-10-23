(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDataTable', {
      templateUrl: 'app/ux-component/dynamic-data-table/dynamic-data-table-template.html',
      bindings: {
        elementsArray: '<', 
        elementsProperties: '<',
        orderIndices: '<',
        flexArray: '<',
        checkBox: '=',
        enableReorder: '<',
        callBack: '=',
        //groupBy: '=',
        headers: '='

      },
      controller: Controller
    });

  Controller.$inject = [
    '$scope',
    '$element'
  ];

  function Controller($scope, $element) {
    var self = this;

    

    self.table;

    self.orderQuery;
    self.error;

    self.$onInit = onInit;

    self.myFunction = myFunction;
    self.creacteTable = creacteTable;

    function onInit() {
      self.myFunction();
      _setOrderQuery();
      creacteTable();
      
      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
      console.log(self);
    }

    function creacteTable(){
      self.table = {
        headers:self.headers,
        rows: []
      };

      self.elementsArray.forEach(function(element, index) {
        self.table.rows.push(
          _createRow(element, index)
        );
      }, this);
    }

    function _setOrderQuery(columnName){
      if(columnName){
        self.orderQuery = columnName + '.value';
      } else {
        self.orderQuery = [];
        if(self.orderIndices){
          self.orderIndices.forEach(function(orderIndex){
            self.orderQuery.push('column' + orderIndex + '.value');
          }); 
        }
      }
    }



    function _getObjectProperty(object,property){
      return object[property];
    }

    function _getValueFromElement(element,compositeProperty){
      var propertyArray = compositeProperty.split('.');
      var value = undefined;

      propertyArray.forEach(function(property) {
        if(value === undefined){
          value = _getObjectProperty(element, property);
        } else {
          value = _getObjectProperty(value, property);
        }
      }, this);

      return value;
    }

    function clearError(){
      self.error.isError = false;
      self.error.msg = '';
    }

    function setError(msg){
      self.error.isError = true;
      self.error.msg = msg;
    }


    function _createRow(element, index){
      var row = {
        type:"dynamicDataTableRow",
        ref: element,
        columns: [],
        index: index,
      };

      self.elementsProperties.forEach(function(elementProperty, index){
        var column = _createColumn(
          row,
          _getValueFromElement(element,elementProperty),
          index
        );
        
        row.columns.push(column);
        row[column.name] = column;
      }, this);
      
      return row;
    }

    function _createColumn(row, value, index){
      var column = {
        type:"dynamicDataTableColumn",
        //row: row,
        value: value,
        index: index,
        name: "column" + index
      };

      return column;
    }

    function myFunction() {
      console.log('Run myFunction');
    }

  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDataTable', {
      templateUrl: 'app/ux-component/dynamic-data-table/dynamic-data-table-template.html',
      bindings: {
        title: '<', 
        elementsArray: '<', 
        elementsProperties: '<',
        orderIndices: '<',
        flexArray: '<',
        hideCheckbox: '=',
        enableReorder: '<',
        callback: '=',
        functionStructure: '=',
        numberFieldsAlignedLeft: '=',
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

    self.selectedItemCounter = 0;

    self.table;

    self.orderQuery;
    self.orderInverse = false;
    self.error;

    self.$onInit = onInit;

    self.myFunction = myFunction;
    self.changeOrder = changeOrder;
    self.creacteTable = creacteTable;
    self.selectDeselectRow = selectDeselectRow;
    self.selectDeselectAllRows = selectDeselectAllRows;
    self.runCallbackOnChange = runCallbackOnChange;
    self.getColumnPositionClass = getColumnPositionClass;

    self.filter;

    function onInit() {
      _setOrderQuery();
      creacteTable();
      
      self.numberFieldsAlignedLeft = self.numberFieldsAlignedLeft ? self.numberFieldsAlignedLeft : 2;

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
      console.log(self);

      self.functionStructure.updateElements = function(){
        self.creacteTable();
      }
    }

    function getColumnPositionClass(index, array=[]){
      var retClass = '';

      if(index < self.numberFieldsAlignedLeft){
        retClass = retClass + ' dynamic-table-column-left ';
      } else {
        retClass = retClass + ' dynamic-table-column-right ';
      }

      if(index === 0 && self.hideCheckbox){
          retClass = retClass + ' dynamic-table-column-first ';
      }
      
      if((index + 1) === array.length){
        retClass = retClass + ' dynamic-table-column-last ';
      }

      return retClass;
    }


    function runCallbackOnChange(row, type){
      var change = {
        type: type,
        element: row.ref
      }

      if(change.type === 'selected' || change.type === 'deselected'){
        
      }

      self.callback(change);
    }


    self.getOrderIcon = function(){
      return self.orderInverse ? 'dynamic-arrow-icon-inverse' : 'dynamic-arrow-icon' 
    }

    self.verifyOrderIcon = function(index){
      return self.orderQuery === 'column' + $index + '.value' ? true : false;
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

    function changeOrder(index){
      var columnName = "column" + index;

      if(columnName + '.value' === self.orderQuery){
        self.orderInverse = !self.orderInverse;
      } else {
        self.orderInverse = false;
        _setOrderQuery(columnName);
      }
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

    function selectDeselectAllRows(){
      var deselect = (self.selectedItemCounter === self.table.rows.length);
      
      self.table.rows.forEach(function(row){
        if(deselect){
          _deselectRow(row);
        } else {
          _selectRow(row);
        }
      },this);
    }

    function selectDeselectRow(row){
      if(row.selected){
        _deselectRow(row);
      } else {
        _selectRow(row);
      }
    }

    function _selectRow(row){
      if(!row.selected){
        row.selected = true;
        self.selectedItemCounter++;
        self.runCallbackOnChange(row,'select');
      }
    }
    function _deselectRow(row){
      if(row.selected){
        row.selected = false;
        self.selectedItemCounter--;
        self.runCallbackOnChange(row,'deselect');
      }
    }

    function _createRow(element, index){
      var row = {
        type:"dynamicDataTableRow",
        ref: element,
        columns: [],
        index: index,
        selected: false
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

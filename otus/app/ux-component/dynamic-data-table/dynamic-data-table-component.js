(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDataTable', {
      templateUrl: 'app/ux-component/dynamic-data-table/dynamic-data-table-template.html',
      bindings: {
        headers: '<',
        elementsArray: '<',
        elementsProperties: '<',
        callbackAfterChange: '=',
        tableUpdateFunction: '=',

        formatData: '<',
        formatDataIndexArray: '<',
        formatDataPropertiesArray: '<',

        tableTitle: '<',
        flexArray: '<',
        orderIndices: '<',
        numberFieldsAlignedLeft: '<',

        selectedColor: '<',
        hoverColor: '<',

        disableCheckbox: '<',
        disableReorder: '<',
        disableFilter: '<',
        disablePagination: '<',

        rowsPerPageArray: '<',
        rowPerPageDefault: '<',

        hideDelayTime: '<'
      },
      controller: Controller
    });

  Controller.$inject = [
    '$filter',
    '$mdToast'
  ];

  function Controller($filter, $mdToast) {
    var self = this;

    self.selectedItemCounter = 0;

    self.table;

    self.orderQuery;
    self.orderInverse = false;
    self.error;

    self.$onInit = onInit;

    self.changeOrder = changeOrder;
    self.creacteTable = creacteTable;
    self.selectDeselectRow = selectDeselectRow;
    self.selectDeselectAllRows = selectDeselectAllRows;
    self.runCallbackOnChange = runCallbackOnChange;
    self.getColumnPositionClass = getColumnPositionClass;
    self.getFlex = getFlex;
    self.filterRows = filterRows;

    self.rowPerPageChange = rowPerPageChange;
    self.pagesChage = pagesChage;
    self.setCurrentPageText = setCurrentPageText;
    self.getIsNextPage = getIsNextPage;
    self.getIsPreviousPage = getIsPreviousPage;

    self.mouseEnter = mouseEnter;
    self.mouseLeave = mouseLeave;
    self.changeRowStyle = changeRowStyle;

    self.nextPage = nextPage;
    self.previousPage = previousPage;

    self.disableAnimation = false;

    self.filter = '';
    self.filterAll = false;
    self.filterAllChanged = filterAllChanged;

    self.viewPerPage = true;
    self.viewPerPageChanged = viewPerPageChanged;


    function onInit() {
      _setOrderQuery();

      if (!self.numberFieldsAlignedLeft) self.numberFieldsAlignedLeft = 1;

      if (!self.hoverColor) self.hoverColor = '#EEEEEE';
      if (!self.selectedColor) self.selectedColor = '#F5F5F5';
      if (!self.rowsPerPageArray) self.rowsPerPageArray = [10, 25, 50, 100, 250, 500, 1000];
      if (!self.rowPerPageDefault) self.rowPerPageDefault = self.rowsPerPageArray.length >= 2 ? self.rowsPerPageArray[2] : self.rowsPerPageArray[0];

      if (!self.formatData) self.formatData = 'dd/MM/yyyy';
      if (!self.formatDataIndexArray) self.formatDataIndexArray = [];
      if (!self.formatDataPropertiesArray) self.formatDataPropertiesArray = [];
      if (!self.hideDelayTime) self.hideDelayTime = 3000;

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };

      self.tableUpdateFunction = function (newElementsArray) {
        self.elementsArray = newElementsArray || self.elementsArray;
        self.selectedItemCounter = 0;
        self.creacteTable();
      }

      creacteTable();
    }

    function _havePagination() {
      return (!self.disablePagination && self.viewPerPage && !self.filterAll);
    }

    function _showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(self.hideDelayTime)
      );
    }

    function filterAllChanged(value) {
      var newValue = value !== undefined ? value : !self.filterAll;

      self.filterAll = newValue;

      filterRows()
    }

    function viewPerPageChanged(value) {
      var newValue = value !== undefined ? value : !self.viewPerPage;

      self.viewPerPage = newValue;

      filterRows()
    }

    function mouseEnter(row) {
      self.changeRowStyle(row, true)
    }

    function mouseLeave(row) {
      self.changeRowStyle(row)
    }

    function changeRowStyle(row, isHover) {
      if (isHover) {
        row.style = row.styleHover;
      } else {
        if (row.selected) {
          row.style = row.styleSelect;
        } else {
          row.style = {};
        }
      }
    }

    function filterRows() {
      if (self.filter.length) {
        self.table.filteredRows = $filter('filter')(self.table.fullRows, self.filter);

        var count = self.table.filteredRows.length;
        var msg = '';
        if (!count) {
          msg = 'Nenhum registro foi encontrado.';
        } else if (count === 1) {
          msg = count + ' Registro foi encontrado.'
        } else {
          msg = count + ' Registros foram encontrados.'
        }
        _showMsg(msg);
      } else {
        self.table.filteredRows = self.table.fullRows;
        self.filterAll = false;
      }

      self.table.currentPageRows = self.table.filteredRows;
      self.table.currentPage = 1;
      pagesChage();
    }

    function _changeDisplayRows() {
      if (_havePagination()) {
        self.table.currentPageRows = self.table.filteredRows.slice(self.table.startPage, self.table.endPage + 1);
      }

      self.table.rows = self.table.currentPageRows;

      self.selectedItemCounter = self.table.rows.filter(function (row) {
        return row.selected;
      }).length;
    }


    function getFlex(index) {
      var value = self.flexArray[index];

      if (value !== '') {
        value = Number(value);

        if (value === NaN) {
          value = '';
        }
      }
      return value;
    }

    function getColumnPositionClass(index, array) {
      var retClass = '';
      if (array === undefined) {
        array = [];
      }

      if (index < self.numberFieldsAlignedLeft) {
        retClass = retClass + ' dynamic-table-column-left ';
      } else {
        retClass = retClass + ' dynamic-table-column-right ';
      }

      if (index === 0 && self.disableCheckbox) {
        retClass = retClass + ' dynamic-table-column-first ';
      }

      if ((index + 1) === array.length) {
        retClass = retClass + ' dynamic-table-column-last ';
      }

      return retClass;
    }


    function runCallbackOnChange(row, type) {
      var change = {
        type: type,
        element: row.ref
      }

      if (change.type === 'selected' || change.type === 'deselected') {

      }

      self.callbackAfterChange(change);
    }


    self.getOrderIcon = function () {
      return self.orderInverse ? 'dynamic-arrow-icon-inverse' : 'dynamic-arrow-icon';
    }

    self.verifyOrderIcon = function (index) {
      return self.orderQuery === 'column' + $index + '.value' ? true : false;
    }


    function rowPerPageChange() {
      self.table.currentPage = 1;
      pagesChage();
    }

    function nextPage() {
      self.disableAnimation = true;
      self.table.currentPage++;
      pagesChage();
    }

    function previousPage() {
      self.disableAnimation = true;
      self.table.currentPage--;
      pagesChage();
    }

    function pagesChage() {
      if (self.table.currentPage === 1) {
        self.table.startPage = 0;
      } else {
        self.table.startPage = (self.table.currentPage - 1) * self.rowPerPageDefault;
      }

      var tempEnd = (self.table.currentPage * self.rowPerPageDefault - 1);

      if (tempEnd >= (length - 1)) {
        self.table.endPage = tempEnd;
      } else {
        self.table.endPage = self.table.filteredRows.length - 1;
      }

      setCurrentPageText();
      _changeDisplayRows();
    }

    function setCurrentPageText() {
      var tempEnd = (self.table.endPage + 1) > self.table.filteredRows.length ? self.table.filteredRows.length : (self.table.endPage + 1);
      self.table.textPage = "" + (self.table.startPage + 1) + "-" + (tempEnd) + " de " + self.table.filteredRows.length;
    }

    function getIsNextPage() {
      var activeNext = false;
      if (self.table.currentPage * self.rowPerPageDefault < self.table.filteredRows.length) {
        activeNext = true;
      }

      return activeNext;
    }

    function getIsPreviousPage() {
      var activePrevious = false;
      if (self.table.currentPage > 1) {
        activePrevious = true;
      }
      return activePrevious;
    }

    function creacteTable() {
      self.table = {
        headers: self.headers,
        rows: [],
        fullRows: [],
        filteredRows: [],
        currentPageRows: [],
        currentPage: 1,
        startPage: 0,
        endPage: self.rowPerPageDefault + 1,
        textPage: ""
      };


      self.elementsArray.forEach(function (element, index) {
        self.table.fullRows.push(
          _createRow(element, index)
        );
      }, this);

      self.table.filteredRows = self.table.fullRows;
      filterRows();
      pagesChage();
    }

    function changeOrder(index) {
      var columnName = "column" + index;

      if (columnName + '.orderValue' === self.orderQuery) {
        self.orderInverse = !self.orderInverse;
      } else {
        self.orderInverse = false;
        _setOrderQuery(columnName);
      }
    }


    function _setOrderQuery(columnName) {
      if (columnName) {
        self.orderQuery = columnName + '.orderValue';
      } else {
        self.orderQuery = [];
        if (self.orderIndices) {
          self.orderIndices.forEach(function (orderIndex) {
            self.orderQuery.push('column' + orderIndex + '.orderValue');
          });
        }
      }
    }

    function _getObjectProperty(object, property) {
      return object[property];
    }


    function _formatData(value) {
      return $filter('date')(new Date(value), self.formatData);
    }

    function _getValueFormated(value, property, index) {


      if (self.formatDataIndexArray.filter(function (val) { return Number(val) === index }).length) {
        value = _formatData(value);
      } else if (self.formatDataPropertiesArray.filter(function (prop) { return prop === property }).length) {
        value = _formatData(value);
      }

      return value;
    }

    function _getValueFromElement(element, compositeProperty, index, formatValue) {
      var propertyArray = compositeProperty.split('.');
      var value = undefined;
      var valueReturned;

      propertyArray.forEach(function (property) {
        if (value === undefined) {
          value = _getObjectProperty(element, property);
        } else {
          value = _getObjectProperty(value, property);
        }
      }, this);

      valueReturned = value;

      if (formatValue) {
        valueReturned = _getValueFormated(value, compositeProperty, index);
      }

      return valueReturned;
    }

    function clearError() {
      self.error.isError = false;
      self.error.msg = '';
    }

    function setError(msg) {
      self.error.isError = true;
      self.error.msg = msg;
    }

    function selectDeselectAllRows() {
      var deselect = (self.selectedItemCounter === self.table.rows.length);

      self.table.rows.forEach(function (row) {
        if (deselect) {
          _deselectRow(row);
        } else {
          _selectRow(row);
        }
        changeRowStyle(row);
      }, this);
    }

    function selectDeselectRow(row) {
      if (row.selected) {
        _deselectRow(row);
      } else {
        _selectRow(row);
      }
      changeRowStyle(row);
    }

    function _selectRow(row) {
      if (!row.selected) {
        row.selected = true;
        self.selectedItemCounter++;
        self.runCallbackOnChange(row, 'select');
      }
    }
    function _deselectRow(row) {
      if (row.selected) {
        row.selected = false;
        self.selectedItemCounter--;
        self.runCallbackOnChange(row, 'deselect');
      }
    }

    function _createRow(element, index) {
      var row = {
        type: "dynamicDataTableRow",
        ref: element,
        columns: [],
        index: index,
        selected: false,
        hover: false,
        styleSelect: { 'background-color': self.selectedColor },
        styleHover: { 'background-color': self.hoverColor },
        style: {}
      };

      self.elementsProperties.forEach(function (elementProperty, index) {
        var value = _getValueFromElement(element, elementProperty, index, true);
        var orderValue = _getValueFromElement(element, elementProperty, index);

        var column = _createColumn(
          row,
          value,
          orderValue,
          index
        );

        row.columns.push(column);
        row[column.name] = column;
      }, this);

      return row;
    }

    function _createColumn(row, value, orderValue, index) {
      var column = {
        type: "dynamicDataTableColumn",
        value: value,
        orderValue: orderValue,
        index: index,
        name: "column" + index
      };

      return column;
    }
  }
}());

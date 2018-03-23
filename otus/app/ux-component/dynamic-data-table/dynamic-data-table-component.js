(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDataTable', {
      templateUrl: 'app/ux-component/dynamic-data-table/dynamic-data-table-template.html',
      bindings: {
        headers: '<',
        elementsArray: '=?',
        elementsProperties: '<',
        callbackAfterChange: '=?',
        tableUpdateFunction: '=?',

        formatData: '<',
        formatDataIndexArray: '<',
        formatDataPropertiesArray: '<',

        tableTitle: '<',
        alignArray: '<',
        flexArray: '<',
        orderIndices: '<',
        orderByInsertion:'<',
        numberFieldsAlignedLeft: '<',

        selectedColor: '<',
        hoverColor: '<',

        disableCheckbox: '<',
        disableReorder: '<',
        disableFilter: '<',
        disablePagination: '<',

        rowsPerPageArray: '<',
        rowPerPageDefault: '<',

        hideDelayTime: '<',

        dynamicTableSettings: '='
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

    self.defaultAlign = 'left';

    self.orderQuery;
    self.orderInverse = false;
    self.error;

    self.$onInit = onInit;

    self.changeOrder = changeOrder;
    self.orderByIndex = orderByIndex;
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
    self.leaveFocus = leaveFocus;

    self.nextPage = nextPage;
    self.previousPage = previousPage;

    self.iconButtonClick = iconButtonClick;

    self.disableAnimation = false;

    self.filter = '';
    self.filterAll = false;
    self.filterAllChanged = filterAllChanged;

    self.viewPerPage = true;
    self.viewPerPageChanged = viewPerPageChanged;


    self.currentRowOnHover;

    function onInit() {
      _initializeDefaultValues();
      self.orderByInsertion ? orderByIndex() : _setOrderQuery();

      self.tableUpdateFunction = _refreshGrid;

      creacteTable();
    }


    function _initializeDefaultValues() {
      if (self.dynamicTableSettings) {
        var _settings = self.dynamicTableSettings;
        _settings = _settings.getSettings ? _settings.getSettings() : _settings;

        self.headers = _settings.headers;
        self.elementsArray = _settings.elementsArray;
        self.elementsProperties = _settings.elementsProperties;
        self.callbackAfterChange = _settings.callbackAfterChange;
        self.tableUpdateFunction = _settings.tableUpdateFunction;
        self.formatData = _settings.formatData;
        self.formatDataIndexArray = _settings.formatDataIndexArray;
        self.formatDataPropertiesArray = _settings.formatDataPropertiesArray;
        self.tableTitle = _settings.tableTitle;
        self.flexArray = _settings.flexArray;
        self.alignArray = _settings.alignArray;
        self.orderIndices = _settings.orderIndices;
        self.numberFieldsAlignedLeft = _settings.numberFieldsAlignedLeft;
        self.selectedColor = _settings.selectedColor;
        self.hoverColor = _settings.hoverColor;
        self.disableCheckbox = _settings.disableCheckbox;
        self.disableReorder = _settings.disableReorder;
        self.disableFilter = _settings.disableFilter;
        self.disablePagination = _settings.disablePagination;
        self.rowsPerPageArray = _settings.rowsPerPageArray;
        self.rowPerPageDefault = _settings.rowPerPageDefault;
        self.hideDelayTime = _settings.hideDelayTime;
        self.disableShowAll = _settings.disableShowAll;
      }

      // if(!self.numberFieldsAlignedLeft) self.numberFieldsAlignedLeft = 1;

      if (!self.flexArray) self.flexArray = [];
      if (!self.alignArray) self.alignArray = [];
      if (!self.hoverColor) self.hoverColor = '#EEEEEE';
      if (!self.selectedColor) self.selectedColor = '#F5F5F5';
      if (!self.rowsPerPageArray) self.rowsPerPageArray = [10, 25, 50, 100, 250, 500, 1000];
      if (!self.rowPerPageDefault) self.rowPerPageDefault = self.rowsPerPageArray.length >= 2 ? self.rowsPerPageArray[2] : self.rowsPerPageArray[0];

      if (!self.formatData) self.formatData = 'dd/MM/yyyy';
      if (!self.formatDataIndexArray) self.formatDataIndexArray = [];
      if (!self.formatDataPropertiesArray) self.formatDataPropertiesArray = [];
      if (!self.hideDelayTime) self.hideDelayTime = 3000;
      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};
      _alignArrayPopulate();

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
    }

    function _resetSelectedItemCounter() {
      self.selectedItemCounter = 0;

      self.table.rows.forEach(function (row) {
        if (row.selected) {
          self.selectedItemCounter++;
        }
        changeRowStyle(row);
      });
    }

    function _getAlignAccepted(align) {
      var avaliableAlignArray = ['right', 'left', 'center'];
      var alignAccepted = align;
      var alignmentAccepted = false;

      if (typeof align !== 'string') alignAccepted = '';

      for (var i = 0; i < avaliableAlignArray.length; i++) {
        var avaliableAlign = avaliableAlignArray[i];
        if (alignAccepted.toLowerCase().trim() === avaliableAlign) {
          alignAccepted = avaliableAlign;
          alignmentAccepted = true;
          break;
        }
      }

      if (!alignmentAccepted) alignAccepted = self.defaultAlign;

      return alignAccepted;
    }

    function _alignArrayPopulate() {
      var newAlignArray = [];

      if (self.alignArray && self.alignArray.length) {
        self.alignArray.forEach(function (align) {
          newAlignArray.push(_getAlignAccepted(align));
        });
      } else if (self.numberFieldsAlignedLeft) {
        self.elementsProperties.forEach(function (element, index) {
          var tmpAlign = index < self.numberFieldsAlignedLeft ? 'left' : 'right';
          newAlignArray.push(tmpAlign);
        });
      }

      self.elementsProperties.forEach(function (element, index) {
        if (newAlignArray[index] === undefined) {
          newAlignArray.push(self.defaultAlign);
        }
      });

      self.alignArray = newAlignArray;
    }

    function _refreshGrid(newElementsArray) {
      self.elementsArray = newElementsArray || self.elementsArray;
      self.selectedItemCounter = 0;
      self.creacteTable();
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

    function leaveFocus() {
      if (self.currentRowOnHover) {
        self.changeRowStyle(self.currentRowOnHover);
        self.currentRowOnHover = undefined;
      }
    }

    function mouseEnter(row) {
      if (!self.currentRowOnHover || self.currentRowOnHover.index !== row.index) {
        if (self.currentRowOnHover) self.changeRowStyle(self.currentRowOnHover);
        self.currentRowOnHover = row;
        self.changeRowStyle(row, true);
      }
    }

    function mouseLeave(row) {
      //self.changeRowStyle(row);
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

      retClass = retClass + ' dynamic-table-column-' + self.alignArray[index] || self.defaultAlign + ' ';

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
      return _haveThisPage(self.table.currentPage + 1);
    }

    function getIsPreviousPage() {
      return self.table.currentPage > 1 ? true : false;
    }

    function _haveThisPage(page) {
      var havePage = false;
      if (page > 0) {
        var previousPage = page - 1;
        if (page === 1) {
          havePage = true;
        } else {
          if (previousPage * self.rowPerPageDefault < self.table.filteredRows.length) {
            havePage = true;
          }
        }
      }
      return havePage;
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

    function orderByIndex() {
      _setOrderQuery('$index');
      self.orderInverse = !self.orderInverse;
    }


    function _setOrderQuery(propertyName) {
      if (propertyName) {
        if (propertyName === '$index'){
          self.orderQuery = propertyName;
        }
        else {
          self.orderQuery = propertyName + '.orderValue';
        }
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

    function _getValueFormated(value, property, index) {
      if (self.formatDataIndexArray.filter(function (val) {
          return Number(val) === index
        }).length) {
        value = $filter('date')(value, self.formatData);
      } else if (self.formatDataPropertiesArray.filter(function (prop) {
          return prop === property
        }).length) {
        value = $filter('date')(value, self.formatData);
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
      if (!row.specialFieldClicked) {
        if (row.selected) {
          _deselectRow(row);
        } else {
          _selectRow(row);
        }
        changeRowStyle(row);
      }
      row.specialFieldClicked = false;
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
        style: {},
        specialFieldClicked: false
      };

      self.elementsProperties.forEach(function (elementProperty, index) {
        var specialField = undefined;

        if (typeof elementProperty === "string") {
          var value = _getValueFromElement(element, elementProperty, index, true);
          var orderValue = _getValueFromElement(element, elementProperty, index);
        } else {
          specialField = _specialFieldConstruction(elementProperty, element);
          var orderValue = specialField.orderValue || '';
        }

        var column = _createColumn(
          row,
          value,
          orderValue,
          index,
          specialField
        );

        row.columns.push(column);
        row[column.name] = column;
      }, this);

      return row;
    }

    function _createColumn(row, value, orderValue, index, specialField) {
      var column = {
        type: "dynamicDataTableColumn",
        value: value,
        orderValue: orderValue,
        index: index,
        name: "column" + index,
        specialField: specialField
      };

      return column;
    }

    function _specialFieldConstruction(elementProperty, element) {
      var specialFieldStructure = undefined;
      var iconButton = elementProperty.iconButton;
      var iconWithFunction = elementProperty.iconWithFunction;

      if (iconButton) {
        specialFieldStructure = {
          iconButton: {
            icon: iconButton.icon,
            tooltip: iconButton.tooltip || "",
            classButton: iconButton.classButton || "",
            successMsg: iconButton.successMsg || "",
            buttonFuntion: iconButton.buttonFuntion,
            returnsSuccess: iconButton.returnsSuccess || false,
            renderElement: iconButton.renderElement || false,
            renderGrid: iconButton.renderGrid || false,
            removeElement: iconButton.removeElement || false,
            receiveCallback: iconButton.receiveCallback || false
          },
          orderValue: iconButton.icon
        }
      } else if (iconWithFunction) {
        var structure = iconWithFunction.iconFunction(element);
        specialFieldStructure = {
          iconStructure: structure,
          orderValue: structure.orderValue
        }
      }

      return specialFieldStructure;
    }

    function _refreshGridAndKeepCurrentPage() {
      var _currentPage = self.table.currentPage;
      _refreshGrid();
      if (_havePagination()) {
        for (var i = _currentPage; i >= 1; i--) {
          if (_haveThisPage(i)) {
            self.table.currentPage = i;
            pagesChage();
            break;
          }
        }
      }
    }

    function _removeRow(row) {
      self.elementsArray.splice(row.index, 1);
    }

    function _updateRow(element, row) {
      var updatedRow = _createRow(element, row.index);

      row.ref = updatedRow.ref;
      row.columns = updatedRow.columns;
    }

    function _isValidElement(element) {
      var isvalid = false;
      if (element && self.elementsProperties.length) {
        for (var i = 0; i < self.elementsProperties.length; i++) {
          var fullProperty = self.elementsProperties[i];
          if (typeof fullProperty === "string") {
            var property = fullProperty.split(".")[0];
            if (element[property]) {
              isvalid = true;
              break;
            }
          }
        }
      }
      return isvalid;
    }

    function iconButtonClick(structure, row) {
      row.specialFieldClicked = true;

      var _actionFuntion = function (returnedElement) {
        if (!_isValidElement(returnedElement)) {
          returnedElement = self.table.fullRows[row.index];
        }

        if (structure.renderElement && returnedElement && !structure.removeElement) {
          _updateRow(returnedElement, row);
        }

        if (structure.removeElement) {
          _removeRow(row);
          _refreshGridAndKeepCurrentPage();
        }

        if (structure.renderGrid && !structure.removeElement) {
          _refreshGridAndKeepCurrentPage();
        }

        if (structure.successMsg) {
          _showMsg(structure.successMsg);
        }
      }

      if (structure.buttonFuntion) {
        var returnedElement = undefined;
        if (structure.receiveCallback) {
          structure.buttonFuntion(row.ref, _actionFuntion);
        } else {
          if (structure.returnsSuccess) {
            if (structure.buttonFuntion(row.ref)) _actionFuntion();
          } else {
            _actionFuntion(structure.buttonFuntion(row.ref));
          }
        }
      } else {
        _actionFuntion();
      }
    }
  }
}());

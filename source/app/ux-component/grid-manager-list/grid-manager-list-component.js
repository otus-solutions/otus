(function () {
  'use strict';

  angular
      .module('otusjs.otus.uxComponent')
      .component('gridList', {
        templateUrl: 'app/ux-component/grid-manager-list/grid-manager-list-template.html',
        bindings: {
          gridDataSettings: "=",
          updateFunction: '=?'
        },
        controller: Controller
      });

  Controller.$inject = [
    '$filter',
    '$mdToast',
    '$scope'
  ];

  function Controller($filter, $mdToast, $scope) {
    var self = this;

    self.selectedItemCounter = 0;
    self.orderQuery;
    self.orderInverse = false;
    self.error;

    self.$onInit = onInit;

    // self.changeOrder = changeOrder;
    // self.orderByIndex = orderByIndex;
    self.selectDeselect = selectDeselect;
    self.selectDeselectAll = selectDeselectAll;
    self.filterGridTile = filterGridTile;

    self.filter = '';
    self.filterAll = false;
    self.filterAllChanged = filterAllChanged;

    function onInit() {
      if(!$scope.safeApply){
        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };
      }
      _initializeDefaultValues();
      // self.orderByInsertion ? orderByIndex() : _setOrderQuery();
      self.updateFunction = _refreshGrid;
    }

    function _initializeDefaultValues() {
      if (self.gridDataSettings) {
        self.callbackAfterChange = self.gridDataSettings;
      }
      self.elementsArray = [];
      self.selectedColor = null;
      self.hoverColor = null;
      self.hoverGridHeaderColor = null;

      if (!self.hoverGridHeaderColor) self.hoverGridHeaderColor = '#52AAEA';

      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
    }

    function _refreshGrid(newElementsArray) {
      self.elementsArray = newElementsArray || self.elementsArray;
      self.selectedItemCounter = 0;
      _creacteConfiguration();
      $scope.safeApply();
    }

    function _showMsg(msg) {
      $mdToast.show(
          $mdToast.simple()
              .textContent(msg)
              // .hideDelay(self.hideDelayTime)
      );
    }

    function filterAllChanged(value) {
      var newValue = value !== undefined ? value : !self.filterAll;

      self.filterAll = newValue;

      filterGridTile();
    }

    function filterGridTile() {
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
    }

    function _runCallbackOnChange(activity, type) {
      var change = {
        type: type,
        element: activity
      };
      self.callbackAfterChange(change);
    }

    function _creacteConfiguration() {
      self.elementsArray.forEach(function (element) {
        element.actions =_createActions();
      }, this);
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

    function selectDeselectAll() {
      var deselect = (self.selectedItemCounter === self.elementsArray.length);

      self.elementsArray.forEach(function (activity) {
        if (deselect) {
          _deselect(activity);
        } else {
          _select(activity);
        }
      }, this);
    }

    function selectDeselect(activity) {
      if (!activity.actions.specialFieldClicked) {
        if (activity.actions.selected) {
          _deselect(activity);
        } else {
          _select(activity);
        }
      }
      activity.actions.specialFieldClicked = false;
    }

    function _select(activity) {
      if (!activity.actions.selected) {
        activity.actions.selected = true;
        activity.actions.colorGrid = { 'background-color': self.hoverGridHeaderColor };
        self.selectedItemCounter++;
        _runCallbackOnChange(activity, 'select');
      }
    }

    function _deselect(activity) {
      if (activity.actions.selected) {
        activity.actions.selected = false;
        activity.actions.colorGrid = null;
        self.selectedItemCounter--;
        _runCallbackOnChange(activity, 'deselect');
      }
    }

    function _createActions() {
      var actions = {
        selected: false,
        specialFieldClicked: false
      };
      return actions;
    }

    function _remove(activity) {
      self.elementsArray.splice(activity.index, 1);
    }

    function _updateRow(element, activity) {
      var updatedRow = _createActions(element, activity.index);

      activity.ref = updatedRow.ref;
      activity.columns = updatedRow.columns;
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

  }
}());

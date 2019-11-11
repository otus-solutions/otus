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
    self.orderReverse = false;
    self.iconsDropUpDown ='arrow_drop_up';
    self.error;

    self.$onInit = onInit;

    self.orderByIndex = orderByIndex;
    self.selectDeselect = selectDeselect;
    self.selectDeselectAll = selectDeselectAll;
    self.filterGridTile = filterGridTile;

    self.filter = '';
    self.filterAll = false;

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
      self.hoverGridHeaderWhiteframe = null;
      self.hoverGridHeaderColor = null;

      if (!self.hoverGridHeaderWhiteframe) self.hoverGridHeaderWhiteframe = 'md-whiteframe-11dp';

      if (!self.hoverGridHeaderColor) self.hoverGridHeaderColor = '#00695C';

      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
    }

    function _refreshGrid(newElementsArray) {
      self.elementsArray = newElementsArray || self.elementsArray;
      self.selectedItemCounter = 0;
      _createConfiguration();
      $scope.safeApply();
    }

    function _showMsg(msg) {
      $mdToast.show(
          $mdToast.simple()
              .textContent(msg)
              // .hideDelay(self.hideDelayTime)
      );
    }

    function filterGridTile() {
      if (self.filter.length) {
        self.filteredActiviteis = $filter('filter')(self.elementsArray, self.filter);

        let count = self.filteredActiviteis.length;
        let msg = '';
        if (!count) {
          msg = 'Nenhum registro foi encontrado.';
        } else if (count === 1) {
          msg = count + ' Registro foi encontrado.'
        } else {
          msg = count + ' Registros foram encontrados.'
        }
        _showMsg(msg);
      } else {
        self.filteredActiviteis = self.elementsArray;
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

    function _createConfiguration() {
      self.elementsArray.forEach(function (element) {
        element.actions =_createActions();
        element.iconStatus = _createIconStatus(element.status);
      }, this);
    }

    function _createIconStatus(status) {
      let icon = 'fiber_new';
      let statusFinalized = 'Finalizado';
      if(status){
        icon = (status === statusFinalized) ? 'check_circle' : 'save';
      }
      return icon;
    }

    function orderByIndex(propertyName) {
      self.orderReverse = (self.orderQuery === propertyName) ? !self.orderReverse : false;
      self.iconsDropUpDown = self.orderReverse ? 'arrow_drop_up' : 'arrow_drop_down';
      self.orderQuery = propertyName;
    }

    function selectDeselectAll() {
      let deselect = (self.selectedItemCounter === self.elementsArray.length);

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
        activity.actions.whiteframeGrid = self.hoverGridHeaderWhiteframe;
        activity.actions.colorGrid = { 'background-color': self.hoverGridHeaderColor};
        self.selectedItemCounter++;
        _runCallbackOnChange(activity, 'select');
      }
    }

    function _deselect(activity) {
      if (activity.actions.selected) {
        activity.actions.selected = false;
        activity.actions.whiteframeGrid = null;
        activity.actions.colorGrid = null;
        self.selectedItemCounter--;
        _runCallbackOnChange(activity, 'deselect');
      }
    }

    function _createActions() {
      let actions = {
        selected: false,
        specialFieldClicked: false
      };
      return actions;
    }
  }
}());

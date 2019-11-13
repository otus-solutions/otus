(function () {
  'use strict';

  angular
      .module('otusjs.otus.uxComponent')
      .component('activityGridList', {
        templateUrl: 'app/ux-component/activity-manager-grid-list/activity-manager-grid-list-template.html',
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

  function Controller($filter, $mdToast) {
    var self = this;

    self.selectedItemCounter = 0;
    self.orderReverse = false;
    self.selectAll = false;
    self.iconsDropUpDown ='arrow_drop_up';
    self.orderQuery;
    self.itemsOrderBy;

    self.$onInit = onInit;

    self.orderByIndex = orderByIndex;
    self.selectDeselect = selectDeselect;
    self.selectDeselectAll = selectDeselectAll;
    self.filterGridTile = filterGridTile;

    self.filter = '';

    function onInit() {
      _initializeDefaultValues();
      _createItemsOrderBy();
      self.updateFunction = _refreshGrid;
    }

    function _initializeDefaultValues() {
      if (self.gridDataSettings) {
        self.callbackAfterChange = self.gridDataSettings;
      }
      self.elementsArray = [];
      self.hoverGridHeaderWhiteframe = null;
      self.hoverGridHeaderColor = null;

      if (!self.hoverGridHeaderWhiteframe) self.hoverGridHeaderWhiteframe = 'md-whiteframe-19dp';

      if (!self.hoverGridHeaderColor) self.hoverGridHeaderColor = '#00695C';

      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};
    }

    function _refreshGrid(newElementsArray) {
      if(self.elementsArray.length){
        if(self.elementsArray.length != newElementsArray.length){
          _upadateSelectDeselect();
        }
      }

      self.elementsArray = newElementsArray || self.elementsArray;
      self.selectedItemCounter = 0;

      _createConfiguration();
    }

    function _createItemsOrderBy() {
      self.itemsOrderBy = [
        {
          index: '$index',
          value: 'inserção'
        },
        {
          index: 'name',
          value: 'nome da Atividade'
        },
        {
          index: 'acronym',
          value: 'acrônimo da Atividade'
        },
        {
          index: 'requiredExternalID',
          value: 'ID Externo'
        },
        {
          index:  'status',
          value: 'Status'
        },
        {
          index:  'realizationDate',
          value: 'Data de realização'
        },
        {
          index:  'category',
          value: 'Categoria'
        }
      ]
    }

    function _createConfiguration() {
      self.elementsArray.forEach(function (element) {
        element.actions =_createActions();
        element.activityStatus = _createStatus(element.status);
      }, this);
    }

    function _createStatus(status) {
      let icon = 'fiber_new';
      let statusFinalized = 'Finalizado';
      let statusTooltip = 'Criado';
      let activityStatus = [];

      if(status){
        icon = (status === statusFinalized) ? 'check_circle' : 'save';
        statusTooltip = (status === statusFinalized) ? statusFinalized : 'Salvo';
      }
      activityStatus.icon = icon;
      activityStatus.statusTooltip = statusTooltip;

      return activityStatus;
    }

    function _showMsg(msg) {
      $mdToast.show(
          $mdToast.simple()
              .textContent(msg)
              .hideDelay(2000)
      );
    }

    function _upadateSelectDeselect() {
      self.elementsArray.forEach(function (activity) {
            _deselect(activity)
          });
    }

    function filterGridTile() {
      if (self.filter.length) {
        _upadateSelectDeselect();
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
      }
    }

    function _runCallbackOnChange(activity, type) {
      var change = {
        type: type,
        element: activity
      };
      self.callbackAfterChange(change);
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
          self.selectAll = false;
        } else {
          _select(activity);
          self.selectAll = true;
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

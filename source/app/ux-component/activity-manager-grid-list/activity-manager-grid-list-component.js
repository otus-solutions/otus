(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('activityGridList', {
      controller: 'otusActivityGridListCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-manager-grid-list/activity-manager-grid-list-template.html',
      bindings: {
        gridDataSettings: "=",
        updateFunction: '=?'
      }
    }).controller('otusActivityGridListCtrl', Controller);

  Controller.$inject = [
    '$filter',
    '$mdToast',
    '$mdColors'
  ];

  function Controller($filter, $mdToast, $mdColors) {
    var self = this;

    self.selectedItemCounter = 0;
    self.orderReverse = false;
    self.selectAll = false;
    self.iconsDropUpDown = 'arrow_drop_up';
    self.filter = '';
    self.orderQuery;
    self.itemsOrderBy;

    self.$onInit = onInit;
    self.orderByIndex = orderByIndex;
    self.selectDeselect = selectDeselect;
    self.selectDeselectAll = selectDeselectAll;
    self.filterGridTile = filterGridTile;
    self.displayGridLarge = displayGridLarge;
    self.displayGridSmall = displayGridSmall;

    const colors = {
      text:{
        BLACK: { color: 'black' },
        GRAY: { color: '#797985' },
        LIGHT_GRAY: { color: '#bcbcc2' }
      },
      background: {
        HEADER: { 'background': $mdColors.getThemeColor('default-primary') },
        AUTO_FILL_HEADER: { 'background': $mdColors.getThemeColor('default-accent') },
        SELECTED_TILE: $mdColors.getThemeColor('primary-hue-2-0.2'),
        SELECTED_AUTO_FILL_TILE: $mdColors.getThemeColor('accent-hue-2-0.2'),
      }
    };

    function onInit() {
      _initializeDefaultValues();
      _createItemsOrderBy();
      self.updateFunction = _refreshGrid;
    }

    function _initializeDefaultValues() {
      self.elementsArray = [];
      self.filteredActiviteis = [];
      self.hoverGridHeaderWhiteframe = 'md-whiteframe-19dp';
      self.backgroundColor = {
        'background': colors.background.SELECTED_TILE,
        'border-left': '2px solid grey',
        'border-right': '2px solid grey',
        'border-bottom': '2px solid grey',
      };
      self.gridTileHeaderColor = colors.background.HEADER;
      self.fixedTextColor = colors.text.GRAY;
      self.textColor = colors.text.BLACK;

      if (self.gridDataSettings) {
        self.callbackAfterChange = self.gridDataSettings;
      }

      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};
    }

    function _refreshGrid(newElementsArray) {
      if (self.elementsArray.length) {
        if (self.elementsArray.length != newElementsArray.length) {
          _updateSelectDeselect();
          self.filter = '';
          self.selectAll = false;
        }
      }

      self.elementsArray = newElementsArray || self.elementsArray;
      self.filteredActiviteis = self.elementsArray;
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
          index: 'status',
          value: 'Status'
        },
        {
          index: 'realizationDate',
          value: 'Data de realização'
        },
        {
          index: 'category',
          value: 'Categoria'
        }
      ]
    }

    function _createConfiguration() {
      self.elementsArray.forEach(function (element) {
        element.actions = _createActions();
        element.actions.colorGrid = _getGridColorByActivityMode(element.mode.name);
        element.activityStatus = _createStatus(element.status);
      }, this);
    }

    function _createActions() {
      return {
        selected: false,
        specialFieldClicked: false,
        fixedTextColor: self.fixedTextColor,
        textColor: self.textColor,
      };
    }

    function _getGridColorByActivityMode(mode) {
      return mode === "Auto Preenchimento" ? colors.background.AUTO_FILL_HEADER : colors.background.HEADER;
    }

    function _createStatus(status) {
      let icon = 'fiber_new';
      let statusFinalized = 'Finalizado';
      let statusTooltip = 'Criado';
      let activityStatus = [];

      if (status !== statusTooltip) {
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

    function _updateSelectDeselect() {
      self.elementsArray.forEach(function (activity) {
        _deselect(activity)
      });
    }

    function filterGridTile() {
      if (self.filter.length) {
        _updateSelectDeselect();
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
      }
    }

    function _runCallbackOnChange(activity, type) {
      let change = {
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
      let deselect;

      self.selectedItemCounter = self.elementsArray.filter(function (activity) {
        return activity.actions.selected;
      }).length;

      deselect = (self.selectedItemCounter === self.filteredActiviteis.length);

      self.elementsArray.forEach(function (activity) {
        if (self.filteredActiviteis.includes(activity)) {
          if (deselect) {
            _deselect(activity);
            self.selectAll = false;
          } else {
            _select(activity);
            self.selectAll = true;
          }
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
        activity.actions.backgroundColor = self.backgroundColor;
        if(activity.mode.name==="Auto Preenchimento"){
          activity.actions.backgroundColor = angular.copy(self.backgroundColor);
          activity.actions.backgroundColor['background'] = colors.background.SELECTED_AUTO_FILL_TILE;
        }
        activity.actions.colorGrid = (Object.keys(activity.actions.colorGrid).length !== 0) ? activity.actions.colorGrid : self.gridTileHeaderColor;
        _turnOnActivityTextColors(activity);
        if(self.selectedItemCounter++ === 0){
          _turnOffNotSelectedActivities();
        }
        _runCallbackOnChange(activity, 'select');
      }
    }

    function _deselect(activity) {
      if (activity.actions.selected) {
        activity.actions.selected = false;
        activity.actions.whiteframeGrid = null;
        activity.actions.backgroundColor = null;
        activity.actions.colorGrid = _getGridColorByActivityMode(activity.mode.name);
        _turnOffActivityTextColors(activity);
        if(--self.selectedItemCounter === 0){
          _turnOnNotSelectedActivities();
        }
        _runCallbackOnChange(activity, 'deselect');
      }
    }

    function _turnOffNotSelectedActivities(){
      self.elementsArray
        .filter(activity => !activity.actions.selected)
        .forEach(function (activity) {
          _turnOffActivityTextColors(activity);
        });
    }

    function _turnOnNotSelectedActivities(){
      self.elementsArray
        .filter(activity => !activity.actions.selected)
        .forEach(function (activity) {
          _turnOnActivityTextColors(activity);
        });
    }

    function _turnOnActivityTextColors(activity){
      activity.actions.fixedTextColor = colors.text.GRAY;
      activity.actions.textColor = colors.text.BLACK;
    }

    function _turnOffActivityTextColors(activity){
      activity.actions.fixedTextColor = colors.text.LIGHT_GRAY;
      activity.actions.textColor = colors.text.GRAY;
    }

    function displayGridLarge() {
      if (window.innerWidth < 1400) {
        return '1:0.9';
      }
      return '6:4';
    }
    function displayGridSmall() {
      if (window.innerWidth < 680) {
        return '1:1';
      }
      return '2.7:2';
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericListControl', {
      controller: 'genericListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-control-template.html',
      bindings: {
        filtersComponentName: '<',
        getItems: '&',
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='
      }
    }).controller('genericListControlCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    'otusjs.utils.HtmlBuilderService'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS, HtmlBuilderService) {
    const self = this;
    self.LABELS = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL;

    const SHOW_HIDE_FILTER_ICON = {
      'true': {
        icon: 'visibility',
        tooltip: self.LABELS.HIDDEN_FILTERS
      },
      'false': {
        icon: 'visibility_off',
        tooltip: self.LABELS.ENABLED_FILTERS
      }
    };

    const ORDER_MODE_ICON = {
      '1': {
        icon: 'arrow_upward',
        tooltip: self.LABELS.ASCENDING_SORTING
      },
      '-1': {
        icon: 'arrow_downward',
        tooltip: self.LABELS.DESCENDING_SORTING
      }
    };


    self.filtersViewEnable = false;

    self.$onInit = onInit;
    self.showOrHideFilters = showOrHideFilters;
    self.updateOrderModeArrow = updateOrderModeArrow;


    function onInit(){
      const tag = HtmlBuilderService.generateTagName(self.filtersComponentName);
      self.filtersTemplate = '<' + tag + ' ng-hide="!$ctrl.filtersViewEnable"' +
        '                             class="filter"' +
        '                             search-settings="$ctrl.searchSettings"' +
        '                             item-attributes="$ctrl.itemAttributes"' +
        '                             paginator-active="$ctrl.paginatorActive"/>';

      self.filtersIcon = SHOW_HIDE_FILTER_ICON[self.filtersViewEnable];
      self.orderModeIcon = ORDER_MODE_ICON['1'];
    }

    function showOrHideFilters(){
      self.filtersViewEnable = !self.filtersViewEnable;
      self.filtersIcon = SHOW_HIDE_FILTER_ICON[self.filtersViewEnable];
    }

    function updateOrderModeArrow(){
      self.orderModeIcon = ORDER_MODE_ICON[self.searchSettings.order.mode.toString()];
    }

  }
}());
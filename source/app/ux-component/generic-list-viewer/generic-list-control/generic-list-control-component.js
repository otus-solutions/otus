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

    const showHideFilterIcon = {
      'true': {
        icon: 'visibility',
        tooltip: GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.HIDDEN_FILTERS
      },
      'false': {
        icon: 'visibility_off',
        tooltip: GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.ENABLED_FILTERS
      }
    };

    self.filtersViewEnable = false;

    self.$onInit = onInit;
    self.showOrHideFilters = showOrHideFilters;


    function onInit(){
      const tag = HtmlBuilderService.generateTagName(self.filtersComponentName);
      self.filtersTemplate = '<' + tag + ' ng-hide="!$ctrl.filtersViewEnable"' +
        '                             class="filter"' +
        '                             search-settings="$ctrl.searchSettings"' +
        '                             item-attributes="$ctrl.itemAttributes"' +
        '                             paginator-active="$ctrl.paginatorActive"/>';

      self.filtersIcon = showHideFilterIcon[self.filtersViewEnable];
    }

    function showOrHideFilters(){
      self.filtersViewEnable = !self.filtersViewEnable;
      self.filtersIcon = showHideFilterIcon[self.filtersViewEnable];
    }

  }
}());
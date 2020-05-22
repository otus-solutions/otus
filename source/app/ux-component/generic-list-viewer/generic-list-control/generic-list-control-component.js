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
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;
    self.filtersViewEnable = false;

    self.$onInit = onInit;
    self.openFilters = openFilters;
    self.closeFilters = closeFilters;


    function onInit(){
      const tag = HtmlBuilderService.generateTagName(self.filtersComponentName);
      self.filtersTemplate = '<' + tag + ' ng-hide="!$ctrl.filtersViewEnable"' +
        '                             class="filter"' +
        '                             search-settings="$ctrl.searchSettings"' +
        '                             item-attributes="$ctrl.itemAttributes"' +
        '                             paginator-active="$ctrl.paginatorActive"/>';
    }

    function openFilters() {
      self.filtersViewEnable = true;
    }

    function closeFilters() {
      self.filtersViewEnable = false;
    }

  }
}());
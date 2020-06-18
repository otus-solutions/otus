(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSingleSelectionFilter', {
      controller: 'singleSelectionFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/single-selection-filter/single-selection-filter-template.html',
      bindings: {
        filterItem: '<',
        searchSettings: '=',
        clear: '=',
        changePaginationViewState: '=',
        options: '<',
        placeholder: '<'
      }
    }).controller('singleSelectionFilterCtrl', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.CANCEL_BUTTON_ICON = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.CANCEL_BUTTON;

    self.$onInit = onInit;
    self.changeSelectedOption = changeSelectedOption;

    function onInit(){
      self.selectedOption = null;
    }

    function changeSelectedOption(){
      self.searchSettings.filter[self.filterItem.title] = self.selectedOption;
      self.changePaginationViewState();
    }

  }

}());

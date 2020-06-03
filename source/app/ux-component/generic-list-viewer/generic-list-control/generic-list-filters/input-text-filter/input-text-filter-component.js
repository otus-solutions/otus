(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusInputTextFilter', {
      controller: 'inputTextFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/input-text-filter/input-text-filter-template.html',
      bindings: {
        filterItem: '<',
        searchSettings: '=',
        clear: '=',
        changePaginationViewState: '=',
        upperCase: '<',
        placeholder: '<'
      }
    }).controller('inputTextFilterCtrl', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.CANCEL_BUTTON_ICON = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.CANCEL_BUTTON;

    self.$onInit = onInit;
    self.onChangeText = onChangeText;

    function onInit(){
      if(!self.placeholder){
        self.placeholder = '';
      }
    }

    function onChangeText(){
      self.changePaginationViewState();
      if(self.upperCase){
        self.searchSettings.filter[self.filterItem.title] = self.searchSettings.filter[self.filterItem.title].toUpperCase();
      }
    }

  }

}());

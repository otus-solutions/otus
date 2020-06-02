(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusListSortingCriteria', {
      controller: 'genericListSortingCriteriaCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-sorting-criteria/generic-list-sorting-criteria-template.html',
      bindings: {
        searchSettings: '=',
        itemAttributes: '<',
        inputViewState: '=',
        getDefaultOrderFields: '='
      }
    }).controller('genericListSortingCriteriaCtrl', Controller);

  Controller.$inject = [ 'GENERIC_LIST_VIEWER_LABELS' ];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    const SORTING_CRITERIA_KEY_NAME = GENERIC_LIST_VIEWER_LABELS.INPUT_VIEW_STATE_NAMES.SORTING_CRITERIA;

    self.LABELS = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL;

    self.isVisible = isVisible;
    self.chanceStateCriteria = chanceStateCriteria;
    self.resetCriteriaOrderCustomization = resetCriteriaOrderCustomization;


    function isVisible(){
      return self.inputViewState[SORTING_CRITERIA_KEY_NAME];
    }

    function chanceStateCriteria() {
      if (self.inputViewState[SORTING_CRITERIA_KEY_NAME]) {
        self.inputViewState[SORTING_CRITERIA_KEY_NAME] = !self.inputViewState[SORTING_CRITERIA_KEY_NAME];
        self.searchSettings.order.fields = [self.getDefaultOrderFields()[0]];
      }
      else {
        self.inputViewState[SORTING_CRITERIA_KEY_NAME] = true;
        resetCriteriaOrderCustomization();
      }
    }

    function resetCriteriaOrderCustomization() {
      self.searchSettings.order.fields = self.getDefaultOrderFields();
    }

  }
}());

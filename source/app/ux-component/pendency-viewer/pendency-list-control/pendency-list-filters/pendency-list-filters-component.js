(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendecyListFilters', {
      controller: 'pendencyListFiltersCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-filters/pendency-list-filters-template.html',
      bindings: {
        searchSettings: '=',
        pendencyAttributes : '<'

      }
    }).controller('pendencyListFiltersCtrl', Controller);

  Controller.$inject = ['dragulaService'];

  function Controller(dragulaService) {
    const self = this;

    self.chanceInputViewState = chanceInputViewState;
    self.clear = clear;
    self.clearAll = clearAll;
    self.allStatus = allStatus;
    self.chanceStateCriteria = chanceStateCriteria;
    self.resetCriteriaOrderCustomization = resetCriteriaOrderCustomization;

    clearAll(self.searchSettings);


    function clear(item) {
      delete self.searchSettings.filter[item.title];
      self.inputViewState[item.title] = false;
    }

    function clearAll(searchSettings){
      self.inputViewState = {
        rn: false,
        acronym: false,
        requester: false,
        receiver: false,
        dueDate: false,
        externalID: false,
        sortingCriteria: false
      };

      self.searchSettings = {
        "currentQuantity": 0,
        "quantityToGet": 100,
        "order": {

          "fields":["dueDate"],
          "mode": 1
        },
        "filter":{
          "status": "NOT_FINALIZED"
        }
      };


        console.log(searchSettings)

    }

    function chanceInputViewState(item) {
      self.inputViewState[item.title] = true;
    }

    function allStatus() {
      delete self.searchSettings.filter.status;
    }

    function chanceStateCriteria() {
      if (self.inputViewState['sortingCriteria']) {
        self.inputViewState['sortingCriteria'] = !self.inputViewState['sortingCriteria'];
        self.searchSettings.order.fields = ["dueDate"];
      } else {
        self.inputViewState['sortingCriteria'] = true;
        _populateCriteriaOrder();
      }
    }

    function resetCriteriaOrderCustomization() {
      _populateCriteriaOrder();
    }

    function _populateCriteriaOrder(){
      self.searchSettings.order.fields = ["dueDate", "rn", "acronym", "externalID", "requester", "receiver"];
    }
  }
}());

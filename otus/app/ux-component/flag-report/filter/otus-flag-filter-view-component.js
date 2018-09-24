(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('flagFilterViewComponent', {
      controller: "flagFilterViewCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/filter/otus-flag-filter-view-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        parseData: '=',
        questionnairesList: '=',
        uniqueDatesList: '=',
        centers: '<',
        updateData: '='
      }
    })
    .controller('flagFilterViewCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'mdcDefaultParams',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, $filter, mdcDefaultParams, LoadingScreenService) {
    var self = this;

    self.$onInit = onInit;


    function onInit() {
      console.log(self.centers)
    }
  }


}());

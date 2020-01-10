(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardPendency', {
      templateUrl: 'app/ux-component/dashboard-pendency/dashboard-pendency-template.html',
      controller: Controller,
    }).controller('otusDashboardPendencyCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;
    self.realizationDate = new Date();

    /* Public methods */
    self.checkerQuerySearch = checkerQuerySearch;

    function checkerQuerySearch() {
      return ;
    }

  }

})();
(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-dashboard-template.html'
    });  

  function Controller() {
        var self = this;
  }
  
}());

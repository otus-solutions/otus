(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantExams', {
      templateUrl: 'app/ux-component/laboratory/main-panel/exam-view/exam-view-template.html',
      bindings: {},
      controller: controller
    });

  controller.$inject = [];

  function controller() {
    var self = this;

    self.exams = [
      {
        name:'Hemograma',
        isAvailable: null,
        hasBeenDelivered: false,
        requestList: [],
        statusColor:'red'
      },
      {
        name:'Glicemia',
        isAvailable: true,
        hasBeenDelivered: true,
        requestList: [],
        statusColor:'green'
      }

    ];
  }
}());

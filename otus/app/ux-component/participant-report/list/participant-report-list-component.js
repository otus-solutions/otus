(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantReportList', {
      templateUrl: 'app/ux-component/laboratory/main-panel/exam-view/participant-report-list-template.html',
      bindings: {},
      controller: controller
    });

  controller.$inject = [
    'otusjs.otus.uxComponent.ParticipantReportWidgetFactory'
  ];

  function controller(ParticipantExamWidgetFactory) {
    var self = this;

    self.reports = ParticipantExamWidgetFactory.createExamList();
  }
}());

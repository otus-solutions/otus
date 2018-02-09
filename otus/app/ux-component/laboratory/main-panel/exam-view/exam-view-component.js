(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantExams', {
      templateUrl: 'app/ux-component/laboratory/main-panel/exam-view/exam-view-template.html',
      bindings: {},
      controller: controller
    });

  controller.$inject = [
    'otusjs.otus.uxComponent.ParticipantExamWidgetFactory'
  ];

  function controller(ParticipantExamWidgetFactory) {
    var self = this;

    // self.exams = ParticipantExamWidgetFactory.createExamList();
  }
}());

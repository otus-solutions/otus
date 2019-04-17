(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantExamHeatmap', {
      controller: "otusParticipantExamHeatmapCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/exam-monitoring/participant-exam-heatmap-template.htmls'
    });
}());

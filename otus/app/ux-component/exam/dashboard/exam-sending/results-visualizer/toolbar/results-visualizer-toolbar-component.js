(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizerManagerToolbar', {
      controller: 'otusResultVisualizerManagerToolbarCtrl as $ctrl',
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html',
      bindings: {
        action: '<',
        sendingExam: '=',
        errorAliquots: '=',
        aliquotsWithProblems: '=',
        disabledSave: '=',
        csvData: '=',
        dynamicDataTableChange: '='
      }
    });
}());
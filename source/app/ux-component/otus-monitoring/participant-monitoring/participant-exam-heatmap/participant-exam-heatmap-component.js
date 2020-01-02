(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantExamHeatmap', {
            controller: "otusParticipantExamHeatmapCtrl as $ctrl",
            templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-exam-heatmap/participant-exam-heatmap-template.html'
        });
}());

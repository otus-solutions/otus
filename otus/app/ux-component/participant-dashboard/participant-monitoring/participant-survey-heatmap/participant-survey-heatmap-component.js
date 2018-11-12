(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantHeatmap', {
            controller: "otusParticipantHeatmapCtrl as $ctrl",
            templateUrl: 'app/ux-component/participant-dashboard/participant-monitoring/participant-survey-heatmap/participant-survey-heatmap-template.html'
        });
}());

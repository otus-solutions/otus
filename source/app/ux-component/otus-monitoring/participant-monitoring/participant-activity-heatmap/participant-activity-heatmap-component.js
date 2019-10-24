(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantHeatmap', {
            controller: "otusParticipantHeatmapCtrl as $ctrl",
            templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-activity-heatmap/participant-activity-heatmap-template.html'
        });
}());

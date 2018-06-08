(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringSpreadsheetComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/spreadsheet/monitoring-spreadsheet-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '=',
                createQuestionnaireSpreadsheet: '='
            }
        });

    Controller.$inject = [
        'otusjs.deploy.FieldCenterRestService',
        '$filter',
        'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
    ];

    function Controller(ProjectFieldCenterService, $filter, DynamicTableSettingsFactory) {
        var self = this;

        /* Lifecycle hooks */
        self.$onInit = onInit;
        self.createSpreadsheet = createSpreadsheet;

        /* public functions */
        self.centers = [];
        self.datasets = [];
        self.dates = [];
        self.fieldCenters = [];
        self.isShown = false;

        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });
            });
                
            self.createQuestionnaireSpreadsheet = createSpreadsheet;
    
        }

        
        function createSpreadsheet(qData) {
            self.datasets = qData.data;
            self.dates = qData.dates;
            self.fieldCenters = qData.fieldCenters;

        }

    }
}());

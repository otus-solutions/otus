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
        //self.updateSpreadsheet;
        //self.dynamicTableSettings;

        /* public functions */
        self.centers = [];
        self.datasets = [];
        self.dates = [];
        self.fieldCenters = [];
        self.isShown = false;




        function onInit() {

            //_buildDynamicTableSettings();
            //console.log(self.dynamicTableSettings);
            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });
            });
                
            self.createQuestionnaireSpreadsheet = createSpreadsheet;
            

            // self.otusExamsLotsManager.listComponent = self;

        }

        
        function createSpreadsheet(qData) {
            self.datasets = qData.data;
            self.dates = qData.dates;
            self.fieldCenters = qData.fieldCenters;

            //console.log("hello world",self.dates);
            //_buildDynamicTableSettings();
            //if(self.updateSpreadsheet)
            //self.updateSpreadsheet([{data:"data"}]);
        }
        /*
        function _buildDynamicTableSettings(){

            self.dynamicTableSettings = DynamicTableSettingsFactory.create()
            //header, flex, align, ordinationPriorityIndex
            .addHeader('Data', '', 'left')
            //property, formatType
            .addColumnProperty('data');
            console.log(self.fieldCenters);
            for(var i=0; i < self.fieldCenters; i++)
            {
                //header, flex, align, ordinationPriorityIndex
                self.dynamicTableSettings = self.dynamicTableSettings.addHeader( self.fieldCenters[i], '30', '');
                //property, formatType
                self.dynamicTableSettings = self.dynamicTableSettings.addColumnProperty(self.fieldCenters[i]);
            }
      
            //icon, tooltip, classButton, successMsg,
            //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
            //.addColumnIconButton(
            //  'delete_forever', 'Remover Alíquota', '', 'A Alíquota foi removida',
            //  self.removeElement, false, false, true, false, false
            //)
      
            self.dynamicTableSettings = self.dynamicTableSettings.setElementsArray(self.dates) //lista de objs
            //.setTitle('Lista de Arquivos')
            
            .setCallbackAfterChange(self.dynamicDataTableChange)
            .setCheckbox(false)
            .setFilter(false)
            //Don't use with Service, in this case pass Service as attribute in the template
            .setTableUpdateFunction(self.updateSpreadsheet)
            /*
              //Optional Config's
              .setFormatData("'Dia - 'MM/yyyy")
              .setCheckbox(false)
              .setFilter(true)
              .setReorder(true)
              .setPagination(true)
              .setSelectedColor()
              .setHoverColor()
      
            */ /*
            .getSettings();
          } */
          /*
          function _dynamicDataTableUpdate(){

            AliquotTransportationService.dynamicDataTableFunction.updateDataTable();
            self.selectedAliquots = [];
          }*/


    }
}());

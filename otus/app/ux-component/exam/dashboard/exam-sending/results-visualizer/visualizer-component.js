(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizer', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/visualizer-template.html'
    });

  Controller.$inject = [
    '$mdDialog',
    '$filter',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    'otusjs.laboratory.business.project.sending.SendingExamService'
  ];

  function Controller($mdDialog, $filter, ApplicationStateService, ProjectContextService, DynamicTableSettingsFactory, SendingExamService) {
    var self = this;
    var therIsNoDataToShow;

    self.$onInit = onInit;
    self.dynamicDataTableChange = dynamicDataTableChange;

    function onInit() {
      _buildDialogs();
      self.action = ProjectContextService.getExamSendingAction();
      self.fileStructure = ProjectContextService.getFileStructure();
      self.errorAliquots = [];
      if(!self.fileStructure){
        $mdDialog.show(therIsNoDataToShow).then(function() {
          ApplicationStateService.activateExamSending();
        });
      } else {
        if (self.action === 'view') {
          self.sendingExam = [];
          self.sendingExam.examResults = [];
          _loadList();
        } else {
          _buildExamSending();
          self.sendingExam.examResultLot.resultsQuantity = self.fileStructure.examResults.length;
        }
        self.formattedDate = $filter('date')(self.fileStructure.examResultLot.realizationDate, 'dd/MM/yyyy HH:mm');
      }
      _buildDynamicTableSettings();
    }

    function _loadList() {
      SendingExamService.getSendedExamById(self.fileStructure.examResultLot._id).then(function (response) {
        self.fileStructure.examResults = response;
        _buildExamSending();
        self.updateDataTable(self.fileStructure.examResults);
      });
    }

    function _buildExamSending() {
      self.sendingExam = SendingExamService.loadExamSendingFromJson(self.fileStructure.examResultLot, self.fileStructure.examResults);
    }

    function dynamicDataTableChange() {}


    function _buildDynamicTableSettings(){
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()

         //header, flex
        .addStatusColumn('Status', '5', 'center')
        .setPropertyToValidateStatus('aliquotCode')
        .setStatusArray([])
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Codigo da aliquota', '20', 'left', 0)
        //property, formatType
        .addColumnProperty('aliquotCode')


        // .addIconWithFunction(function (element) {
        //   var structureIcon = {icon: "", class: "", tooltip: ""};
        //
        //   if(self.errorAliquots && (column.index === self.errorColumnIndex && self.elementsErrorArray.includes(element.aliquotCode))
        //   ){
        //     structureIcon = {icon: "erro", class: "md-primary", tooltip: "Erro do db"};
        //   } else {
        //     structureIcon = {icon: "success", class: "md-primary", tooltip: "Erro do db"};
        //   }
        //
        //   return structureIcon;
        // })



        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome do exame', '20', 'left', 1)
        //property, formatType
        .addColumnProperty('examName')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome do resultado', '20', 'left', 2)
        //property, formatType
        .addColumnProperty('resultName')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Valor do resultado', '20', 'left', 3)
        //property, formatType
        .addColumnProperty('value')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Data de realização', '15', 'left', 4)
        //property, formatType
        .addColumnProperty('releaseDate', 'DATE')

        .setFilter(false)

        .setPagination(false)

        .setCheckbox(false)

        .setElementsArray(self.sendingExam.examResults)
        // .setTitle('Lista de Arquivos')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(AliquotTransportationService.dynamicDataTableFunction.updateDataTable)
        /*
          //Optional Config's
          .setFormatData("'Dia - 'dd/MM/yy")
          .setCheckbox(false)
          .setFilter(true)
          .setReorder(true)
          .setPagination(true)
          .setSelectedColor()
          .setHoverColor()

        */
        .getSettings();
    }

    function _buildDialogs() {
      therIsNoDataToShow = $mdDialog.alert()
        .title('Erro ao entrar na tela de visualização de resultados')
        .textContent('Para acessar a tela de visualização de resultados você deve enviar um novo arquivo ou selecionar algum envio anterior.')
        .ariaLabel('erro')
        .ok('Ok');
    }
  }
}());

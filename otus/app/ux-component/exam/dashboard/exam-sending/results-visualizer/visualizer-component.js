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
    self.changeResults = changeResults;

    function onInit() {
      _buildDialogs();
      self.action = ProjectContextService.getExamSendingAction();
      self.fileStructure = ProjectContextService.getFileStructure();
      self.errorAliquots = [];
      self.errorexam = [];
      if (!self.fileStructure) {
        $mdDialog.show(therIsNoDataToShow).then(function () {
          ApplicationStateService.activateExamSending();
        });
      } else {
        if (self.action === 'view') {
          self.examList = [];
          _loadList();
        } else {
          _buildExamSending();
          self.sendingExam.examLot.resultsQuantity = self.examList.length;
        }
        self.formattedDate = $filter('date')(self.fileStructure.examLot.realizationDate, 'dd/MM/yyyy HH:mm');
      }
      _buildDynamicTableSettings();
    }

    function changeResults(resultsToShow) {
      self.changedResults = resultsToShow;
      self.updateDataTable(self.changedResults);
    }

    function _loadList() {
      SendingExamService.getSendedExamById(self.fileStructure.examLot._id).then(function (response) {
        self.fileStructure.exams = response;
        _buildExamSending();
        self.updateDataTable(self.examList);
      });
    }

    function _buildExamSending() {
      self.sendingExam = SendingExamService.loadExamSendingFromJson(self.fileStructure.examLot, self.fileStructure.exams);
      self.examList = self.sendingExam.getExamList();
    }

    function dynamicDataTableChange() { }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create();

      if (self.action === 'upload') {
        //header, flex
        self.dynamicTableSettings.addHeader('Status', '10', 'center', 0)
          .addIconWithFunction(function (element) {
            var structureIcon = { icon: "", class: "", tooltip: "" };

            if (self.errorAliquots.length) {
              if (!self.errorAliquots.includes(element.aliquotCode)) {
                structureIcon = { icon: "done", class: "md-primary", tooltip: "Alíquota válida", orderValue: "done" };
              } else {
                structureIcon = { icon: "warning", class: "md-warn", tooltip: "Alíquota não existe", orderValue: "warning" };
              }
            } else {
              structureIcon = { icon: "query_builder", class: "", tooltip: "Aguardando", orderValue: "file_upload" };
            }
            return structureIcon;
          })
      }

      //header, flex, align, ordinationPriorityIndex
      self.dynamicTableSettings.addHeader('Código da alíquota', '20', 'left', 1)
        .setElementsArray(self.examList)

        //property, formatType
        .addColumnProperty('aliquotCode')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome do exame', '20', 'left', 2)
        //property, formatType
        .addColumnProperty('examName')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome do resultado', '20', 'left', 3)
        //property, formatType
        .addColumnProperty('resultName')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Valor do resultado', '20', 'left', 4)
        //property, formatType
        .addColumnProperty('value')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Data de realização', '15', 'left', 5)
        //property, formatType
        .addColumnProperty('releaseDate', 'DATE')

        .setFilter(false)

        .setShowAll(false)

        .setCheckbox(false)

        // .setTitle('Lista de Arquivos')
        .setCallbackAfterChange(self.dynamicDataTableChange);
      //Don't use with Service, in this case pass Service as attribute in the template
      // .setTableUpdateFunction(self.updateDataTable)
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
      self.settings = self.dynamicTableSettings.getSettings();
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

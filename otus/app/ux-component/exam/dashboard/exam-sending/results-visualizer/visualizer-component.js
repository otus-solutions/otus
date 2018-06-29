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
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdDialog, $filter, ApplicationStateService, ProjectContextService, DynamicTableSettingsFactory, SendingExamService, LoadingScreenService) {
    const MESSAGE_LOADING = "Por favor aguarde o carregamento.<br> Esse processo pode demorar um pouco...";
    const ALIQUOT_DOES_MATCH_EXAM = "Aliquot does not match exam"
    const ALIQUOT_NOT_FOUND = "Aliquot not found";

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
          self.sendingExam.examSendingLot.resultsQuantity = self.examList.length;
        }
        self.formattedDate = $filter('date')(self.fileStructure.examSendingLot.realizationDate, 'dd/MM/yyyy HH:mm');
      }
      _buildDynamicTableSettings();
    }

    function changeResults(resultsToShow) {
      if (resultsToShow == "all") {
        self.changedResults = self.sendingExam.getExamList();
        self.updateDataTable(self.changedResults);
      } else if (resultsToShow == "resultsWithErrors") {
        self.changedResults = self.aliquotsWithProblems;
        self.updateDataTable(self.changedResults);
      }
    }

    function _loadList() {
      LoadingScreenService.changeMessage(MESSAGE_LOADING);
      LoadingScreenService.startingLockedByKey('LOAD_LIST_VIZUALIZER_EXAM_RESULT');
      SendingExamService.getSendedExamById(self.fileStructure.examSendingLot._id).then(function (response) {
        self.fileStructure.exams = response;
        _buildExamSending();
        self.updateDataTable(self.examList);
        LoadingScreenService.finishUnlockedByKey('LOAD_LIST_VIZUALIZER_EXAM_RESULT');
      });
    }

    function _buildExamSending() {
      self.sendingExam = SendingExamService.loadExamSendingFromJson(self.fileStructure.examSendingLot, self.fileStructure.exams);
      self.examList = self.sendingExam.getExamList();
    }

    function dynamicDataTableChange() { }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create();

      self.dynamicTableSettings.addHeader('Status', '10', 'center', 0)
        .addIconWithFunction(function (element) {
          var structureIcon = { icon: "", class: "", tooltip: "" };
          var errorStructure = {
            icon: "error",
            class: "md-warn",
            tooltip: "Alíquota não corresponde ao exame",
            orderValue: "error"
          };
          var warningStructure = {
            icon: "warning",
            class: "md-warn",
            tooltip: "Alíquota não identificada no sistema",
            orderValue: "warning"
          };

          if (self.action === 'view') {
            if (element.aliquotValid){
              structureIcon = { icon: "done", class: "md-primary", tooltip: "Alíquota identificada no sistema", orderValue: "done" };
            } else {
              structureIcon = warningStructure;
            }
          } else if (self.action === 'upload') {
            if (self.errorAliquots.length) {
             var error = self.errorAliquots.find(function (error) {
                if (error.aliquot === element.aliquotCode) {
                  if (error.message.includes(ALIQUOT_DOES_MATCH_EXAM)) {
                    structureIcon = errorStructure;
                  } else {
                    structureIcon = warningStructure;
                  }
                  return error;
                }
              });
              if (!error){
                structureIcon = { icon: "done", class: "md-primary", tooltip: "Alíquota identificada no sistema", orderValue: "done" };
              }
            } else {
              structureIcon = {icon: "query_builder", class: "", tooltip: "Aguardando", orderValue: "query_builder"};
            }}
          return structureIcon;
        });

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

        .setFilter(true)

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

    function errorsIncludesCode(values, code) {
      var includes = false;
      values.forEach(function (value) {
        if (value == code) {
          includes = true;
        }
      });
      return includes;
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

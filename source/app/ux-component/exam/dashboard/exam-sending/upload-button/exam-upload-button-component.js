(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamUploadAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/upload-button/exam-upload-button-template.html'
    });

  Controller.$inject = [
    '$q',
    '$element',
    '$mdToast',
    'otusjs.application.session.core.ContextService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($q, $element, $mdToast, SessionContextService, ApplicationStateService, ProjectContextService, LoadingScreenService) {
    const MESSAGE_LOADING = "Por favor aguarde o carregamento.<br> Esse processo pode demorar um pouco...";

    var self = this;
    var timeShowMsg = 5000;
    var fr = new FileReader();

    self.$onInit = onInit;
    self.upload = upload;

    function onInit() {
      fr.onload = receivedText;
      self.fileData = {};
      self.fileData.examSendingLot = {};
      self.fileData.examSendingLot.fieldCenter = {};

      self.input = $($element[0].querySelector('#fileInput'));
      self.input.on('change', function (e) {
        self.fileData.examSendingLot.operator = SessionContextService.getData('loggedUser').email;
        self.fileData.examSendingLot.fileName = e.target.files[0].name;
        if(e.target.files[0]){
          fr.readAsText(e.target.files[0]);
        }
      });
    }

    function upload() {
      self.input.click();
    }

    function receivedText(e) {
      var fileLines = e.target.result;
      if (!_fileIsEmpty(fileLines) && _isJSONValid(fileLines) && _JSONContainsPropertyOfExam(fileLines)) {
        var resultJSON = JSON.parse(fileLines);
        if (isCompatibleFieldCenter(resultJSON.examSendingLot.fieldCenter.acronym)) {
          LoadingScreenService.changeMessage(MESSAGE_LOADING);
          LoadingScreenService.start();

          self.fileData.examSendingLot.fieldCenter.acronym = ProjectContextService.getFieldCenterInSendingExam();
          self.fileData.exams = resultJSON.exams;
          self.fileData.examSendingLot.realizationDate = new Date();

          ProjectContextService.setFileStructure(self.fileData);
          self.action = ProjectContextService.setExamSendingAction('upload');
          ApplicationStateService.activateExamResultsVisualizer();
        } else {
          self.input[0].value = '';
          _toastErrorFieldCenter(ProjectContextService.getFieldCenterInSendingExam(), resultJSON.examSendingLot.fieldCenter.acronym);
        }
      } else {
        self.input[0].value = '';
        _toastEmptyFile();
      }
      LoadingScreenService.finish();
    }

    function isCompatibleFieldCenter(acronym) {
      return acronym == ProjectContextService.getFieldCenterInSendingExam() ? true : false;
    }

    function _validateFileToUpload(file) {
      if (_typeIsValid(file.type)) {
        return true;
      } else {
        _toastError();
      }
    }

    function _typeIsValid(type) {
      return type === "application/json";
    }

    function _fileIsEmpty(file) {
      try {
        file ? false : true;
      } catch (e) {
        return true;
      }
    }

    function _isJSONValid(file) {
      try {
        return JSON.parse(file) instanceof Object
      } catch (e) {
        return false;
      }
    }

    function _JSONContainsPropertyOfExam(file) {
      try {
        var data = JSON.parse(file);
        return data.hasOwnProperty('examSendingLot') && data.hasOwnProperty('exams');
      } catch (e) {
        return false;
      }
    }

    function _toastEmptyFile() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('O arquivo está vazio ou inconsistente')
          .hideDelay(timeShowMsg)
      );
    }

    function _toastError() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Arquivo inválido')
          .hideDelay(timeShowMsg)
      );
    }

    function _toastErrorFieldCenter(userFieldCenter, fileFieldCenter) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Seu centro: '
          + userFieldCenter +
          ' é diferente do centro definido no arquivo: '
          + fileFieldCenter)
          .hideDelay(timeShowMsg)
      );
    }
  }
}());

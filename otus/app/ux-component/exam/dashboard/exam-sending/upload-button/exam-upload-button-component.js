(function() {
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
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller($q, $element, $mdToast, SessionContextService, ApplicationStateService, ProjectContextService) {
    var self = this;
    var timeShowMsg = 3000;
    var fr = new FileReader();

    self.$onInit = onInit;
    self.upload = upload;

    function onInit() {
      fr.onload = receivedText;
      self.fileData = {};
      self.fileData.examResultLot = {};
      self.fileData.examResultLot.fieldCenter = {};

      self.input = $($element[0].querySelector('#fileInput'));
      self.input.on('change', function(e) {
        self.fileData.examResultLot.operator = SessionContextService.getData('loggedUser').email;
        self.fileData.examResultLot.fileName = e.target.files[0].name;
        self.fileData.examResultLot.realizationDate = new Date();
        self.fileData.examResultLot.fieldCenter.acronym = ProjectContextService.getFieldCenterInSendingExam();
        if(_validateFileToUpload(e.target.files[0])){
          fr.readAsText(e.target.files[0]);
        }
      });
    }

    function upload() {
      self.input.click();
    }

    function _validateFileToUpload(file){
      if(_typeIsValid(file.type)){
        return true;
      } else {
        _toastError();
      }
    }

    function _typeIsValid(type){
      return type === "application/json";
    }

    function receivedText(e) {
      var lines = e.target.result;
      if(!_fileIsEmpty(lines)){
        self.fileData.examResults = JSON.parse(lines);
        ProjectContextService.setFileStructure(self.fileData);
        self.action = ProjectContextService.setExamSendingAction('upload');
        ApplicationStateService.activateExamResultsVisualizer();
      } else {
        self.input[0].value='';
        _toastEmptyFile();
      }
    }

    function _fileIsEmpty(lines){
      if(!lines){
        return true;
      } else if(!JSON.parse(lines).length){
        return true;
      } else {
        return false;
      }
    }

    function _toastEmptyFile() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('O arquivo está vazio')
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
  }
}());

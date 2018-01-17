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
      console.log(file);
      if(_typeIsValid(file.type)){
        return true;
      } else {
        _toastError();
      }
    }

    function _typeIsValid(type){
      return type == "application/json";
    }

    function receivedText(e) {
      var lines = e.target.result;
      self.fileData.examResults = JSON.parse(lines);
      ProjectContextService.setFileStructure(self.fileData);
      self.action = ProjectContextService.setExamSendingAction('upload');
      ApplicationStateService.activateExamResultsVisualizer();
    }

    function _toastError() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Tipo invalido')
          .hideDelay(timeShowMsg)
      );
    }
  }
}());

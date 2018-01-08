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
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller($q, $element, $mdToast, ApplicationStateService, ProjectContextService) {
    var self = this;
    var timeShowMsg = 3000;
    var fr = new FileReader();

    self.$onInit = onInit;
    self.upload = upload;
    // self.validateFile = validateFile;

    function onInit() {
      fr.onload = receivedText;
      self.fileData = {};

      self.input = $($element[0].querySelector('#fileInput'));
      self.input.on('change', function(e) {
        self.fileData.size = e.target.files[0].size + "Kb";
        fr.readAsText(e.target.files[0]);
        console.log(e.target.files);
      });
    }

    function upload() {
      self.input.click();
    }

    function receivedText(e) {
      var lines = e.target.result;
      self.fileData.results = JSON.parse(lines);
      ProjectContextService.setFileStructure(lines);
      ApplicationStateService.activateExamResultsVisualizer();
    }

    function _toastError() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Selecione um tipo de aliquota')
          .hideDelay(timeShowMsg)
      );
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamUploadAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/sending-exam/exam-upload-button/exam-upload-button-template.html'
    });

  Controller.$inject = [
    '$q',
    '$element',
    '$mdToast',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller($q, $element, $mdToast, ApplicationStateService,ContextService) {
    var self = this;
    var timeShowMsg = 3000;
    var fr = new FileReader();

    self.$onInit = onInit;
    self.upload = upload;
    // self.validateFile = validateFile;

    function onInit() {
      fr.onload = receivedText;
      self.input = $($element[0].querySelector('#fileInput'));
      self.input.on('change', function(e) {
        fr.readAsText(e.target.files[0]);
      });
    }

    function upload() {
      self.input.click();
    }

    function receivedText(e) {
      var lines = e.target.result;
      ContextService.setFileToUpload(lines);
      self.fileData = JSON.parse(lines);
      ApplicationStateService.activateResultsVisualizer();
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

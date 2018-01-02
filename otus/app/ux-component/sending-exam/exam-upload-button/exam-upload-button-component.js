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
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($q, $element, $mdToast, ApplicationStateService) {
    var self = this;
    var timeShowMsg = 3000;
    var fr = new FileReader();

    self.$onInit = onInit;
    self.upload = upload;
    self.validateFile = validateFile;

    function onInit() {
      fr.onload = receivedText;
      self.input = $($element[0].querySelector('#fileInput'));

      self.input.on('change', function(e) {
        validateFile(e.target.files[0]);

      });
    }

    function upload() {
      self.input.click();
    }

    function validateFile(file){
      fr.onload = receivedText;
      fr.readAsText(file).then(function () {
        console.log(self.fileData);
      });
    }

    function receivedText(e) {
      var lines = e.target.result;
      self.fileData = JSON.parse(lines).then(function () {
        console.log(self.fileData);
      });
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

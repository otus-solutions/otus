
(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelSelectionModalCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$filter',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.dialog.DialogShowService',
    '$scope',
  ];

  function Controller($mdToast,$mdDialog) {
    var self = this;
    self.status = '  ';
    self.customFullscreen = false;
    self.$onInit = onInit;
    self.DialogController = DialogController;

    function onInit() {

    }

    self.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      }).then(function (answer) {
        self.status = 'You said the information was "' + answer + '".';
      }, function () {
        self.status = 'You cancelled the dialog.';
      });
    };

    function DialogController($scope, $mdDialog) {
      self.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }

  }
}());
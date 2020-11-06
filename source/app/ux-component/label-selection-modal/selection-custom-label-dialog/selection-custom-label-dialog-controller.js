
(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('selectionCustomLabelDialogCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
  ];

  function Controller($mdToast, $mdDialog) {
    var self = this;
    self.DialogController = DialogController;
    self.showAdvanced = showAdvanced

    function showAdvanced (ev) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'ctrl',
        templateUrl: 'app/ux-component/label-selection-modal/label-selection-modal-template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          participantButton: self.participantButton,
          unnatachedButton: self.unnatachedButton,
          bioMaterialButton: self.bioMaterialButton,
          participant: self.participant ? self.participant : "",
          kit: self.kit ? self.kit : ""
        },
        fullscreen: false
      }).then(function (answer) {
        self.status = '';
      }, function () {
        self.status = '';
      });
    };

    function DialogController($scope, $mdDialog,
                              participantButton, unnatachedButton,
                              bioMaterialButton, participant,
                              kit) {
      var ctrl = this;
      ctrl.participantButton = participantButton;
      ctrl.unnatachedButton = unnatachedButton;
      ctrl.bioMaterialButton = bioMaterialButton;
      ctrl.participant = participant;
      ctrl.kit = kit;

      self.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };
    }

  }
}());
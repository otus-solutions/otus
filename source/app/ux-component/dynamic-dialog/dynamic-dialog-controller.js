
(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('dynamicDialogCtrl', Controller);
  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
    '$location',
  ];

  function Controller($mdToast, $mdDialog, $scope, $location) {
    var self = this;
    self.buttonText = self.buttonText;

    self.DialogController = DialogController;
    self.showAdvanced = showAdvanced;

    function showAdvanced(ev) {
      _showDialog(ev)
    }

    function _showDialog(ev){
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'ctrl',
        templateUrl: self.templateUrl,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          data: self.data ? self.data : "",
          callbackFunctions: self.callbackFunctions ? self.callbackFunctions : ""
        },
        fullscreen: false
      }).then(function (answer) {
        self.status = '';
      }, function () {
        self.status = '';
      });
    }

    function DialogController(
      $scope,
      $mdDialog,
      data,
      callbackFunctions
    ) {
      var ctrl = this;
      ctrl.dialogData = data;
      ctrl.callbackFunctions = callbackFunctions;
      self.hide = hide;
      $scope.cancel = cancel;
      $scope.hide = hide;

      function hide() {
        $mdDialog.hide();
      }

      function cancel() {
        $mdDialog.cancel();
      }
    }

  }
}());